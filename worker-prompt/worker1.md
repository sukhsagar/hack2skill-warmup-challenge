# Awaaz --- Laptop 1 Build Guide

## Core application, voice assistant, integration and deployment

**Project:** Awaaz --- Har Mazdoor Ki Awaaz\
**Branch:** `feature/core-voice`\
**Role:** Integration owner\
**Build window:** 2 hours\
**Tooling:** Google Antigravity + GitHub

------------------------------------------------------------------------

## 1. Your mission

Own the existing Awaaz app and deliver a stable core experience:

1.  Know Your Rights --- real Gemini-powered guidance.
2.  Complaint Builder --- generate, edit, and copy a complaint.
3.  Voice Assistant --- speak, review the transcript, trigger an
    existing action, and hear the response.
4.  Main dashboard/navigation and final integration of Laptop 2's
    Community Help feature.
5.  Final build, end-to-end test, deployment, and demo readiness.

Do not rebuild the app from scratch. Inspect the existing project and
preserve working features.

## 2. Git setup

On Laptop 1, open the existing project directory.

``` bash
git status
git branch --show-current
```

Inspect the working tree. Do not commit `.env.local`, credentials, API
keys, or other secrets. If the current work is safe to preserve:

``` bash
git add .
git commit -m "Checkpoint existing Awaaz application"
git push origin main
```

Create and publish your branch:

``` bash
git switch -c feature/core-voice
git push -u origin feature/core-voice
```

If this branch already exists, switch to it instead of creating it
again. Confirm that `.gitignore` excludes local environment files.

**Work only on `feature/core-voice` while implementing your assigned
changes.** Do not have both laptops push to `main`.

## 3. Laptop 1 ownership boundaries

You own: - Main dashboard and navigation - Global styling and shared
layout - Firebase initialization and existing Google sign-in - Existing
Gemini server endpoint and AI prompt handling - Know Your Rights -
Complaint Builder - Voice Assistant - Final integration, build checks,
and deployment

Laptop 2 owns the isolated Community Help feature. Do not build a second
copy of it. Agree on the route/component export with Laptop 2 before
integration.

## 4. First task: inspect before changing code

Ask Antigravity to: - Identify the framework, package manager, routes,
components, and current app entry point. - Identify the Firebase
authentication setup and confirm sign-in/sign-out behavior. - Find the
server-side Gemini endpoint and its environment variables. - Test Know
Your Rights and Complaint Builder. - Run the existing build or
type-check command. - Report blockers and manual configuration steps. -
Preserve existing structure and avoid a full rewrite.

Do not add dependencies or infrastructure unless necessary.

## 5. Verify and stabilize the AI core

### Know Your Rights

-   The user can describe a workplace issue in plain language.
-   The selected language is passed to the server-side endpoint.
-   The endpoint makes a genuine Gemini API call.
-   The answer provides practical next steps and evidence to collect.
-   Uncertain legal information is qualified; the app does not invent
    laws, schemes, eligibility, contact details, or official links.
-   Missing API credentials, quota errors, timeouts, and model failures
    produce honest error messages and retry options.
-   Never present hardcoded sample output as if it came from Gemini.

### Complaint Builder

-   Accept an issue description and optional category,
    platform/employer, date, amount, and desired resolution.
-   Generate an editable complaint through Gemini.
-   Do not invent dates, facts, money amounts, evidence, communications,
    laws, or allegations.
-   Keep missing facts as clear placeholders or ask a short follow-up.
-   Copy, edit, regenerate, and start-new actions work.
-   Handle clipboard failure gracefully.
-   Never submit a complaint automatically.

### Multilingual support

Preserve English, Hindi, and Punjabi if already implemented. Pass the
selected language to Gemini and let the user review generated text
before using it.

## 6. Add Voice Assistant

For this two-hour build, use browser capabilities instead of integrating
a separate transcription vendor.

### Required MVP flow

1.  User taps a microphone button.
2.  Show listening/recording state and a stop/cancel control.
3.  Use browser speech recognition when supported.
4.  Display the transcript in an editable field.
5.  User confirms or corrects the transcript.
6.  Send confirmed text to the existing rights or complaint workflow.
7.  Offer spoken responses using browser `speechSynthesis` where
    supported.
8.  Provide a visible text-only fallback when speech recognition is
    unavailable.
9.  Handle microphone permission denial, empty transcripts, unsupported
    browsers, and recognition errors.
10. Do not use continuous always-listening mode.
11. Never submit a complaint or contact a third party automatically from
    voice input.

### First voice actions

-   "Explain my rights."
-   "Help me write a complaint."
-   "Read this response aloud."
-   "Make this complaint shorter."
-   "Copy the complaint."

These may be simple intent mappings to existing app actions. Do not
create a separate agent framework or duplicate core business logic.

Browser speech recognition support and language availability vary. Test
the actual target browser and device. Do not promise reliable Punjabi
recognition on every device.

## 7. Antigravity prompt for Laptop 1

Paste the following into Antigravity:

> You own the `feature/core-voice` branch and are the integration owner.
> Inspect the existing repository before changing files. Preserve the
> current framework, working features, authentication, styling, and
> deployment configuration. Do not rebuild the application from scratch.
>
> First verify the existing Firebase Google sign-in, server-side Gemini
> integration, Know Your Rights workflow, and Complaint Builder. Fix
> critical defects in those workflows before adding new features. Gemini
> must be called through a server-side endpoint, and no secret may be
> exposed in browser code. Do not fabricate AI output when credentials
> or quota are unavailable.
>
> Add a mobile-friendly Voice Assistant using browser speech recognition
> where supported and browser speech synthesis for spoken responses
> where available. The user must be able to review/edit the transcript
> before submitting it. Route confirmed text into the existing rights or
> complaint workflows; do not duplicate those workflows. Provide
> permission, unsupported-browser, and recognition-error handling plus a
> usable text-only fallback. Never file a complaint or contact a third
> party automatically.
>
> You own the main dashboard, navigation, global styles, core AI files,
> and final integration. Do not implement Community Help; Laptop 2 owns
> it. Avoid new dependencies. Keep local environment files and secrets
> out of Git. Run available build/type checks and test the core flows.
> Commit and push only to `feature/core-voice`. Report manual setup
> steps and incomplete features honestly.

## 8. Coordinate the integration contract

Ask Laptop 2 to report: - The component/page export name and file path -
The route or navigation link it expects - Any environment variables or
backend collections required - Whether data is truly persisted - How to
test successful and failed submissions - Files changed, known
limitations, and commit hash

Suggested file separation (adapt to the existing repository; do not
force this structure):

``` text
src/
  app/
    page.tsx                    # Laptop 1 owns
    api/
      rights/route.ts           # Laptop 1 owns
      complaint/route.ts        # Laptop 1 owns
    community-help/
      page.tsx                  # Laptop 2 owns if using App Router
  components/
    voice-assistant.tsx         # Laptop 1 owns
    community-help/
      community-help-page.tsx   # Laptop 2 owns
  lib/
    firebase.ts                 # Laptop 1 owns
    ai.ts                       # Laptop 1 owns
```

Laptop 2 must not modify your shared navigation or global styling.
Integrate the page/component after it is pushed.

## 9. Two-hour schedule

  Elapsed time   Laptop 1 task
  -------------- -----------------------------------------------
  0--10 min      Checkpoint, branch setup, inspect the project
  10--25 min     Verify core AI flows and identify blockers
  25--65 min     Fix core and implement voice
  65--75 min     Test and push branch; get Laptop 2 handoff
  75--90 min     Merge branches and resolve integration issues
  90--108 min    Build and run end-to-end checks
  108--120 min   Deploy, verify URL, prepare demo

If the existing app has major blockers, preserve the working core and
cut optional polish. WhatsApp is not part of this schedule unless
everything else is stable.

## 10. Merge Laptop 2's work

Before merging, commit or safely stash your changes and ensure the
working tree is clean.

``` bash
git status
git fetch origin
git switch main
git pull origin main
git merge --no-ff origin/feature/core-voice
```

Test the core branch on `main`. Then merge Community Help:

``` bash
git merge --no-ff origin/feature/community-help
```

If conflicts occur: 1. Run `git status`. 2. Open each conflicted file
and understand both changes. 3. Preserve both intended behaviors where
appropriate. 4. Remove conflict markers (`<<<<<<<`, `=======`,
`>>>>>>>`). 5. Run checks. 6. Stage resolved files and commit if Git has
not already completed the merge.

``` bash
git add PATH/TO/RESOLVED/FILES
git commit
```

Only run the last commit command if a merge is still in progress and has
not already been committed. Do not use `git reset --hard`, force-push,
or blindly accept one side of every conflict.

## 11. Final checks

-   [ ] Google sign-in, refresh, and sign-out work.
-   [ ] Rights guidance makes a real Gemini request.
-   [ ] Complaint generation uses real Gemini output.
-   [ ] Complaint can be edited and copied.
-   [ ] Missing facts are not invented.
-   [ ] Voice permission, transcript editing, and response playback work
    where supported.
-   [ ] Text-only fallback works.
-   [ ] Community Help is integrated and reports persistence honestly.
-   [ ] No sensitive data appears in public lists.
-   [ ] Build passes.
-   [ ] No secrets are committed.
-   [ ] Deployed URL opens and can be tested.
-   [ ] Demo uses fictional data.

## 12. WhatsApp with Kapso --- last enhancement only

Do not start until the merged app builds and essential flows pass.

If time remains: 1. Verify Kapso's current sandbox and account
requirements. 2. Configure a server-side webhook endpoint. 3. Validate
incoming requests according to provider security documentation. 4. Route
incoming text to the existing rights/complaint workflow. 5. Send the
response through Kapso. 6. Test one complete inbound/outbound exchange.
7. Keep credentials server-side. 8. Do not expose sensitive case details
unnecessarily.

Skip WhatsApp if it cannot be completed and tested. Do not add WhatsApp
voice-note transcription in this time window.

## Definition of done

The main branch contains both feature branches, the integrated project
builds, the core AI and voice flows work, Community Help truthfully
reports whether requests are saved, the deployed app can be tested, and
the repository contains no secrets.

**Protect the core, merge early enough to test, and keep WhatsApp
last.**
