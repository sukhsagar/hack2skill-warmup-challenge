'use client';

import React, { useState } from 'react';
import { Language, ProblemCategory, RightsResponse } from '@/types';
import { translations } from '@/lib/i18n';
import {
  BookOpen,
  Scale,
  CheckCircle2,
  ListOrdered,
  FileCheck2,
  HelpCircle,
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
      <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs">
        <h3 className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-3">
          Select Topic or Problem Category
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {categories.map(({ key, icon: Icon }) => (
            <button
              key={key}
              type="button"
              onClick={() => setSelectedCategory(key)}
              className={`p-3 rounded-xl border text-left flex flex-col gap-1.5 transition-all text-xs font-semibold ${
                selectedCategory === key
                  ? 'border-emerald-600 bg-emerald-50 text-emerald-900 shadow-2xs'
                  : 'border-stone-200 hover:border-stone-300 bg-white text-stone-700'
              }`}
            >
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                  selectedCategory === key
                    ? 'bg-emerald-600 text-white'
                    : 'bg-stone-100 text-stone-600'
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
      <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-2xs space-y-4">
        <div>
          <h2 className="text-lg font-bold text-stone-900">{t.rightsHeading}</h2>
          <p className="text-xs text-stone-500 mt-0.5">{t.rightsSubtitle}</p>
        </div>

        <div className="relative">
          <textarea
            rows={3}
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder={t.rightsInputPlaceholder}
            className="w-full p-3.5 text-sm rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-stone-800 placeholder:text-stone-400"
          />
        </div>

        {/* Suggested Quick Questions */}
        <div>
          <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block mb-2">
            Suggested Questions:
          </span>
          <div className="flex flex-wrap gap-2">
            {t.suggestedQuestions.map((sq, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectSuggested(sq)}
                className="text-xs px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-emerald-50 hover:text-emerald-800 border border-stone-200 text-stone-700 transition-colors text-left"
              >
                {sq}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <span className="text-xs text-stone-400">
            Powered by Gemini • Confidential & Local
          </span>
          <button
            type="button"
            disabled={loading || !question.trim()}
            onClick={() => handleAsk()}
            className="px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-sm shadow-xs flex items-center gap-2 transition-all disabled:opacity-50"
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
          <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center justify-between">
            <span>{error}</span>
            <button
              onClick={() => handleAsk()}
              className="font-bold underline ml-2 hover:text-red-900"
            >
              Retry
            </button>
          </div>
        )}
      </div>

      {/* Response Card */}
      {response && (
        <div className="bg-white rounded-2xl border border-emerald-200/80 shadow-sm p-6 space-y-6">
          {response.isSampleResponse && (
            <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0" />
              <span>
                Demonstration Reference Template (Configure <code>GEMINI_API_KEY</code> in <code>.env.local</code> for live generative AI responses).
              </span>
            </div>
          )}

          {/* Plain Explanation */}
          <div>
            <div className="flex items-center gap-2 text-stone-900 font-bold text-base mb-2">
              <BookOpen className="w-5 h-5 text-emerald-700" />
              <span>{t.explanationTitle}</span>
            </div>
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/70 text-sm text-stone-800 leading-relaxed">
              {response.plainExplanation}
            </div>
          </div>

          {/* Protections & Frameworks */}
          {response.relevantProtections?.length > 0 && (
            <div>
              <div className="flex items-center gap-2 text-stone-900 font-bold text-base mb-2">
                <Scale className="w-5 h-5 text-emerald-700" />
                <span>{t.protectionsTitle}</span>
              </div>
              <ul className="space-y-2">
                {response.relevantProtections.map((p, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 text-xs sm:text-sm text-stone-700 p-2.5 rounded-lg bg-emerald-50/50 border border-emerald-100"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Practical Next Steps */}
          {response.practicalNextSteps?.length > 0 && (
            <div>
              <div className="flex items-center gap-2 text-stone-900 font-bold text-base mb-2">
                <ListOrdered className="w-5 h-5 text-emerald-700" />
                <span>{t.nextStepsTitle}</span>
              </div>
              <div className="space-y-2">
                {response.practicalNextSteps.map((step, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3 rounded-xl bg-white border border-stone-200 text-xs sm:text-sm text-stone-800 shadow-2xs"
                  >
                    <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
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
              <div className="flex items-center gap-2 text-stone-900 font-bold text-base mb-2">
                <FileCheck2 className="w-5 h-5 text-emerald-700" />
                <span>{t.evidenceTitle}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {response.documentsToCollect.map((doc, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 p-2.5 rounded-lg bg-stone-50 border border-stone-200 text-xs text-stone-700"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0" />
                    <span>{doc}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Clarifying Questions if any */}
          {response.clarifyingQuestions && response.clarifyingQuestions.length > 0 && (
            <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200">
              <div className="flex items-center gap-2 text-amber-900 font-semibold text-xs mb-1">
                <HelpCircle className="w-4 h-4 text-amber-700" />
                <span>{t.clarificationsTitle}</span>
              </div>
              <ul className="list-disc list-inside text-xs text-amber-800 space-y-1">
                {response.clarifyingQuestions.map((cq, idx) => (
                  <li key={idx}>{cq}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Official Resources & Helplines */}
          {response.verifiedResources && response.verifiedResources.length > 0 && (
            <div>
              <div className="flex items-center gap-2 text-stone-900 font-bold text-base mb-2">
                <ExternalLink className="w-5 h-5 text-emerald-700" />
                <span>{t.officialResourcesTitle}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {response.verifiedResources.map((res, idx) => (
                  <a
                    key={idx}
                    href={res.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl border border-stone-200 hover:border-emerald-500 hover:bg-emerald-50/20 transition-all text-left flex flex-col justify-between group"
                  >
                    <div>
                      <div className="text-xs font-bold text-stone-900 group-hover:text-emerald-800 flex items-center justify-between">
                        <span>{res.name}</span>
                        <ExternalLink className="w-3.5 h-3.5 text-stone-400 group-hover:text-emerald-700" />
                      </div>
                      <p className="text-[11px] text-stone-500 mt-1 line-clamp-2">
                        {res.description}
                      </p>
                    </div>
                    {res.helpline && (
                      <div className="mt-2 pt-2 border-t border-stone-100 flex items-center gap-1.5 text-[11px] font-semibold text-emerald-800">
                        <PhoneCall className="w-3 h-3 text-emerald-600" />
                        <span>Helpline: {res.helpline}</span>
                      </div>
                    )}
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Action to Turn Into Formal Complaint */}
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div>
              <h4 className="text-sm font-bold text-emerald-950">
                Ready to take action on this issue?
              </h4>
              <p className="text-xs text-emerald-800">
                Turn this guidance into a professional grievance letter addressed to the platform&apos;s Grievance Redressal Officer.
              </p>
            </div>
            <button
              onClick={() => onDraftComplaintFromIssue(question, selectedCategory)}
              className="px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs shadow-xs flex items-center gap-2 shrink-0 transition-all"
            >
              <span>{t.turnIntoComplaintBtn}</span>
            </button>
          </div>

          {/* Legal Disclaimer */}
          <div className="pt-3 border-t border-stone-100 text-[11px] text-stone-500 leading-relaxed">
            <span className="font-semibold text-stone-700">{t.legalDisclaimerTitle}: </span>
            {response.disclaimer || t.legalDisclaimerText}
          </div>
        </div>
      )}
    </div>
  );
}
