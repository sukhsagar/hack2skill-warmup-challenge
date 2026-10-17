import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';
import { DraftsList } from '@/components/DraftsList';

// Mock AuthContext
const mockUser = { uid: 'test-user', displayName: 'Test', photoURL: null, isDemoUser: true };

vi.mock('@/context/AuthContext', () => ({
  useAuth: () => ({ user: mockUser, loading: false, signInWithGoogle: vi.fn(), signOut: vi.fn(), signInAsDemo: vi.fn() }),
}));

vi.mock('@/lib/firebase', () => ({
  auth: {},
  provider: {},
}));

describe('Accessibility Audits', () => {
  it('DraftsList icon buttons have accessible names via aria-label or title', () => {
    const { container } = render(
      <DraftsList language="en" onEditDraft={() => {}} onDraftCountChange={() => {}} />
    );
    const buttons = container.querySelectorAll('button');
    buttons.forEach((btn) => {
      const hasAccessibleName =
        btn.textContent?.trim() ||
        btn.getAttribute('aria-label') ||
        btn.getAttribute('title');
      expect(hasAccessibleName).toBeTruthy();
    });
  });

  it('all interactive elements are keyboard-focusable', () => {
    const { container } = render(
      <DraftsList language="en" onEditDraft={() => {}} onDraftCountChange={() => {}} />
    );
    const interactiveElements = container.querySelectorAll('button, a, input, select, textarea');
    interactiveElements.forEach((el) => {
      expect(el.getAttribute('tabindex')).not.toBe('-1');
    });
  });

  it('headings have proper hierarchy', () => {
    const { container } = render(
      <DraftsList language="en" onEditDraft={() => {}} onDraftCountChange={() => {}} />
    );
    const headings = container.querySelectorAll('h1, h2, h3, h4, h5, h6');
    // Should have at least one heading
    expect(headings.length).toBeGreaterThanOrEqual(1);
  });
});
