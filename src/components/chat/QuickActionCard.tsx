'use client';

import React from 'react';
import { Language, ProblemCategory } from '@/types';
import {
  ShieldAlert,
  Wallet,
  HeartPulse,
  FileText,
  ArrowRight,
} from 'lucide-react';

interface QuickActionItem {
  id: string;
  category: ProblemCategory;
  title: Record<Language, string>;
  description: Record<Language, string>;
  icon: React.ReactNode;
  prompt: Record<Language, string>;
  accentColor: string;
  badge: Record<Language, string>;
}

const QUICK_ACTIONS: QuickActionItem[] = [
  {
    id: 'id_deactivation',
    category: 'account_suspension',
    title: {
      en: 'Blocked / Suspended ID',
      hi: 'अकाउंट या आईडी ब्लॉक',
      pa: 'ਆਈਡੀ ਬਲਾਕ ਜਾਂ ਸਸਪੈਂਡ',
    },
    description: {
      en: 'Appeal arbitrary deactivations and demand fair natural justice hearing.',
      hi: 'बिना नोटिस आईडी सस्पेंशन के खिलाफ अपील और प्राकृतिक न्याय की मांग करें।',
      pa: 'ਬਿਨਾਂ ਲਿਖਤੀ ਕਾਰਨ ਆਈਡੀ ਬੰਦ ਹੋਣ ਤੇ ਤੁਰੰਤ ਅਪੀਲ ਦਰਜ ਕਰੋ।',
    },
    icon: <ShieldAlert className="w-5 h-5 text-[#0B3328]" />,
    prompt: {
      en: 'My delivery/driver partner account was blocked or deactivated without any clear explanation. What are my rights and how can I appeal?',
      hi: 'मेरी पार्टनर आईडी बिना किसी स्पष्ट कारण के ब्लॉक कर दी गई है। मेरे क्या अधिकार हैं और मैं कैसे अपील कर सकता हूँ?',
      pa: 'ਮੇਰੀ ਪਾਰਟਨਰ ਆਈਡੀ ਬਿਨਾਂ ਕਿਸੇ ਕਾਰਨ ਬਲਾਕ ਕਰ ਦਿੱਤੀ ਗਈ ਹੈ। ਮੈਂ ਕਿਵੇਂ ਅਪੀਲ ਕਰ ਸਕਦਾ ਹਾਂ?',
    },
    accentColor: 'border-[#0B3328]/20 bg-[#EBF7EB]/40',
    badge: {
      en: 'High Priority',
      hi: 'प्राथमिकता',
      pa: 'ਮੁੱਖ ਮਸਲਾ',
    },
  },
  {
    id: 'wage_theft',
    category: 'delayed_wages',
    title: {
      en: 'Withheld Earnings & Deductions',
      hi: 'रुका हुआ भुगतान व कटौती',
      pa: 'ਰੁਕੀ ਹੋਈ ਕਮਾਈ ਅਤੇ ਕਟੌਤੀ',
    },
    description: {
      en: 'Recover delayed weekly payouts, peak incentives, or GPS penalty cuts.',
      hi: 'हफ्ते का बकाया पेआउट, इंसेंटिव या अनुचित पेनल्टी कटौती का हिसाब मांगें।',
      pa: 'ਹਫ਼ਤਾਵਾਰੀ ਬਕਾਇਆ ਪੈਸੇ ਜਾਂ ਗਲਤ ਜੁਰਮਾਨਾ ਕੱਟਣ ਤੇ ਪੂਰਾ ਹਿਸਾਬ ਮੰਗੋ।',
    },
    icon: <Wallet className="w-5 h-5 text-[#0B3328]" />,
    prompt: {
      en: 'The company deducted money from my weekly payout citing customer cancellation or GPS delay. How do I get my withheld earnings back?',
      hi: 'कंपनी ने मेरे पेआउट से पैसे काट लिए हैं। रोकी गई राशि वापस पाने के लिए मुझे क्या करना चाहिए?',
      pa: 'ਕੰਪਨੀ ਨੇ ਮੇਰੀ ਕਮਾਈ ਵਿੱਚੋਂ ਪੈਸੇ ਕੱਟ ਲਏ ਹਨ। ਮੈਨੂੰ ਪੈਸੇ ਵਾਪਸ ਲੈਣ ਲਈ ਕੀ ਕਰਨਾ ਚਾਹੀਦਾ ਹੈ?',
    },
    accentColor: 'border-[#B8EF43]/40 bg-[#F7F8F3]',
    badge: {
      en: 'Payout Issue',
      hi: 'पेआउट समस्या',
      pa: 'ਪੇ-ਆਊਟ',
    },
  },
  {
    id: 'medical_aid',
    category: 'workplace_safety',
    title: {
      en: 'Road Accident & Medical Aid',
      hi: 'सड़क दुर्घटना व चिकित्सा सहायता',
      pa: 'ਸੜਕ ਹਾਦਸਾ ਤੇ ਮੈਡੀਕਲ ਮਦਦ',
    },
    description: {
      en: 'Hospital emergency guidance and platform group accident insurance claim.',
      hi: 'ड्यूटी पर सड़क दुर्घटना बीमा क्लेम व अस्पताल सहायता का मार्गदर्शन।',
      pa: 'ਡਿਊਟੀ ਦੌਰਾਨ ਹਾਦਸਾ ਹੋਣ ਤੇ ਹਸਪਤਾਲ ਸਹਾਇਤਾ ਅਤੇ ਇੰਸ਼ੋਰੈਂਸ ਕਲੇਮ।',
    },
    icon: <HeartPulse className="w-5 h-5 text-[#D32F2F]" />,
    prompt: {
      en: 'I met with a road accident while delivering an order. How do I claim the platform accidental insurance policy and get emergency help?',
      hi: 'ऑर्डर डिलीवरी के दौरान मेरा एक्सीडेंट हो गया। कंपनी के एक्सीडेंटल इंश्योरेंस का क्लेम कैसे करें?',
      pa: 'ਆਰਡਰ ਡਿਲੀਵਰੀ ਦੌਰਾਨ ਹਾਦਸਾ ਹੋ ਗਿਆ ਹੈ। ਮੈਂ ਕੰਪਨੀ ਦੀ ਇੰਸ਼ੋਰੈਂਸ ਦਾ ਕਲੇਮ ਕਿਵੇਂ ਕਰਾਂ?',
    },
    accentColor: 'border-[#D32F2F]/20 bg-red-50/30',
    badge: {
      en: 'Emergency & Aid',
      hi: 'आपातकालीन सहायता',
      pa: 'ਮੈਡੀਕਲ ਸਹਾਇਤਾ',
    },
  },
  {
    id: 'draft_complaint',
    category: 'other',
    title: {
      en: 'Draft Grievance Letter',
      hi: 'औपचारिक शिकायत पत्र तैयार करें',
      pa: 'ਕਾਨੂੰਨੀ ਸ਼ਿਕਾਇਤ ਪੱਤਰ ਲਿਖੋ',
    },
    description: {
      en: 'Create a formal notice for platform Grievance Officers & labor bodies.',
      hi: 'कंपनी के नोडल ग्रीवेंस ऑफिसर और उपभोक्ता फोरम के लिए औपचारिक पत्र बनाएं।',
      pa: 'ਕੰਪਨੀ ਦੇ ਨੋਡਲ ਅਧਿਕਾਰੀ ਲਈ ਰਸਮੀ ਸ਼ਿਕਾਇਤ ਪੱਤਰ ਤਿਆਰ ਕਰੋ।',
    },
    icon: <FileText className="w-5 h-5 text-[#0B3328]" />,
    prompt: {
      en: 'Help me draft a formal legal complaint letter to the platform Grievance Officer regarding an unresolved workplace dispute.',
      hi: 'प्लेटफॉर्म के ग्रीवेंस ऑफिसर को भेजने के लिए एक औपचारिक शिकायत पत्र तैयार करने में मदद करें।',
      pa: 'ਕੰਪਨੀ ਦੇ ਗ੍ਰੀਵੈਂਸ ਅਧਿਕਾਰੀ ਨੂੰ ਭੇਜਣ ਲਈ ਇੱਕ ਰਸਮੀ ਸ਼ਿਕਾਇਤ ਪੱਤਰ ਲਿਖਣ ਵਿੱਚ ਮਦਦ ਕਰੋ।',
    },
    accentColor: 'border-[#0B3328]/20 bg-[#F7F8F3]',
    badge: {
      en: '1-Click Notice',
      hi: 'औपचारिक नोटिस',
      pa: 'ਸ਼ਿਕਾਇਤ ਪੱਤਰ',
    },
  },
];

interface QuickActionCardProps {
  language: Language;
  onSelectAction: (promptText: string, category: ProblemCategory) => void;
  disabled?: boolean;
}

export function QuickActionCards({
  language,
  onSelectAction,
  disabled = false,
}: QuickActionCardProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
      {QUICK_ACTIONS.map((action) => (
        <button
          key={action.id}
          type="button"
          disabled={disabled}
          onClick={() => onSelectAction(action.prompt[language] || action.prompt.en, action.category)}
          className={`min-h-[110px] p-4 sm:p-5 rounded-2xl border text-left transition-all flex flex-col justify-between group hover:border-[#0B3328] hover:shadow-md active:scale-[0.98] cursor-pointer bg-white ${action.accentColor}`}
        >
          <div className="flex items-start justify-between gap-3 w-full">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-white border border-[#DDE5DD] flex items-center justify-center shrink-0 shadow-2xs group-hover:bg-[#B8EF43] group-hover:border-[#B8EF43] transition-colors">
                {action.icon}
              </div>
              <div>
                <span className="text-[11px] font-extrabold px-2 py-0.5 rounded-full bg-[#0B3328]/5 text-[#0B3328] uppercase tracking-wider">
                  {action.badge[language] || action.badge.en}
                </span>
                <h3 className="text-[17px] sm:text-[18px] font-bold text-[#17251F] mt-1 group-hover:text-[#0B3328] transition-colors leading-snug">
                  {action.title[language] || action.title.en}
                </h3>
              </div>
            </div>
            <div className="w-8 h-8 rounded-full bg-[#F7F8F3] group-hover:bg-[#0B3328] group-hover:text-white flex items-center justify-center text-[#64736A] transition-colors shrink-0">
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          <p className="text-[13px] text-[#64736A] mt-2 leading-relaxed font-medium">
            {action.description[language] || action.description.en}
          </p>
        </button>
      ))}
    </div>
  );
}
