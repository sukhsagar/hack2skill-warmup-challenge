export type Language = 'en' | 'hi' | 'pa';

export interface UserProfile {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  isDemoUser?: boolean;
}

export type ProblemCategory =
  | 'delayed_wages'
  | 'unfair_deductions'
  | 'missing_incentives'
  | 'account_suspension'
  | 'workplace_safety'
  | 'welfare_schemes'
  | 'other';

export interface OfficialResource {
  name: string;
  organization: string;
  description: string;
  url: string;
  helpline?: string;
  category: ProblemCategory | 'general';
}

export interface RightsResponse {
  plainExplanation: string;
  relevantProtections: string[];
  practicalNextSteps: string[];
  documentsToCollect: string[];
  clarifyingQuestions?: string[];
  disclaimer: string;
  verifiedResources?: OfficialResource[];
  isSampleResponse?: boolean;
}

export interface ComplaintFormData {
  category: ProblemCategory;
  platform: string;
  incidentDescription: string;
  incidentDate?: string;
  disputedAmount?: string;
  workerIdentifier?: string; // e.g. Partner ID or Vehicle No.
  desiredResolution?: string;
  language: Language;
}

export interface ComplaintDraft {
  id: string;
  userId: string;
  category: ProblemCategory;
  platform: string;
  subject: string;
  complaintBody: string;
  evidenceChecklist: string[];
  suggestedEscalation: string[];
  language: Language;
  createdAt: string;
  updatedAt: string;
  isSampleDraft?: boolean;
}
