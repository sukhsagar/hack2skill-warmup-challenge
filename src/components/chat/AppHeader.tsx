'use client';

import React from 'react';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
import { Language } from '@/types';
import { PhoneCall, UserCheck, Shield } from 'lucide-react';

interface AppHeaderProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  onOpenProfile: () => void;
}

export function AppHeader({
  language,
  setLanguage,
  onOpenProfile,
}: AppHeaderProps) {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-40 bg-[#F7F8F3]/95 backdrop-blur-md border-b border-[#DDE5DD] pt-safe transition-all">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="h-18 flex items-center justify-between gap-3">
          {/* Logo & Brand Identity */}
          <div className="flex items-center gap-3 select-none">
            <div className="relative w-12 h-12 rounded-2xl bg-[#0B3328] overflow-hidden flex items-center justify-center shadow-xs border border-[#0B3328]/10 shrink-0">
              <Image
                src="/logo.png"
                alt="Awaaz Logo"
                width={48}
                height={48}
                priority
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback to text if image fails to load
                  const target = e.currentTarget;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent) {
                    parent.innerHTML = `<span class="text-white font-extrabold text-2xl">आ</span>`;
                  }
                }}
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[22px] font-extrabold text-[#17251F] tracking-tight leading-none lowercase">
                  awaaz
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#B8EF43] text-[#0B3328] text-[11px] font-extrabold uppercase tracking-wider">
                  Companion
                </span>
              </div>
              <span className="text-[13px] font-semibold text-[#64736A] block mt-0.5">
                Har Mazdoor Ki Awaaz
              </span>
            </div>
          </div>

          {/* Right Action Cluster */}
          <div className="flex items-center gap-2">
            {/* Quick Emergency/Govt Helpline Call Button */}
            <a
              href="tel:14434"
              className="hidden sm:inline-flex items-center gap-1.5 h-11 px-3.5 rounded-xl bg-white border border-[#DDE5DD] hover:border-[#0B3328] text-[#0B3328] text-xs font-bold transition-all shadow-xs active:scale-95"
              title="National e-Shram Helpline"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#0B3328]" />
              <span>14434 Helpline</span>
            </a>

            {/* Language Switcher */}
            <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-[#DDE5DD] shadow-xs">
              {(['en', 'hi', 'pa'] as const).map((lang) => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => setLanguage(lang)}
                  className={`h-9 px-2.5 rounded-lg text-xs font-bold transition-all ${
                    language === lang
                      ? 'bg-[#0B3328] text-white shadow-xs'
                      : 'text-[#64736A] hover:text-[#17251F]'
                  }`}
                  aria-label={`Switch language to ${lang}`}
                >
                  {lang === 'en' ? 'EN' : lang === 'hi' ? 'हि' : 'ਪੰ'}
                </button>
              ))}
            </div>

            {/* User Profile / Status Button */}
            <button
              type="button"
              onClick={onOpenProfile}
              className="h-11 px-3 rounded-xl bg-white border border-[#DDE5DD] hover:border-[#0B3328] text-[#17251F] flex items-center gap-2 text-xs font-bold transition-all shadow-xs active:scale-95"
              aria-label="Open User Profile"
            >
              <div className="w-6 h-6 rounded-full bg-[#EBF7EB] text-[#0B3328] flex items-center justify-center font-bold text-xs">
                {user ? (
                  <UserCheck className="w-3.5 h-3.5" />
                ) : (
                  <Shield className="w-3.5 h-3.5" />
                )}
              </div>
              <span className="hidden md:inline max-w-[90px] truncate">
                {user ? user.displayName?.split(' ')[0] || 'Worker' : 'Guest'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
