# Awaaz — Design System & Page Generation Guide

> **System Version:** 1.0.0 (Mobile-First Sunlight-Readable Legal Aid)  
> **Brand Identity:** *Awaaz — Har Mazdoor Ki Awaaz (हर मज़दूर की आवाज़ / ਹਰ ਮਜ਼ਦੂਰ ਦੀ ਅਵਾਜ਼)*  
> **Primary Audience:** Delivery riders, cab/auto drivers, logistics & warehouse staff, and daily-wage workers in India.  
> **Operating Environment:** Bright outdoor sunlight, one-handed smartphone operation, noisy traffic conditions.

---

## 1. Visual & Semantic Philosophy

1. **Sunlight Readability (High Contrast & Matte Warm Linen):**
   - No blinding pure-white backgrounds outdoors. The surface uses a calm, warm linen tone (`#F8F7F2`) combined with crisp white cards (`#FFFFFF`) and dark slate text (`#111A15`).
   - Contrast ratio exceeds WCAG AAA standards for critical typography and primary actions.

2. **Dignified & Official Tone (Emerald Green & Devanagari Identity):**
   - The primary brand color is **Deep Emerald Green (`#086B50`)**, conveying statutory authority, legal protection, and calm assurance.
   - Devanagari icon **"आ"** anchors the app bar, giving immediate cultural resonance and trust to Indian workers across regions.

3. **Voice-First Accessibility:**
   - Gig workers frequently operate with helmets, gloves, or on busy roads. The primary input method features a prominent **"Bol kar batayein / Speak in your language"** button powered by the Web Speech API (`hi-IN`, `pa-IN`, `en-IN`).

4. **One-Tap Helpline Access:**
   - Prominent speed-dial to **14434** (Ministry of Labour & Employment National Labor Helpline) in the top app bar and bottom tab bar.

---

## 2. Design Tokens & Palette

### Color Hierarchy
| Token Name | Hex Code | Purpose / Usage |
| :--- | :--- | :--- |
| `surface` / `background` | `#F8F7F2` | Base canvas background (warm linen, reduces outdoor glare) |
| `surface-container-lowest` | `#FFFFFF` | Cards, input fields, elevated surfaces |
| `surface-container-low` | `#F2F1EA` | Secondary pills, muted containers, badges |
| `surface-container` | `#EAE9E0` | Segmented control track, icon backgrounds |
| `surface-container-high` | `#E2E0D5` | Selected states, darker container fills |
| `on-surface` | `#111A15` | Primary headings, prominent body text |
| `on-surface-variant` | `#313C35` | Subtitles, secondary headers |
| `secondary` | `#4A554E` | Helper text, metadata, descriptions, timestamps |
| `outline` / `border-subtle` | `#E5E4DD` | Card borders, dividing rules |
| `primary` | `#086B50` | Primary buttons, active tabs, brand logo, key links |
| `primary-dark` | `#00513B` | Hover & active states for primary actions |
| `primary-light` | `#E6F4EE` | Selected cards, voice recording idle, badge backgrounds |
| `primary-fixed` | `#A0F3D1` | High-visibility chip highlights, "Help" badge |
| `error` | `#BA1A1A` | Validation errors, warning alerts, active microphone state |
| `error-container` | `#FFDAD6` | Microphone recording active pill, error alerts |

### Typography
- **Primary Typeface:** `'Inter', sans-serif` via Google Fonts.
- **Icon System:** `Material Symbols Outlined` (Google) supplemented by Lucide React.
- **Font Sizes:**
  - `H1 / Display`: `26px - 28px` (Font weight: `800`, tracking: `tight`)
  - `H2 / Section Title`: `22px - 24px` (Font weight: `700`)
  - `H3 / Card Title`: `18px - 20px` (Font weight: `700`)
  - `Body / Inputs`: `16px - 17px` (Minimum `16px` prevents iOS auto-zoom)
  - `Captions & Badges`: `12px - 14px` (Font weight: `600 - 700`)

---

## 3. Core Component Patterns

### 1. Top App Bar (Sticky Mobile Shell)
- **Height:** `64px` (`h-16`) + `pt-safe`.
- **Left:** `w-11 h-11 rounded-xl bg-[#086B50]` with white bold **आ**, brand title `Awaaz`, and a `#A0F3D1` pill badge labelled `Help`.
- **Right:** High-visibility helpline button linking directly to `tel:14434` with an animated ping indicator.
- **Sub-row:** Segmented 3-way language switcher (`English` / `हिंदी` / `ਪੰਜਾਬੀ`).

### 2. Grievance Composer (Two-Step Card)
- **Card wrapper:** `bg-white border-2 border-primary/20 rounded-2xl p-4 sm:p-5 shadow-sm`.
- **Step 1 Indicator:** `w-6 h-6 rounded-full bg-primary text-white text-[13px] font-bold`.
- **Textarea:** `#FAF9F5` background, `text-[17px]`, `rounded-xl`, `border-[#E5E4DD]`.
- **Mic Button:** `min-h-[52px] bg-[#E6F4EE] text-primary font-bold text-[17px] rounded-xl flex items-center justify-center gap-3`. When recording: changes to `bg-[#FFDAD6] text-[#BA1A1A] animate-pulse` with icon `graphic_eq`.
- **Action Button:** `min-h-[50px] bg-primary hover:bg-primary-dark text-white font-bold rounded-xl px-6`.

### 3. Documentary Photo Cards
- Real photographic cards grounding the app in the daily reality of gig work.
- Fixed aspect banner (`h-44 sm:h-48`) with `object-cover`.
- Bottom-left overlay badge: `bg-[#111A15]/80 backdrop-blur-xs text-white text-[12px] font-bold px-2.5 py-1 rounded-md`.

### 4. High-Contrast Problem Selectors
- Large tap targets (`min-h-[56px]`).
- Pre-fills the problem description and automatically selects the category on tap.

### 5. Persistent Mobile Navigation Bar
- Fixed bottom container (`h-16 pb-safe bg-white border-t border-[#E5E4DD] shadow-lg`).
- 4 items:
  1. `Record Issue` (or `Worker Codes`)
  2. `New Appeal` (Complaint generator)
  3. `My Appeals` (Local drafts with count badge)
  4. `Call 14434` (`tel:14434` speed dial)

---

## 4. How to Generate New Pages (Prompt & Coding Blueprint)

When creating a new screen or sub-page in this project, copy and apply the following template rules:

```tsx
import React from 'react';

export default function NewPage() {
  return (
    <div className="bg-[#F8F7F2] text-[#111A15] font-sans antialiased min-h-screen flex flex-col selection:bg-primary-fixed">
      {/* 1. Standard Top Bar */}
      <header className="sticky top-0 z-40 bg-[#F8F7F2]/95 backdrop-blur-md border-b border-[#E5E4DD] pt-safe">
        <div className="h-16 px-4 flex items-center justify-between max-w-xl mx-auto w-full">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-primary flex items-center justify-center text-white font-bold text-xl shadow-xs">
              आ
            </div>
            <div>
              <span className="text-[20px] font-bold text-on-surface tracking-tight leading-none block">
                Awaaz
              </span>
              <span className="text-[13px] font-medium text-secondary block mt-0.5">
                Page Title Here
              </span>
            </div>
          </div>
          <a
            href="tel:14434"
            className="h-10 px-3 rounded-lg bg-surface-container-lowest border border-[#E5E4DD] text-primary flex items-center gap-1.5 font-bold text-[14px] shadow-xs"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping mr-0.5" />
            14434
          </a>
        </div>
      </header>

      {/* 2. Main Max-W Content Container */}
      <main className="flex-1 flex flex-col w-full py-6 pb-24 px-4 max-w-xl mx-auto space-y-6">
        {/* Section Header */}
        <section>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#E6F4EE] text-primary text-[13px] font-bold tracking-wide uppercase mb-2">
            <span>Badge Title</span>
          </div>
          <h1 className="text-[26px] font-extrabold text-on-surface tracking-tight leading-tight mb-2">
            Primary Screen Heading
          </h1>
          <p className="text-[16px] text-secondary font-medium leading-relaxed">
            Short, plain-language description explaining the action to the worker.
          </p>
        </section>

        {/* Card Component */}
        <div className="bg-white border border-[#E5E4DD] rounded-2xl p-5 shadow-xs">
          {/* Card content */}
        </div>
      </main>

      {/* 3. Bottom Safe Area Bar */}
      <nav className="fixed bottom-0 w-full z-50 pb-safe bg-white border-t border-[#E5E4DD] shadow-lg">
        {/* Navigation tabs */}
      </nav>
    </div>
  );
}
```

### Checklist for Every New Component
- [ ] Uses `#F8F7F2` for background canvas.
- [ ] Uses `#086B50` (`bg-primary`) for primary action buttons.
- [ ] Uses `#FAF9F5` for input backgrounds with `#E5E4DD` border.
- [ ] Font size for inputs is at least `16px` to prevent iOS viewport auto-zoom.
- [ ] Touch targets are at least `48px` to `56px` height.
- [ ] Multilingual strings are read from `@/lib/i18n` with Hindi and Punjabi translations.
- [ ] Web Speech API is used for voice accessibility where freeform inputs are present.
- [ ] Local storage key pattern: `awaaz_drafts_${userId}` for draft persistence.
