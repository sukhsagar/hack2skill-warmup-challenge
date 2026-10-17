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
            <div className="relative w-12 h-12 rounded-2xl bg-white overflow-hidden flex items-center justify-center shadow-xs border border-[#DDE5DD] shrink-0 p-1">
              <Image
                src="/logo.png"
                alt="Awaaz Logo"
                width={44}
                height={44}
                priority
                className="w-full h-full object-contain"
                onError={(e) => {
                  // Fallback to text if image fails to load
                  const target = e.currentTarget;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent) {
                    parent.innerHTML = `<span class="text-[#0B3328] font-extrabold text-2xl">आ</span>`;
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
            {!user || user.isDemoUser ? (
              <button
                type="button"
                onClick={onOpenProfile}
                className="h-11 px-3.5 rounded-xl bg-white hover:bg-stone-50 border border-[#DDE5DD] hover:border-[#0B3328] text-[#17251F] flex items-center gap-2 text-xs font-bold transition-all shadow-xs active:scale-95"
                aria-label="Sign in or Sign up with Google"
              >
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
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
                <span>{user?.isDemoUser ? 'Demo' : 'Sign In'}</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={onOpenProfile}
                className="h-11 px-3 rounded-xl bg-white border border-[#DDE5DD] hover:border-[#0B3328] text-[#17251F] flex items-center gap-2 text-xs font-bold transition-all shadow-xs active:scale-95"
                aria-label="Open User Profile"
              >
                {user.photoURL ? (
                  <Image
                    src={user.photoURL}
                    alt={user.displayName || 'Worker'}
                    width={24}
                    height={24}
                    className="w-6 h-6 rounded-full border border-[#DDE5DD] object-cover shrink-0"
                  />
                ) : (
                  <div className="w-6 h-6 rounded-full bg-[#EBF7EB] text-[#0B3328] flex items-center justify-center font-bold text-xs shrink-0">
                    <UserCheck className="w-3.5 h-3.5" />
                  </div>
                )}
                <span className="hidden md:inline max-w-[90px] truncate">
                  {user.displayName?.split(' ')[0] || 'Worker'}
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
