'use client';

import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { Language, ProblemCategory, ComplaintDraft } from '@/types';
import { Header } from '@/components/Header';
import { WelcomeScreen } from '@/components/WelcomeScreen';
import { RightsNavigator } from '@/components/RightsNavigator';
import { ComplaintBuilder } from '@/components/ComplaintBuilder';
import { DraftsList } from '@/components/DraftsList';
import { Info } from 'lucide-react';

function MainApp() {
  const { user, loading } = useAuth();
  const [currentTab, setCurrentTab] = useState<'rights' | 'complaint' | 'drafts'>('rights');
  const [language, setLanguage] = useState<Language>('en');

  // Passing state between Rights Navigator and Complaint Builder
  const [prefillDescription, setPrefillDescription] = useState<string>('');
  const [prefillCategory, setPrefillCategory] = useState<ProblemCategory>('delayed_wages');
  const [activeDraftToEdit, setActiveDraftToEdit] = useState<ComplaintDraft | null>(null);

  // Drafts count
  const [draftsCount, setDraftsCount] = useState<number>(0);

  // Sync drafts count from localStorage
  const updateDraftsCount = () => {
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
  };

  useEffect(() => {
    updateDraftsCount();
  }, [user]);

  const handleDraftComplaintFromIssue = (desc: string, cat: ProblemCategory) => {
    setPrefillDescription(desc);
    setPrefillCategory(cat);
    setActiveDraftToEdit(null);
    setCurrentTab('complaint');
  };

  const handleEditDraft = (draft: ComplaintDraft) => {
    setActiveDraftToEdit(draft);
    setCurrentTab('complaint');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm font-semibold text-stone-600">Loading Awaaz...</p>
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
    <div className="min-h-screen bg-stone-50 flex flex-col justify-between">
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

        <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          {/* Demo User Info Banner */}
          {user.isDemoUser && (
            <div className="mb-6 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Info className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>
                  <strong>Logged in as Demo Worker Partner:</strong> Explore all features of Awaaz without needing external Firebase credentials.
                </span>
              </div>
              <span className="font-semibold text-emerald-800 bg-white px-2 py-0.5 rounded border border-emerald-200">
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

      <footer className="w-full border-t border-stone-200 bg-white py-6 px-4 text-center text-xs text-stone-500 mt-12">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span className="font-semibold text-stone-700">Awaaz — Har Mazdoor Ki Awaaz</span>
          <span className="text-[11px] text-stone-400">
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
