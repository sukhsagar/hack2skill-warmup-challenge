'use client';

import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { Language, ProblemCategory, ComplaintDraft } from '@/types';
import { Header } from '@/components/Header';
import { WelcomeScreen } from '@/components/WelcomeScreen';
import { RightsNavigator } from '@/components/RightsNavigator';
import { ComplaintBuilder } from '@/components/ComplaintBuilder';
import { DraftsList } from '@/components/DraftsList';
import { VoiceAssistant } from '@/components/VoiceAssistant';
import { OnboardingModal } from '@/components/OnboardingModal';
import { WorkerOnboardingProfile } from '@/types';

function MainApp() {
  const { user, loading } = useAuth();
  const [currentTab, setCurrentTab] = useState<'rights' | 'complaint' | 'drafts' | 'voice'>('rights');
  const [language, setLanguage] = useState<Language>('en');

  // Worker onboarding profile (Optional personalization)
  const [workerProfile, setWorkerProfile] = useState<WorkerOnboardingProfile | null>(() => {
    if (typeof window === 'undefined') return null;
    try {
      const savedProfile = localStorage.getItem('awaaz_worker_profile');
      return savedProfile ? JSON.parse(savedProfile) : null;
    } catch {
      return null;
    }
  });
  const [showOnboarding, setShowOnboarding] = useState<boolean>(false);

  // Passing state between Rights Navigator, Voice Assistant and Complaint Builder
  const [prefillDescription, setPrefillDescription] = useState<string>('');
  const [prefillCategory, setPrefillCategory] = useState<ProblemCategory>('delayed_wages');
  const [activeDraftToEdit, setActiveDraftToEdit] = useState<ComplaintDraft | null>(null);
  const [lastGuidanceSummary, setLastGuidanceSummary] = useState<string>('');

  // Drafts count
  const [draftsCount, setDraftsCount] = useState<number>(0);

  const handleSaveProfile = (profile: WorkerOnboardingProfile) => {
    setWorkerProfile(profile);
    setShowOnboarding(false);
    try {
      localStorage.setItem('awaaz_worker_profile', JSON.stringify(profile));
    } catch {}
  };

  // Sync drafts count from localStorage
  const updateDraftsCount = React.useCallback(() => {
    if (typeof window === 'undefined') return;
    const storageKey = `awaaz_drafts_${user?.uid || 'guest'}`;
    try {
      const data = localStorage.getItem(storageKey);
      if (data) {
        const parsed = JSON.parse(data);
        setDraftsCount(Array.isArray(parsed) ? parsed.length : 0);
      } else {
        setDraftsCount(0);
      }
    } catch {
      setDraftsCount(0);
    }
  }, [user?.uid]);

  useEffect(() => {
    const timer = setTimeout(() => {
      updateDraftsCount();
    }, 0);
    return () => clearTimeout(timer);
  }, [updateDraftsCount]);

  const handleDraftComplaintFromIssue = (desc: string, cat: ProblemCategory) => {
    setPrefillDescription(desc);
    setPrefillCategory(cat);
    setLastGuidanceSummary(desc);
    setActiveDraftToEdit(null);
    setCurrentTab('complaint');
  };

  const handleEditDraft = (draft: ComplaintDraft) => {
    setActiveDraftToEdit(draft);
    setCurrentTab('complaint');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F7F2] flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm font-semibold text-secondary">Loading Awaaz...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <WelcomeScreen
        language={language}
        setLanguage={setLanguage}
        onPreFillProblem={(desc, cat) => {
          setPrefillDescription(desc);
          setPrefillCategory(cat);
          setCurrentTab('rights');
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F7F2] text-[#111A15] flex flex-col justify-between pb-20">
      <div>
        <Header
          currentTab={currentTab}
          setCurrentTab={(tab) => {
            setActiveDraftToEdit(null);
            setCurrentTab(tab);
          }}
          language={language}
          setLanguage={setLanguage}
          draftsCount={draftsCount}
        />

        <main className="max-w-xl sm:max-w-4xl mx-auto px-4 py-6">
          {/* Demo User Info Banner */}
          {user.isDemoUser && (
            <div className="mb-6 p-3.5 rounded-xl bg-primary-light border border-primary/20 text-xs text-primary-dark flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-primary">info</span>
                <span>
                  <strong>Logged in as Demo Worker Partner:</strong> Explore full features of Awaaz.
                </span>
              </div>
              <span className="font-bold text-primary bg-white px-2 py-0.5 rounded border border-primary/20">
                Evaluation Mode
              </span>
            </div>
          )}

          {/* Active Tab View */}
          {currentTab === 'rights' && (
            <RightsNavigator
              language={language}
              onDraftComplaintFromIssue={handleDraftComplaintFromIssue}
              initialQuery={prefillDescription}
              workerProfile={workerProfile}
              onOpenOnboarding={() => setShowOnboarding(true)}
            />
          )}

          {currentTab === 'voice' && (
            <VoiceAssistant
              language={language}
              onSendToRights={(query) => {
                setPrefillDescription(query);
                setCurrentTab('rights');
              }}
              onSendToComplaint={(query) => {
                setPrefillDescription(query);
                setActiveDraftToEdit(null);
                setCurrentTab('complaint');
              }}
              lastResponseText={lastGuidanceSummary || prefillDescription}
            />
          )}

          {currentTab === 'complaint' && (
            <ComplaintBuilder
              language={language}
              prefillDescription={prefillDescription}
              prefillCategory={prefillCategory}
              activeDraftToEdit={activeDraftToEdit}
              onDraftSaved={() => updateDraftsCount()}
            />
          )}

          {currentTab === 'drafts' && (
            <DraftsList
              language={language}
              onEditDraft={handleEditDraft}
              onDraftCountChange={(count) => setDraftsCount(count)}
            />
          )}
        </main>
      </div>

      {/* Persistent Mobile Bottom Navigation Bar */}
      <nav className="fixed bottom-0 w-full z-50 pb-safe bg-white border-t border-[#E5E4DD] shadow-lg sm:hidden">
        <div className="flex justify-around items-center h-16 max-w-xl mx-auto px-2">
          <button
            onClick={() => setCurrentTab('rights')}
            className={`flex-1 flex flex-col items-center justify-center h-full transition-all ${
              currentTab === 'rights' ? 'text-primary font-bold' : 'text-secondary font-medium'
            }`}
          >
            <span className="material-symbols-outlined text-[24px]">balance</span>
            <span className="text-[12px] mt-0.5">Worker Codes</span>
          </button>
          <button
            onClick={() => setCurrentTab('voice')}
            className={`flex-1 flex flex-col items-center justify-center h-full transition-all ${
              currentTab === 'voice' ? 'text-primary font-bold' : 'text-secondary font-medium'
            }`}
          >
            <span className="material-symbols-outlined text-[24px]">mic</span>
            <span className="text-[12px] mt-0.5">Voice</span>
          </button>
          <button
            onClick={() => setCurrentTab('complaint')}
            className={`flex-1 flex flex-col items-center justify-center h-full transition-all ${
              currentTab === 'complaint' ? 'text-primary font-bold' : 'text-secondary font-medium'
            }`}
          >
            <span className="material-symbols-outlined text-[24px]">edit_note</span>
            <span className="text-[12px] mt-0.5">New Appeal</span>
          </button>
          <button
            onClick={() => setCurrentTab('drafts')}
            className={`flex-1 flex flex-col items-center justify-center h-full transition-all relative ${
              currentTab === 'drafts' ? 'text-primary font-bold' : 'text-secondary font-medium'
            }`}
          >
            <span className="material-symbols-outlined text-[24px]">description</span>
            <span className="text-[12px] mt-0.5">My Appeals</span>
            {draftsCount > 0 && (
              <span className="absolute top-2 right-4 px-1.5 py-0.2 text-[10px] rounded-full bg-primary text-white font-bold">
                {draftsCount}
              </span>
            )}
          </button>
          <a
            className="flex-1 flex flex-col items-center justify-center h-full text-secondary hover:text-on-surface font-semibold"
            href="tel:14434"
          >
            <span className="material-symbols-outlined text-[24px]">call</span>
            <span className="text-[12px] font-medium mt-0.5">14434</span>
          </a>
        </div>
      </nav>

      {/* Optional Onboarding Form Modal */}
      {showOnboarding && (
        <OnboardingModal
          language={language}
          initialProfile={workerProfile}
          onSaveProfile={handleSaveProfile}
          onSkip={() => setShowOnboarding(false)}
        />
      )}

      <footer className="w-full border-t border-[#E5E4DD] bg-white py-6 px-4 text-center text-xs text-secondary mt-12 hidden sm:block">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span className="font-bold text-on-surface">Awaaz — Har Mazdoor Ki Awaaz</span>
          <span className="text-[12px] text-secondary">
            Know Your Rights. Raise Your Voice. • Built for Indian Gig & Daily-Wage Workers
          </span>
        </div>
      </footer>
    </div>
  );
}

export default function Page() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}
