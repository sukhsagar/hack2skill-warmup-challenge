'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Language, ProblemCategory, RightsResponse, WorkerOnboardingProfile } from '@/types';
import { ChatMessageItem } from './types';
import { QuickActionCards } from './QuickActionCard';
import { ChatMessage } from './ChatMessage';
import { ChatComposer } from './ChatComposer';
import { Sparkles, MessageSquare, RefreshCw } from 'lucide-react';

interface ChatInterfaceProps {
  language: Language;
  workerProfile: WorkerOnboardingProfile | null;
  onDraftComplaint: (prefillQuery: string, category?: ProblemCategory) => void;
  onOpenMedical: () => void;
}

const STORAGE_CHAT_KEY = 'awaaz_chat_history_v2';

let messageCounter = 0;
const createUniqueId = (prefix: string) => {
  messageCounter += 1;
  return `${prefix}_${messageCounter}_${Math.random().toString(36).slice(2, 8)}`;
};

export function ChatInterface({
  language,
  workerProfile,
  onDraftComplaint,
  onOpenMedical,
}: ChatInterfaceProps) {
  const { user } = useAuth();
  const [messages, setMessages] = useState<ChatMessageItem[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = sessionStorage.getItem(STORAGE_CHAT_KEY);
        if (saved) {
          return JSON.parse(saved);
        }
      } catch {
        // ignore
      }
    }
    return [];
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Save chat history to sessionStorage
  const persistMessages = (newMessages: ChatMessageItem[]) => {
    setMessages(newMessages);
    if (typeof window !== 'undefined') {
      try {
        sessionStorage.setItem(STORAGE_CHAT_KEY, JSON.stringify(newMessages));
      } catch {
        // ignore
      }
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages, isLoading]);

  const handleSendMessage = async (text: string, category?: ProblemCategory) => {
    const timestamp = new Date().toISOString();
    const userMsg: ChatMessageItem = {
      id: createUniqueId('msg_u'),
      sender: 'user',
      text,
      timestamp,
      category,
    };

    const updatedWithUser = [...messages, userMsg];
    persistMessages(updatedWithUser);
    setIsLoading(true);

    try {
      const response = await fetch('/api/rights', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: text,
          language,
          workerProfile,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Server responded with status ${response.status}`);
      }

      const rightsData: RightsResponse = await response.json();

      const assistantMsg: ChatMessageItem = {
        id: createUniqueId('msg_a'),
        sender: 'assistant',
        text: rightsData.plainExplanation,
        timestamp: new Date().toISOString(),
        rightsData,
        category,
      };

      persistMessages([...updatedWithUser, assistantMsg]);
    } catch (err: unknown) {
      const error = err as Error;
      console.error('Chat AI query failed:', error);

      const errorMsg: ChatMessageItem = {
        id: createUniqueId('msg_err'),
        sender: 'assistant',
        text:
          language === 'hi'
            ? 'क्षमा करें, AI सर्वर से जुड़ने में समस्या आई। कृपया पुनः प्रयास करें अथवा सीधे औपचारिक शिकायत दर्ज करें।'
            : language === 'pa'
            ? 'ਮੁਆਫ਼ ਕਰਨਾ, ਸਰਵਰ ਨਾਲ ਸੰਪਰਕ ਨਹੀਂ ਹੋ ਸਕਿਆ। ਕਿਰਪਾ ਕਰਕੇ ਮੁੜ ਕੋਸ਼ਿਸ਼ ਕਰੋ।'
            : 'Unable to connect to the legal AI reasoning server right now. You can retry or jump straight to drafting a formal complaint.',
        timestamp: new Date().toISOString(),
        error: error.message,
      };

      persistMessages([...updatedWithUser, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    if (window.confirm('Clear conversation history?')) {
      persistMessages([]);
    }
  };

  const getGreeting = () => {
    const firstName = user?.displayName ? user.displayName.split(' ')[0] : 'Partner';
    switch (language) {
      case 'hi':
        return `नमस्ते, ${firstName}`;
      case 'pa':
        return `ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ, ${firstName}`;
      default:
        return `Hello, ${firstName}`;
    }
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-140px)]">
      {/* Scrollable Conversation Stream */}
      <div className="flex-1 px-4 sm:px-6 py-4 max-w-4xl mx-auto w-full pb-32">
        {/* If no messages yet, display welcoming chat home */}
        {messages.length === 0 ? (
          <div className="space-y-6 pt-2 sm:pt-4">
            {/* Greeting & Value Proposition */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#DDE5DD] shadow-sm space-y-3">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#B8EF43] ring-4 ring-[#B8EF43]/30 animate-pulse" />
                  <span className="text-xs font-extrabold uppercase tracking-wider text-[#0B3328]">
                    AI Companion Active
                  </span>
                </div>
                {user?.isDemoUser && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#EBF7EB] text-[#0B3328] border border-[#0B3328]/10">
                    Demo Worker Mode
                  </span>
                )}
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#17251F] tracking-tight">
                {getGreeting()}
              </h2>

              <p className="text-[16px] sm:text-[17px] text-[#64736A] leading-relaxed font-medium max-w-2xl">
                {language === 'hi'
                  ? 'अपनी भाषा में बोलें या लिखें। डिलीवरी आईडी ब्लॉक, रुके हुए इंसेंटिव, सड़क दुर्घटना और कानूनी अधिकारों के समाधान तुरंत पाएं।'
                  : language === 'pa'
                  ? 'ਆਪਣੀ ਬੋਲੀ ਵਿੱਚ ਗੱਲ ਕਰੋ। ਆਈਡੀ ਬੰਦ ਹੋਣ, ਰੁਕੇ ਹੋਏ ਪੈਸੇ ਜਾਂ ਸੜਕ ਹਾਦਸੇ ਦੇ ਨਿਪਟਾਰੇ ਲਈ ਤੁਰੰਤ ਕਾਨੂੰਨੀ ਅਗਵਾਈ ਪ੍ਰਾਪਤ ਕਰੋ।'
                  : 'Ask anything in plain language. Get instant statutory guidance, platform dispute letters, and emergency aid without complicated menus.'}
              </p>
            </div>

            {/* Contextual Quick Actions (Max 4 as requested) */}
            <div>
              <div className="flex items-center justify-between mb-2 px-1">
                <span className="text-xs font-extrabold uppercase tracking-wider text-[#64736A]">
                  Common Workplace Issues (1-Tap Questions)
                </span>
              </div>
              <QuickActionCards
                language={language}
                onSelectAction={(promptText, cat) => handleSendMessage(promptText, cat)}
                disabled={isLoading}
              />
            </div>
          </div>
        ) : (
          /* Active Chat Conversation History */
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#DDE5DD]">
              <span className="text-xs font-bold text-[#64736A] flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-[#0B3328]" />
                <span>Conversation with Awaaz</span>
              </span>
              <button
                type="button"
                onClick={handleClearChat}
                className="text-xs text-[#64736A] hover:text-[#0B3328] font-bold transition-colors flex items-center gap-1"
              >
                <RefreshCw className="w-3 h-3" />
                <span>New Question</span>
              </button>
            </div>

            {messages.map((msg) => (
              <ChatMessage
                key={msg.id}
                sender={msg.sender}
                text={msg.text}
                timestamp={msg.timestamp}
                rightsData={msg.rightsData}
                language={language}
                onDraftComplaint={(prefill) => onDraftComplaint(prefill, msg.category)}
                onOpenMedical={onOpenMedical}
                onRetry={
                  msg.error ? () => handleSendMessage(messages[messages.length - 2]?.text || '') : undefined
                }
              />
            ))}

            {/* Real-time AI thinking indicator */}
            {isLoading && (
              <div className="flex justify-start my-4">
                <div className="p-4 sm:p-5 rounded-3xl bg-white border border-[#DDE5DD] shadow-xs flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#0B3328] text-[#B8EF43] flex items-center justify-center font-bold text-sm">
                    <Sparkles className="w-4 h-4 animate-spin text-[#B8EF43]" />
                  </div>
                  <div>
                    <span className="text-sm font-bold text-[#17251F]">
                      Reasoning with Labor Codes & Rules...
                    </span>
                    <span className="text-[12px] text-[#64736A] block">
                      Consulting Code on Social Security 2020 & Intermediary Guidelines
                    </span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Persistent Bottom Chat Composer */}
      <ChatComposer
        language={language}
        onSendMessage={(text) => handleSendMessage(text)}
        isLoading={isLoading}
      />
    </div>
  );
}
