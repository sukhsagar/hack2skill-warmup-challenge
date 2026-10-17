'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/context/AuthContext';
import { ComplaintDraft, Language } from '@/types';
import { translations } from '@/lib/i18n';
import {
  Copy,
  Check,
  Trash2,
  Clock,
  Shield,
  Edit3,
} from 'lucide-react';

interface DraftsListProps {
  language: Language;
  onEditDraft: (draft: ComplaintDraft) => void;
  onDraftCountChange?: (count: number) => void;
}

export function DraftsList({
  language,
  onEditDraft,
  onDraftCountChange,
}: DraftsListProps) {
  const { user } = useAuth();
  const t = translations[language];

  const [drafts, setDrafts] = useState<ComplaintDraft[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const data = localStorage.getItem(`awaaz_drafts_${user?.uid || 'guest'}`);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  });
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const storageKey = `awaaz_drafts_${user?.uid || 'guest'}`;

  const loadDrafts = useCallback(() => {
    if (typeof window === 'undefined') return;
    try {
      const data = localStorage.getItem(storageKey);
      if (data) {
        const parsed: ComplaintDraft[] = JSON.parse(data);
        setDrafts(parsed);
        if (onDraftCountChange) onDraftCountChange(parsed.length);
      } else {
        setDrafts([]);
        if (onDraftCountChange) onDraftCountChange(0);
      }
    } catch (e) {
      console.error('Error loading drafts from storage:', e);
      setDrafts([]);
    }
  }, [storageKey, onDraftCountChange]);

  useEffect(() => {
    const timer = setTimeout(() => {
      loadDrafts();
    }, 0);
    return () => clearTimeout(timer);
  }, [loadDrafts]);

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const updated = drafts.filter((d) => d.id !== id);
      setDrafts(updated);
      localStorage.setItem(storageKey, JSON.stringify(updated));
      if (onDraftCountChange) onDraftCountChange(updated.length);
    } catch (e) {
      console.error('Error deleting draft:', e);
    }
  };

  const handleCopy = async (draft: ComplaintDraft, e: React.MouseEvent) => {
    e.stopPropagation();
    const fullText = `SUBJECT: ${draft.subject}\n\n${draft.complaintBody}`;
    try {
      await navigator.clipboard.writeText(fullText);
      setCopiedId(draft.id);
      setTimeout(() => setCopiedId(null), 3000);
    } catch {
      alert('Could not copy automatically. Open the draft to view and copy.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Title & Privacy Badge */}
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#E5E4DD] shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-on-surface">{t.myDraftsTitle}</h2>
            <p className="text-sm text-secondary mt-0.5">{t.draftsDisclaimer}</p>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary-light border border-primary/20 text-primary text-xs font-bold">
            <Shield className="w-3.5 h-3.5" />
            <span>Private & Stored on Your Device Only</span>
          </div>
        </div>
      </div>

      {drafts.length === 0 ? (
        <div className="bg-white p-12 rounded-2xl border border-[#E5E4DD] shadow-xs text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-[#FAF9F5] text-secondary mx-auto flex items-center justify-center border border-[#E5E4DD]">
            <span className="material-symbols-outlined text-[26px]">description</span>
          </div>
          <h3 className="text-base font-bold text-on-surface">{t.noDraftsMessage}</h3>
          <p className="text-sm text-secondary max-w-md mx-auto font-medium">
            When you create or save a complaint draft in the Complaint Builder, it will be saved here securely in your browser storage.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4" role="list">
          {drafts.map((draft) => (
            <div
              key={draft.id}
              role="listitem"
              onClick={() => onEditDraft(draft)}
              className="p-5 rounded-2xl bg-white border border-[#E5E4DD] hover:border-primary hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group space-y-4"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-primary-light text-primary border border-primary/20">
                    {draft.platform || 'General'}
                  </span>
                  <div className="flex items-center gap-1 text-[12px] text-secondary">
                    <Clock className="w-3 h-3" />
                    <span>
                      {new Date(draft.updatedAt || draft.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <h3 className="text-base font-bold text-on-surface line-clamp-2 group-hover:text-primary transition-colors">
                  {draft.subject}
                </h3>

                <p className="text-xs text-secondary line-clamp-3 mt-2 font-mono bg-[#FAF9F5] p-2.5 rounded-xl border border-[#E5E4DD]">
                  {draft.complaintBody}
                </p>
              </div>

              <div className="pt-3 border-t border-[#E5E4DD] flex items-center justify-between text-xs">
                <span className="text-xs font-bold text-primary flex items-center gap-1">
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Click to Edit & Review</span>
                </span>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={(e) => handleCopy(draft, e)}
                    className="p-2 rounded-lg bg-[#FAF9F5] hover:bg-primary-light hover:text-primary text-secondary transition-colors border border-[#E5E4DD]"
                    title={t.copyBtn}
                    aria-label="Copy complaint to clipboard"
                  >
                    {copiedId === draft.id ? (
                      <Check className="w-3.5 h-3.5 text-primary" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={(e) => handleDelete(draft.id, e)}
                    className="p-2 rounded-lg bg-[#FAF9F5] hover:bg-error-container/30 hover:text-error text-secondary transition-colors border border-[#E5E4DD]"
                    title={t.deleteDraftBtn}
                    aria-label="Delete draft"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
