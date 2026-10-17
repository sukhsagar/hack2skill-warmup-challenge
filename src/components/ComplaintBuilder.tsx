'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Language, ProblemCategory, ComplaintFormData, ComplaintDraft } from '@/types';
import { translations } from '@/lib/i18n';
import {
  Copy,
  Check,
  RotateCcw,
  PlusCircle,
  Trash2,
  BookmarkCheck,
  AlertCircle,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

interface ComplaintBuilderProps {
  language: Language;
  prefillDescription?: string;
  prefillCategory?: ProblemCategory;
  onDraftSaved?: () => void;
  activeDraftToEdit?: ComplaintDraft | null;
}

const PLATFORMS = [
  'Zomato',
  'Swiggy',
  'Uber',
  'Ola',
  'Zepto',
  'Blinkit',
  'Urban Company',
  'Porter',
  'Amazon Flex',
  'Rapido',
  'Other Platform',
];

export function ComplaintBuilder({
  language,
  prefillDescription = '',
  prefillCategory = 'delayed_wages',
  onDraftSaved,
  activeDraftToEdit,
}: ComplaintBuilderProps) {
  const { user } = useAuth();
  const t = translations[language];

  const [formData, setFormData] = useState<ComplaintFormData>({
    category: prefillCategory,
    platform: 'Zomato',
    incidentDescription: prefillDescription,
    incidentDate: '',
    disputedAmount: '',
    workerIdentifier: '',
    desiredResolution: '',
    language,
  });

  const [step, setStep] = useState<'form' | 'preview'>('form');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Preview & Editing state
  const [currentDraftId, setCurrentDraftId] = useState<string | null>(null);
  const [subject, setSubject] = useState('');
  const [complaintBody, setComplaintBody] = useState('');
  const [evidenceChecklist, setEvidenceChecklist] = useState<string[]>([]);
  const [suggestedEscalation, setSuggestedEscalation] = useState<string[]>([]);
  const [isSampleDraft, setIsSampleDraft] = useState(false);

  // Copy feedback
  const [copied, setCopied] = useState(false);
  const [draftSaved, setDraftSaved] = useState(false);

  // Sync prefill props if changed
  useEffect(() => {
    if (prefillDescription) {
      setFormData((prev) => ({
        ...prev,
        incidentDescription: prefillDescription,
        category: prefillCategory || prev.category,
      }));
    }
  }, [prefillDescription, prefillCategory]);

  // Sync draft to edit if provided
  useEffect(() => {
    if (activeDraftToEdit) {
      setCurrentDraftId(activeDraftToEdit.id);
      setSubject(activeDraftToEdit.subject);
      setComplaintBody(activeDraftToEdit.complaintBody);
      setEvidenceChecklist(activeDraftToEdit.evidenceChecklist || []);
      setSuggestedEscalation(activeDraftToEdit.suggestedEscalation || []);
      setFormData((prev) => ({
        ...prev,
        category: activeDraftToEdit.category,
        platform: activeDraftToEdit.platform,
        language: activeDraftToEdit.language,
      }));
      setStep('preview');
    }
  }, [activeDraftToEdit]);

  // Keep output language in sync if user changes top-level language
  useEffect(() => {
    setFormData((prev) => ({ ...prev, language }));
  }, [language]);

  const saveDraftToLocalStorage = (draft: ComplaintDraft) => {
    if (typeof window === 'undefined') return;
    const storageKey = `awaaz_drafts_${user?.uid || 'guest'}`;
    try {
      const existing = localStorage.getItem(storageKey);
      const drafts: ComplaintDraft[] = existing ? JSON.parse(existing) : [];
      const index = drafts.findIndex((d) => d.id === draft.id);
      if (index >= 0) {
        drafts[index] = { ...draft, updatedAt: new Date().toISOString() };
      } else {
        drafts.unshift(draft);
      }
      localStorage.setItem(storageKey, JSON.stringify(drafts));
      setDraftSaved(true);
      if (onDraftSaved) onDraftSaved();
    } catch (e) {
      console.error('Failed to save draft to localStorage:', e);
    }
  };

  const handleGenerate = async () => {
    if (!formData.incidentDescription.trim()) {
      setError('Please provide a description of the issue or select a sample scenario below.');
      return;
    }

    setLoading(true);
    setError(null);
    setDraftSaved(false);

    try {
      const res = await fetch('/api/complaint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}));
        throw new Error(errJson.error || 'Failed to generate complaint.');
      }

      const data = await res.json();
      setSubject(data.subject);
      setComplaintBody(data.complaintBody);
      setEvidenceChecklist(data.evidenceChecklist || []);
      setSuggestedEscalation(data.suggestedEscalation || []);
      setIsSampleDraft(Boolean(data.isSampleDraft));

      const newId = currentDraftId || `draft_${Date.now()}`;
      setCurrentDraftId(newId);
      setStep('preview');

      // Auto-persist draft to localStorage for the user
      saveDraftToLocalStorage({
        id: newId,
        userId: user?.uid || 'guest',
        category: formData.category,
        platform: formData.platform,
        subject: data.subject,
        complaintBody: data.complaintBody,
        evidenceChecklist: data.evidenceChecklist || [],
        suggestedEscalation: data.suggestedEscalation || [],
        language: formData.language,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    } catch (err: unknown) {
      console.error('Complaint generation error:', err);
      const e = err as Error;
      setError(e.message || 'Error communicating with server.');
    } finally {
      setLoading(false);
    }
  };

  const handleManualSave = () => {
    if (!currentDraftId) return;
    const updatedDraft: ComplaintDraft = {
      id: currentDraftId,
      userId: user?.uid || 'guest',
      category: formData.category,
      platform: formData.platform,
      subject,
      complaintBody,
      evidenceChecklist,
      suggestedEscalation,
      language: formData.language,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    saveDraftToLocalStorage(updatedDraft);
    setDraftSaved(true);
    setTimeout(() => setDraftSaved(false), 3000);
  };

  const handleStartNew = () => {
    setCurrentDraftId(null);
    setSubject('');
    setComplaintBody('');
    setEvidenceChecklist([]);
    setSuggestedEscalation([]);
    setFormData({
      category: 'delayed_wages',
      platform: 'Zomato',
      incidentDescription: '',
      incidentDate: '',
      disputedAmount: '',
      workerIdentifier: '',
      desiredResolution: '',
      language,
    });
    setStep('form');
  };

  const handleDeleteDraft = () => {
    if (!currentDraftId || typeof window === 'undefined') {
      handleStartNew();
      return;
    }
    const storageKey = `awaaz_drafts_${user?.uid || 'guest'}`;
    try {
      const existing = localStorage.getItem(storageKey);
      if (existing) {
        const drafts: ComplaintDraft[] = JSON.parse(existing);
        const filtered = drafts.filter((d) => d.id !== currentDraftId);
        localStorage.setItem(storageKey, JSON.stringify(filtered));
        if (onDraftSaved) onDraftSaved();
      }
    } catch (e) {
      console.error('Failed to delete draft:', e);
    }
    handleStartNew();
  };

  const handleCopy = async () => {
    const fullText = `SUBJECT: ${subject}\n\n${complaintBody}`;
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(fullText);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = fullText;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      console.error('Copy failed:', err);
      alert('Could not copy automatically. Please select the text manually.');
    }
  };

  const handleLoadSampleScenario = (scenario: 'payout' | 'penalty' | 'suspension') => {
    if (scenario === 'payout') {
      setFormData({
        category: 'delayed_wages',
        platform: 'Swiggy',
        incidentDescription:
          'I completed 42 deliveries during the Diwali surge period in Indiranagar zone between Oct 10 and Oct 16. The weekly payout statement showed total earnings of ₹7,450, but only ₹5,000 was transferred to my account. ₹2,450 is still marked as withheld without any violation notice or explanation.',
        incidentDate: '16 Oct 2026',
        disputedAmount: '2450',
        workerIdentifier: 'SWG-BLR-88412',
        desiredResolution:
          'Immediate settlement and credit of the withheld ₹2,450 into my registered bank account.',
        language: formData.language,
      });
    } else if (scenario === 'penalty') {
      setFormData({
        category: 'unfair_deductions',
        platform: 'Zomato',
        incidentDescription:
          'On 14 Oct 2026, order #ZOM-9921 was cancelled by the customer 25 minutes after I had arrived at the merchant restaurant due to extreme waterlogging. A penalty deduction of ₹500 was charged directly against my balance citing non-delivery, despite me submitting GPS photos and chat proof to live support.',
        incidentDate: '14 Oct 2026',
        disputedAmount: '500',
        workerIdentifier: 'ZOM-DEL-33109',
        desiredResolution:
          'Full waiver and refund of the unjustified ₹500 cancellation penalty, and restoration of partner rating score.',
        language: formData.language,
      });
    } else {
      setFormData({
        category: 'account_suspension',
        platform: 'Uber',
        incidentDescription:
          'My driver partner account was abruptly deactivated yesterday without any prior show-cause notice or explanation. When I contacted driver support, I was told there was a generic customer feedback flag, but no details, trip ID, or opportunity to present dashcam footage were provided.',
        incidentDate: '15 Oct 2026',
        disputedAmount: '',
        workerIdentifier: 'UBER-MUM-7729',
        desiredResolution:
          'Transparent disclosure of alleged violation with fair appeal hearing, and immediate reinstatement of account access.',
        language: formData.language,
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header and Step Indicator */}
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#E5E4DD] shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-on-surface">{t.complaintHeading}</h2>
            <p className="text-sm text-secondary mt-0.5">{t.complaintSubtitle}</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setStep('form')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                step === 'form'
                  ? 'bg-primary text-white'
                  : 'bg-[#F2F1EA] text-secondary hover:text-on-surface'
              }`}
            >
              1. Incident Details
            </button>
            <ArrowRight className="w-3.5 h-3.5 text-secondary" />
            <button
              onClick={() => {
                if (complaintBody) setStep('preview');
              }}
              disabled={!complaintBody}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors disabled:opacity-40 ${
                step === 'preview'
                  ? 'bg-primary text-white'
                  : 'bg-[#F2F1EA] text-secondary hover:text-on-surface'
              }`}
            >
              2. Review & Copy
            </button>
          </div>
        </div>
      </div>

      {/* STEP 1: FORM INPUT */}
      {step === 'form' && (
        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#E5E4DD] shadow-xs space-y-6">
          {/* Quick Demo Scenarios */}
          <div className="p-4 rounded-xl bg-primary-light/60 border border-primary/20">
            <span className="text-xs font-bold text-primary flex items-center gap-1.5 mb-2.5">
              <Sparkles className="w-4 h-4 text-primary" />
              1-Click Demo Scenarios (Pre-fill Form):
            </span>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => handleLoadSampleScenario('payout')}
                className="text-xs px-3 py-1.5 rounded-lg bg-white hover:bg-primary hover:text-white text-on-surface border border-[#E5E4DD] font-semibold transition-all shadow-xs"
              >
                Swiggy Delayed Payout (₹2,450)
              </button>
              <button
                type="button"
                onClick={() => handleLoadSampleScenario('penalty')}
                className="text-xs px-3 py-1.5 rounded-lg bg-white hover:bg-primary hover:text-white text-on-surface border border-[#E5E4DD] font-semibold transition-all shadow-xs"
              >
                Zomato Cancellation Penalty (₹500)
              </button>
              <button
                type="button"
                onClick={() => handleLoadSampleScenario('suspension')}
                className="text-xs px-3 py-1.5 rounded-lg bg-white hover:bg-primary hover:text-white text-on-surface border border-[#E5E4DD] font-semibold transition-all shadow-xs"
              >
                Uber ID Deactivation Appeal
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Category */}
            <div>
              <label className="block text-xs font-bold text-secondary uppercase tracking-wide mb-1.5">
                {t.categoryLabel} *
              </label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value as ProblemCategory })
                }
                className="w-full px-3.5 py-2.5 text-base rounded-xl border border-[#E5E4DD] bg-[#FAF9F5] focus:bg-white focus:border-primary focus:outline-none text-on-surface font-medium"
              >
                {Object.entries(t.categories).map(([k, label]) => (
                  <option key={k} value={k}>
                    {label}
                  </option>
                ))}
              </select>
            </div>

            {/* Platform */}
            <div>
              <label className="block text-xs font-bold text-secondary uppercase tracking-wide mb-1.5">
                {t.platformLabel} *
              </label>
              <select
                value={formData.platform}
                onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                className="w-full px-3.5 py-2.5 text-base rounded-xl border border-[#E5E4DD] bg-[#FAF9F5] focus:bg-white focus:border-primary focus:outline-none text-on-surface font-medium"
              >
                {PLATFORMS.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Incident Description */}
          <div>
            <label className="block text-xs font-bold text-secondary uppercase tracking-wide mb-1.5">
              {t.incidentDescLabel} *
            </label>
            <textarea
              rows={4}
              value={formData.incidentDescription}
              onChange={(e) => setFormData({ ...formData, incidentDescription: e.target.value })}
              placeholder={t.incidentDescPlaceholder}
              className="w-full p-3.5 text-base rounded-xl border border-[#E5E4DD] bg-[#FAF9F5] focus:bg-white focus:border-primary focus:outline-none text-on-surface placeholder:text-outline font-medium"
            />
            <p className="text-[12px] text-secondary mt-1">
              Do not include confidential passwords, bank PINs, or OTPs.
            </p>
          </div>

          {/* Optional specific fields */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-secondary uppercase tracking-wide mb-1.5">
                {t.incidentDateLabel}
              </label>
              <input
                type="text"
                value={formData.incidentDate || ''}
                onChange={(e) => setFormData({ ...formData, incidentDate: e.target.value })}
                placeholder="e.g. 14 Oct 2026"
                className="w-full px-3.5 py-2 text-base rounded-xl border border-[#E5E4DD] bg-[#FAF9F5] focus:bg-white focus:border-primary focus:outline-none text-on-surface font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-secondary uppercase tracking-wide mb-1.5">
                {t.disputedAmountLabel}
              </label>
              <input
                type="text"
                value={formData.disputedAmount || ''}
                onChange={(e) => setFormData({ ...formData, disputedAmount: e.target.value })}
                placeholder="e.g. 1850"
                className="w-full px-3.5 py-2 text-base rounded-xl border border-[#E5E4DD] bg-[#FAF9F5] focus:bg-white focus:border-primary focus:outline-none text-on-surface font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-secondary uppercase tracking-wide mb-1.5">
                {t.workerIdLabel}
              </label>
              <input
                type="text"
                value={formData.workerIdentifier || ''}
                onChange={(e) => setFormData({ ...formData, workerIdentifier: e.target.value })}
                placeholder="e.g. ZOM-8921"
                className="w-full px-3.5 py-2 text-base rounded-xl border border-[#E5E4DD] bg-[#FAF9F5] focus:bg-white focus:border-primary focus:outline-none text-on-surface font-medium"
              />
            </div>
          </div>

          {/* Desired Resolution */}
          <div>
            <label className="block text-xs font-bold text-secondary uppercase tracking-wide mb-1.5">
              {t.desiredResolutionLabel}
            </label>
            <input
              type="text"
              value={formData.desiredResolution || ''}
              onChange={(e) => setFormData({ ...formData, desiredResolution: e.target.value })}
              placeholder={t.desiredResolutionPlaceholder}
              className="w-full px-3.5 py-2 text-base rounded-xl border border-[#E5E4DD] bg-[#FAF9F5] focus:bg-white focus:border-primary focus:outline-none text-on-surface font-medium"
            />
          </div>

          {/* Output Language Selector for the complaint */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-[#E5E4DD]">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-secondary">Complaint Language:</span>
              <div className="inline-flex rounded-lg border border-[#E5E4DD] bg-[#FAF9F5] p-0.5">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, language: 'en' })}
                  className={`px-3 py-1 text-xs font-bold rounded-md ${
                    formData.language === 'en'
                      ? 'bg-white text-primary shadow-xs'
                      : 'text-secondary'
                  }`}
                >
                  English
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, language: 'hi' })}
                  className={`px-3 py-1 text-xs font-bold rounded-md ${
                    formData.language === 'hi'
                      ? 'bg-white text-primary shadow-xs'
                      : 'text-secondary'
                  }`}
                >
                  हिंदी
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, language: 'pa' })}
                  className={`px-3 py-1 text-xs font-bold rounded-md ${
                    formData.language === 'pa'
                      ? 'bg-white text-primary shadow-xs'
                      : 'text-secondary'
                  }`}
                >
                  ਪੰਜਾਬੀ
                </button>
              </div>
            </div>

            <button
              type="button"
              disabled={loading || !formData.incidentDescription.trim()}
              onClick={() => handleGenerate()}
              className="px-6 py-3 rounded-xl bg-primary hover:bg-primary-dark text-white font-bold text-base shadow-xs flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              {loading ? (
                <>
                  <RotateCcw className="w-4 h-4 animate-spin" />
                  <span>{t.generatingComplaint}</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>{t.generateComplaintBtn}</span>
                </>
              )}
            </button>
          </div>

          {error && (
            <div className="p-3 bg-error-container border border-error rounded-xl text-xs text-error font-medium">
              {error}
            </div>
          )}
        </div>
      )}

      {/* STEP 2: REVIEW, EDIT & COPY */}
      {step === 'preview' && (
        <div className="space-y-6">
          {/* Top Actions Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-white rounded-2xl border border-[#E5E4DD] shadow-xs">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-primary-light text-primary border border-primary/20">
                {formData.platform} • {t.categories[formData.category]}
              </span>
              {draftSaved && (
                <span className="text-xs text-primary font-bold flex items-center gap-1">
                  <BookmarkCheck className="w-3.5 h-3.5" />
                  <span>{t.savedDraftBtn}</span>
                </span>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={handleCopy}
                className="px-4 py-2 rounded-xl bg-primary hover:bg-primary-dark text-white font-bold text-xs shadow-xs flex items-center gap-1.5 transition-all"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>{t.copiedBtn}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>{t.copyBtn}</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleManualSave}
                className="px-3.5 py-2 rounded-xl bg-[#FAF9F5] hover:bg-[#F2F1EA] text-on-surface font-semibold text-xs border border-[#E5E4DD] flex items-center gap-1.5 transition-all"
                title="Save changes to local drafts"
              >
                <BookmarkCheck className="w-4 h-4" />
                <span>{t.saveDraftBtn}</span>
              </button>

              <button
                type="button"
                onClick={handleGenerate}
                disabled={loading}
                className="px-3 py-2 rounded-xl border border-[#E5E4DD] hover:bg-[#FAF9F5] text-secondary font-semibold text-xs flex items-center gap-1 transition-all disabled:opacity-50"
                title={t.regenerateBtn}
              >
                <RotateCcw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                <span>{t.regenerateBtn}</span>
              </button>

              <button
                type="button"
                onClick={handleDeleteDraft}
                className="p-2 rounded-xl border border-error/20 hover:bg-error-container/30 text-error transition-all"
                title={t.deleteDraftBtn}
              >
                <Trash2 className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={handleStartNew}
                className="px-3 py-2 rounded-xl border border-[#E5E4DD] hover:bg-[#FAF9F5] text-on-surface font-semibold text-xs flex items-center gap-1 transition-all"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>{t.startNewBtn}</span>
              </button>
            </div>
          </div>

          {isSampleDraft && (
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800 flex items-center gap-2 font-medium">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>
                Standard Statutory Notice Template (Customized with provided incident facts).
              </span>
            </div>
          )}

          {/* Document Letterhead Card */}
          <div className="bg-white rounded-2xl border border-[#E5E4DD] shadow-sm p-6 sm:p-8 space-y-6 font-sans">
            <div className="border-b border-[#E5E4DD] pb-4 flex items-center justify-between">
              <div>
                <span className="text-xs uppercase tracking-widest text-primary font-bold block">
                  Official Grievance Notice
                </span>
                <span className="text-xs text-secondary">
                  Editable Document Draft • Awaaz — Har Mazdoor Ki Awaaz
                </span>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-md bg-[#FAF9F5] text-secondary font-semibold border border-[#E5E4DD]">
                {formData.language.toUpperCase()}
              </span>
            </div>

            {/* Subject Line */}
            <div>
              <label className="block text-xs font-bold text-secondary uppercase tracking-wider mb-1">
                Subject
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full p-3 text-base font-bold text-on-surface bg-[#FAF9F5] border border-[#E5E4DD] rounded-xl focus:border-primary focus:bg-white focus:outline-none"
              />
            </div>

            {/* Editable Complaint Body */}
            <div>
              <label className="block text-xs font-bold text-secondary uppercase tracking-wider mb-1">
                Notice Body (You can edit text directly before copying)
              </label>
              <textarea
                rows={14}
                value={complaintBody}
                onChange={(e) => setComplaintBody(e.target.value)}
                className="w-full p-4 text-sm font-normal text-on-surface bg-[#FAF9F5] border border-[#E5E4DD] rounded-xl focus:border-primary focus:bg-white focus:outline-none leading-relaxed font-mono whitespace-pre-wrap"
              />
            </div>

            {/* Evidence Checklist */}
            {evidenceChecklist.length > 0 && (
              <div className="p-4 rounded-xl bg-[#FAF9F5] border border-[#E5E4DD]">
                <div className="flex items-center gap-2 text-xs font-bold text-on-surface uppercase tracking-wide mb-2">
                  <span className="material-symbols-outlined text-primary text-[20px]">fact_check</span>
                  <span>Recommended Attachments & Evidence Checklist</span>
                </div>
                <ul className="space-y-1.5 text-xs text-secondary font-medium">
                  {evidenceChecklist.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-1.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Suggested Escalation Paths */}
            {suggestedEscalation.length > 0 && (
              <div className="p-4 rounded-xl bg-primary-light/40 border border-primary/20">
                <div className="flex items-center gap-2 text-xs font-bold text-on-surface uppercase tracking-wide mb-2">
                  <span className="material-symbols-outlined text-primary text-[20px]">explore</span>
                  <span>Escalation Steps If Unresolved within 48-72 Hours</span>
                </div>
                <ul className="space-y-1.5 text-xs text-secondary font-medium">
                  {suggestedEscalation.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-4 h-4 rounded-full bg-primary-fixed text-[#003828] text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* How to Send Instructions */}
            <div className="p-4 rounded-xl bg-[#FAF9F5] border border-[#E5E4DD] text-xs text-secondary space-y-1 font-medium">
              <span className="font-bold text-on-surface block">How to Submit This Notice:</span>
              <p>
                1. Click <strong>&quot;Copy Complaint Text&quot;</strong> above.
              </p>
              <p>
                2. Paste it into your email app addressed to the platform&apos;s Grievance Officer or submit inside the app support ticket.
              </p>
              <p>
                3. Attach order screenshots, GPS tracking records, and payout receipts.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
