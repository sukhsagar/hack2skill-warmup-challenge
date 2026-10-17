'use client';

import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { Language, ProblemCategory, ComplaintDraft, WorkerOnboardingProfile } from '@/types';
import { AppHeader } from '@/components/chat/AppHeader';
import { ChatInterface } from '@/components/chat/ChatInterface';
import { BottomNavigation } from '@/components/chat/BottomNavigation';
import { ProfileModal } from '@/components/chat/ProfileModal';
import { MainTab } from '@/components/chat/types';
import { ComplaintBuilder } from '@/components/ComplaintBuilder';
import { DraftsList } from '@/components/DraftsList';
import { CommunityHelpPage } from '@/components/community-help/community-help-page';
import { OnboardingModal } from '@/components/OnboardingModal';
import { FileEdit, ListFilter, PlusCircle } from 'lucide-react';

function MainApp() {
  const { user, loading } = useAuth();
  const [currentTab, setCurrentTab] = useState<MainTab>('chat');
  const [language, setLanguage] = useState<Language>('en');

  // Work Sub-tab state ('new_appeal' | 'saved_appeals')
  const [workSubTab, setWorkSubTab] = useState<'new_appeal' | 'saved_appeals'>('new_appeal');

  // Worker onboarding profile
  const [workerProfile, setWorkerProfile] = useState<WorkerOnboardingProfile | null>(null);
  const [showOnboarding, setShowOnboarding] = useState<boolean>(false);
  const [showProfileModal, setShowProfileModal] = useState<boolean>(false);

  // Prefill state between Chat and Complaint Builder
  const [prefillDescription, setPrefillDescription] = useState<string>('');
  const [prefillCategory, setPrefillCategory] = useState<ProblemCategory>('delayed_wages');
  const [activeDraftToEdit, setActiveDraftToEdit] = useState<ComplaintDraft | null>(null);

  // Drafts count
  const [draftsCount, setDraftsCount] = useState<number>(0);

  // Sync profile from localStorage on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const savedProfile = localStorage.getItem('awaaz_worker_profile');
      if (savedProfile) {
        setWorkerProfile(JSON.parse(savedProfile));
      }
    } catch (e) {
      console.warn('Could not read saved worker profile', e);
    }
  }, []);

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
    updateDraftsCount();
  }, [updateDraftsCount]);

  const handleDraftComplaintFromChat = (desc: string, cat?: ProblemCategory) => {
    setPrefillDescription(desc);
    if (cat) setPrefillCategory(cat);
    setActiveDraftToEdit(null);
    setWorkSubTab('new_appeal');
    setCurrentTab('work');
  };

  const handleEditDraft = (draft: ComplaintDraft) => {
    setActiveDraftToEdit(draft);
    setWorkSubTab('new_appeal');
    setCurrentTab('work');
  };

  const handleOpenMedical = () => {
    setCurrentTab('community');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F7F8F3] flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-12 h-12 border-4 border-[#0B3328] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-base font-bold text-[#64736A]">Loading Awaaz...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F8F3] text-[#17251F] flex flex-col justify-between">
      <div>
        {/* Compact Brand Header */}
        <AppHeader
          language={language}
          setLanguage={setLanguage}
          onOpenProfile={() => setShowProfileModal(true)}
        />

        {/* Primary View Router */}
        <main>
          {/* TAB 1: Chat-First Home Screen (Default) */}
          {currentTab === 'chat' && (
            <ChatInterface
              language={language}
              workerProfile={workerProfile}
              onDraftComplaint={handleDraftComplaintFromChat}
              onOpenMedical={handleOpenMedical}
            />
          )}

          {/* TAB 2: Work & Formal Appeals */}
          {currentTab === 'work' && (
            <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 pb-28 space-y-6">
              {/* Sub-navigation pill switcher */}
              <div className="flex items-center justify-between gap-3 p-1.5 bg-white rounded-2xl border border-[#DDE5DD] shadow-xs">
                <button
                  type="button"
                  onClick={() => {
                    setActiveDraftToEdit(null);
                    setWorkSubTab('new_appeal');
                  }}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs sm:text-sm font-extrabold transition-all min-h-[48px] ${
                    workSubTab === 'new_appeal'
                      ? 'bg-[#0B3328] text-white shadow-xs'
                      : 'text-[#64736A] hover:text-[#17251F]'
                  }`}
                >
                  <PlusCircle className="w-4 h-4 text-[#B8EF43]" />
                  <span>Draft New Appeal</span>
                </button>

                <button
                  type="button"
                  onClick={() => setWorkSubTab('saved_appeals')}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs sm:text-sm font-extrabold transition-all min-h-[48px] ${
                    workSubTab === 'saved_appeals'
                      ? 'bg-[#0B3328] text-white shadow-xs'
                      : 'text-[#64736A] hover:text-[#17251F]'
                  }`}
                >
                  <ListFilter className="w-4 h-4" />
                  <span>My Saved Appeals</span>
                  {draftsCount > 0 && (
                    <span className="px-2 py-0.5 rounded-full text-[11px] font-extrabold bg-[#B8EF43] text-[#0B3328]">
                      {draftsCount}
                    </span>
                  )}
                </button>
              </div>

              {workSubTab === 'new_appeal' ? (
                <ComplaintBuilder
                  language={language}
                  prefillDescription={prefillDescription}
                  prefillCategory={prefillCategory}
                  activeDraftToEdit={activeDraftToEdit}
                  onDraftSaved={() => updateDraftsCount()}
                />
              ) : (
                <DraftsList
                  language={language}
                  onEditDraft={handleEditDraft}
                  onDraftCountChange={(count) => setDraftsCount(count)}
                />
              )}
            </div>
          )}

          {/* TAB 3: Community Help & Medical Aid */}
          {currentTab === 'community' && (
            <div className="pb-16">
              <CommunityHelpPage />
            </div>
          )}

          {/* TAB 4: Profile Modal */}
          {showProfileModal && (
            <ProfileModal
              isOpen={showProfileModal}
              onClose={() => setShowProfileModal(false)}
              language={language}
              setLanguage={setLanguage}
              workerProfile={workerProfile}
              onEditProfile={() => setShowOnboarding(true)}
            />
          )}
        </main>
      </div>

      {/* Persistent 4-Item Bottom Navigation */}
      <BottomNavigation
        currentTab={currentTab}
        onSelectTab={(tab) => {
          if (tab === 'profile') {
            setShowProfileModal(true);
          } else {
            setCurrentTab(tab);
          }
        }}
        draftsCount={draftsCount}
      />

      {/* Onboarding Profile Modal */}
      {showOnboarding && (
        <OnboardingModal
          language={language}
          initialProfile={workerProfile}
          onSaveProfile={handleSaveProfile}
          onSkip={() => setShowOnboarding(false)}
        />
      )}
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
