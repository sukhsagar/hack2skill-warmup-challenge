import { CommunityRequest, PersistenceStatus, RequestStatus } from './types';

const STORAGE_PREFIX = 'awaaz_community_requests_';

export function getPersistenceStatus(): PersistenceStatus {
  // In the current architecture, Firebase Authentication is configured but Firestore
  // collections and security rules are not established yet.
  const hasLocalStorage = typeof window !== 'undefined' && Boolean(window.localStorage);

  return {
    isCloudConfigured: false,
    isLocalStorageAvailable: hasLocalStorage,
    persistenceType: hasLocalStorage ? 'local_device' : 'none',
    statusMessage:
      'Shared cloud database (Firestore) is not configured yet. Requests are persisted to this device only and will not be visible on other users’ devices.',
  };
}

export function getStorageKey(userId?: string): string {
  return `${STORAGE_PREFIX}${userId || 'guest'}`;
}

export function loadUserRequests(userId?: string): CommunityRequest[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(getStorageKey(userId));
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch (err) {
    console.error('[CommunityHelp Storage] Failed to load requests:', err);
    return [];
  }
}

export async function saveNewRequest(
  newRequest: Omit<CommunityRequest, 'id' | 'createdAt' | 'updatedAt' | 'status' | 'userId'>,
  userId?: string,
  simulateFailure = false
): Promise<CommunityRequest> {
  // Emulate realistic async network/write latency
  await new Promise((resolve) => setTimeout(resolve, 400));

  if (simulateFailure) {
    throw new Error('Simulated storage write error. Database connection rejected.');
  }

  if (typeof window === 'undefined') {
    throw new Error('Browser window environment not available.');
  }

  const existing = loadUserRequests(userId);
  const now = new Date().toISOString();

  const record: CommunityRequest = {
    ...newRequest,
    id: `req_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    status: 'open',
    createdAt: now,
    updatedAt: now,
    userId: userId || 'guest',
  };

  try {
    const updated = [record, ...existing];
    localStorage.setItem(getStorageKey(userId), JSON.stringify(updated));
    return record;
  } catch (err: unknown) {
    const error = err as Error;
    console.error('[CommunityHelp Storage] Failed to save request:', error);
    throw new Error(`Device storage error: ${error.message || 'Storage quota exceeded or write failed.'}`);
  }
}

export async function updateRequestStatus(
  requestId: string,
  newStatus: RequestStatus,
  closureReason?: string,
  userId?: string
): Promise<CommunityRequest> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  const existing = loadUserRequests(userId);
  const index = existing.findIndex((r) => r.id === requestId);

  if (index === -1) {
    throw new Error('Request record not found.');
  }

  const current = existing[index];
  const now = new Date().toISOString();

  const updatedRecord: CommunityRequest = {
    ...current,
    status: newStatus,
    updatedAt: now,
    closureReason: closureReason || current.closureReason,
    closedAt: newStatus === 'closed' || newStatus === 'resolved' ? now : undefined,
  };

  existing[index] = updatedRecord;

  try {
    localStorage.setItem(getStorageKey(userId), JSON.stringify(existing));
    return updatedRecord;
  } catch (err: unknown) {
    const error = err as Error;
    throw new Error(`Failed to update status: ${error.message}`);
  }
}

export async function deleteUserRequest(requestId: string, userId?: string): Promise<boolean> {
  await new Promise((resolve) => setTimeout(resolve, 200));
  const existing = loadUserRequests(userId);
  const filtered = existing.filter((r) => r.id !== requestId);
  try {
    localStorage.setItem(getStorageKey(userId), JSON.stringify(filtered));
    return true;
  } catch {
    return false;
  }
}

/**
 * Curated example/demonstration requests.
 * Stamped explicitly with `isDemoExample: true` so they are never presented as real user submissions.
 */
export const SAMPLE_COMMUNITY_REQUESTS: CommunityRequest[] = [
  {
    id: 'demo_sample_1',
    type: 'legal',
    category: 'id_deactivation',
    title: 'Arbitrary Account Block after Customer False Rating',
    sanitizedDescription:
      'Delivery partner account was abruptly blocked following a dispute with a customer who gave an unverified 1-star review. Seeking guidance on filing a formal appeal with the platform Grievance Officer.',
    broadLocation: 'North Bengaluru, Karnataka',
    language: 'en',
    urgency: 'urgent',
    contactPreference: 'in_app',
    consentGiven: true,
    status: 'in_review',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
    userId: 'demo_user_bengaluru',
    userDisplayName: 'Partner R. (Swiggy)',
    isDemoExample: true,
  },
  {
    id: 'demo_sample_2',
    type: 'medical',
    category: 'road_accident',
    title: 'Two-Wheeler Skidding Assistance & Hospital Guidance',
    sanitizedDescription:
      'Partner experienced minor road skid while delivering an order in wet conditions. Minor abrasions treated; seeking guidance on claiming platform group accident insurance benefits.',
    broadLocation: 'East Delhi, Delhi NCR',
    language: 'hi',
    urgency: 'routine',
    contactPreference: 'phone_relay',
    consentGiven: true,
    status: 'resolved',
    createdAt: new Date(Date.now() - 86400000 * 4).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 1).toISOString(),
    userId: 'demo_user_delhi',
    userDisplayName: 'Rider S. (Zomato)',
    isDemoExample: true,
    closedAt: new Date(Date.now() - 86400000 * 1).toISOString(),
    closureReason: 'Connected with local labor union insurance helpdesk; documents submitted.',
  },
  {
    id: 'demo_sample_3',
    type: 'legal',
    category: 'wage_theft',
    title: 'Withheld Weekend Rain Surge Payout',
    sanitizedDescription:
      'Completed 28 peak surge deliveries during monsoon alert. App deducted incentive citing GPS discrepancy. Requesting assistance with formal notice format.',
    broadLocation: 'Western Suburbs, Mumbai',
    language: 'hi',
    urgency: 'routine',
    contactPreference: 'in_app',
    consentGiven: true,
    status: 'open',
    createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 12).toISOString(),
    userId: 'demo_user_mumbai',
    userDisplayName: 'Partner V. (Zepto)',
    isDemoExample: true,
  },
];
