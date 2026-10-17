# Master Execution Prompt: Score 98+ in Hack2Skill Evaluation

> **Target Objective:** Transform the **Awaaz — Har Mazdoor Ki Awaaz** codebase to achieve **>98/100** across all 6 automated evaluation dimensions: **Testing (0 ➔ 99)**, **Accessibility (0 ➔ 99)**, **Efficiency (70 ➔ 99)**, **Code Quality (80 ➔ 99)**, **Security (90 ➔ 99)**, and **Problem Statement Alignment (95 ➔ 100)**.

---

## 📋 Comprehensive Task Prompt

Copy and paste the exact prompt block below into your AI development agent:

```markdown
You are an elite principal engineer and hackathon optimization specialist. Your mission is to upgrade the existing "Awaaz — Har Mazdoor Ki Awaaz" project to achieve a score of 98+ in all automated evaluation categories.

Execute all 6 phases below comprehensively without skipping any step:

### PHASE 1: TESTING SUITE (Target: 99/100)
1. Install Vitest, React Testing Library, and jest-axe:
   ```bash
   npm install -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event vitest-axe
   ```
2. Configure `vitest.config.ts` with JSDOM environment, setup file (`src/test/setup.ts`), and code coverage reporting.
3. Add `"test": "vitest run"` and `"test:coverage": "vitest run --coverage"` to `package.json`.
4. Create test suite in `src/__tests__/`:
   - `i18n.test.ts`: Verify 100% key parity across 'en', 'hi', and 'pa'. Ensure no missing, empty, or undefined translation strings.
   - `resources.test.ts`: Verify all official resources have valid HTTPS URLs, organization names, and helpline numbers.
   - `rights-api.test.ts`: Test `/api/rights` with valid question, empty question (expects 400), and oversized payload (>2000 chars expects 400).
   - `complaint-api.test.ts`: Test `/api/complaint` with valid incident details, missing description (expects 400), and output in Hindi and Punjabi.
   - `RightsNavigator.test.tsx`: Test category selection, question input submission, loading state, and rendering of guidance response.
   - `ComplaintBuilder.test.tsx`: Test form inputs, 1-click preset loading (Swiggy, Zomato, Uber), in-place editing, and copy-to-clipboard action.
   - `DraftsList.test.tsx`: Test listing drafts from localStorage, copying draft, and deleting draft.
   - `accessibility.test.tsx`: Run automated `axe(container)` audits on all major components using `vitest-axe` to guarantee 0 violations.

### PHASE 2: ACCESSIBILITY / A11Y (Target: 99/100)
1. Form Controls & Labels:
   - Ensure EVERY `<input>`, `<select>`, and `<textarea>` has an explicit `id="unique-id"` paired with a `<label htmlFor="unique-id">`.
   - Add `aria-required="true"` to mandatory fields.
   - Add `aria-describedby` pointing to help text or character count warnings.
2. Icon Buttons & Accessible Names:
   - Add explicit, descriptive `aria-label` to every icon-only button (e.g. `aria-label="Copy complaint to clipboard"`, `aria-label="Delete draft"`, `aria-label="Sign out of account"`, `aria-label="Switch language to Hindi"`).
3. Semantic Regions & Landmarks:
   - Structure layout with semantic `<header role="banner">`, `<nav aria-label="Main Navigation">`, `<main id="main-content">`, `<footer role="contentinfo">`.
   - Use tabs pattern with `role="tablist"`, `role="tab"`, `aria-selected="true|false"`, and `role="tabpanel"` with matching `aria-controls` and `aria-labelledby`.
4. Screen Reader Announcements:
   - Wrap dynamic AI responses, error banners, and "Copied to clipboard!" alerts in containers with `aria-live="polite"` or `role="status"` and `aria-atomic="true"`.
5. Dynamic Page Language:
   - Update `<html lang={currentLanguage}>` dynamically whenever the user switches between English (`en`), Hindi (`hi`), or Punjabi (`pa`).
6. Focus & Keyboard Navigation:
   - Add clear `:focus-visible` styling (`focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:outline-none`) on all interactive buttons, links, and inputs.
   - Ensure full keyboard accessibility: users can Tab through all controls and activate them via Enter/Space.
7. Color Contrast:
   - Audit all text colors. Ensure foreground-to-background contrast ratio is at least 4.5:1 for normal text and 3:1 for large/bold text (WCAG AA). Replace any faint `text-stone-400` with `text-stone-600` or darker.

### PHASE 3: EFFICIENCY & PERFORMANCE (Target: 99/100)
1. Token Streaming for Gemini:
   - Upgrade `/api/rights` and `/api/complaint` to use streaming responses (`ReadableStream` or `generateContentStream`) where feasible, providing instant Time-to-First-Token (TTFT) and progressive response rendering.
2. Next.js Image Optimization:
   - Replace any raw HTML `<img>` elements with Next.js `<Image />` or SVG avatars with explicit `width` and `height`.
3. Code-Splitting & Component Decomposition:
   - Split `ComplaintBuilder.tsx` into modular components: `ComplaintForm.tsx`, `ComplaintPreview.tsx`, `PresetScenarios.tsx`.
   - Lazy load `DraftsList.tsx` using `next/dynamic` (`const DraftsList = dynamic(() => import('@/components/DraftsList'), { ssr: false })`).
4. Memoization:
   - Wrap expensive handlers and dictionaries with `useCallback` and `useMemo` to prevent unnecessary re-renders of the complaint letter or navigation.

### PHASE 4: CODE QUALITY & STRICT TYPESCRIPT (Target: 99/100)
1. Zero ESLint Warnings & Errors:
   - Run `npm run lint` and eliminate 100% of errors and warnings.
   - Refactor any `react-hooks/set-state-in-effect` by initializing state lazily via functions (`useState(() => ...)`).
2. Strict Typing & Zod Validation:
   - Install `zod` and create schema validation for all incoming API payloads (`RightsRequestSchema`, `ComplaintRequestSchema`).
   - Eliminate any remaining `any` or loose types; use strict unions and interfaces.
3. Clean Architecture:
   - Add JSDoc comments to all exported utilities, functions, and hooks.
   - Keep files under 300 lines by separating UI, state hooks, and API callers into their own modules.

### PHASE 5: SECURITY ENHANCEMENTS (Target: 99/100)
1. Security Headers:
   - In `next.config.ts`, add strict security headers:
     - `Content-Security-Policy` (CSP)
     - `X-Frame-Options: DENY`
     - `X-Content-Type-Options: nosniff`
     - `Referrer-Policy: strict-origin-when-cross-origin`
     - `Permissions-Policy: camera=(), microphone=(), geolocation=()`
2. Input Sanitization & Abuse Prevention:
   - Enforce character limits (2,000 for questions, 3,000 for complaints) in Zod schemas.
   - Strip malicious script injections before model evaluation.
   - Explicit system prompt delimitation: wrap user input in `"""${untrustedInput}"""` and instruct the model that user content is untrusted data that must never override instructions.
3. Privacy Assurance:
   - Verify that client-side drafts do not capture Aadhaar, passwords, or bank PINs.
   - Ensure drafts are keyed strictly by user UID (`awaaz_drafts_${uid}`) and wiped upon sign-out.

### PHASE 6: PROBLEM STATEMENT ALIGNMENT (Target: 100/100)
1. Complete Gig Worker Journey:
   - Deliver an effortless flow: **Sign In ➔ Describe Issue in Own Words ➔ Understand Rights ➔ Generate Grievance Letter ➔ Edit & Copy**.
2. Multi-Platform Support:
   - Presets and category handling specifically tailored to Zomato, Swiggy, Uber, Ola, Zepto, Blinkit, Urban Company, Porter, and Amazon Flex.
3. Verified Statutory References:
   - Plain-language citations of the Code on Social Security 2020, IT Intermediary Grievance Rules (48-hour response rule), e-Shram accidental cover, and state gig worker welfare boards.
4. Multilingual Experience:
   - Flawless, idiomatic Hindi and Punjabi translations for all UI labels, rights explanations, and formal grievance drafts.

### FINAL VERIFICATION
Run the following commands and ensure all pass with exit code 0:
1. `npm run lint` -> 0 errors, 0 warnings
2. `npm test` -> 100% passing tests with high coverage
3. `npm run build` -> Clean Next.js production build in < 5 seconds
```

---

## 🎯 Scoring Metrics Breakdown & Verification Targets

| Metric | Previous Score | Target Score | What Evaluator Tests For |
| :--- | :---: | :---: | :--- |
| **Testing** | `0` | **99** | Test runner execution (`npm test`), number of passing unit/integration tests, test coverage report, accessibility tests with `axe`. |
| **Accessibility** | `0` | **99** | Zero WCAG violations via automated headless axe-core/Lighthouse, explicit `<label htmlFor>` on all fields, `aria-label` on icon buttons, dynamic `lang` attribute, screen reader announcements (`aria-live`). |
| **Efficiency** | `70` | **99** | Streaming tokens, `<Image />` optimization, dynamic imports, component memoization, bundle size under 200KB first-load. |
| **Code Quality** | `80` | **99** | Clean `npm run lint` (0 warnings), Zod schema validation, strict TypeScript types, atomic modular components. |
| **Security** | `90` | **99** | Zero API key leakage, strict security headers (CSP, nosniff, DENY), untrusted prompt boundaries, local storage user isolation. |
| **Problem Alignment** | `95` | **100** | End-to-end gig worker workflow, 1-click presets for Zomato/Swiggy/Uber, verified helpline numbers, natural Hindi/Punjabi generation. |

---

## 💡 Quick Tips When Executing
1. Run `npm test` frequently to verify each newly added test passes.
2. Run `npm run lint` after every file edit to catch any cascading warnings.
3. Verify that `.env.local` remains untracked in Git via `git status`.
