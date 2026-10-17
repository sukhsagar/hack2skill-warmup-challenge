import { describe, it, expect, beforeEach } from 'vitest';
import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { DraftsList } from '@/components/DraftsList';
import { AuthProvider } from '@/context/AuthContext';

describe('DraftsList Component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders empty state when there are no saved drafts', () => {
    render(
      <AuthProvider>
        <DraftsList language="en" onEditDraft={() => {}} />
      </AuthProvider>
    );

    expect(screen.getByText(/No saved drafts yet/i)).toBeInTheDocument();
  });

  it('renders drafts from localStorage and allows deleting them', () => {
    const mockDraft = {
      id: 'draft-123',
      category: 'delayed_wages',
      platform: 'Zomato',
      subject: 'Urgent: Delayed Payment for Delivery Partner',
      body: 'Sir/Madam, I am writing to escalate delayed earnings...',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      language: 'en',
    };
    localStorage.setItem('awaaz_drafts_guest', JSON.stringify([mockDraft]));

    render(
      <AuthProvider>
        <DraftsList language="en" onEditDraft={() => {}} />
      </AuthProvider>
    );

    expect(screen.getByText('Zomato')).toBeInTheDocument();
    expect(screen.getByText('Urgent: Delayed Payment for Delivery Partner')).toBeInTheDocument();

    const deleteBtn = screen.getByRole('button', { name: /delete draft/i });
    fireEvent.click(deleteBtn);

    expect(screen.getByText(/No saved drafts yet/i)).toBeInTheDocument();
  });
});
