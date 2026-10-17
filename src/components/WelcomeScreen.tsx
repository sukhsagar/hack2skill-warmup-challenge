'use client';

import React, { useState, useRef } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Language, ProblemCategory } from '@/types';

interface WelcomeScreenProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  onPreFillProblem?: (desc: string, cat: ProblemCategory) => void;
}

interface SpeechRecognitionEvent {
  results: {
    [index: number]: {
      [index: number]: {
        transcript: string;
      };
      length: number;
    };
    length: number;
  };
}

interface SpeechRecognitionInstance {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: (event: SpeechRecognitionEvent) => void;
  onerror: () => void;
  onend: () => void;
  start: () => void;
  stop: () => void;
}

export function WelcomeScreen({
  language,
  setLanguage,
  onPreFillProblem,
}: WelcomeScreenProps) {
  const { signInWithGoogle, signInAsDemo, loading, error } = useAuth();
  const [grievanceText, setGrievanceText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ProblemCategory>('delayed_wages');
  const [isRecording, setIsRecording] = useState(false);
  const [isDrafting, setIsDrafting] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);

  // Placeholder texts per language
  const placeholders: Record<Language, string> = {
    en: 'What happened? E.g., Weekly payout docked ₹1,800 without notice, or ID blocked after customer delivery issue...',
    hi: 'क्या हुआ? उदा. पिछले 2 हफ्तों से इंसेंटिव रुका है, या ग्राहक की गलत शिकायत पर आईडी बंद कर दी...',
    pa: 'ਕੀ ਪਰੇਸ਼ਾਨੀ ਹੈ? ਜਿਵੇਂ ਪੇਆਊਟ ਰੋਕਿਆ ਗਿਆ ਹੈ ਜਾਂ ਬਿਨਾਂ ਦੱਸੇ ਆਈਡੀ ਬੰਦ ਕੀਤੀ...',
  };

  const micLabels: Record<Language, string> = {
    en: 'Bol kar batayein / Speak in your language',
    hi: 'बोल कर बताएं (हिंदी)',
    pa: 'ਬੋਲ ਕੇ ਦੱਸੋ (ਪੰਜਾਬੀ)',
  };

  const commonIssues: Array<{
    title: string;
    subtitle: string;
    category: ProblemCategory;
    fill: string;
  }> = [
    {
      title: 'Delayed or Docked Payout',
      subtitle: 'Withheld wages & missing payment receipts',
      category: 'delayed_wages',
      fill: 'My weekly platform payment is delayed by over 6 days without itemized explanation.',
    },
    {
      title: 'ID Suspended / Deactivated',
      subtitle: 'Sudden block, customer fraud allegation',
      category: 'account_suspension',
      fill: 'My delivery partner ID was deactivated without prior notice or appeal option.',
    },
    {
      title: 'Unpaid Surge & Bonuses',
      subtitle: 'Milestone incentives and fuel allowances',
      category: 'missing_incentives',
      fill: 'Completed 24 delivery target milestones during rain surge, but bonus incentive was denied.',
    },
    {
      title: 'On-duty Accident & Medical',
      subtitle: 'Road accident insurance & hospital claims',
      category: 'workplace_safety',
      fill: 'Suffered road incident on duty; platform emergency medical cover is unresponsive.',
    },
  ];

  // Voice recording toggle via Web Speech API
  const handleToggleMic = () => {
    if (isRecording) {
      stopMic();
      return;
    }

    setIsRecording(true);

    const windowWithSpeech = window as unknown as {
      SpeechRecognition?: new () => SpeechRecognitionInstance;
      webkitSpeechRecognition?: new () => SpeechRecognitionInstance;
    };

    const SpeechRec = windowWithSpeech.SpeechRecognition || windowWithSpeech.webkitSpeechRecognition;

    if (SpeechRec) {
      const recognition = new SpeechRec();
      recognitionRef.current = recognition;
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = language === 'hi' ? 'hi-IN' : language === 'pa' ? 'pa-IN' : 'en-IN';

      recognition.onresult = (e: SpeechRecognitionEvent) => {
        let text = '';
        for (let i = 0; i < e.results.length; ++i) {
          text += e.results[i][0].transcript;
        }
        setGrievanceText(text);
      };

      recognition.onerror = () => stopMic();
      recognition.onend = () => stopMic();

      try {
        recognition.start();
      } catch (err) {
        console.warn('SpeechRecognition start failed', err);
        stopMic();
      }
    } else {
      // Graceful fallback for non-supported browsers
      setTimeout(() => {
        if (language === 'hi') {
          setGrievanceText('पिछले दो हफ्ते का ₹1,800 इंसेंटिव नहीं मिला और कस्टमर सपोर्ट ने टिकट बंद कर दिया।');
        } else if (language === 'pa') {
          setGrievanceText('ਪਿਛਲੇ ਦੋ ਹਫ਼ਤਿਆਂ ਦਾ ₹1,800 ਇਨਸੈਂਟਿਵ ਨਹੀਂ ਮਿਲਿਆ ਅਤੇ ਕਸਟਮਰ ਸਪੋਰਟ ਨੇ ਟਿਕਟ ਬੰਦ ਕਰ ਦਿੱਤੀ।');
        } else {
          setGrievanceText('Weekly payout docked ₹1,800 without explanation and customer support closed my dispute ticket.');
        }
        stopMic();
      }, 1800);
    }
  };

  const stopMic = () => {
    setIsRecording(false);
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {}
      recognitionRef.current = null;
    }
  };

  const handleSelectIssue = (issue: typeof commonIssues[0]) => {
    setGrievanceText(issue.fill);
    setSelectedCategory(issue.category);
  };

  const handleGetGuidance = () => {
    if (!grievanceText.trim()) {
      setGrievanceText(placeholders[language]);
    }

    setIsDrafting(true);

    setTimeout(() => {
      setIsDrafting(false);
      if (onPreFillProblem) {
        onPreFillProblem(grievanceText.trim() || placeholders[language], selectedCategory);
      }
      signInAsDemo();
    }, 700);
  };

  return (
    <div className="bg-[#F8F7F2] text-[#111A15] font-sans antialiased min-h-screen flex flex-col selection:bg-primary-fixed">
      {/* Top App Bar (Baseline Spec) */}
      <header className="fixed top-0 w-full z-50 bg-[#F8F7F2]/95 backdrop-blur-md border-b border-[#E5E4DD] pt-safe">
        <div className="h-16 px-4 flex items-center justify-between max-w-xl mx-auto w-full">
          <div className="flex items-center gap-2.5">
            <div className="h-12 w-auto max-w-[130px] sm:max-w-[150px] flex items-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo.png"
                alt="Awaaz - Har Mazdoor Ki Awaaz"
                className="h-10 w-auto object-contain drop-shadow-2xs"
              />
            </div>
            <span className="px-2 py-0.5 rounded-full bg-primary-fixed text-[#003828] text-[11px] font-bold uppercase tracking-wider">
              Help
            </span>
          </div>

          <a
            className="h-11 px-3.5 rounded-lg bg-surface-container-lowest border border-[#E5E4DD] text-primary flex items-center gap-1.5 font-bold text-[15px] shadow-xs active:scale-95 transition-all"
            href="tel:14434"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping mr-0.5"></span>
            Helpline
          </a>
        </div>

        {/* Prominent Segmented Language Bar */}
        <div className="px-4 pb-2.5 pt-0.5 bg-[#F8F7F2]">
          <div
            aria-label="Select Language"
            className="p-1 bg-[#EAE9E0] rounded-xl flex items-center gap-1 max-w-xl mx-auto"
            role="tablist"
          >
            <button
              onClick={() => setLanguage('en')}
              className={`lang-tab flex-1 py-2 rounded-lg text-center font-bold text-[15px] transition-all ${
                language === 'en'
                  ? 'bg-white text-primary shadow-xs ring-1 ring-black/5'
                  : 'text-secondary hover:text-on-surface font-semibold'
              }`}
              type="button"
            >
              English
            </button>
            <button
              onClick={() => setLanguage('hi')}
              className={`lang-tab flex-1 py-2 rounded-lg text-center font-semibold text-[15px] transition-all ${
                language === 'hi'
                  ? 'bg-white text-primary shadow-xs ring-1 ring-black/5'
                  : 'text-secondary hover:text-on-surface font-semibold'
              }`}
              type="button"
            >
              हिंदी (Hindi)
            </button>
            <button
              onClick={() => setLanguage('pa')}
              className={`lang-tab flex-1 py-2 rounded-lg text-center font-semibold text-[15px] transition-all ${
                language === 'pa'
                  ? 'bg-white text-primary shadow-xs ring-1 ring-black/5'
                  : 'text-secondary hover:text-on-surface font-semibold'
              }`}
              type="button"
            >
              ਪੰਜਾਬੀ (Punjabi)
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="flex-1 flex flex-col w-full pt-32 pb-24 px-4 max-w-xl mx-auto">
        {/* Prominent Brand Header & Hero Title */}
        <section className="pt-2 pb-5 text-left">
          <div className="mb-4 inline-block">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.png"
              alt="Awaaz - Har Mazdoor Ki Awaaz"
              className="h-14 sm:h-16 w-auto object-contain filter drop-shadow-xs"
            />
          </div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#E6F4EE] text-primary text-[13px] font-bold tracking-wide uppercase mb-2.5 block w-fit">
            <span>Verified Legal Aid</span>
          </div>
          <h1 className="text-[26px] sm:text-[28px] font-extrabold text-on-surface tracking-tight leading-tight mb-2">
            Solve Delivery, Cab & Daily Wage Issues
          </h1>
          <p className="text-[17px] sm:text-[18px] text-secondary font-medium leading-relaxed">
            Get instant official notices, dispute proofs, and wage appeals drafted in your native language.
          </p>
        </section>

        {/* Voice & Text Grievance Composer (Core Interaction) */}
        <section className="mb-7">
          <div className="bg-white border-2 border-primary/20 rounded-2xl shadow-sm p-4 sm:p-5">
            {/* Step 1 Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E4DD] mb-3.5">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-primary text-white text-[13px] font-bold flex items-center justify-center">
                  1
                </span>
                <span className="text-[17px] font-bold text-on-surface">
                  Step 1: Speak or write your problem
                </span>
              </div>
              <span className="text-[12px] font-semibold text-secondary bg-surface-container-low px-2.5 py-1 rounded-md">
                100% Private
              </span>
            </div>

            {/* Text Input Area */}
            <div className="relative w-full mb-3.5">
              <textarea
                value={grievanceText}
                onChange={(e) => setGrievanceText(e.target.value)}
                className="w-full bg-[#FAF9F5] border border-[#E5E4DD] focus:border-primary focus:bg-white text-on-surface text-[17px] p-3.5 rounded-xl outline-none resize-none placeholder:text-outline font-medium transition-colors"
                placeholder={placeholders[language]}
                rows={3}
              />
            </div>

            {/* Big Voice Record Button (Accessible for High Sunlight & On-the-go riders) */}
            <div className="flex flex-col gap-3">
              <button
                onClick={handleToggleMic}
                className={`w-full min-h-[52px] py-3 px-4 rounded-xl font-bold text-[17px] flex items-center justify-center gap-3 border active:scale-[0.98] transition-all ${
                  isRecording
                    ? 'bg-error-container text-error border-error animate-pulse'
                    : 'bg-[#E6F4EE] hover:bg-[#D4EFE3] text-primary border-primary/30'
                }`}
                type="button"
              >
                <span className="material-symbols-outlined text-[28px]">
                  {isRecording ? 'graphic_eq' : 'mic'}
                </span>
                <span>
                  {isRecording ? 'Listening... Speak now' : micLabels[language]}
                </span>
              </button>

              {/* Step 2 Notice & Submit Button */}
              <div className="flex items-center justify-between pt-3 border-t border-[#E5E4DD] gap-2 flex-wrap sm:flex-nowrap">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="w-6 h-6 rounded-full bg-[#EAE9E0] text-secondary text-[13px] font-bold flex items-center justify-center flex-shrink-0">
                    2
                  </span>
                  <span className="text-[14px] text-secondary font-medium truncate">
                    Step 2: Get legal notice / appeal draft
                  </span>
                </div>
                <button
                  onClick={handleGetGuidance}
                  disabled={isDrafting}
                  className="min-h-[50px] w-full sm:w-auto px-6 rounded-xl bg-primary hover:bg-primary-dark text-white font-bold text-[17px] flex items-center justify-center gap-2 shadow-sm active:scale-95 transition-all disabled:opacity-50"
                  type="button"
                >
                  <span>{isDrafting ? 'Drafting Notice...' : 'Get Guidance'}</span>
                  <span className="font-bold text-[18px]">→</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Visual Feature Explanation with Authentic Documentary Photos */}
        <section className="mb-7">
          <div className="mb-3.5">
            <h2 className="text-[22px] sm:text-[24px] font-bold text-on-surface tracking-tight">
              How Awaaz Protects You
            </h2>
            <p className="text-[16px] text-secondary font-medium">
              Built specifically for drivers, delivery partners, and warehouse workers.
            </p>
          </div>

          <div className="space-y-4">
            {/* Feature Card 1: Payout & Wage Protection */}
            <article className="bg-white border border-[#E5E4DD] rounded-2xl overflow-hidden shadow-xs">
              <div className="h-44 sm:h-48 w-full overflow-hidden bg-surface-container relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt="Logistics warehouse worker checking wage slip outdoors"
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAuo9z-SKfLGwvMYD3cim5hn8qgug0N7KvtbIoL6U70EgT39GMalO_JlLou-UMXJGLT_5XD-XKRNyrfXhHnaHauc3R2NG87H_rgXL301GHDumv_cY5R9t62CvcX1mM4HzLqf0HnRo0uBDg4Ps9M0VkMkc7rdFGOIPvSYQumcDHL-SoGdcjwnTkOJqa4XkAEE93trLhEbTg84KuYvRlcCFJwHoY3eoaVGcXXEBDoTBqAxG56DgzR5Y_d"
                />
                <div className="absolute bottom-3 left-3 bg-[#111A15]/80 backdrop-blur-xs text-white text-[12px] font-bold px-2.5 py-1 rounded-md">
                  Statutory Wage Rights
                </div>
              </div>
              <div className="p-4 sm:p-5">
                <h3 className="text-[20px] font-bold text-on-surface mb-1.5">
                  Payout & Wage Protection
                </h3>
                <p className="text-[16px] sm:text-[17px] text-secondary font-medium leading-relaxed">
                  Verify docked pay, missing peak bonuses, or withheld weekly payouts. We auto-format wage deduction appeals backed by the Code on Wages.
                </p>
              </div>
            </article>

            {/* Feature Card 2: ID Block & Suspension Relief */}
            <article className="bg-white border border-[#E5E4DD] rounded-2xl overflow-hidden shadow-xs">
              <div className="h-44 sm:h-48 w-full overflow-hidden bg-surface-container relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt="Delivery rider on motorcycle checking smartphone"
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDGBke3ZuB1ktKSaYAOfbfl8YkRmAzta-A5vEIlPdsN5LiLO9XnOXmIQ_XOKNjXnJtUba27dii46NblyGGMgOpjxSWpNUDPRUFdzbTWDObv2Be5X7XW9RTSRARDfOgn5d_ngZsHeD7zzVXuxJ3LNBGYt7FHeqjFnFUUG_cInNXzeXnab_FXZ49KxYuxdDvQx0HPz--OCt1fOrsuMW3C6Nn6LjCkqxB_f9cPeA2Itsv2ECtGPAEfnW6Z"
                />
                <div className="absolute bottom-3 left-3 bg-[#111A15]/80 backdrop-blur-xs text-white text-[12px] font-bold px-2.5 py-1 rounded-md">
                  App ID Appeal
                </div>
              </div>
              <div className="p-4 sm:p-5">
                <h3 className="text-[20px] font-bold text-on-surface mb-1.5">
                  ID Block & Suspension Relief
                </h3>
                <p className="text-[16px] sm:text-[17px] text-secondary font-medium leading-relaxed">
                  Appeal sudden app deactivations and unfair customer fraud penalties. Generate formal rebuttal statements that platform grievance officers cannot ignore.
                </p>
              </div>
            </article>

            {/* Feature Card 3: Accident & Legal Relief */}
            <article className="bg-white border border-[#E5E4DD] rounded-2xl overflow-hidden shadow-xs">
              <div className="h-44 sm:h-48 w-full overflow-hidden bg-surface-container relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt="Auto and cab driver sitting inside vehicle holding smartphone"
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDDSnSf7I-wKUE_vR9Py-SyezU47RspcD0Njzasu9MldWw5phb44Eq3HybC4VGG8o9PNRy_5cVc_OMWAwN9uY3qrp_iHdd9hM5DGdzB1k_GKRGN8VReDALvxz7HHCzIPrv8tS-C2t5IsbL_YMK-eI-u-CVQlT_-YPetNKvj5mWkEB6kwkxQ1Vx0HX-pptGZcR3bxto02E30Eh2j-qwm9WBc8xD-_l9yYi0jlJvgat5ovF4rjScW1Jhb"
                />
                <div className="absolute bottom-3 left-3 bg-[#111A15]/80 backdrop-blur-xs text-white text-[12px] font-bold px-2.5 py-1 rounded-md">
                  Social Security & Medical
                </div>
              </div>
              <div className="p-4 sm:p-5">
                <h3 className="text-[20px] font-bold text-on-surface mb-1.5">
                  Accident & Legal Relief
                </h3>
                <p className="text-[16px] sm:text-[17px] text-secondary font-medium leading-relaxed">
                  Know your insurance rights under the Social Security Code. Access emergency hospital expense documentation and claim guidance in road incidents.
                </p>
              </div>
            </article>
          </div>
        </section>

        {/* Quick Issue Selector (Large High-Contrast Tap Targets) */}
        <section className="mb-7">
          <div className="mb-3">
            <h2 className="text-[22px] font-bold text-on-surface">Common Problems</h2>
            <p className="text-[15px] text-secondary font-medium">
              Tap your issue to immediately fill in the details:
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5" id="topic-grid">
            {commonIssues.map((issue, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectIssue(issue)}
                className={`topic-btn text-left p-4 rounded-xl border transition-all flex flex-col justify-center min-h-[56px] ${
                  grievanceText === issue.fill
                    ? 'border-primary bg-primary-light/50'
                    : 'bg-white border-[#E5E4DD] hover:border-primary active:bg-primary-light'
                }`}
                type="button"
              >
                <span className="text-[17px] font-bold text-on-surface">{issue.title}</span>
                <span className="text-[14px] text-secondary mt-0.5">{issue.subtitle}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Clean Sunlight-Readable Legal Note */}
        <section className="mb-6">
          <div className="bg-[#FAF9F5] border border-[#E5E4DD] rounded-xl p-4 sm:p-5">
            <div className="font-bold text-[17px] text-on-surface mb-1">
              Backed by Code on Social Security (Section 114)
            </div>
            <p className="text-[15px] text-secondary leading-relaxed font-medium">
              Indian labor law mandates fair grievance redressal, life and disability cover, and wage transparency for gig and platform workers.
            </p>
          </div>
        </section>

        {/* Footer Information */}
        <footer className="pt-2 pb-6 text-center">
          <p className="text-[14px] font-medium text-secondary max-w-sm mx-auto">
            Your voice recording and grievance data stay completely private and are never shared without your permission.
          </p>
        </footer>
      </main>

      {/* High Legibility Bottom Tab Bar */}
      <nav className="fixed bottom-0 w-full z-50 pb-safe bg-white border-t border-[#E5E4DD] shadow-lg">
        <div className="flex justify-around items-center h-16 max-w-xl mx-auto px-2">
          <button
            onClick={() => handleToggleMic()}
            className="flex-1 flex flex-col items-center justify-center h-full text-primary font-bold"
          >
            <span className="material-symbols-outlined text-[24px]">mic</span>
            <span className="text-[13px] font-bold mt-0.5">Record Issue</span>
          </button>
          <button
            onClick={() => handleGetGuidance()}
            className="flex-1 flex flex-col items-center justify-center h-full text-secondary hover:text-on-surface font-semibold"
          >
            <span className="material-symbols-outlined text-[24px]">description</span>
            <span className="text-[13px] font-medium mt-0.5">My Appeals</span>
          </button>
          <button
            onClick={() => handleGetGuidance()}
            className="flex-1 flex flex-col items-center justify-center h-full text-secondary hover:text-on-surface font-semibold"
          >
            <span className="material-symbols-outlined text-[24px]">balance</span>
            <span className="text-[13px] font-medium mt-0.5">Worker Codes</span>
          </button>
          <a
            className="flex-1 flex flex-col items-center justify-center h-full text-secondary hover:text-on-surface font-semibold"
            href="tel:14434"
          >
            <span className="material-symbols-outlined text-[24px]">call</span>
            <span className="text-[13px] font-medium mt-0.5">Call 14434</span>
          </a>
        </div>
      </nav>

      {/* Google Auth Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 border border-[#E5E4DD] shadow-xl relative animate-in fade-in zoom-in-95">
            <button
              onClick={() => setShowAuthModal(false)}
              className="absolute top-4 right-4 text-secondary hover:text-on-surface p-1 rounded-lg"
            >
              ✕
            </button>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white font-bold text-lg">
                आ
              </div>
              <div>
                <h3 className="font-bold text-lg text-on-surface">Sign in to Awaaz</h3>
                <p className="text-xs text-secondary">Keep your saved appeals and rights history</p>
              </div>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700">
                {error}
              </div>
            )}

            <div className="space-y-3">
              <button
                type="button"
                disabled={loading}
                onClick={() => signInWithGoogle()}
                className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl bg-white border border-[#E5E4DD] hover:bg-[#FAF9F5] text-on-surface font-semibold text-sm shadow-xs transition-all disabled:opacity-50"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
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
                <span>{loading ? 'Signing in...' : 'Continue with Google'}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setShowAuthModal(false);
                  signInAsDemo();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-primary hover:bg-primary-dark text-white font-semibold text-sm shadow-xs transition-all"
              >
                <span>Continue as Demo Worker Partner</span>
                <span>→</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
