import { describe, it, expect } from 'vitest';
import { OFFICIAL_RESOURCES } from '@/lib/resources';

describe('Official Resources & Helplines Validation', () => {
  it('contains verified official resources', () => {
    expect(OFFICIAL_RESOURCES.length).toBeGreaterThanOrEqual(4);
  });

  it('ensures all resources have valid secure HTTPS URLs and names', () => {
    OFFICIAL_RESOURCES.forEach((resource) => {
      expect(resource.name.trim().length).toBeGreaterThan(0);
      expect(resource.description.trim().length).toBeGreaterThan(0);
      expect(resource.url).toMatch(/^https:\/\//);
    });
  });

  it('includes national labor helpline 14434', () => {
    const nationalHelpline = OFFICIAL_RESOURCES.find(
      (r) => r.helpline === '14434' || r.name.includes('14434')
    );
    expect(nationalHelpline).toBeDefined();
  });
});
