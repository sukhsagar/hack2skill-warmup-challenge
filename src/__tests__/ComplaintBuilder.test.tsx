import { describe, it, expect } from 'vitest';
import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { ComplaintBuilder } from '@/components/ComplaintBuilder';
import { AuthProvider } from '@/context/AuthContext';

describe('ComplaintBuilder Component', () => {
  it('renders form inputs correctly', () => {
    render(
      <AuthProvider>
        <ComplaintBuilder language="en" />
      </AuthProvider>
    );

    expect(screen.getByLabelText(/Platform \/ Employer \/ Company/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Issue Category/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Describe What Happened/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Generate Professional Grievance/i })).toBeInTheDocument();
  });

  it('allows user to change platform and input incident details', () => {
    render(
      <AuthProvider>
        <ComplaintBuilder language="en" />
      </AuthProvider>
    );

    const platformSelect = screen.getByLabelText(/Platform \/ Employer \/ Company/i) as HTMLSelectElement;
    fireEvent.change(platformSelect, { target: { value: 'Swiggy' } });
    expect(platformSelect.value).toBe('Swiggy');

    const descInput = screen.getByLabelText(/Describe What Happened/i) as HTMLTextAreaElement;
    fireEvent.change(descInput, { target: { value: 'Incentive deducted without explanation' } });
    expect(descInput.value).toBe('Incentive deducted without explanation');
  });

  it('prefills description when prop is passed', () => {
    render(
      <AuthProvider>
        <ComplaintBuilder
          language="en"
          prefillDescription="Account blocked for customer cancellation"
          prefillCategory="arbitrary_blocking"
        />
      </AuthProvider>
    );

    const descInput = screen.getByLabelText(/Describe What Happened/i) as HTMLTextAreaElement;
    expect(descInput.value).toBe('Account blocked for customer cancellation');
  });
});
