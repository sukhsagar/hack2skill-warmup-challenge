import { describe, it, expect } from 'vitest';
import { POST } from '@/app/api/rights/route';
import { NextRequest } from 'next/server';

describe('Rights API (/api/rights) Route Validation', () => {
  it('returns 400 when question is missing', async () => {
    const req = new NextRequest('http://localhost:3000/api/rights', {
      method: 'POST',
      body: JSON.stringify({ category: 'delayed_wages' }),
    });

    const res = await POST(req);
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toBeDefined();
  });

  it('returns 400 when question exceeds 2000 characters', async () => {
    const longQuestion = 'A'.repeat(2005);
    const req = new NextRequest('http://localhost:3000/api/rights', {
      method: 'POST',
      body: JSON.stringify({ question: longQuestion, category: 'delayed_wages' }),
    });

    const res = await POST(req);
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toContain('too long');
  });

  it('handles valid rights request and returns structured guidance', async () => {
    const req = new NextRequest('http://localhost:3000/api/rights', {
      method: 'POST',
      body: JSON.stringify({
        question: 'My weekly delivery payout was docked ₹1,800 without explanation.',
        category: 'delayed_wages',
        language: 'en',
      }),
    });

    const res = await POST(req);
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.plainExplanation).toBeDefined();
    expect(Array.isArray(json.relevantProtections)).toBe(true);
    expect(Array.isArray(json.practicalNextSteps)).toBe(true);
  });
});
