import type { Metadata } from 'next';
import { AuthProvider } from '@/context/AuthContext';
import { CommunityHelpPage } from '@/components/community-help/community-help-page';

export const metadata: Metadata = {
  title: 'Community Help — Awaaz (हर मज़दूर की आवाज़)',
  description:
    'Peer legal guidance and practical medical aid for Indian gig, platform, and daily-wage workers.',
};

export default function Page() {
  return (
    <AuthProvider>
      <CommunityHelpPage />
    </AuthProvider>
  );
}
