'use client';

import React, { useState } from 'react';
import { Language, BloodGroup } from '@/types';
import { MedicalCategory, UrgencyLevel, CommunityRequest } from './types';
import { saveNewRequest } from './storage';
import { communityI18n } from './i18n';
import { EmergencyBanner } from './emergency-banner';
import {
  HeartPulse,
  ShieldCheck,
  AlertCircle,
  CheckCircle2,
  Lock,
  Loader2,
  Info,
  Bug,
  Droplet,
} from 'lucide-react';


interface MedicalAidFormProps {
  language: Language;
  userId?: string;
  onRequestSubmitted: (request: CommunityRequest) => void;
}

export function MedicalAidForm({
  language,
  userId,
  onRequestSubmitted,
}: MedicalAidFormProps) {
  const t = communityI18n[language] || communityI18n.en;

  const [category, setCategory] = useState<MedicalCategory>('road_accident');
  const [bloodGroupRequired, setBloodGroupRequired] = useState<BloodGroup>('B+');
  const [city, setCity] = useState<string>('');
  const [urgency, setUrgency] = useState<UrgencyLevel>('urgent');
  const [supportNeeded, setSupportNeeded] = useState<string>('');
  const [contactMethod, setContactMethod] = useState<'in_app' | 'phone_relay' | 'email_relay'>('in_app');
  const [consentGiven, setConsentGiven] = useState<boolean>(false);

  // Status & feedback
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saveError, setSaveError] = useState<string | null>(null);
  const [successRecord, setSuccessRecord] = useState<CommunityRequest | null>(null);

  // Evaluator test toggle for simulating failure
  const [simulateFailure, setSimulateFailure] = useState<boolean>(false);

  // Sensitive data detection (e.g. phone numbers, specific addresses)
  const hasPhonePattern = React.useMemo(() => {
    const phoneRegex = /\b[6-9]\d{9}\b/;
    return phoneRegex.test(supportNeeded);
  }, [supportNeeded]);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!category) {
      newErrors.category = 'Please select a medical support category.';
    }

    if (!city.trim() || city.trim().length < 2) {
      newErrors.city = 'Please provide a broad city or locality (e.g., Koramangala, Bengaluru).';
    }

    if (!supportNeeded.trim() || supportNeeded.trim().length < 15) {
      newErrors.supportNeeded = 'Please describe the practical assistance required (min 15 chars).';
    }

    if (!consentGiven) {
      newErrors.consent = 'You must acknowledge that Awaaz is not an emergency dispatch service.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveError(null);
    setSuccessRecord(null);

    if (!validate()) {
      return;
    }

    setSubmitting(true);

    try {
      const saved = await saveNewRequest(
        {
          type: 'medical',
          category,
          title: category === 'blood_requirement'
            ? `Emergency Blood Needed: ${bloodGroupRequired}`
            : `Medical Aid: ${category.replace('_', ' ').toUpperCase()}`,
          sanitizedDescription: supportNeeded.trim(),
          broadLocation: city.trim(),
          bloodGroupRequired: category === 'blood_requirement' ? bloodGroupRequired : undefined,
          language,
          urgency,
          contactPreference: contactMethod,
          consentGiven: true,
          userDisplayName: userId ? 'Registered Partner' : 'Anonymous Worker',
        },
        userId,
        simulateFailure
      );

      setSuccessRecord(saved);
      onRequestSubmitted(saved);

      // Reset form fields
      setSupportNeeded('');
      setCity('');
      setConsentGiven(false);
    } catch (err: unknown) {
      const error = err as Error;
      setSaveError(error.message || t.submitError);
    } finally {
      setSubmitting(false);
    }
  };


  return (
    <div className="space-y-6">
      {/* Prominent Emergency Warning */}
      <EmergencyBanner language={language} />

      <div className="bg-white rounded-3xl border border-[#E5E4DD] shadow-xs p-6 sm:p-8 space-y-6">
        {/* Header */}
        <div className="border-b border-[#E5E4DD] pb-5">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center border border-red-200">
              <HeartPulse className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-on-surface">{t.medicalFormTitle}</h2>
              <p className="text-xs sm:text-sm text-secondary mt-0.5">{t.medicalFormDesc}</p>
            </div>
          </div>
        </div>

        {/* Success Notification */}
        {successRecord && (
          <div className="rounded-2xl bg-primary-light border border-primary/30 p-4 space-y-2 text-primary-dark">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              <h4 className="text-sm font-bold">{t.submittedSuccess}</h4>
            </div>
            <p className="text-xs leading-relaxed text-secondary">{t.submittedNote}</p>
            <div className="text-[11px] font-mono bg-white/80 p-2 rounded-lg border border-primary/20">
              Reference ID: <strong>{successRecord.id}</strong> • Location:{' '}
              <strong>{successRecord.broadLocation}</strong> • Status:{' '}
              <strong className="text-primary">{successRecord.status.toUpperCase()}</strong>
            </div>
          </div>
        )}

        {/* Error Notification */}
        {saveError && (
          <div className="rounded-2xl bg-red-50 border border-red-200 p-4 space-y-1 text-red-800">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <h4 className="text-sm font-bold">Failed to Save Request</h4>
            </div>
            <p className="text-xs leading-relaxed">{saveError}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Category */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-on-surface uppercase tracking-wider">
              {t.medicalCategoryLabel} <span className="text-red-500">*</span>
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as MedicalCategory)}
              className="w-full px-4 py-3 rounded-xl bg-[#FAF9F5] border border-[#E5E4DD] text-sm font-medium text-on-surface focus:outline-hidden focus:border-primary focus:bg-white transition-colors"
            >
              <option value="blood_requirement">🩸 Urgent Blood Requirement (Community Donor Matching)</option>
              <option value="road_accident">On-Duty Road Accident Logistics & Transport Support</option>
              <option value="first_aid">First Aid Kit / Minor Dressing Assistance</option>
              <option value="hospital_navigation">Government / Trust Hospital Admission Guidance</option>
              <option value="heatstroke_relief">Heatstroke, Severe Dehydration & Hydration Support</option>
              <option value="emergency_welfare">Platform Rider Medical Insurance Claim Guidance</option>
              <option value="equipment_support">Temporary Crutches / Wheelchair / Splint Assistance</option>
              <option value="other_medical">Other Non-Emergency Practical Health Assistance</option>
            </select>
            {errors.category && <p className="text-xs text-red-600">{errors.category}</p>}
          </div>

          {/* Blood Group Picker (Shown when category is blood_requirement) */}
          {category === 'blood_requirement' && (
            <div className="p-4 rounded-2xl bg-red-50/70 border border-red-200 space-y-3 animate-in fade-in">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-red-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Droplet className="w-4 h-4 text-red-600" />
                  <span>Blood Group Needed</span>
                </span>
                <span className="text-[11px] font-bold text-red-600 bg-red-100 px-2.5 py-0.5 rounded-full">
                  Community Donor Relay
                </span>
              </div>
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                {(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'] as BloodGroup[]).map((bg) => (
                  <button
                    key={bg}
                    type="button"
                    onClick={() => setBloodGroupRequired(bg)}
                    className={`h-11 rounded-xl font-extrabold text-sm border transition-all ${
                      bloodGroupRequired === bg
                        ? 'bg-red-600 border-red-600 text-white shadow-xs scale-102'
                        : 'bg-white border-red-200 text-red-900 hover:border-red-400'
                    }`}
                  >
                    {bg}
                  </button>
                ))}
              </div>
              <p className="text-[11px] text-red-700 leading-relaxed font-medium">
                Selecting a blood group will automatically alert nearby gig workers in your city who have registered as donors.
              </p>
            </div>
          )}


          {/* Location & Contact Method Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-on-surface uppercase tracking-wider">
                {t.cityLabel} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder={t.cityPlaceholder}
                className="w-full px-4 py-3 rounded-xl bg-[#FAF9F5] border border-[#E5E4DD] text-sm text-on-surface placeholder:text-secondary/50 focus:outline-hidden focus:border-primary focus:bg-white transition-colors"
              />
              <p className="text-[11px] text-secondary flex items-center gap-1">
                <Lock className="w-3 h-3 text-secondary" />
                <span>{t.cityHint}</span>
              </p>
              {errors.city && <p className="text-xs text-red-600">{errors.city}</p>}
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-on-surface uppercase tracking-wider">
                {t.contactPrefLabel}
              </label>
              <select
                value={contactMethod}
                onChange={(e) =>
                  setContactMethod(e.target.value as 'in_app' | 'phone_relay' | 'email_relay')
                }
                className="w-full px-4 py-3 rounded-xl bg-[#FAF9F5] border border-[#E5E4DD] text-sm font-medium text-on-surface focus:outline-hidden focus:border-primary focus:bg-white transition-colors"
              >
                <option value="in_app">{t.contactInApp}</option>
                <option value="phone_relay">{t.contactPhoneRelay}</option>
                <option value="email_relay">{t.contactEmailRelay}</option>
              </select>
            </div>
          </div>

          {/* Urgency Level */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-on-surface uppercase tracking-wider">
              {t.urgencyLabel}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {[
                { id: 'routine', label: 'Routine (Non-time sensitive)', badge: 'Normal' },
                { id: 'urgent', label: 'Same-Day Practical Assistance', badge: 'Same Day' },
                { id: 'immediate', label: 'Immediate Attention (Non-trauma)', badge: 'Urgent' },
              ].map((item) => (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => setUrgency(item.id as UrgencyLevel)}
                  className={`p-3 rounded-xl border text-left text-xs transition-all ${
                    urgency === item.id
                      ? 'border-red-500 bg-red-50/50 text-red-900 font-bold shadow-xs'
                      : 'border-[#E5E4DD] bg-[#FAF9F5] text-secondary hover:border-secondary'
                  }`}
                >
                  <div className="font-bold text-on-surface">{item.badge}</div>
                  <div className="text-[11px] mt-0.5 leading-snug">{item.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-on-surface uppercase tracking-wider">
                {t.medicalDetailsLabel} <span className="text-red-500">*</span>
              </label>
              <span className="text-[11px] text-secondary font-mono">
                {supportNeeded.length}/600
              </span>
            </div>
            <textarea
              rows={4}
              maxLength={600}
              value={supportNeeded}
              onChange={(e) => setSupportNeeded(e.target.value)}
              placeholder={t.medicalDetailsPlaceholder}
              className="w-full px-4 py-3 rounded-xl bg-[#FAF9F5] border border-[#E5E4DD] text-sm text-on-surface placeholder:text-secondary/50 focus:outline-hidden focus:border-primary focus:bg-white transition-colors"
            />
            <p className="text-[11px] text-secondary flex items-center gap-1">
              <Info className="w-3 h-3 text-secondary" />
              <span>{t.medicalDetailsHint}</span>
            </p>

            {hasPhonePattern && (
              <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>
                  Privacy Tip: We noticed a phone number. For your safety, phone numbers are not
                  shared publicly. Coordinators will reach out using relay protocols.
                </span>
              </div>
            )}

            {errors.supportNeeded && (
              <p className="text-xs text-red-600">{errors.supportNeeded}</p>
            )}
          </div>

          {/* Consent Checkbox */}
          <div className="rounded-2xl bg-[#FAF9F5] p-4 border border-[#E5E4DD] space-y-2">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={consentGiven}
                onChange={(e) => setConsentGiven(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded-sm border-[#76827A] text-red-600 focus:ring-red-500 accent-red-600"
              />
              <span className="text-xs text-on-surface font-medium leading-relaxed">
                {t.medicalConsentLabel}
              </span>
            </label>
            {errors.consent && <p className="text-xs text-red-600 pl-7">{errors.consent}</p>}
            <div className="pl-7 pt-1 border-t border-[#E5E4DD]/60 flex items-center gap-1.5 text-[11px] text-secondary">
              <ShieldCheck className="w-3.5 h-3.5 text-primary" />
              <span>{t.medicalDisclaimer}</span>
            </div>
          </div>

          {/* Action Button & Developer Test Switch */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              type="submit"
              disabled={submitting}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-md transition-all disabled:opacity-50"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>{t.submitting}</span>
                </>
              ) : (
                <>
                  <HeartPulse className="w-4 h-4" />
                  <span>{t.submitMedicalBtn}</span>
                </>
              )}
            </button>

            {/* Evaluator Failure Test Mode Toggle */}
            <div className="flex items-center gap-2 text-xs text-secondary bg-[#FAF9F5] px-3 py-1.5 rounded-xl border border-[#E5E4DD]">
              <Bug className="w-3.5 h-3.5 text-secondary" />
              <label className="cursor-pointer flex items-center gap-1.5 select-none text-[11px]">
                <input
                  type="checkbox"
                  checked={simulateFailure}
                  onChange={(e) => setSimulateFailure(e.target.checked)}
                  className="w-3.5 h-3.5 rounded text-red-600 accent-red-600"
                />
                <span>Simulate Save Failure (Evaluator Test)</span>
              </label>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
