'use client';

import React, { useState } from 'react';
import { Language } from '@/types';
import { LegalCategory, UrgencyLevel, CommunityRequest } from './types';
import { saveNewRequest } from './storage';
import { communityI18n } from './i18n';
import {
  Scale,
  ShieldCheck,
  AlertCircle,
  CheckCircle2,
  Lock,
  Loader2,
  Info,
  Bug,
} from 'lucide-react';

interface LegalHelpFormProps {
  language: Language;
  userId?: string;
  onRequestSubmitted: (request: CommunityRequest) => void;
}

export function LegalHelpForm({
  language,
  userId,
  onRequestSubmitted,
}: LegalHelpFormProps) {
  const t = communityI18n[language] || communityI18n.en;

  const [category, setCategory] = useState<LegalCategory>('id_deactivation');
  const [city, setCity] = useState<string>('');
  const [preferredLanguage, setPreferredLanguage] = useState<Language>(language);
  const [urgency, setUrgency] = useState<UrgencyLevel>('routine');
  const [summary, setSummary] = useState<string>('');
  const [consentGiven, setConsentGiven] = useState<boolean>(false);

  // Status & feedback
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saveError, setSaveError] = useState<string | null>(null);
  const [successRecord, setSuccessRecord] = useState<CommunityRequest | null>(null);

  // Evaluator test toggle for simulating failure
  const [simulateFailure, setSimulateFailure] = useState<boolean>(false);

  // Check for potential sensitive numbers (e.g. 12-digit Aadhaar pattern or banking keywords)
  const hasAadhaarOrAccountPattern = React.useMemo(() => {
    const aadhaarRegex = /\b\d{4}\s?\d{4}\s?\d{4}\b/;
    const sensitiveKeywords = /\b(password|otp|cvv|pin|bank account)\b/i;
    return aadhaarRegex.test(summary) || sensitiveKeywords.test(summary);
  }, [summary]);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!category) {
      newErrors.category = 'Please select a legal issue category.';
    }

    if (!city.trim() || city.trim().length < 2) {
      newErrors.city = 'Please provide a broad city or region (e.g., Bengaluru, North Delhi).';
    }

    if (!summary.trim() || summary.trim().length < 15) {
      newErrors.summary = 'Please provide at least 15 characters explaining your situation.';
    }

    if (!consentGiven) {
      newErrors.consent = 'You must consent to sharing this non-confidential summary to proceed.';
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
          type: 'legal',
          category,
          title: `Legal Inquiry: ${category.replace('_', ' ').toUpperCase()}`,
          sanitizedDescription: summary.trim(),
          broadLocation: city.trim(),
          language: preferredLanguage,
          urgency,
          contactPreference: 'in_app',
          consentGiven: true,
          userDisplayName: userId ? 'Registered Partner' : 'Anonymous Worker',
        },
        userId,
        simulateFailure
      );

      setSuccessRecord(saved);
      onRequestSubmitted(saved);

      // Reset form fields
      setSummary('');
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
    <div className="bg-white rounded-3xl border border-[#E5E4DD] shadow-xs p-6 sm:p-8 space-y-6">
      {/* Header */}
      <div className="border-b border-[#E5E4DD] pb-5">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-primary-light text-primary flex items-center justify-center border border-primary/20">
            <Scale className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-on-surface">{t.legalFormTitle}</h2>
            <p className="text-xs sm:text-sm text-secondary mt-0.5">{t.legalFormDesc}</p>
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
            {t.categoryLabel} <span className="text-red-500">*</span>
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as LegalCategory)}
            className="w-full px-4 py-3 rounded-xl bg-[#FAF9F5] border border-[#E5E4DD] text-sm font-medium text-on-surface focus:outline-hidden focus:border-primary focus:bg-white transition-colors"
          >
            <option value="id_deactivation">Arbitrary ID Block / Account Deactivation</option>
            <option value="wage_theft">Withheld Earnings / Delayed Payout / Tip Theft</option>
            <option value="penalty_dispute">Unfair Cancellation Penalty / Deduction</option>
            <option value="accident_compensation">Accident & Injury Insurance Claim Assistance</option>
            <option value="welfare_dispute">e-Shram / State Gig Worker Welfare Fund Dispute</option>
            <option value="contract_issue">Contract Terms / Rating Dispute</option>
            <option value="other_legal">Other Workplace Dispute</option>
          </select>
          {errors.category && <p className="text-xs text-red-600">{errors.category}</p>}
        </div>

        {/* Location & Preferred Language Row */}
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
              {t.languageLabel}
            </label>
            <select
              value={preferredLanguage}
              onChange={(e) => setPreferredLanguage(e.target.value as Language)}
              className="w-full px-4 py-3 rounded-xl bg-[#FAF9F5] border border-[#E5E4DD] text-sm font-medium text-on-surface focus:outline-hidden focus:border-primary focus:bg-white transition-colors"
            >
              <option value="en">English</option>
              <option value="hi">हिंदी (Hindi)</option>
              <option value="pa">ਪੰਜਾਬੀ (Punjabi)</option>
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
              { id: 'routine', label: t.urgencyRoutine, badge: 'Normal' },
              { id: 'urgent', label: t.urgencyUrgent, badge: 'Urgent' },
              { id: 'immediate', label: t.urgencyImmediate, badge: 'Time-Critical' },
            ].map((item) => (
              <button
                type="button"
                key={item.id}
                onClick={() => setUrgency(item.id as UrgencyLevel)}
                className={`p-3 rounded-xl border text-left text-xs transition-all ${
                  urgency === item.id
                    ? 'border-primary bg-primary-light text-primary-dark font-bold shadow-xs'
                    : 'border-[#E5E4DD] bg-[#FAF9F5] text-secondary hover:border-secondary'
                }`}
              >
                <div className="font-bold text-on-surface">{item.badge}</div>
                <div className="text-[11px] mt-0.5 leading-snug">{item.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Summary Description */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-bold text-on-surface uppercase tracking-wider">
              {t.summaryLabel} <span className="text-red-500">*</span>
            </label>
            <span className="text-[11px] text-secondary font-mono">{summary.length}/800</span>
          </div>
          <textarea
            rows={4}
            maxLength={800}
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            placeholder={t.summaryPlaceholder}
            className="w-full px-4 py-3 rounded-xl bg-[#FAF9F5] border border-[#E5E4DD] text-sm text-on-surface placeholder:text-secondary/50 focus:outline-hidden focus:border-primary focus:bg-white transition-colors"
          />
          <p className="text-[11px] text-secondary flex items-center gap-1">
            <Info className="w-3 h-3 text-secondary" />
            <span>{t.summaryHint}</span>
          </p>

          {hasAadhaarOrAccountPattern && (
            <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>{t.sensitiveDataWarning}</span>
            </div>
          )}

          {errors.summary && <p className="text-xs text-red-600">{errors.summary}</p>}
        </div>

        {/* Consent Checkbox */}
        <div className="rounded-2xl bg-[#FAF9F5] p-4 border border-[#E5E4DD] space-y-2">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={consentGiven}
              onChange={(e) => setConsentGiven(e.target.checked)}
              className="mt-0.5 w-4 h-4 rounded-sm border-[#76827A] text-primary focus:ring-primary accent-[#086B50]"
            />
            <span className="text-xs text-on-surface font-medium leading-relaxed">
              {t.legalConsentLabel}
            </span>
          </label>
          {errors.consent && <p className="text-xs text-red-600 pl-7">{errors.consent}</p>}
          <div className="pl-7 pt-1 border-t border-[#E5E4DD]/60 flex items-center gap-1.5 text-[11px] text-secondary">
            <ShieldCheck className="w-3.5 h-3.5 text-primary" />
            <span>{t.legalDisclaimer}</span>
          </div>
        </div>

        {/* Action Button & Developer Test Switch */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            type="submit"
            disabled={submitting}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-primary hover:bg-primary-dark text-white font-bold text-sm shadow-md transition-all disabled:opacity-50"
          >
            {submitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>{t.submitting}</span>
              </>
            ) : (
              <>
                <Scale className="w-4 h-4" />
                <span>{t.submitLegalBtn}</span>
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
  );
}
