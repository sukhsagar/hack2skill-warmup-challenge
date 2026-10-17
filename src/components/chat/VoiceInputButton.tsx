'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Language } from '@/types';
import { Mic, MicOff, AlertCircle } from 'lucide-react';

interface VoiceInputButtonProps {
  language: Language;
  onTranscript: (text: string) => void;
  disabled?: boolean;
}

interface SpeechRecognitionResultItem {
  transcript: string;
}

interface SpeechRecognitionResultList {
  [index: number]: {
    [index: number]: SpeechRecognitionResultItem;
    length: number;
  };
  length: number;
}

interface SpeechRecognitionEvent {
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionInstance {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: (event: SpeechRecognitionEvent) => void;
  onerror: (event: { error: string }) => void;
  onend: () => void;
  start: () => void;
  stop: () => void;
  abort: () => void;
}

export function VoiceInputButton({
  language,
  onTranscript,
  disabled = false,
}: VoiceInputButtonProps) {
  const [isListening, setIsListening] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);

  // Initialize or check speech recognition capability
  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, []);

  const getRecognitionLang = (lang: Language) => {
    switch (lang) {
      case 'hi':
        return 'hi-IN';
      case 'pa':
        return 'pa-IN';
      default:
        return 'en-IN';
    }
  };

  const startListening = () => {
    setErrorMessage(null);

    const windowWithSpeech = window as unknown as {
      SpeechRecognition?: new () => SpeechRecognitionInstance;
      webkitSpeechRecognition?: new () => SpeechRecognitionInstance;
    };

    const SpeechRec =
      windowWithSpeech.SpeechRecognition || windowWithSpeech.webkitSpeechRecognition;

    if (!SpeechRec) {
      setErrorMessage('Speech recognition is not supported in this browser. Please type your message.');
      return;
    }

    try {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }

      const rec = new SpeechRec();
      rec.continuous = false;
      rec.interimResults = true;
      rec.lang = getRecognitionLang(language);

      rec.onresult = (event: SpeechRecognitionEvent) => {
        let finalTrans = '';
        for (let i = 0; i < event.results.length; ++i) {
          finalTrans += event.results[i][0].transcript;
        }
        if (finalTrans) {
          onTranscript(finalTrans);
        }
      };

      rec.onerror = (event: { error: string }) => {
        console.warn('Speech recognition error:', event.error);
        if (event.error === 'not-allowed') {
          setErrorMessage('Microphone access was denied. Please allow microphone permissions or type instead.');
        } else if (event.error === 'no-speech') {
          // No speech detected, quietly reset
        } else {
          setErrorMessage(`Voice input error (${event.error}). Please type your message.`);
        }
        setIsListening(false);
      };

      rec.onend = () => {
        setIsListening(false);
      };

      rec.start();
      recognitionRef.current = rec;
      setIsListening(true);
    } catch (err: unknown) {
      console.error('Failed to start speech recognition:', err);
      setIsListening(false);
      setErrorMessage('Unable to start voice recording. Please type your request.');
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
  };

  const toggleListening = () => {
    if (disabled) return;
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={toggleListening}
        disabled={disabled}
        aria-label={isListening ? 'Stop listening' : 'Start voice input'}
        className={`w-13 h-13 rounded-2xl flex items-center justify-center transition-all select-none ${
          isListening
            ? 'bg-[#D32F2F] text-white shadow-lg animate-pulse ring-4 ring-[#D32F2F]/30 scale-105'
            : 'bg-[#F7F8F3] hover:bg-[#EBF7EB] text-[#0B3328] border border-[#DDE5DD] hover:border-[#0B3328]'
        } disabled:opacity-40 disabled:pointer-events-none active:scale-95`}
      >
        {isListening ? (
          <MicOff className="w-5 h-5 animate-spin" />
        ) : (
          <Mic className="w-5 h-5 text-[#0B3328]" />
        )}
      </button>

      {/* Inline Speech Notice for Unsupported or Error State */}
      {errorMessage && (
        <div className="absolute bottom-16 right-0 z-50 w-72 p-3 rounded-2xl bg-white border border-[#DDE5DD] shadow-lg text-xs text-[#17251F] flex items-start gap-2 animate-in fade-in slide-in-from-bottom-2">
          <AlertCircle className="w-4 h-4 text-[#D32F2F] shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="leading-snug font-medium">{errorMessage}</p>
            <button
              type="button"
              onClick={() => setErrorMessage(null)}
              className="mt-1 text-[11px] font-bold text-[#0B3328] underline"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
