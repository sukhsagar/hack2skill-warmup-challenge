import { describe, it, expect } from 'vitest';
import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { RightsNavigator } from '@/components/RightsNavigator';

describe('RightsNavigator Component', () => {
  it('renders correctly with category options and question input', () => {
    render(
      <RightsNavigator
        language="en"
        onDraftComplaintFromIssue={() => {}}
      />
    );

    expect(screen.getByPlaceholderText(/My payout has been delayed/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Get Guidance/i })).toBeInTheDocument();
  });

  it('allows typing a question and selecting a problem category', () => {
    render(
      <RightsNavigator
        language="en"
        onDraftComplaintFromIssue={() => {}}
      />
    );

    const input = screen.getByPlaceholderText(/My payout has been delayed/i) as HTMLTextAreaElement;
    fireEvent.change(input, { target: { value: 'My account was banned without notice' } });
    expect(input.value).toBe('My account was banned without notice');
  });

  it('renders prefilled crowdsourced worker problems', () => {
    render(
      <RightsNavigator
        language="en"
        onDraftComplaintFromIssue={() => {}}
      />
    );

    expect(screen.getByText(/Common Real-World Grievances/i)).toBeInTheDocument();
  });
});
