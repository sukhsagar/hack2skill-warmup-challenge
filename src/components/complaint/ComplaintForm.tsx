'use client';

import React from 'react';
import { ComplaintFormData, Language, ProblemCategory } from '@/types';
import { translations } from '@/lib/i18n';
import { RotateCcw, Sparkles } from 'lucide-react';
import { PresetScenarios } from './PresetScenarios';

interface ComplaintFormProps {
  formData: ComplaintFormData;
  setFormData: React.Dispatch<React.SetStateAction<ComplaintFormData>>;
  loading: boolean;
  onSubmit: () => void;
  onSelectScenario: (scenario: 'payout' | 'penalty' | 'suspension') => void;
  language: Language;
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

export function ComplaintForm({
  formData,
  setFormData,
  loading,
  onSubmit,
  onSelectScenario,
  language,
}: ComplaintFormProps) {
  const t = translations[language];

  return (
    <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#E5E4DD] shadow-xs space-y-6">
      {/* Quick Demo Scenarios */}
      <PresetScenarios onSelectScenario={onSelectScenario} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Category */}
        <div>
          <label htmlFor="complaint-category" className="block text-xs font-bold text-secondary uppercase tracking-wide mb-1.5">
            {t.categoryLabel} *
          </label>
          <select
            id="complaint-category"
            aria-required="true"
            value={formData.category}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, category: e.target.value as ProblemCategory }))
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
          <label htmlFor="complaint-platform" className="block text-xs font-bold text-secondary uppercase tracking-wide mb-1.5">
            {t.platformLabel} *
          </label>
          <select
            id="complaint-platform"
            aria-required="true"
            value={formData.platform}
            onChange={(e) => setFormData((prev) => ({ ...prev, platform: e.target.value }))}
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
        <label htmlFor="complaint-description" className="block text-xs font-bold text-secondary uppercase tracking-wide mb-1.5">
          {t.incidentDescLabel} *
        </label>
        <textarea
          id="complaint-description"
          rows={4}
          aria-required="true"
          aria-describedby="desc-hint"
          value={formData.incidentDescription}
          onChange={(e) => setFormData((prev) => ({ ...prev, incidentDescription: e.target.value }))}
          placeholder={t.incidentDescPlaceholder}
          className="w-full p-3.5 text-base rounded-xl border border-[#E5E4DD] bg-[#FAF9F5] focus:bg-white focus:border-primary focus:outline-none text-on-surface placeholder:text-outline font-medium"
        />
        <p id="desc-hint" className="text-[12px] text-secondary mt-1">
          Do not include confidential passwords, bank PINs, or OTPs.
        </p>
      </div>

      {/* Optional specific fields */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label htmlFor="complaint-date" className="block text-xs font-bold text-secondary uppercase tracking-wide mb-1.5">
            {t.incidentDateLabel}
          </label>
          <input
            id="complaint-date"
            type="text"
            value={formData.incidentDate || ''}
            onChange={(e) => setFormData((prev) => ({ ...prev, incidentDate: e.target.value }))}
            placeholder="e.g. 14 Oct 2026"
            className="w-full px-3.5 py-2 text-base rounded-xl border border-[#E5E4DD] bg-[#FAF9F5] focus:bg-white focus:border-primary focus:outline-none text-on-surface font-medium"
          />
        </div>

        <div>
          <label htmlFor="complaint-amount" className="block text-xs font-bold text-secondary uppercase tracking-wide mb-1.5">
            {t.disputedAmountLabel}
          </label>
          <input
            id="complaint-amount"
            type="text"
            value={formData.disputedAmount || ''}
            onChange={(e) => setFormData((prev) => ({ ...prev, disputedAmount: e.target.value }))}
            placeholder="e.g. 1850"
            className="w-full px-3.5 py-2 text-base rounded-xl border border-[#E5E4DD] bg-[#FAF9F5] focus:bg-white focus:border-primary focus:outline-none text-on-surface font-medium"
          />
        </div>

        <div>
          <label htmlFor="complaint-worker-id" className="block text-xs font-bold text-secondary uppercase tracking-wide mb-1.5">
            {t.workerIdLabel}
          </label>
          <input
            id="complaint-worker-id"
            type="text"
            value={formData.workerIdentifier || ''}
            onChange={(e) => setFormData((prev) => ({ ...prev, workerIdentifier: e.target.value }))}
            placeholder="e.g. ZOM-8921"
            className="w-full px-3.5 py-2 text-base rounded-xl border border-[#E5E4DD] bg-[#FAF9F5] focus:bg-white focus:border-primary focus:outline-none text-on-surface font-medium"
          />
        </div>
      </div>

      {/* Desired Resolution */}
      <div>
        <label htmlFor="complaint-resolution" className="block text-xs font-bold text-secondary uppercase tracking-wide mb-1.5">
          {t.desiredResolutionLabel}
        </label>
        <input
          id="complaint-resolution"
          type="text"
          value={formData.desiredResolution || ''}
          onChange={(e) => setFormData((prev) => ({ ...prev, desiredResolution: e.target.value }))}
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
              onClick={() => setFormData((prev) => ({ ...prev, language: 'en' }))}
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
              onClick={() => setFormData((prev) => ({ ...prev, language: 'hi' }))}
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
              onClick={() => setFormData((prev) => ({ ...prev, language: 'pa' }))}
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
          onClick={onSubmit}
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
    </div>
  );
}
