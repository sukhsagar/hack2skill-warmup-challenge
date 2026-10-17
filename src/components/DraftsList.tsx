'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/context/AuthContext';
import { ComplaintDraft, Language } from '@/types';
import { translations } from '@/lib/i18n';
import {
  FileText,
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

  const [drafts, setDrafts] = useState<ComplaintDraft[]>([]);
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
    loadDrafts();
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
      <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-stone-900">{t.myDraftsTitle}</h2>
            <p className="text-xs text-stone-500 mt-0.5">{t.draftsDisclaimer}</p>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
            <Shield className="w-3.5 h-3.5" />
            <span>Private & Stored on Your Device Only</span>
          </div>
        </div>
      </div>

      {drafts.length === 0 ? (
        <div className="bg-white p-12 rounded-2xl border border-stone-200 shadow-2xs text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-stone-100 text-stone-400 mx-auto flex items-center justify-center">
            <FileText className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-bold text-stone-800">{t.noDraftsMessage}</h3>
          <p className="text-xs text-stone-500 max-w-md mx-auto">
            When you create or save a complaint draft in the Complaint Builder, it will be saved here securely in your browser storage.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {drafts.map((draft) => (
            <div
              key={draft.id}
              onClick={() => onEditDraft(draft)}
              className="p-5 rounded-2xl bg-white border border-stone-200 hover:border-emerald-500 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group space-y-4"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                    {draft.platform || 'General'}
                  </span>
                  <div className="flex items-center gap-1 text-[11px] text-stone-400">
                    <Clock className="w-3 h-3" />
                    <span>
                      {new Date(draft.updatedAt || draft.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <h3 className="text-sm font-bold text-stone-900 line-clamp-2 group-hover:text-emerald-800 transition-colors">
                  {draft.subject}
                </h3>

                <p className="text-xs text-stone-600 line-clamp-3 mt-2 font-mono bg-stone-50 p-2 rounded-lg border border-stone-100">
                  {draft.complaintBody}
                </p>
              </div>

              <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                <span className="text-[11px] font-semibold text-emerald-700 flex items-center gap-1">
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Click to Edit & Review</span>
                </span>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={(e) => handleCopy(draft, e)}
                    className="p-2 rounded-lg bg-stone-100 hover:bg-emerald-50 hover:text-emerald-800 text-stone-600 transition-colors"
                    title={t.copyBtn}
                  >
                    {copiedId === draft.id ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={(e) => handleDelete(draft.id, e)}
                    className="p-2 rounded-lg bg-stone-100 hover:bg-red-50 hover:text-red-700 text-stone-600 transition-colors"
                    title={t.deleteDraftBtn}
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
