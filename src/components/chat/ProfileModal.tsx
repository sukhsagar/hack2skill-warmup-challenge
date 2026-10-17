'use client';

import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Language, WorkerOnboardingProfile } from '@/types';
import {
  User,
  PhoneCall,
  LogOut,
  Truck,
  X,
} from 'lucide-react';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  workerProfile: WorkerOnboardingProfile | null;
  onEditProfile: () => void;
}

export function ProfileModal({
  isOpen,
  onClose,
  language,
  setLanguage,
  workerProfile,
  onEditProfile,
}: ProfileModalProps) {
  const { user, signOut, signInAsDemo } = useAuth();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#17251F]/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-lg rounded-3xl border border-[#DDE5DD] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-[#DDE5DD] flex items-center justify-between bg-[#F7F8F3]">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-[#0B3328] text-[#B8EF43] flex items-center justify-center font-bold text-lg shadow-xs">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-[#17251F]">
                {user ? user.displayName || 'Worker Partner' : 'Guest Partner'}
              </h3>
              <span className="text-xs text-[#64736A] font-semibold">
                {user?.isDemoUser ? 'Demo Evaluation Account' : user?.email || 'Local Device Session'}
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close Profile"
            className="w-10 h-10 rounded-xl bg-white hover:bg-stone-100 border border-[#DDE5DD] flex items-center justify-center text-[#64736A] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-6 overflow-y-auto">
          {/* Worker Context Card */}
          <div className="p-4 rounded-2xl bg-[#F7F8F3] border border-[#DDE5DD] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-[#0B3328] uppercase tracking-wider flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-[#0B3328]" />
                <span>Work Profile Context</span>
              </span>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onEditProfile();
                }}
                className="text-xs font-bold text-[#0B3328] underline hover:text-[#07221B]"
              >
                {workerProfile ? 'Edit Profile' : 'Set Profile'}
              </button>
            </div>

            {workerProfile ? (
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-xl bg-white border border-[#DDE5DD]">
                  <span className="text-[#64736A] block text-[11px]">Primary Platform:</span>
                  <span className="font-bold text-[#17251F] capitalize">
                    {workerProfile.primaryPlatform || 'Swiggy / Zomato'}
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-[#DDE5DD]">
                  <span className="text-[#64736A] block text-[11px]">Operating City:</span>
                  <span className="font-bold text-[#17251F]">{workerProfile.city || 'Bengaluru'}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-[#DDE5DD]">
                  <span className="text-[#64736A] block text-[11px]">Delivery Vehicle:</span>
                  <span className="font-bold text-[#17251F]">
                    {workerProfile.hasVehicle ? 'Two-Wheeler' : 'None / Cycle'}
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-[#DDE5DD]">
                  <span className="text-[#64736A] block text-[11px]">e-Shram Registered:</span>
                  <span className="font-bold text-[#17251F]">
                    {workerProfile.registeredOnEShram ? 'Yes' : 'Pending'}
                  </span>
                </div>
              </div>
            ) : (
              <p className="text-xs text-[#64736A] leading-relaxed">
                Add your operating platform and city to receive customized legal reasoning.
              </p>
            )}
          </div>

          {/* Language Selection */}
          <div className="space-y-2">
            <label className="block text-xs font-extrabold text-[#17251F] uppercase tracking-wider">
              Preferred Language
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'en' as Language, label: 'English' },
                { id: 'hi' as Language, label: 'हिंदी (Hindi)' },
                { id: 'pa' as Language, label: 'ਪੰਜਾਬੀ (Punjabi)' },
              ].map((lang) => (
                <button
                  key={lang.id}
                  type="button"
                  onClick={() => setLanguage(lang.id)}
                  className={`min-h-[48px] px-3 py-2.5 rounded-xl border text-xs font-bold transition-all ${
                    language === lang.id
                      ? 'border-[#0B3328] bg-[#0B3328] text-white shadow-xs'
                      : 'border-[#DDE5DD] bg-white text-[#17251F] hover:bg-[#F7F8F3]'
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </div>

          {/* National Helplines Quick Access */}
          <div className="space-y-2">
            <label className="block text-xs font-extrabold text-[#17251F] uppercase tracking-wider">
              Official Helplines (Toll-Free)
            </label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <a
                href="tel:14434"
                className="p-3 rounded-xl bg-[#F7F8F3] hover:bg-[#EBF7EB] border border-[#DDE5DD] flex items-center justify-between font-bold text-[#0B3328]"
              >
                <span>e-Shram (14434)</span>
                <PhoneCall className="w-3.5 h-3.5" />
              </a>
              <a
                href="tel:1915"
                className="p-3 rounded-xl bg-[#F7F8F3] hover:bg-[#EBF7EB] border border-[#DDE5DD] flex items-center justify-between font-bold text-[#0B3328]"
              >
                <span>Consumer (1915)</span>
                <PhoneCall className="w-3.5 h-3.5" />
              </a>
              <a
                href="tel:108"
                className="p-3 rounded-xl bg-red-50 hover:bg-red-100 border border-red-200 flex items-center justify-between font-bold text-[#D32F2F]"
              >
                <span>Ambulance (108)</span>
                <PhoneCall className="w-3.5 h-3.5" />
              </a>
              <a
                href="tel:112"
                className="p-3 rounded-xl bg-red-50 hover:bg-red-100 border border-red-200 flex items-center justify-between font-bold text-[#D32F2F]"
              >
                <span>Emergency (112)</span>
                <PhoneCall className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Session Switch / Logout */}
          <div className="pt-2 border-t border-[#DDE5DD] flex items-center justify-between">
            {user ? (
              <button
                type="button"
                onClick={async () => {
                  await signOut();
                  onClose();
                }}
                className="min-h-[48px] px-4 py-2.5 rounded-xl border border-red-200 bg-red-50 hover:bg-red-100 text-[#D32F2F] font-bold text-xs flex items-center gap-2 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Log Out of Session</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  signInAsDemo();
                  onClose();
                }}
                className="min-h-[48px] px-4 py-2.5 rounded-xl bg-[#0B3328] text-[#B8EF43] font-bold text-xs flex items-center gap-2 shadow-xs"
              >
                <span>Switch to Demo Worker Mode</span>
              </button>
            )}

            <span className="text-[11px] text-[#64736A] font-medium">Awaaz v0.2.0</span>
          </div>
        </div>
      </div>
    </div>
  );
}
