# Awaaz — Har Mazdoor Ki Awaaz (आवाज़ / ਅਵਾਜ਼)
> **Know Your Rights. Raise Your Voice.**

**Awaaz — Har Mazdoor Ki Awaaz** is an AI-powered rights navigator and formal grievance assistant built for India's 10+ million gig, platform, and daily-wage workers (delivery partners, cab drivers, auto drivers, quick-commerce couriers for Zomato, Swiggy, Uber, Ola, Zepto, Blinkit, Urban Company, Porter, Rapido, and Amazon Flex).

Built for the **PromptWars Gig Worker Companion Challenge**.

---

## 🌟 Key Features

1. **Know Your Rights (Rights Navigator)**:
   - Plain-language legal explanations for delayed earnings, unfair deductions, arbitrary ID deactivations, workplace accidents, and welfare schemes.
   - Statutory context: Code on Social Security 2020, Intermediary Guidelines (48-hour grievance rule), state gig worker acts.
   - Practical next steps & evidence checklist (screenshots to capture, order receipts, rate cards).
   - Curated official portals and toll-free helplines (National Consumer Helpline `1915`, e-Shram `14434`, SAMADHAN Labour Portal).

2. **Professional Grievance Builder**:
   - Turn complex disputes into polite, factual, professional grievance letters ready for platform Grievance Redressal Officers.
   - Pre-populated 1-click demo presets for evaluators:
     - *Swiggy Delayed Payout (₹2,450)*
     - *Zomato Cancellation Penalty (₹500)*
     - *Uber Account Deactivation Appeal*
   - In-place editable document viewer with one-click **"Copy Grievance Text"** and clipboard error fallback.
   - Evidence attachment checklist and escalation guidance.

3. **Multilingual by Design**:
   - Complete interface and AI outputs in **English**, **Hindi (हिंदी)**, and **Punjabi (ਪੰਜਾਬੀ)**.
   - Retains context when switching languages.

4. **Firebase Google Authentication + Instant Demo Mode**:
   - Production Google OAuth sign-in via Firebase Authentication (`signInWithPopup` + `signInWithRedirect` mobile fallback).
   - **Instant Demo Mode**: Allows evaluators to immediately test all features without requiring external Firebase keys upfront.

5. **Client-Side Privacy & Draft Persistence**:
   - Saved drafts persist in browser `localStorage`, isolated per user UID (`awaaz_drafts_${uid}`).
   - Cleared on logout; never sent automatically to any external server or employer.

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- **Node.js**: v18.17+ or v20+ (tested on Node v24)
- **npm**: v9+

### 2. Installation
```bash
# Navigate to the project directory
cd hack2skill-warmup-challenge

# Install dependencies
npm install
```

### 3. Environment Configuration
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Open `.env.local` and add your keys:
```env
# Gemini API Key from Google AI Studio (https://aistudio.google.com/)
GEMINI_API_KEY=your_gemini_api_key_here

# Firebase Client Configuration (Firebase Console > Project Settings)
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

> **Note for Evaluators:** If you do not have Firebase or Gemini keys handy, you can still test immediately:
> 1. Launch the app with `npm run dev`.
> 2. Click **"Explore Demo Mode (Instant Access)"** to test authentication.
> 3. If `GEMINI_API_KEY` is not configured, the app cleanly displays a structured sample reference template rather than crashing.

### 4. Running Locally
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Production Build
```bash
npm run build
npm start
```

---

## 🔧 Firebase Setup Steps (Optional for Production Sign-In)

1. Go to the [Firebase Console](https://console.firebase.google.com/) and click **Add project**.
2. Under **Build > Authentication**, click **Get started**.
3. Under the **Sign-in method** tab, click **Google**, enable it, select a support email, and save.
4. Under **Settings > Authorized domains**, ensure `localhost` (and your Vercel deployment domain) is listed.
5. In **Project settings > General**, register a **Web app** (`</>`), and copy the config object values into your `.env.local`.

---

## 🛡️ Security & Architecture

See [SECURITY.md](file:///Users/sukhsagar/Downloads/warmup-challenge/hack2skill-warmup-challenge/SECURITY.md) for full details on API key protection, prompt injection mitigations, and user data privacy.

---

## 📄 License
MIT License. Built for the PromptWars Gig Worker Companion Hackathon.
