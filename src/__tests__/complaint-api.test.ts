import { describe, it, expect } from 'vitest';
import { POST } from '@/app/api/complaint/route';
import { NextRequest } from 'next/server';

describe('Complaint API (/api/complaint) Route Validation', () => {
  it('returns 400 when incident description is missing', async () => {
    const req = new NextRequest('http://localhost:3000/api/complaint', {
      method: 'POST',
      body: JSON.stringify({
        platform: 'Zomato',
        category: 'unfair_deductions',
      }),
    });

    const res = await POST(req);
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toBeDefined();
  });

  it('handles valid complaint request and returns draft', async () => {
    const req = new NextRequest('http://localhost:3000/api/complaint', {
      method: 'POST',
      body: JSON.stringify({
        platform: 'Swiggy',
        category: 'delayed_wages',
        incidentDescription: 'Weekly payout delayed by 5 days without payout receipt.',
        disputedAmount: '1500',
        workerIdentifier: 'SWG-9921',
        language: 'en',
      }),
    });

    const res = await POST(req);
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.subject).toBeDefined();
    expect(json.complaintBody).toBeDefined();
    expect(Array.isArray(json.evidenceChecklist)).toBe(true);
  });
});
