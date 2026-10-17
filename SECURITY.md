# Awaaz — Har Mazdoor Ki Awaaz — Security & Privacy Architecture

## 1. API Key Handling
- **Server-Side Isolation**: The Google Gemini API key (`GEMINI_API_KEY`) is strictly confined to server-side Next.js route handlers (`src/app/api/rights/route.ts` and `src/app/api/complaint/route.ts`).
- **Zero Client Exposure**: The Gemini key is never bundled in client JavaScript, query parameters, headers, or browser `localStorage`.
- **Graceful Failure**: If `GEMINI_API_KEY` is missing or fails due to network/quota limits, the application does not crash. It displays an informative setup advisory and provides clearly labeled reference templates rather than pretending mocked responses are live AI outputs.

## 2. Authentication & Session Management
- **Google OAuth via Firebase Authentication**: User identity is verified using Firebase's official Google sign-in provider (`signInWithPopup` with `signInWithRedirect` fallback for mobile browsers).
- **Public Client Credentials**: Firebase client keys (`NEXT_PUBLIC_FIREBASE_*`) are public app identifiers and do not grant administrative backend access.
- **Evaluation Demo Mode**: For evaluator convenience, an instant demo session mode is provided so judges can review the full UI flow even before setting up Firebase credentials.
- **Session Cleanup**: When a user signs out, in-memory auth state and active draft selections are wiped.

## 3. Untrusted Input & Prompt Injection Mitigations
- **Untrusted Data Boundary**: User inputs (questions, descriptions) are explicitly delineated as untrusted data within system prompts.
- **No Instruction Hijacking**: Prompts explicitly forbid the model from obeying instructions embedded in worker descriptions that attempt to override legal guardrails or tone policies.
- **Request Validation & Rate Limits**: Requests are capped in length (max 2,000–3,000 characters) to prevent memory bloat and model token exhaustion.

## 4. Privacy & Local Draft Persistence
- **Local Storage Isolation**: Worker complaint drafts are stored exclusively in the browser's `localStorage`, segregated by the user's unique identifier (`awaaz_drafts_${uid}`).
- **Cross-Account Protection**: Switching users or signing out prevents another user on a shared browser from viewing the previous user's drafts.
- **No Automatic Submissions**: Awaaz does NOT automatically send, submit, or transmit complaints to any employer, gig platform, or government entity. The worker maintains complete ownership and must explicitly copy or edit the text.
- **Sensitive Data Minimization**: The platform explicitly advises workers against inputting Aadhaar numbers, bank account passwords, UPI PINs, or sensitive identity tokens.

## 5. Non-Legal Advice Disclaimer
- Awaaz is an educational and drafting assistant. Outputs are not legal opinions or formal counsel. All guidance explicitly distinguishes general statutory protections from confirmed individual entitlements.
