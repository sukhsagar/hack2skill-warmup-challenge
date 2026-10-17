'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { Language } from '@/types';
import { getPersistenceStatus, loadUserRequests } from './storage';
import { communityI18n } from './i18n';
import { LegalHelpForm } from './legal-help-form';
import { MedicalAidForm } from './medical-aid-form';
import { RequestList } from './request-list';
import { SafetyNotice } from './safety-notice';
import {
  Scale,
  HeartPulse,
  ListTodo,
  ShieldCheck,
  ArrowLeft,
  HardDrive,
  CloudOff,
  User,
  Globe2,
} from 'lucide-react';

export function CommunityHelpPage() {
  const { user } = useAuth();
  const [language, setLanguage] = useState<Language>('en');
  const [activeTab, setActiveTab] = useState<'legal' | 'medical' | 'requests' | 'safety'>('legal');
  const [requestCount, setRequestCount] = useState<number>(() => {
    if (typeof window === 'undefined') return 0;
    return loadUserRequests(user?.uid).length;
  });

  const t = communityI18n[language] || communityI18n.en;
  const persistenceStatus = getPersistenceStatus();

  // Sync request count
  const syncCount = React.useCallback(() => {
    const list = loadUserRequests(user?.uid);
    setRequestCount(list.length);
  }, [user?.uid]);

  useEffect(() => {
    const timer = setTimeout(() => {
      syncCount();
    }, 0);
    return () => clearTimeout(timer);
  }, [syncCount]);

  const handleRequestSubmitted = () => {
    syncCount();
    // Switch to requests list to show the newly saved item
    setActiveTab('requests');
  };

  return (
    <div className="min-h-screen bg-[#F8F7F2] text-[#111A15] flex flex-col justify-between pb-24">
      <div>
        {/* Top Header / App Bar */}
        <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E5E4DD]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-3">
            {/* Left: Back Link & Logo */}
            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="p-2 -ml-2 rounded-xl text-secondary hover:text-on-surface hover:bg-[#FAF9F5] border border-transparent hover:border-[#E5E4DD] transition-all flex items-center gap-1.5 text-xs font-bold"
                title="Return to Main Awaaz Dashboard"
              >
                <ArrowLeft className="w-4 h-4 text-primary" />
                <span className="hidden sm:inline">Back to Dashboard</span>
              </Link>
              <div className="h-5 w-px bg-[#E5E4DD] hidden sm:block" />
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-white border border-[#E5E4DD] flex items-center justify-center overflow-hidden p-0.5 shadow-2xs">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/logo.png" alt="Awaaz" className="w-full h-full object-contain" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-base sm:text-lg font-extrabold text-on-surface tracking-tight">
                      {t.pageTitle}
                    </h1>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-primary-light text-primary border border-primary/20">
                      Awaaz Community
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Language Selector & User Badge */}
            <div className="flex items-center gap-2">
              {/* Language Selector */}
              <div className="flex items-center gap-1 bg-[#FAF9F5] p-1 rounded-xl border border-[#E5E4DD]">
                <Globe2 className="w-3.5 h-3.5 text-secondary ml-1.5 hidden sm:block" />
                {(['en', 'hi', 'pa'] as const).map((lang) => (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => setLanguage(lang)}
                    className={`px-2 py-1 rounded-lg text-xs font-bold transition-all ${
                      language === lang
                        ? 'bg-primary text-white shadow-xs'
                        : 'text-secondary hover:text-on-surface'
                    }`}
                  >
                    {lang === 'en' ? 'EN' : lang === 'hi' ? 'हि' : 'ਪੰ'}
                  </button>
                ))}
              </div>

              {/* User Avatar / Status */}
              <div className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-secondary bg-[#FAF9F5] px-3 py-1.5 rounded-xl border border-[#E5E4DD]">
                <User className="w-3.5 h-3.5 text-primary" />
                <span className="max-w-[120px] truncate">
                  {user ? user.displayName || 'Worker' : 'Guest Mode'}
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-6">
          {/* Transparent Storage Architecture Banner */}
          <div className="bg-white rounded-2xl border border-[#E5E4DD] p-3.5 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs shadow-xs">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-stone-100 text-stone-700 flex items-center justify-center shrink-0">
                <HardDrive className="w-4 h-4 text-primary" />
              </div>
              <div>
                <div className="font-bold text-on-surface flex items-center gap-2">
                  <span>Architecture Transparency:</span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.2 rounded-full text-[10px] font-bold bg-primary-light text-primary border border-primary/20">
                    {t.localStorageActiveBadge}
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.2 rounded-full text-[10px] font-bold bg-stone-100 text-stone-600 border border-stone-200">
                    <CloudOff className="w-3 h-3" />
                    {t.cloudNotConnectedBadge}
                  </span>
                </div>
                <p className="text-secondary text-[11px] mt-0.5 font-medium">
                  {persistenceStatus.statusMessage}
                </p>
              </div>
            </div>
          </div>

          {/* Feature Navigation Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            <button
              type="button"
              onClick={() => setActiveTab('legal')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all shrink-0 ${
                activeTab === 'legal'
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-white text-secondary hover:text-on-surface border border-[#E5E4DD]'
              }`}
            >
              <Scale className="w-4 h-4" />
              <span>{t.tabLegal}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('medical')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all shrink-0 ${
                activeTab === 'medical'
                  ? 'bg-red-600 text-white shadow-md'
                  : 'bg-white text-secondary hover:text-on-surface border border-[#E5E4DD]'
              }`}
            >
              <HeartPulse className="w-4 h-4" />
              <span>{t.tabMedical}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                syncCount();
                setActiveTab('requests');
              }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all shrink-0 relative ${
                activeTab === 'requests'
                  ? 'bg-[#111A15] text-white shadow-md'
                  : 'bg-white text-secondary hover:text-on-surface border border-[#E5E4DD]'
              }`}
            >
              <ListTodo className="w-4 h-4" />
              <span>{t.tabRequests}</span>
              {requestCount > 0 && (
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                    activeTab === 'requests'
                      ? 'bg-white text-[#111A15]'
                      : 'bg-primary text-white'
                  }`}
                >
                  {requestCount}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('safety')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all shrink-0 ${
                activeTab === 'safety'
                  ? 'bg-amber-600 text-white shadow-md'
                  : 'bg-white text-secondary hover:text-on-surface border border-[#E5E4DD]'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{t.tabSafety}</span>
            </button>
          </div>

          {/* Tab Views */}
          {activeTab === 'legal' && (
            <LegalHelpForm
              language={language}
              userId={user?.uid}
              onRequestSubmitted={handleRequestSubmitted}
            />
          )}

          {activeTab === 'medical' && (
            <MedicalAidForm
              language={language}
              userId={user?.uid}
              onRequestSubmitted={handleRequestSubmitted}
            />
          )}

          {activeTab === 'requests' && (
            <RequestList
              language={language}
              userId={user?.uid}
              onNavigateToForm={(type) => setActiveTab(type)}
            />
          )}

          {activeTab === 'safety' && <SafetyNotice language={language} />}
        </main>
      </div>

      {/* Mobile Sticky Tab Navigation Bar */}
      <nav className="fixed bottom-0 w-full z-50 pb-safe bg-white border-t border-[#E5E4DD] shadow-lg sm:hidden">
        <div className="flex justify-around items-center h-16 max-w-xl mx-auto px-2">
          <button
            type="button"
            onClick={() => setActiveTab('legal')}
            className={`flex-1 flex flex-col items-center justify-center h-full transition-all ${
              activeTab === 'legal' ? 'text-primary font-bold' : 'text-secondary font-medium'
            }`}
          >
            <Scale className="w-5 h-5" />
            <span className="text-[11px] mt-0.5">Legal</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('medical')}
            className={`flex-1 flex flex-col items-center justify-center h-full transition-all ${
              activeTab === 'medical' ? 'text-red-600 font-bold' : 'text-secondary font-medium'
            }`}
          >
            <HeartPulse className="w-5 h-5" />
            <span className="text-[11px] mt-0.5">Medical</span>
          </button>
          <button
            type="button"
            onClick={() => {
              syncCount();
              setActiveTab('requests');
            }}
            className={`flex-1 flex flex-col items-center justify-center h-full transition-all relative ${
              activeTab === 'requests' ? 'text-[#111A15] font-bold' : 'text-secondary font-medium'
            }`}
          >
            <ListTodo className="w-5 h-5" />
            <span className="text-[11px] mt-0.5">Requests</span>
            {requestCount > 0 && (
              <span className="absolute top-2 right-6 px-1.5 py-0.2 text-[9px] rounded-full bg-primary text-white font-bold">
                {requestCount}
              </span>
            )}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('safety')}
            className={`flex-1 flex flex-col items-center justify-center h-full transition-all ${
              activeTab === 'safety' ? 'text-amber-600 font-bold' : 'text-secondary font-medium'
            }`}
          >
            <ShieldCheck className="w-5 h-5" />
            <span className="text-[11px] mt-0.5">Safety</span>
          </button>
        </div>
      </nav>

      {/* Footer */}
      <footer className="w-full border-t border-[#E5E4DD] bg-white py-6 px-4 text-center text-xs text-secondary mt-12 hidden sm:block">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span className="font-bold text-on-surface">Awaaz — Har Mazdoor Ki Awaaz</span>
          <span className="text-[12px] text-secondary">
            Community Help Module • Peer Solidarity for Gig & Platform Workers
          </span>
        </div>
      </footer>
    </div>
  );
}
