'use client';

import React from 'react';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
import { Language } from '@/types';
import { translations } from '@/lib/i18n';
import { LogOut, User } from 'lucide-react';

interface HeaderProps {
  currentTab: 'rights' | 'complaint' | 'drafts' | 'voice';
  setCurrentTab: (tab: 'rights' | 'complaint' | 'drafts' | 'voice') => void;
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
    <header className="sticky top-0 z-40 bg-[#F8F7F2]/95 backdrop-blur-md border-b border-[#E5E4DD] pt-safe">
      <div className="max-w-xl sm:max-w-4xl mx-auto px-4">
        {/* Top bar row */}
        <div className="h-16 flex items-center justify-between">
          {/* Logo & Branding */}
          <div
            className="flex items-center gap-2.5 cursor-pointer select-none"
            onClick={() => setCurrentTab('rights')}
          >
            <div className="h-11 w-auto max-w-[140px] flex items-center">
              <Image
                src="/logo.png"
                alt="Awaaz - Har Mazdoor Ki Awaaz"
                width={120}
                height={40}
                className="h-9 sm:h-10 w-auto object-contain drop-shadow-2xs"
                priority
              />
            </div>
            <span className="px-2 py-0.5 rounded-full bg-primary-fixed text-[#003828] text-[11px] font-bold uppercase tracking-wider">
              Help
            </span>
          </div>

          {/* Right Action buttons */}
          <div className="flex items-center gap-2">
            <a
              className="h-10 px-3 rounded-lg bg-surface-container-lowest border border-[#E5E4DD] text-primary flex items-center gap-1.5 font-bold text-[14px] shadow-xs active:scale-95 transition-all"
              href="tel:14434"
              title="Helpline 14434"
              aria-label="Call National Labor Helpline 14434"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping mr-0.5"></span>
              14434
            </a>

            {user && (
              <div className="flex items-center gap-1.5 pl-2 border-l border-[#E5E4DD]">
                <div className="flex items-center gap-1.5">
                  {user.photoURL ? (
                    <Image
                      src={user.photoURL}
                      alt={user.displayName || 'Worker'}
                      width={32}
                      height={32}
                      className="w-8 h-8 rounded-full border border-primary/30"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-primary-light text-primary font-bold flex items-center justify-center text-xs border border-primary/30">
                      {user.displayName ? user.displayName[0].toUpperCase() : <User className="w-4 h-4" />}
                    </div>
                  )}
                </div>

                <button
                  onClick={() => signOut()}
                  className="p-1.5 text-secondary hover:text-error hover:bg-error-container/30 rounded-lg transition-colors"
                  title={t.signOut}
                  aria-label={t.signOut || "Sign out of account"}
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Language Tabs Row */}
        <div className="pb-2.5 pt-0.5">
          <div
            aria-label="Select Language"
            className="p-1 bg-[#EAE9E0] rounded-xl flex items-center gap-1"
            role="tablist"
          >
            <button
              onClick={() => setLanguage('en')}
              className={`lang-tab flex-1 py-1.5 rounded-lg text-center font-bold text-[14px] transition-all ${
                language === 'en'
                  ? 'bg-white text-primary shadow-xs ring-1 ring-black/5'
                  : 'text-secondary hover:text-on-surface font-semibold'
              }`}
              type="button"
              role="tab"
              aria-selected={language === 'en'}
            >
              English
            </button>
            <button
              onClick={() => setLanguage('hi')}
              className={`lang-tab flex-1 py-1.5 rounded-lg text-center font-semibold text-[14px] transition-all ${
                language === 'hi'
                  ? 'bg-white text-primary shadow-xs ring-1 ring-black/5'
                  : 'text-secondary hover:text-on-surface font-semibold'
              }`}
              type="button"
              role="tab"
              aria-selected={language === 'hi'}
            >
              हिंदी (Hindi)
            </button>
            <button
              onClick={() => setLanguage('pa')}
              className={`lang-tab flex-1 py-1.5 rounded-lg text-center font-semibold text-[14px] transition-all ${
                language === 'pa'
                  ? 'bg-white text-primary shadow-xs ring-1 ring-black/5'
                  : 'text-secondary hover:text-on-surface font-semibold'
              }`}
              type="button"
              role="tab"
              aria-selected={language === 'pa'}
            >
              ਪੰਜਾਬੀ (Punjabi)
            </button>
          </div>
        </div>

        {/* Feature Navigation Tabs */}
        {user && (
          <nav className="flex items-center gap-2 pt-1 border-t border-[#E5E4DD] overflow-x-auto no-scrollbar">
            <button
              onClick={() => setCurrentTab('rights')}
              className={`flex items-center gap-2 px-3.5 py-2 text-[14px] font-bold border-b-2 transition-all whitespace-nowrap ${
                currentTab === 'rights'
                  ? 'border-primary text-primary bg-primary-light/50 rounded-t-lg'
                  : 'border-transparent text-secondary hover:text-on-surface'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">balance</span>
              <span>{t.navRights}</span>
            </button>

            <button
              onClick={() => setCurrentTab('voice')}
              className={`flex items-center gap-2 px-3.5 py-2 text-[14px] font-bold border-b-2 transition-all whitespace-nowrap ${
                currentTab === 'voice'
                  ? 'border-primary text-primary bg-primary-light/50 rounded-t-lg'
                  : 'border-transparent text-secondary hover:text-on-surface'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">mic</span>
              <span>
                {language === 'hi' ? 'आवाज़ सहायक' : language === 'pa' ? 'ਅਵਾਜ਼ ਸਹਾਇਕ' : 'Voice Assistant'}
              </span>
            </button>

            <button
              onClick={() => setCurrentTab('complaint')}
              className={`flex items-center gap-2 px-3.5 py-2 text-[14px] font-bold border-b-2 transition-all whitespace-nowrap ${
                currentTab === 'complaint'
                  ? 'border-primary text-primary bg-primary-light/50 rounded-t-lg'
                  : 'border-transparent text-secondary hover:text-on-surface'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">edit_note</span>
              <span>{t.navComplaint}</span>
            </button>

            <button
              onClick={() => setCurrentTab('drafts')}
              className={`flex items-center gap-2 px-3.5 py-2 text-[14px] font-bold border-b-2 transition-all whitespace-nowrap ${
                currentTab === 'drafts'
                  ? 'border-primary text-primary bg-primary-light/50 rounded-t-lg'
                  : 'border-transparent text-secondary hover:text-on-surface'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">description</span>
              <span>{t.navDrafts}</span>
              {draftsCount > 0 && (
                <span className="px-1.5 py-0.2 rounded-full text-[11px] font-bold bg-primary-fixed text-[#003828]">
                  {draftsCount}
                </span>
              )}
            </button>

            <a
              href="/community-help"
              className="flex items-center gap-2 px-3.5 py-2 text-[14px] font-bold border-b-2 border-transparent text-secondary hover:text-primary transition-all whitespace-nowrap"
            >
              <span className="material-symbols-outlined text-[18px]">handshake</span>
              <span>Community Help</span>
            </a>
          </nav>
        )}
      </div>
    </header>
  );
}
