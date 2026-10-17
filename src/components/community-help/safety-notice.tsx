'use client';

import React from 'react';
import { Language } from '@/types';
import { EmergencyBanner } from './emergency-banner';
import {
  ShieldAlert,
  Scale,
  HeartPulse,
  Database,
  Lock,
  PhoneCall,
  ExternalLink,
} from 'lucide-react';

interface SafetyNoticeProps {
  language: Language;
}

export function SafetyNotice({ language }: SafetyNoticeProps) {
  return (
    <div className="space-y-6">
      {/* Top emergency hotline */}
      <EmergencyBanner language={language} />

      {/* Guidelines Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Legal Aid Boundaries */}
        <div className="bg-white rounded-3xl border border-[#E5E4DD] p-6 space-y-4 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-primary-light text-primary flex items-center justify-center border border-primary/20">
              <Scale className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="text-base font-bold text-on-surface">Legal Help Boundaries</h3>
              <p className="text-xs text-secondary">Peer direction vs. Legal representation</p>
            </div>
          </div>

          <ul className="space-y-2.5 text-xs text-secondary leading-relaxed">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
              <span>
                <strong>No Attorney-Client Privilege:</strong> Submitting a help request here does
                not create a legal retainer, court appearance agreement, or formal representation.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
              <span>
                <strong>Volunteer Verification:</strong> The platform will never represent
                unverified forum accounts as licensed advocates. Formal cases require verified bar
                credentials.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
              <span>
                <strong>Never Share Passwords or OTPs:</strong> Platform support or legal volunteers
                will never ask for your delivery app password, UPI PIN, or bank OTP.
              </span>
            </li>
          </ul>

          <div className="pt-3 border-t border-[#E5E4DD] flex items-center justify-between text-[11px] text-secondary">
            <span>Official Government Helplines:</span>
            <div className="flex items-center gap-2 font-bold text-primary">
              <a href="tel:1915" className="hover:underline flex items-center gap-1">
                <PhoneCall className="w-3 h-3" /> NCH 1915
              </a>
              <span>•</span>
              <a href="tel:14434" className="hover:underline flex items-center gap-1">
                <PhoneCall className="w-3 h-3" /> e-Shram 14434
              </a>
            </div>
          </div>
        </div>

        {/* Medical Aid Boundaries */}
        <div className="bg-white rounded-3xl border border-[#E5E4DD] p-6 space-y-4 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center border border-red-200">
              <HeartPulse className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <h3 className="text-base font-bold text-on-surface">Medical Aid Scope</h3>
              <p className="text-xs text-secondary">Logistics only, not clinical treatment</p>
            </div>
          </div>

          <ul className="space-y-2.5 text-xs text-secondary leading-relaxed">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0" />
              <span>
                <strong>Awaaz is NOT an Emergency Service:</strong> We do not operate ambulances,
                emergency dispatch units, or 24/7 trauma triage desks.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0" />
              <span>
                <strong>No Medical Diagnoses:</strong> Helpers provide practical logistical assistance
                (e.g., insurance claim paperwork, hospital direction, heat hydration camps), not medical
                treatment or prescriptions.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0" />
              <span>
                <strong>Keep Personal Health Private:</strong> Do not upload full pathology reports,
                prescriptions, or patient hospital badges to public request summaries.
              </span>
            </li>
          </ul>

          <div className="pt-3 border-t border-[#E5E4DD] flex items-center justify-between text-[11px] text-secondary">
            <span>Emergency Services:</span>
            <div className="flex items-center gap-2 font-bold text-red-600">
              <a href="tel:108" className="hover:underline flex items-center gap-1">
                <PhoneCall className="w-3 h-3" /> Ambulance 108
              </a>
              <span>•</span>
              <a href="tel:112" className="hover:underline flex items-center gap-1">
                <PhoneCall className="w-3 h-3" /> Police 112
              </a>
            </div>
          </div>
        </div>

        {/* Honest Architecture & Data Privacy */}
        <div className="bg-white rounded-3xl border border-[#E5E4DD] p-6 space-y-4 shadow-xs md:col-span-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-stone-100 text-stone-700 flex items-center justify-center border border-[#E5E4DD]">
              <Database className="w-5 h-5 text-stone-700" />
            </div>
            <div>
              <h3 className="text-base font-bold text-on-surface">Data Architecture & Privacy Model</h3>
              <p className="text-xs text-secondary">Transparent disclosure regarding backend persistence</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-secondary">
            <div className="p-4 rounded-2xl bg-[#FAF9F5] border border-[#E5E4DD] space-y-1.5">
              <div className="flex items-center gap-1.5 font-bold text-on-surface">
                <Lock className="w-4 h-4 text-primary" />
                <span>Device Isolation</span>
              </div>
              <p className="leading-relaxed">
                Requests are currently persisted directly in your browser’s localStorage. They are not
                beamed to unverified third-party databases.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF9F5] border border-[#E5E4DD] space-y-1.5">
              <div className="flex items-center gap-1.5 font-bold text-on-surface">
                <ShieldAlert className="w-4 h-4 text-amber-600" />
                <span>Cloud Sync Status</span>
              </div>
              <p className="leading-relaxed">
                Shared cloud broadcast (Firestore) is intentionally offline until production role-based
                access rules and certified advocate vetting workflows are active.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF9F5] border border-[#E5E4DD] space-y-1.5">
              <div className="flex items-center gap-1.5 font-bold text-on-surface">
                <ExternalLink className="w-4 h-4 text-blue-600" />
                <span>Sanitized Public Feeds</span>
              </div>
              <p className="leading-relaxed">
                When feeds are rendered, full telephone numbers, exact addresses, and sensitive legal
                texts are never displayed publicly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
