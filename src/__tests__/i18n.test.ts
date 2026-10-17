import { describe, it, expect } from 'vitest';
import { translations } from '@/lib/i18n';

describe('i18n Translation Completeness & Parity', () => {
  const languages = ['en', 'hi', 'pa'] as const;
  const enKeys = Object.keys(translations.en) as Array<keyof typeof translations.en>;

  it('has all 3 required languages defined', () => {
    languages.forEach((lang) => {
      expect(translations[lang]).toBeDefined();
    });
  });

  it('maintains 100% key parity across en, hi, and pa', () => {
    languages.forEach((lang) => {
      enKeys.forEach((key) => {
        expect(translations[lang][key], `Missing key "${String(key)}" in language "${lang}"`).toBeDefined();
        if (typeof translations.en[key] === 'string') {
          expect(typeof translations[lang][key]).toBe('string');
          expect((translations[lang][key] as string).trim().length).toBeGreaterThan(0);
        }
      });
    });
  });

  it('contains valid categories translations', () => {
    const categories = [
      'delayed_wages',
      'unfair_deductions',
      'missing_incentives',
      'account_suspension',
      'workplace_safety',
      'welfare_schemes',
    ] as const;

    languages.forEach((lang) => {
      categories.forEach((cat) => {
        expect(translations[lang].categories[cat]).toBeDefined();
        expect(translations[lang].categories[cat].length).toBeGreaterThan(0);
      });
    });
  });
});
