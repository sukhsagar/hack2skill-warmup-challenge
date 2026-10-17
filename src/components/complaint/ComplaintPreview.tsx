'use client';

import React from 'react';
import { ComplaintFormData, Language } from '@/types';
import { translations } from '@/lib/i18n';
import {
  Copy,
  Check,
  RotateCcw,
  PlusCircle,
  Trash2,
  BookmarkCheck,
  AlertCircle,
} from 'lucide-react';

interface ComplaintPreviewProps {
  formData: ComplaintFormData;
  subject: string;
  setSubject: (s: string) => void;
  complaintBody: string;
  setComplaintBody: (b: string) => void;
  evidenceChecklist: string[];
  suggestedEscalation: string[];
  isSampleDraft: boolean;
  draftSaved: boolean;
  copied: boolean;
  loading: boolean;
  onCopy: () => void;
  onSave: () => void;
  onRegenerate: () => void;
  onDelete: () => void;
  onStartNew: () => void;
  language: Language;
}

export function ComplaintPreview({
  formData,
  subject,
  setSubject,
  complaintBody,
  setComplaintBody,
  evidenceChecklist,
  suggestedEscalation,
  isSampleDraft,
  draftSaved,
  copied,
  loading,
  onCopy,
  onSave,
  onRegenerate,
  onDelete,
  onStartNew,
  language,
}: ComplaintPreviewProps) {
  const t = translations[language];

  return (
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
            onClick={onCopy}
            className="px-4 py-2 rounded-xl bg-primary hover:bg-primary-dark text-white font-bold text-xs shadow-xs flex items-center gap-1.5 transition-all"
            aria-label={copied ? "Grievance text copied to clipboard" : "Copy grievance text to clipboard"}
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
            onClick={onSave}
            className="px-3.5 py-2 rounded-xl bg-[#FAF9F5] hover:bg-[#F2F1EA] text-on-surface font-semibold text-xs border border-[#E5E4DD] flex items-center gap-1.5 transition-all"
            title="Save changes to local drafts"
            aria-label="Save changes to local drafts"
          >
            <BookmarkCheck className="w-4 h-4" />
            <span>{t.saveDraftBtn}</span>
          </button>

          <button
            type="button"
            onClick={onRegenerate}
            disabled={loading}
            className="px-3 py-2 rounded-xl border border-[#E5E4DD] hover:bg-[#FAF9F5] text-secondary font-semibold text-xs flex items-center gap-1 transition-all disabled:opacity-50"
            title={t.regenerateBtn}
            aria-label="Regenerate complaint draft"
          >
            <RotateCcw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>{t.regenerateBtn}</span>
          </button>

          <button
            type="button"
            onClick={onDelete}
            className="p-2 rounded-xl border border-error/20 hover:bg-error-container/30 text-error transition-all"
            title={t.deleteDraftBtn}
            aria-label="Delete draft"
          >
            <Trash2 className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={onStartNew}
            className="px-3 py-2 rounded-xl border border-[#E5E4DD] hover:bg-[#FAF9F5] text-on-surface font-semibold text-xs flex items-center gap-1 transition-all"
            aria-label="Start new grievance"
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
          <label htmlFor="preview-subject" className="block text-xs font-bold text-secondary uppercase tracking-wider mb-1">
            Subject
          </label>
          <input
            id="preview-subject"
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full p-3 text-base font-bold text-on-surface bg-[#FAF9F5] border border-[#E5E4DD] rounded-xl focus:border-primary focus:bg-white focus:outline-none"
          />
        </div>

        {/* Editable Complaint Body */}
        <div>
          <label htmlFor="preview-body" className="block text-xs font-bold text-secondary uppercase tracking-wider mb-1">
            Notice Body (You can edit text directly before copying)
          </label>
          <textarea
            id="preview-body"
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
  );
}
