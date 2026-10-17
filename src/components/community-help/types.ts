import { Language, BloodGroup } from '@/types';

export type CommunityHelpType = 'legal' | 'medical';

export type RequestStatus = 'open' | 'in_review' | 'resolved' | 'closed';

export type LegalCategory =
  | 'id_deactivation'
  | 'wage_theft'
  | 'penalty_dispute'
  | 'accident_compensation'
  | 'welfare_dispute'
  | 'contract_issue'
  | 'other_legal';

export type MedicalCategory =
  | 'blood_requirement'
  | 'road_accident'
  | 'first_aid'
  | 'hospital_navigation'
  | 'heatstroke_relief'
  | 'equipment_support'
  | 'emergency_welfare'
  | 'other_medical';

export type UrgencyLevel = 'routine' | 'urgent' | 'immediate';

export interface BloodDonorRecord {
  id: string;
  name: string;
  bloodGroup: BloodGroup;
  city: string;
  contactRelay: string;
  lastActive: string;
  verifiedWorker: boolean;
  platform: string;
}

export interface CommunityRequest {
  id: string;
  type: CommunityHelpType;
  category: LegalCategory | MedicalCategory | string;
  title: string;
  sanitizedDescription: string;
  broadLocation: string; // Broad City or District only (e.g. "South Delhi", "Bengaluru")
  bloodGroupRequired?: BloodGroup;
  language: Language;
  urgency: UrgencyLevel;
  contactPreference: 'in_app' | 'phone_relay' | 'email_relay';
  consentGiven: boolean;
  status: RequestStatus;
  createdAt: string;
  updatedAt: string;
  userId: string;
  userDisplayName?: string; // Anonymized / pseudonym
  isDemoExample?: boolean;
  closureReason?: string;
  closedAt?: string;
}

export interface LegalHelpFormData {
  category: LegalCategory;
  city: string;
  preferredLanguage: Language;
  urgency: UrgencyLevel;
  summary: string;
  consentGiven: boolean;
}

export interface MedicalAidFormData {
  category: MedicalCategory;
  city: string;
  urgency: UrgencyLevel;
  supportNeeded: string;
  contactMethod: 'in_app' | 'phone_relay' | 'email_relay';
  consentGiven: boolean;
}

export interface PersistenceStatus {
  isCloudConfigured: boolean;
  isLocalStorageAvailable: boolean;
  persistenceType: 'local_device' | 'cloud_firestore' | 'none';
  statusMessage: string;
}
