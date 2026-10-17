'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
import { Language, WorkerOnboardingProfile } from '@/types';
import {
  User,
  PhoneCall,
  LogOut,
  Truck,
  X,
  Sparkles,
  AlertCircle,
  RotateCcw,
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
  const { user, signOut, signInAsDemo, signInWithGoogle, error: authError } = useAuth();
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleGoogleSignIn = async () => {
    setIsSigningIn(true);
    setLocalError(null);
    try {
      await signInWithGoogle();
      onClose();
    } catch (err: unknown) {
      const e = err as Error;
      setLocalError(e.message || 'Could not complete Google Sign-In.');
    } finally {
      setIsSigningIn(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#17251F]/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-lg rounded-3xl border border-[#DDE5DD] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-[#DDE5DD] flex items-center justify-between bg-[#F7F8F3]">
          <div className="flex items-center gap-3">
            {user?.photoURL ? (
              <Image
                src={user.photoURL}
                alt={user.displayName || 'Worker'}
                width={44}
                height={44}
                className="w-11 h-11 rounded-2xl border border-[#DDE5DD] object-cover shrink-0"
              />
            ) : (
              <div className="w-11 h-11 rounded-2xl bg-[#0B3328] text-[#B8EF43] flex items-center justify-center font-bold text-lg shadow-xs shrink-0">
                <User className="w-5 h-5" />
              </div>
            )}
            <div>
              <h3 className="text-lg font-extrabold text-[#17251F]">
                {user ? user.displayName || 'Worker Partner' : 'Guest Partner'}
              </h3>
              <span className="text-xs text-[#64736A] font-semibold block">
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
          {/* Sign In / Sign Up Section with Gmail */}
          {(!user || user.isDemoUser) && (
            <div className="p-4 sm:p-5 rounded-2xl bg-[#EBF7EB] border border-[#0B3328]/20 space-y-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#0B3328]" />
                <span className="text-xs font-extrabold text-[#0B3328] uppercase tracking-wider">
                  Sync & Protect Your Grievance Records
                </span>
              </div>
              <p className="text-xs text-[#17251F] font-medium leading-relaxed">
                Sign in with your Google / Gmail account to save grievance letters, track platform dispute drafts, and access your data from any mobile phone or browser.
              </p>

              {(localError || authError) && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-[#D32F2F] font-medium flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{localError || authError}</span>
                </div>
              )}

              <button
                type="button"
                disabled={isSigningIn}
                onClick={handleGoogleSignIn}
                className="w-full min-h-[48px] px-4 py-3 rounded-xl bg-white hover:bg-stone-50 border border-[#DDE5DD] hover:border-[#0B3328] text-[#17251F] font-bold text-sm flex items-center justify-center gap-3 shadow-xs active:scale-98 transition-all disabled:opacity-60"
              >
                {isSigningIn ? (
                  <>
                    <RotateCcw className="w-4 h-4 animate-spin text-[#0B3328]" />
                    <span>Connecting to Google...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
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
                    <span>Sign in with Google / Gmail</span>
                  </>
                )}
              </button>
            </div>
          )}

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
            {user && !user.isDemoUser ? (
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
                <span>{user?.isDemoUser ? 'Reset Demo Session' : 'Continue as Demo Worker'}</span>
              </button>
            )}

            <span className="text-[11px] text-[#64736A] font-medium">Awaaz v0.2.0</span>
          </div>
        </div>
      </div>
    </div>
  );
}
