'use client';

import React, { useState } from 'react';
import { Language, ProblemCategory, RightsResponse } from '@/types';
import { ChatActionCard } from './types';
import {
  Scale,
  CheckCircle,
  FileText,
  PhoneCall,
  Volume2,
  VolumeX,
  Edit3,
  HeartPulse,
  RotateCcw,
} from 'lucide-react';

interface ChatMessageProps {
  sender: 'user' | 'assistant' | 'system';
  text: string;
  timestamp: string;
  rightsData?: RightsResponse;
  actionCards?: ChatActionCard[];
  language: Language;
  onDraftComplaint?: (prefillQuery: string, category?: ProblemCategory) => void;
  onOpenMedical?: () => void;
  onRetry?: () => void;
}

export function ChatMessage({
  sender,
  text,
  timestamp,
  rightsData,
  language,
  onDraftComplaint,
  onOpenMedical,
  onRetry,
}: ChatMessageProps) {
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  const handleSpeak = (content: string) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(content);
    utterance.lang = language === 'hi' ? 'hi-IN' : language === 'pa' ? 'pa-IN' : 'en-IN';
    utterance.rate = 0.95;

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  if (sender === 'user') {
    return (
      <div className="flex justify-end my-3 sm:my-4">
        <div className="max-w-[88%] sm:max-w-xl rounded-3xl rounded-tr-sm bg-[#0B3328] text-white p-4 sm:p-5 shadow-xs">
          <p className="text-[16px] sm:text-[17px] font-medium leading-relaxed whitespace-pre-wrap">
            {text}
          </p>
          <div className="text-[11px] text-[#B8EF43] font-semibold mt-1.5 text-right font-mono">
            {new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
      </div>
    );
  }

  // Assistant Message
  const fullSpeakText = rightsData
    ? `${rightsData.plainExplanation}. Key steps: ${rightsData.practicalNextSteps.join('. ')}`
    : text;

  return (
    <div className="flex justify-start my-4 sm:my-5">
      <div className="w-full max-w-2xl rounded-3xl rounded-tl-sm bg-white border border-[#DDE5DD] p-5 sm:p-6 shadow-sm space-y-4">
        {/* Assistant Header */}
        <div className="flex items-center justify-between border-b border-[#DDE5DD] pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#0B3328] text-[#B8EF43] flex items-center justify-center font-extrabold text-sm shadow-2xs">
              आ
            </div>
            <div>
              <span className="text-[15px] font-extrabold text-[#17251F] tracking-tight">
                Awaaz Legal & Rights Guidance
              </span>
              <span className="text-[11px] text-[#64736A] font-semibold block">
                Official Statutory & Regulatory Context
              </span>
            </div>
          </div>

          {/* Audio speech synthesis toggle */}
          <button
            type="button"
            onClick={() => handleSpeak(fullSpeakText)}
            className={`h-9 px-2.5 rounded-xl border flex items-center gap-1.5 text-xs font-bold transition-all ${
              isSpeaking
                ? 'bg-[#B8EF43] border-[#B8EF43] text-[#0B3328] shadow-xs'
                : 'bg-[#F7F8F3] hover:bg-[#EBF7EB] border-[#DDE5DD] text-[#0B3328]'
            }`}
            title={isSpeaking ? 'Stop voice readout' : 'Listen to guidance aloud'}
            aria-label="Listen to response"
          >
            {isSpeaking ? (
              <>
                <VolumeX className="w-4 h-4 text-[#0B3328]" />
                <span className="hidden sm:inline">Stop</span>
              </>
            ) : (
              <>
                <Volume2 className="w-4 h-4 text-[#0B3328]" />
                <span className="hidden sm:inline">Listen</span>
              </>
            )}
          </button>
        </div>

        {/* Primary Explanation Text */}
        <div className="text-[16px] sm:text-[17px] text-[#17251F] leading-relaxed font-normal">
          {rightsData ? rightsData.plainExplanation : text}
        </div>

        {/* Structured Rights Details (if available) */}
        {rightsData && (
          <div className="space-y-4 pt-2">
            {/* Legal Protections */}
            {rightsData.relevantProtections && rightsData.relevantProtections.length > 0 && (
              <div className="p-4 rounded-2xl bg-[#F7F8F3] border border-[#DDE5DD] space-y-2">
                <div className="flex items-center gap-2 text-xs font-extrabold text-[#0B3328] uppercase tracking-wider">
                  <Scale className="w-4 h-4 text-[#0B3328]" />
                  <span>Applicable Labor Codes & Rules</span>
                </div>
                <ul className="space-y-1.5 text-[14px] sm:text-[15px] text-[#304138]">
                  {rightsData.relevantProtections.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0B3328] mt-2 shrink-0" />
                      <span className="leading-snug font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Practical Next Steps */}
            {rightsData.practicalNextSteps && rightsData.practicalNextSteps.length > 0 && (
              <div className="p-4 rounded-2xl bg-[#EBF7EB]/60 border border-[#B8EF43]/50 space-y-2">
                <div className="flex items-center gap-2 text-xs font-extrabold text-[#0B3328] uppercase tracking-wider">
                  <CheckCircle className="w-4 h-4 text-[#0B3328]" />
                  <span>Immediate Action Checklist</span>
                </div>
                <ol className="space-y-2 text-[14px] sm:text-[15px] text-[#17251F]">
                  {rightsData.practicalNextSteps.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-[#0B3328] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span className="leading-snug font-semibold">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {/* Documents to collect */}
            {rightsData.documentsToCollect && rightsData.documentsToCollect.length > 0 && (
              <div className="p-3.5 rounded-xl bg-stone-50 border border-[#DDE5DD] space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-bold text-[#64736A] uppercase tracking-wider">
                  <FileText className="w-3.5 h-3.5" />
                  <span>Evidence to Screenshot & Keep Safe</span>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {rightsData.documentsToCollect.map((doc, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-2.5 py-1 rounded-lg bg-white border border-[#DDE5DD] text-[#17251F] font-medium"
                    >
                      {doc}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Official Helplines Directory */}
            {rightsData.verifiedResources && rightsData.verifiedResources.length > 0 && (
              <div className="pt-1 flex flex-wrap gap-2">
                {rightsData.verifiedResources.map((res, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-[#F7F8F3] border border-[#DDE5DD] text-xs flex items-center justify-between gap-3 w-full sm:w-auto flex-1 min-w-[200px]"
                  >
                    <div>
                      <div className="font-bold text-[#17251F]">{res.name}</div>
                      <div className="text-[11px] text-[#64736A]">{res.organization}</div>
                    </div>
                    {res.helpline && (
                      <a
                        href={`tel:${res.helpline.replace(/\D/g, '')}`}
                        className="px-2.5 py-1.5 rounded-lg bg-[#0B3328] text-[#B8EF43] font-bold text-[11px] flex items-center gap-1 shrink-0"
                      >
                        <PhoneCall className="w-3 h-3" />
                        <span>{res.helpline}</span>
                      </a>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Action Result Card: Direct 1-Click Transitions */}
        <div className="pt-3 border-t border-[#DDE5DD] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
          {onDraftComplaint && (
            <button
              type="button"
              onClick={() => onDraftComplaint(rightsData ? rightsData.plainExplanation : text)}
              className="min-h-[52px] px-5 py-3 rounded-2xl bg-[#0B3328] hover:bg-[#07221B] text-white flex items-center justify-center gap-2 font-bold text-sm shadow-sm transition-all active:scale-[0.98]"
            >
              <Edit3 className="w-4 h-4 text-[#B8EF43]" />
              <span>Draft Formal Grievance Letter</span>
            </button>
          )}

          <div className="flex items-center gap-2">
            <a
              href="tel:1915"
              className="min-h-[52px] flex-1 sm:flex-none px-4 py-3 rounded-2xl bg-white border border-[#DDE5DD] hover:border-[#0B3328] text-[#0B3328] flex items-center justify-center gap-2 text-xs font-bold transition-all shadow-2xs"
            >
              <PhoneCall className="w-4 h-4 text-[#0B3328]" />
              <span>National Consumer Helpline (1915)</span>
            </a>

            {onOpenMedical && (
              <button
                type="button"
                onClick={onOpenMedical}
                className="min-h-[52px] p-3 rounded-2xl bg-red-50 hover:bg-red-100 border border-red-200 text-red-700 flex items-center justify-center gap-1.5 text-xs font-bold transition-all"
                title="Open Emergency Medical & Accident Aid"
              >
                <HeartPulse className="w-4 h-4" />
                <span className="hidden sm:inline">Medical Aid</span>
              </button>
            )}
          </div>
        </div>

        {/* Retry on failure */}
        {onRetry && (
          <div className="pt-2">
            <button
              type="button"
              onClick={onRetry}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-xs font-bold text-[#17251F]"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Try Asking Again</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
