'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Language, ProblemCategory, ComplaintFormData, ComplaintDraft } from '@/types';
import { translations } from '@/lib/i18n';
import { ArrowRight } from 'lucide-react';
import { ComplaintForm } from './complaint/ComplaintForm';
import { ComplaintPreview } from './complaint/ComplaintPreview';

interface ComplaintBuilderProps {
  language: Language;
  prefillDescription?: string;
  prefillCategory?: ProblemCategory;
  onDraftSaved?: () => void;
  activeDraftToEdit?: ComplaintDraft | null;
}

export function ComplaintBuilder({
  language,
  prefillDescription = '',
  prefillCategory = 'delayed_wages',
  onDraftSaved,
  activeDraftToEdit,
}: ComplaintBuilderProps) {
  const { user } = useAuth();
  const t = translations[language];

  const [formData, setFormData] = useState<ComplaintFormData>(() => ({
    category: prefillCategory,
    platform: 'Zomato',
    incidentDescription: prefillDescription,
    incidentDate: '',
    disputedAmount: '',
    workerIdentifier: '',
    desiredResolution: '',
    language,
  }));

  const [step, setStep] = useState<'form' | 'preview'>('form');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Generated Grievance output states
  const [currentDraftId, setCurrentDraftId] = useState<string | null>(() => activeDraftToEdit ? activeDraftToEdit.id : null);
  const [subject, setSubject] = useState<string>(() => activeDraftToEdit ? activeDraftToEdit.subject : '');
  const [complaintBody, setComplaintBody] = useState<string>(() => activeDraftToEdit ? activeDraftToEdit.complaintBody : '');
  const [evidenceChecklist, setEvidenceChecklist] = useState<string[]>(() => activeDraftToEdit ? (activeDraftToEdit.evidenceChecklist || []) : []);
  const [suggestedEscalation, setSuggestedEscalation] = useState<string[]>(() => activeDraftToEdit ? (activeDraftToEdit.suggestedEscalation || []) : []);
  const [isSampleDraft, setIsSampleDraft] = useState<boolean>(false);
  const [copied, setCopied] = useState(false);
  const [draftSaved, setDraftSaved] = useState(false);

  // Sync prefill props if changed
  useEffect(() => {
    if (prefillDescription) {
      const timer = setTimeout(() => {
        setFormData((prev) => ({
          ...prev,
          incidentDescription: prefillDescription,
          category: prefillCategory || prev.category,
        }));
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [prefillDescription, prefillCategory]);

  // Sync draft to edit if provided
  useEffect(() => {
    if (activeDraftToEdit) {
      const timer = setTimeout(() => {
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
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [activeDraftToEdit]);

  // Keep output language in sync if user changes top-level language
  useEffect(() => {
    const timer = setTimeout(() => {
      setFormData((prev) => ({ ...prev, language }));
    }, 0);
    return () => clearTimeout(timer);
  }, [language]);

  const saveDraftToLocalStorage = useCallback((draft: ComplaintDraft) => {
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
      console.error('Failed to save draft to storage:', e);
    }
  }, [user?.uid, onDraftSaved]);

  const handleGenerate = async () => {
    if (!formData.incidentDescription.trim()) return;

    setLoading(true);
    setError(null);
    setIsSampleDraft(false);

    try {
      const res = await fetch('/api/complaint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || `Failed to draft complaint (Status ${res.status})`);
      }

      const data = await res.json();
      setSubject(data.subject || 'Formal Grievance Submission');
      setComplaintBody(data.complaintBody || '');
      setEvidenceChecklist(data.evidenceChecklist || []);
      setSuggestedEscalation(data.suggestedEscalation || []);
      if (data.isSample) {
        setIsSampleDraft(true);
      }

      const draftId = currentDraftId || `draft_${Date.now()}`;
      setCurrentDraftId(draftId);

      const newDraft: ComplaintDraft = {
        id: draftId,
        userId: user?.uid || 'guest',
        category: formData.category,
        platform: formData.platform,
        subject: data.subject || 'Formal Grievance Submission',
        complaintBody: data.complaintBody || '',
        evidenceChecklist: data.evidenceChecklist || [],
        suggestedEscalation: data.suggestedEscalation || [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        language: formData.language,
      };

      saveDraftToLocalStorage(newDraft);
      setStep('preview');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleManualSave = () => {
    if (!complaintBody) return;
    const draftId = currentDraftId || `draft_${Date.now()}`;
    setCurrentDraftId(draftId);
    const updatedDraft: ComplaintDraft = {
      id: draftId,
      userId: user?.uid || 'guest',
      category: formData.category,
      platform: formData.platform,
      subject,
      complaintBody,
      evidenceChecklist,
      suggestedEscalation,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      language: formData.language,
    };
    saveDraftToLocalStorage(updatedDraft);
  };

  const handleStartNew = () => {
    setCurrentDraftId(null);
    setSubject('');
    setComplaintBody('');
    setEvidenceChecklist([]);
    setSuggestedEscalation([]);
    setIsSampleDraft(false);
    setDraftSaved(false);
    setStep('form');
  };

  const handleDeleteDraft = () => {
    if (!currentDraftId || typeof window === 'undefined') return;
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
      setFormData((prev) => ({
        ...prev,
        category: 'delayed_wages',
        platform: 'Swiggy',
        incidentDescription:
          'I completed 42 deliveries during the Diwali surge period in Indiranagar zone between Oct 10 and Oct 16. The weekly payout statement showed total earnings of ₹7,450, but only ₹5,000 was transferred to my account. ₹2,450 is still marked as withheld without any violation notice or explanation.',
        incidentDate: '16 Oct 2026',
        disputedAmount: '2450',
        workerIdentifier: 'SWG-BLR-88412',
        desiredResolution:
          'Immediate settlement and credit of the withheld ₹2,450 into my registered bank account.',
      }));
    } else if (scenario === 'penalty') {
      setFormData((prev) => ({
        ...prev,
        category: 'unfair_deductions',
        platform: 'Zomato',
        incidentDescription:
          'On 14 Oct 2026, order #ZOM-9921 was cancelled by the customer 25 minutes after I had arrived at the merchant restaurant due to extreme waterlogging. A penalty deduction of ₹500 was charged directly against my balance citing non-delivery, despite me submitting GPS photos and chat proof to live support.',
        incidentDate: '14 Oct 2026',
        disputedAmount: '500',
        workerIdentifier: 'ZOM-DEL-33109',
        desiredResolution:
          'Full waiver and refund of the unjustified ₹500 cancellation penalty, and restoration of partner rating score.',
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        category: 'account_suspension',
        platform: 'Uber',
        incidentDescription:
          'My driver partner account was abruptly deactivated yesterday without any prior show-cause notice or explanation. When I contacted driver support, I was told there was a generic customer feedback flag, but no details, trip ID, or opportunity to present dashcam footage were provided.',
        incidentDate: '15 Oct 2026',
        disputedAmount: '',
        workerIdentifier: 'UBER-MUM-7729',
        desiredResolution:
          'Transparent disclosure of alleged violation with fair appeal hearing, and immediate reinstatement of account access.',
      }));
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
        <ComplaintForm
          formData={formData}
          setFormData={setFormData}
          loading={loading}
          onSubmit={handleGenerate}
          onSelectScenario={handleLoadSampleScenario}
          language={language}
        />
      )}

      {error && (
        <div className="p-3 bg-error-container border border-error rounded-xl text-xs text-error font-medium">
          {error}
        </div>
      )}

      {/* STEP 2: REVIEW, EDIT & COPY */}
      {step === 'preview' && (
        <ComplaintPreview
          formData={formData}
          subject={subject}
          setSubject={setSubject}
          complaintBody={complaintBody}
          setComplaintBody={setComplaintBody}
          evidenceChecklist={evidenceChecklist}
          suggestedEscalation={suggestedEscalation}
          isSampleDraft={isSampleDraft}
          draftSaved={draftSaved}
          copied={copied}
          loading={loading}
          onCopy={handleCopy}
          onSave={handleManualSave}
          onRegenerate={handleGenerate}
          onDelete={handleDeleteDraft}
          onStartNew={handleStartNew}
          language={language}
        />
      )}
    </div>
  );
}
