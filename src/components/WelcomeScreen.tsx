'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Language, ProblemCategory } from '@/types';
import { translations } from '@/lib/i18n';
import {
  Megaphone,
  Scale,
  FileCheck,
  ArrowRight,
  Clock,
  AlertTriangle,
  Award,
  UserX,
  HeartPulse,
  Landmark,
  Languages,
  CheckCircle2,
} from 'lucide-react';

interface WelcomeScreenProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  onPreFillProblem?: (desc: string, cat: ProblemCategory) => void;
}

interface CategoryOption {
  key: ProblemCategory;
  icon: React.ComponentType<{ className?: string }>;
}

export function WelcomeScreen({
  language,
  setLanguage,
  onPreFillProblem,
}: WelcomeScreenProps) {
  const { signInWithGoogle, signInAsDemo, loading, error } = useAuth();
  const [userQuery, setUserQuery] = useState('');
  const t = translations[language];

  const handleStart = (category: ProblemCategory = 'delayed_wages') => {
    if (onPreFillProblem && userQuery.trim()) {
      onPreFillProblem(userQuery, category);
    }
    signInAsDemo();
  };

  const categories: CategoryOption[] = [
    { key: 'delayed_wages', icon: Clock },
    { key: 'unfair_deductions', icon: AlertTriangle },
    { key: 'missing_incentives', icon: Award },
    { key: 'account_suspension', icon: UserX },
    { key: 'workplace_safety', icon: HeartPulse },
    { key: 'welfare_schemes', icon: Landmark },
  ];

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col justify-between">
      {/* Top Bar with Language Selector */}
      <div className="w-full border-b border-stone-200 bg-white/80 backdrop-blur-sm px-4 py-3 sm:px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-700 flex items-center justify-center text-white shadow-xs">
              <Megaphone className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-lg text-stone-900 tracking-tight">{t.appName}</span>
              <span className="text-xs text-emerald-800 font-semibold ml-2 hidden sm:inline px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200">
                {t.tagline}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-stone-100 p-1 rounded-lg border border-stone-200">
            <Languages className="w-3.5 h-3.5 ml-1 text-stone-500" />
            <button
              onClick={() => setLanguage('en')}
              className={`px-2 py-0.5 text-xs font-semibold rounded ${
                language === 'en' ? 'bg-white text-emerald-800 shadow-xs' : 'text-stone-600'
              }`}
            >
              English
            </button>
            <button
              onClick={() => setLanguage('hi')}
              className={`px-2 py-0.5 text-xs font-semibold rounded ${
                language === 'hi' ? 'bg-white text-emerald-800 shadow-xs' : 'text-stone-600'
              }`}
            >
              हिंदी
            </button>
            <button
              onClick={() => setLanguage('pa')}
              className={`px-2 py-0.5 text-xs font-semibold rounded ${
                language === 'pa' ? 'bg-white text-emerald-800 shadow-xs' : 'text-stone-600'
              }`}
            >
              ਪੰਜਾਬੀ
            </button>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="max-w-5xl mx-auto px-4 py-10 sm:py-16 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold mb-6">
          <Scale className="w-3.5 h-3.5" />
          <span>{t.tagline} — Empowering Gig & Daily Wage Workers</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-stone-900 tracking-tight leading-tight max-w-3xl mx-auto">
          {t.appName} — {t.tagline}
        </h1>

        <p className="mt-3 text-lg font-medium text-emerald-800 max-w-xl mx-auto">
          {t.subTagline}
        </p>

        <p className="mt-3 text-base text-stone-600 max-w-2xl mx-auto leading-relaxed">
          {t.shortDesc}
        </p>

        {/* Authentication Box */}
        <div className="mt-8 max-w-md mx-auto bg-white p-6 rounded-2xl border border-stone-200 shadow-sm">
          <h2 className="text-sm font-semibold text-stone-700 mb-3">
            Sign in to access your rights advisor and complaint builder
          </h2>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700 text-left">
              {error}
            </div>
          )}

          <div className="space-y-3">
            <button
              type="button"
              disabled={loading}
              onClick={() => signInWithGoogle()}
              className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl bg-white border border-stone-300 hover:bg-stone-50 hover:border-stone-400 text-stone-800 font-semibold text-sm shadow-xs transition-all disabled:opacity-50"
            >
              {/* Google G SVG */}
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>{loading ? 'Signing in...' : t.signInGoogle}</span>
            </button>

            {/* Quick Demo Access Button */}
            <button
              type="button"
              disabled={loading}
              onClick={() => signInAsDemo()}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-sm shadow-xs transition-all disabled:opacity-50"
            >
              <span>{t.tryDemoMode}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <p className="mt-3 text-[11px] text-stone-500">
            Complaints and drafts are stored securely on your local device.
          </p>
        </div>

        {/* Input area for worker problem in own words */}
        <div className="mt-10 max-w-2xl mx-auto bg-white p-5 rounded-2xl border border-stone-200 shadow-sm text-left">
          <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-2">
            Describe your issue in your own words (Hindi, Punjabi or English)
          </label>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={userQuery}
              onChange={(e) => setUserQuery(e.target.value)}
              placeholder={t.rightsInputPlaceholder}
              className="flex-1 px-4 py-2.5 text-sm rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-stone-800"
            />
            <button
              onClick={() => handleStart('delayed_wages')}
              className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-semibold rounded-xl flex items-center justify-center gap-2 shrink-0 transition-all"
            >
              <span>{t.askButton}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Two Core Feature Cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          <div
            onClick={() => handleStart('welfare_schemes')}
            className="p-6 rounded-2xl bg-white border border-stone-200 hover:border-emerald-500 hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              <Scale className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-stone-900 mb-1">{t.navRights}</h3>
            <p className="text-sm text-stone-600 mb-4">{t.rightsSubtitle}</p>
            <ul className="space-y-2 text-xs text-stone-600">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>e-Shram accidental insurance & welfare schemes</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Statutory 48h grievance officer rules</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Checklist of evidence to protect your income</span>
              </li>
            </ul>
          </div>

          <div
            onClick={() => handleStart('delayed_wages')}
            className="p-6 rounded-2xl bg-white border border-stone-200 hover:border-emerald-500 hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              <FileCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-stone-900 mb-1">{t.navComplaint}</h3>
            <p className="text-sm text-stone-600 mb-4">{t.complaintSubtitle}</p>
            <ul className="space-y-2 text-xs text-stone-600">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Turn issues into formal, professional grievance letters</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Available in Hindi, Punjabi, or English</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Copy, edit, and save drafts locally</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Problem Category Shortcuts */}
        <div className="mt-12 text-left">
          <h3 className="text-sm font-bold text-stone-700 uppercase tracking-wide mb-4">
            Common Gig & Labor Issues We Handle
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {categories.map(({ key, icon: Icon }) => (
              <button
                key={key}
                onClick={() => handleStart(key)}
                className="p-3.5 rounded-xl bg-white border border-stone-200 hover:border-emerald-500 hover:bg-emerald-50/30 transition-all text-left flex flex-col items-start gap-2 shadow-2xs group"
              >
                <div className="w-8 h-8 rounded-lg bg-stone-100 group-hover:bg-emerald-100 group-hover:text-emerald-800 text-stone-600 flex items-center justify-center transition-colors">
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-stone-900 leading-tight">
                    {t.categories[key]}
                  </div>
                  <div className="text-[10px] text-stone-500 line-clamp-2 mt-0.5">
                    {t.categoryDescs[key]}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full border-t border-stone-200 bg-white py-6 px-4 text-center text-xs text-stone-500">
        <p className="max-w-2xl mx-auto">
          Awaaz - Har Mazdoor Ki Awaaz. Built for the PromptWars Gig Worker Companion Challenge. It provides practical educational information and complaint drafting. Not a substitute for certified legal counsel.
        </p>
      </footer>
    </div>
  );
}
