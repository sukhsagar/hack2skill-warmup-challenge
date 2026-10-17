'use client';

import React from 'react';
import { Language } from '@/types';
import { communityI18n } from './i18n';
import { PhoneCall, AlertTriangle, ShieldAlert } from 'lucide-react';

interface EmergencyBannerProps {
  language: Language;
}

export function EmergencyBanner({ language }: EmergencyBannerProps) {
  const t = communityI18n[language] || communityI18n.en;

  return (
    <div className="rounded-2xl bg-amber-500/10 border-2 border-amber-500/30 p-4 sm:p-5 shadow-xs">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm sm:text-base font-bold text-[#111A15]">
                {t.emergencyHeading}
              </h3>
              <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-200 text-amber-900">
                <ShieldAlert className="w-3 h-3" />
                Emergency Hotline
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#4A554E] mt-1 max-w-2xl font-medium">
              {t.emergencyNotice}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 w-full sm:w-auto shrink-0">
          <a
            href="tel:108"
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-colors shadow-xs"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>108 / 102</span>
          </a>
          <a
            href="tel:112"
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#111A15] hover:bg-[#313C35] text-white text-xs font-bold transition-colors shadow-xs"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>112 Emergency</span>
          </a>
        </div>
      </div>
    </div>
  );
}
