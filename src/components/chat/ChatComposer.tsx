'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Language } from '@/types';
import { VoiceInputButton } from './VoiceInputButton';
import { Send, Loader2 } from 'lucide-react';

interface ChatComposerProps {
  language: Language;
  onSendMessage: (text: string) => void;
  isLoading: boolean;
  placeholder?: string;
}

export function ChatComposer({
  language,
  onSendMessage,
  isLoading,
  placeholder,
}: ChatComposerProps) {
  const [inputText, setInputText] = useState<string>('');
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const getLocalizedPlaceholder = () => {
    if (placeholder) return placeholder;
    switch (language) {
      case 'hi':
        return 'अपनी समस्या लिखें या बोलें (उदा. आईडी ब्लॉक, कटी हुई राशि)...';
      case 'pa':
        return 'ਆਪਣੀ ਸਮੱਸਿਆ ਲਿਖੋ ਜਾਂ ਬੋਲੋ (ਜਿਵੇਂ ਆਈਡੀ ਬਲਾਕ, ਕਟੌਤੀ)...';
      default:
        return 'Ask a question or speak your issue (e.g. blocked ID, wage deduction)...';
    }
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = inputText.trim();
    if (!trimmed || isLoading) return;

    onSendMessage(trimmed);
    setInputText('');

    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleVoiceTranscript = (transcript: string) => {
    setInputText((prev) => {
      const updated = prev ? `${prev} ${transcript}` : transcript;
      return updated;
    });
  };

  // Adjust textarea height up to a max
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [inputText]);

  return (
    <div className="fixed bottom-16 sm:bottom-18 left-0 right-0 z-30 bg-[#F7F8F3]/98 backdrop-blur-md border-t border-[#DDE5DD] p-3 sm:p-4 shadow-sm">
      <div className="max-w-4xl mx-auto">
        <form
          onSubmit={handleSubmit}
          className="min-h-[64px] rounded-2xl bg-white border-2 border-[#DDE5DD] focus-within:border-[#0B3328] focus-within:ring-2 focus-within:ring-[#0B3328]/10 shadow-sm p-1.5 flex items-end gap-2 transition-all"
        >
          {/* Text input area */}
          <textarea
            ref={textareaRef}
            rows={1}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={getLocalizedPlaceholder()}
            disabled={isLoading}
            className="flex-1 max-h-32 min-h-[44px] py-2.5 px-3.5 bg-transparent text-[#17251F] text-[16px] sm:text-[17px] font-medium placeholder:text-[#64736A] focus:outline-hidden resize-none leading-relaxed"
            aria-label="Type your message"
          />

          {/* Action buttons (Microphone and Send) */}
          <div className="flex items-center gap-1.5 shrink-0 pb-1 pr-1">
            <VoiceInputButton
              language={language}
              onTranscript={handleVoiceTranscript}
              disabled={isLoading}
            />

            <button
              type="submit"
              disabled={!inputText.trim() || isLoading}
              aria-label="Send message"
              className="w-13 h-13 rounded-2xl bg-[#0B3328] hover:bg-[#07221B] text-[#B8EF43] disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center transition-all shadow-xs active:scale-95 shrink-0"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin text-[#B8EF43]" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
