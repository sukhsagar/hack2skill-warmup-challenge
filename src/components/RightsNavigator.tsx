'use client';

import React, { useState } from 'react';
import { Language, ProblemCategory, RightsResponse } from '@/types';
import { translations } from '@/lib/i18n';
import {
  ExternalLink,
  ShieldAlert,
  RotateCcw,
  Sparkles,
  PhoneCall,
  Clock,
  AlertTriangle,
  Award,
  UserX,
  HeartPulse,
  Landmark,
} from 'lucide-react';

interface RightsNavigatorProps {
  language: Language;
  onDraftComplaintFromIssue: (desc: string, category: ProblemCategory) => void;
  initialQuery?: string;
}

interface CategoryOption {
  key: ProblemCategory;
  icon: React.ComponentType<{ className?: string }>;
}

export function RightsNavigator({
  language,
  onDraftComplaintFromIssue,
  initialQuery = '',
}: RightsNavigatorProps) {
  const t = translations[language];
  const [selectedCategory, setSelectedCategory] = useState<ProblemCategory>('delayed_wages');
  const [question, setQuestion] = useState(initialQuery);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<RightsResponse | null>(null);

  const categories: CategoryOption[] = [
    { key: 'delayed_wages', icon: Clock },
    { key: 'unfair_deductions', icon: AlertTriangle },
    { key: 'missing_incentives', icon: Award },
    { key: 'account_suspension', icon: UserX },
    { key: 'workplace_safety', icon: HeartPulse },
    { key: 'welfare_schemes', icon: Landmark },
  ];

  const handleAsk = async (queryText = question) => {
    if (!queryText.trim()) return;
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/rights', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: queryText.trim(),
          category: selectedCategory,
          language,
        }),
      });

      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}));
        throw new Error(errJson.error || 'Failed to fetch rights guidance.');
      }

      const data: RightsResponse = await res.json();
      setResponse(data);
    } catch (err: unknown) {
      console.error('Failed to get guidance:', err);
      const e = err as Error;
      setError(e.message || 'Network error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectSuggested = (q: string) => {
    setQuestion(q);
    handleAsk(q);
  };

  return (
    <div className="space-y-6">
      {/* Category Shortcuts */}
      <div className="bg-white p-5 rounded-2xl border border-[#E5E4DD] shadow-xs">
        <h3 className="text-xs font-bold text-secondary uppercase tracking-wider mb-3">
          Select Topic or Problem Category
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {categories.map(({ key, icon: Icon }) => (
            <button
              key={key}
              type="button"
              onClick={() => setSelectedCategory(key)}
              className={`p-3 rounded-xl border text-left flex flex-col gap-1.5 transition-all text-xs font-bold ${
                selectedCategory === key
                  ? 'border-primary bg-primary-light text-primary shadow-xs'
                  : 'border-[#E5E4DD] hover:border-primary/40 bg-white text-secondary'
              }`}
            >
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                  selectedCategory === key
                    ? 'bg-primary text-white'
                    : 'bg-[#F2F1EA] text-secondary'
                }`}
              >
                <Icon className="w-4 h-4" />
              </div>
              <span className="line-clamp-2 leading-tight">{t.categories[key]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Question Input Box */}
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#E5E4DD] shadow-xs space-y-4">
        <div>
          <h2 className="text-xl font-bold text-on-surface">{t.rightsHeading}</h2>
          <p className="text-sm text-secondary mt-0.5">{t.rightsSubtitle}</p>
        </div>

        <div className="relative">
          <textarea
            rows={3}
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder={t.rightsInputPlaceholder}
            className="w-full p-3.5 text-base rounded-xl border border-[#E5E4DD] focus:border-primary bg-[#FAF9F5] focus:bg-white focus:outline-none text-on-surface placeholder:text-outline font-medium"
          />
        </div>

        {/* Suggested Quick Questions */}
        <div>
          <span className="text-xs font-bold text-secondary uppercase tracking-wider block mb-2">
            Suggested Questions:
          </span>
          <div className="flex flex-wrap gap-2">
            {t.suggestedQuestions.map((sq, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectSuggested(sq)}
                className="text-xs px-3 py-1.5 rounded-lg bg-[#F2F1EA] hover:bg-primary-light hover:text-primary border border-[#E5E4DD] text-secondary font-medium transition-colors text-left"
              >
                {sq}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <span className="text-xs text-secondary">
            Backed by Indian Labor Law & Gemini
          </span>
          <button
            type="button"
            disabled={loading || !question.trim()}
            onClick={() => handleAsk()}
            className="px-6 py-2.5 rounded-xl bg-primary hover:bg-primary-dark text-white font-bold text-sm shadow-xs flex items-center gap-2 transition-all disabled:opacity-50"
          >
            {loading ? (
              <>
                <RotateCcw className="w-4 h-4 animate-spin" />
                <span>{t.thinking}</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>{t.askButton}</span>
              </>
            )}
          </button>
        </div>

        {error && (
          <div className="p-3 bg-error-container border border-error rounded-xl text-xs text-error font-medium flex items-center justify-between">
            <span>{error}</span>
            <button
              onClick={() => handleAsk()}
              className="font-bold underline ml-2 hover:opacity-80"
            >
              Retry
            </button>
          </div>
        )}
      </div>

      {/* Response Card */}
      {response && (
        <div className="bg-white rounded-2xl border border-primary/20 shadow-sm p-6 space-y-6">
          {response.isSampleResponse && (
            <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center gap-2 font-medium">
              <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0" />
              <span>
                Demonstration Reference Guide (Active fallback model enabled).
              </span>
            </div>
          )}

          {/* Plain Explanation */}
          <div>
            <div className="flex items-center gap-2 text-on-surface font-bold text-lg mb-2">
              <span className="material-symbols-outlined text-primary text-[22px]">menu_book</span>
              <span>{t.explanationTitle}</span>
            </div>
            <div className="p-4 rounded-xl bg-[#FAF9F5] border border-[#E5E4DD] text-base text-on-surface leading-relaxed font-medium">
              {response.plainExplanation}
            </div>
          </div>

          {/* Protections & Frameworks */}
          {response.relevantProtections?.length > 0 && (
            <div>
              <div className="flex items-center gap-2 text-on-surface font-bold text-lg mb-2">
                <span className="material-symbols-outlined text-primary text-[22px]">gavel</span>
                <span>{t.protectionsTitle}</span>
              </div>
              <ul className="space-y-2">
                {response.relevantProtections.map((p, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 text-sm sm:text-base text-on-surface p-3 rounded-xl bg-primary-light/40 border border-primary/20 font-medium"
                  >
                    <span className="material-symbols-outlined text-primary text-[20px] shrink-0 mt-0.5">check_circle</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Practical Next Steps */}
          {response.practicalNextSteps?.length > 0 && (
            <div>
              <div className="flex items-center gap-2 text-on-surface font-bold text-lg mb-2">
                <span className="material-symbols-outlined text-primary text-[22px]">format_list_numbered</span>
                <span>{t.nextStepsTitle}</span>
              </div>
              <div className="space-y-2.5">
                {response.practicalNextSteps.map((step, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-[#E5E4DD] text-sm sm:text-base text-on-surface shadow-xs font-medium"
                  >
                    <div className="w-6 h-6 rounded-full bg-primary-light text-primary font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </div>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Evidence Checklist */}
          {response.documentsToCollect?.length > 0 && (
            <div>
              <div className="flex items-center gap-2 text-on-surface font-bold text-lg mb-2">
                <span className="material-symbols-outlined text-primary text-[22px]">fact_check</span>
                <span>{t.evidenceTitle}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {response.documentsToCollect.map((doc, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 p-3 rounded-xl bg-[#FAF9F5] border border-[#E5E4DD] text-sm text-secondary font-medium"
                  >
                    <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
                    <span>{doc}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Official Resources & Helplines */}
          {response.verifiedResources && response.verifiedResources.length > 0 && (
            <div>
              <div className="flex items-center gap-2 text-on-surface font-bold text-lg mb-2">
                <span className="material-symbols-outlined text-primary text-[22px]">link</span>
                <span>{t.officialResourcesTitle}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {response.verifiedResources.map((res, idx) => (
                  <a
                    key={idx}
                    href={res.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3.5 rounded-xl border border-[#E5E4DD] hover:border-primary hover:bg-primary-light/20 transition-all text-left flex flex-col justify-between group"
                  >
                    <div>
                      <div className="text-sm font-bold text-on-surface group-hover:text-primary flex items-center justify-between">
                        <span>{res.name}</span>
                        <ExternalLink className="w-3.5 h-3.5 text-secondary group-hover:text-primary" />
                      </div>
                      <p className="text-xs text-secondary mt-1 line-clamp-2">
                        {res.description}
                      </p>
                    </div>
                    {res.helpline && (
                      <div className="mt-2.5 pt-2 border-t border-[#E5E4DD] flex items-center gap-1.5 text-xs font-bold text-primary">
                        <PhoneCall className="w-3 h-3 text-primary" />
                        <span>Helpline: {res.helpline}</span>
                      </div>
                    )}
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Action to Turn Into Formal Complaint */}
          <div className="p-4 sm:p-5 rounded-2xl bg-primary-light border border-primary/30 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div>
              <h4 className="text-base font-bold text-on-surface">
                Ready to take action on this issue?
              </h4>
              <p className="text-sm text-secondary font-medium">
                Turn this guidance into a professional grievance notice addressed to the platform&apos;s Grievance Redressal Officer.
              </p>
            </div>
            <button
              onClick={() => onDraftComplaintFromIssue(question, selectedCategory)}
              className="px-5 py-3 rounded-xl bg-primary hover:bg-primary-dark text-white font-bold text-sm shadow-xs flex items-center gap-2 shrink-0 transition-all"
            >
              <span>{t.turnIntoComplaintBtn}</span>
              <span className="font-bold">→</span>
            </button>
          </div>

          {/* Legal Disclaimer */}
          <div className="pt-3 border-t border-[#E5E4DD] text-xs text-secondary leading-relaxed">
            <span className="font-bold text-on-surface">{t.legalDisclaimerTitle}: </span>
            {response.disclaimer || t.legalDisclaimerText}
          </div>
        </div>
      )}
    </div>
  );
}
