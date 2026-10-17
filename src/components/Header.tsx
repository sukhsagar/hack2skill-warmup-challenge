'use client';

import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Language } from '@/types';
import { translations } from '@/lib/i18n';
import { Megaphone, LogOut, FileText, HelpCircle, BookOpen, User, Languages } from 'lucide-react';

interface HeaderProps {
  currentTab: 'rights' | 'complaint' | 'drafts';
  setCurrentTab: (tab: 'rights' | 'complaint' | 'drafts') => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  draftsCount: number;
}

export function Header({
  currentTab,
  setCurrentTab,
  language,
  setLanguage,
  draftsCount,
}: HeaderProps) {
  const { user, signOut } = useAuth();
  const t = translations[language];

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Tagline */}
          <div
            className="flex items-center gap-3 cursor-pointer select-none"
            onClick={() => setCurrentTab('rights')}
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-700 flex items-center justify-center text-white shadow-sm">
              <Megaphone className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-stone-900 tracking-tight">
                  {t.appName}
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 font-medium border border-emerald-200">
                  {t.tagline}
                </span>
              </div>
              <p className="text-xs text-stone-500 hidden sm:block font-medium">
                {t.subTagline}
              </p>
            </div>
          </div>

          {/* Right Controls: Navigation, Language, User */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Language Switcher */}
            <div className="relative flex items-center bg-stone-100 p-0.5 rounded-lg border border-stone-200">
              <Languages className="w-3.5 h-3.5 ml-2 text-stone-500 hidden sm:inline" />
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors ${
                  language === 'en'
                    ? 'bg-white text-emerald-800 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
                title="English"
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLanguage('hi')}
                className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors ${
                  language === 'hi'
                    ? 'bg-white text-emerald-800 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
                title="हिंदी (Hindi)"
              >
                हिंदी
              </button>
              <button
                type="button"
                onClick={() => setLanguage('pa')}
                className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors ${
                  language === 'pa'
                    ? 'bg-white text-emerald-800 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
                title="ਪੰਜਾਬੀ (Punjabi)"
              >
                ਪੰਜਾਬੀ
              </button>
            </div>

            {/* Authenticated User Menu */}
            {user && (
              <div className="flex items-center gap-2 pl-2 border-l border-stone-200">
                <div className="flex items-center gap-2">
                  {user.photoURL ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={user.photoURL}
                      alt={user.displayName || 'User'}
                      className="w-8 h-8 rounded-full border border-emerald-300"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-xs border border-emerald-200">
                      {user.displayName ? user.displayName[0].toUpperCase() : <User className="w-4 h-4" />}
                    </div>
                  )}
                  <div className="hidden md:block text-left">
                    <p className="text-xs font-semibold text-stone-800 truncate max-w-[130px]">
                      {user.displayName || 'Worker Partner'}
                    </p>
                    <p className="text-[10px] text-stone-500 truncate max-w-[130px]">
                      {user.isDemoUser ? 'Demo Partner' : user.email}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => signOut()}
                  className="p-1.5 text-stone-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors ml-1"
                  title={t.signOut}
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Tabs (visible when authenticated) */}
        {user && (
          <nav className="flex items-center gap-1 sm:gap-2 pt-1 border-t border-stone-100 overflow-x-auto no-scrollbar">
            <button
              onClick={() => setCurrentTab('rights')}
              className={`flex items-center gap-2 px-4 py-2.5 text-sm font-semibold border-b-2 transition-all whitespace-nowrap ${
                currentTab === 'rights'
                  ? 'border-emerald-600 text-emerald-700 bg-emerald-50/50'
                  : 'border-transparent text-stone-600 hover:text-stone-900 hover:bg-stone-50'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>{t.navRights}</span>
            </button>

            <button
              onClick={() => setCurrentTab('complaint')}
              className={`flex items-center gap-2 px-4 py-2.5 text-sm font-semibold border-b-2 transition-all whitespace-nowrap ${
                currentTab === 'complaint'
                  ? 'border-emerald-600 text-emerald-700 bg-emerald-50/50'
                  : 'border-transparent text-stone-600 hover:text-stone-900 hover:bg-stone-50'
              }`}
            >
              <HelpCircle className="w-4 h-4" />
              <span>{t.navComplaint}</span>
            </button>

            <button
              onClick={() => setCurrentTab('drafts')}
              className={`flex items-center gap-2 px-4 py-2.5 text-sm font-semibold border-b-2 transition-all whitespace-nowrap ${
                currentTab === 'drafts'
                  ? 'border-emerald-600 text-emerald-700 bg-emerald-50/50'
                  : 'border-transparent text-stone-600 hover:text-stone-900 hover:bg-stone-50'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>{t.navDrafts}</span>
              {draftsCount > 0 && (
                <span className="ml-1 px-1.5 py-0.2 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                  {draftsCount}
                </span>
              )}
            </button>
          </nav>
        )}
      </div>
    </header>
  );
}
