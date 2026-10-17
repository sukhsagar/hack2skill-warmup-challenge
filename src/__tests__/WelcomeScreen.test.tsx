import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { WelcomeScreen } from '@/components/WelcomeScreen';
import { AuthProvider } from '@/context/AuthContext';

describe('WelcomeScreen Component UI & Accessibility', () => {
  it('renders brand heading and voice input CTA', () => {
    render(
      <AuthProvider>
        <WelcomeScreen language="en" setLanguage={() => {}} />
      </AuthProvider>
    );

    expect(screen.getByText(/Solve Delivery, Cab & Daily Wage Issues/i)).toBeInTheDocument();
    expect(screen.getByText(/Bol kar batayein/i)).toBeInTheDocument();
  });

  it('renders common problem buttons and allows clicking to prefill', () => {
    render(
      <AuthProvider>
        <WelcomeScreen language="en" setLanguage={() => {}} />
      </AuthProvider>
    );

    const delayedPayoutBtn = screen.getByText(/Delayed or Docked Payout/i);
    expect(delayedPayoutBtn).toBeInTheDocument();
    fireEvent.click(delayedPayoutBtn);

    const textarea = screen.getByPlaceholderText(/What happened\?/i) as HTMLTextAreaElement;
    expect(textarea.value).toContain('My weekly platform payment is delayed');
  });

  it('switches language tabs cleanly', () => {
    const handleSetLang = vi.fn();
    render(
      <AuthProvider>
        <WelcomeScreen language="en" setLanguage={handleSetLang} />
      </AuthProvider>
    );

    const hindiBtn = screen.getByRole('button', { name: /हिंदी/i });
    fireEvent.click(hindiBtn);
    expect(handleSetLang).toHaveBeenCalledWith('hi');
  });
});
