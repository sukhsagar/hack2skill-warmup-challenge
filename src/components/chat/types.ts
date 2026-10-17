import { ProblemCategory, RightsResponse } from '@/types';

export interface ChatActionCard {
  id: string;
  title: string;
  subtitle?: string;
  actionType: 'draft_complaint' | 'call_helpline' | 'open_medical' | 'open_rights' | 'open_onboarding';
  category?: ProblemCategory;
  prefillQuery?: string;
  phone?: string;
  externalUrl?: string;
}

export interface ChatMessageItem {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  text: string;
  timestamp: string;
  rightsData?: RightsResponse;
  actionCards?: ChatActionCard[];
  category?: ProblemCategory;
  isStreaming?: boolean;
  error?: string;
}

export type MainTab = 'chat' | 'work' | 'community' | 'profile';
