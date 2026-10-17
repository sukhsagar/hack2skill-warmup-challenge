# Awaaz --- Laptop 2 Build Guide

## Community Help: Legal Help and Medical Aid

**Project:** Awaaz --- Har Mazdoor Ki Awaaz\
**Branch:** `feature/community-help`\
**Role:** Independent feature owner\
**Build window:** 2 hours, in parallel with Laptop 1\
**Tooling:** Google Antigravity + GitHub

------------------------------------------------------------------------

## 1. Your mission

Build a small, self-contained **Community Help** feature with two
straightforward options:

-   **Legal Help** --- request help understanding or addressing a
    workplace/legal issue.
-   **Medical Aid** --- request or offer practical support, without
    pretending Awaaz is an emergency dispatch service.

Do not build a general social network, chat system, gig marketplace,
elaborate sub-branding, or a complex matching engine.

Your task is to deliver an isolated page/component that Laptop 1 can
integrate with minimal merge conflicts.

## 2. Git setup

Clone the existing GitHub repository into a separate directory on Laptop
2:

``` bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd YOUR_REPOSITORY_FOLDER
git status
```

Create and publish your branch:

``` bash
git switch -c feature/community-help
git push -u origin feature/community-help
```

Replace the placeholders with the actual repository URL and folder name.

If the branch already exists, switch to it instead of creating it again.
Confirm that you are on `feature/community-help` before editing.

**Do not work on `main` or Laptop 1's `feature/core-voice` branch.**

## 3. Strict file ownership

You own: - The Community Help page/component - Legal Help form - Medical
Aid form - Request listing and status/close UI - Feature-specific
styling and validation - Feature tests and integration notes

Do not edit: - Main dashboard or shared navigation - Global CSS/theme
files - Package manifest or lockfile without approval - Firebase
initialization/authentication files - Existing Gemini API route - Shared
UI components unless Laptop 1 explicitly agrees - Deployment
configuration or environment files

If a shared-file change is necessary, message Laptop 1 with the exact
file and requested change. Do not make the change yourself. Avoid new
dependencies.

## 4. Inspect before coding

Ask Antigravity to inspect: - The existing framework and route
structure - Current component/style conventions - Whether Firebase
Authentication is already present - Whether Firestore is configured and
what security rules exist - Existing shared form, button, card, and
notification components

Do not assume Firestore is ready merely because Firebase Authentication
exists. Authentication alone does not provide database persistence or
secure database access.

If a secure existing persistence path is available, reuse it. If not,
implement the isolated UI and clearly report that persistence is
incomplete rather than pretending a request has been saved. Do not spend
the whole time creating a new backend.

## 5. Minimum user journey

1.  User opens Community Help.
2.  User chooses Legal Help or Medical Aid.
3.  User fills out a short form.
4.  The form validates required fields.
5.  The user consents to the intended sharing of the request.
6.  The request is submitted to a real persistence layer if one is
    available.
7.  A genuinely saved request appears in the listing, or a clear error
    explains that saving failed.
8.  The user can view status and close/cancel their own request if
    implemented securely.

Every visible control must work or be visibly disabled with an
explanation.

## 6. Legal Help form

Keep the form short. Suggested fields:

-   Request category
-   Short description of the issue
-   City/state or jurisdiction, if relevant
-   Preferred language
-   Optional urgency level
-   Consent to share the request with an appropriate volunteer

Do not require Aadhaar numbers, bank details, passwords, or unnecessary
sensitive documents.

Do not state that a lawyer is verified, available, or has accepted a
case unless the platform has actually confirmed it. For this MVP, a
request is not the same as legal representation. Do not claim that a
request has been matched unless matching really happened.

If a future lawyer-volunteer workflow is shown, lawyers must be verified
by the platform before being represented as verified professionals. A
public-facing pseudonym can protect privacy, but the platform should not
represent anonymous, unverified accounts as verified lawyers.

## 7. Medical Aid form

Suggested fields:

-   Type of support requested
-   City (avoid public exact-location disclosure)
-   Short description of the need
-   Preferred contact method, if the existing secure workflow supports
    it
-   Consent to share the request with appropriate helpers

Tell users not to include unnecessary medical details in the public
description. Do not publish phone numbers, exact addresses, diagnoses,
or sensitive case text in public lists.

For urgent or life-threatening situations, show a clear message to
contact local emergency services or a healthcare provider. Awaaz is not
an emergency dispatch service and must not promise that help is
available.

Do not make clinical decisions or recommend treatment.

## 8. Request list and privacy

The request list should show only the minimum non-identifying details
needed to understand the request, such as: - Request type - Broad
city/region - Short sanitized summary - Date/status if supported

Do not display publicly: - Phone numbers - Full addresses - Medical
details - Sensitive legal case text - Personal identity documents

Use fictional records only for a clearly labelled demo/example state. Do
not present fictional records as live community requests.

If a secure backend exists: - Follow its existing schema and security
rules. - Ensure users can only edit or close their own requests, where
applicable. - Do not weaken database rules to make the demo work. -
Avoid logging sensitive content. - Do not make public write access
available without appropriate controls.

If persistence is not available: - State clearly that requests are not
being saved to a shared service. - Do not show "Request submitted
successfully" if nothing was saved. - Report the limitation to Laptop 1.

## 9. Keep code isolated

Adapt these suggested paths to the actual repository; do not force a new
structure.

``` text
src/
  app/
    community-help/
      page.tsx
  components/
    community-help/
      community-help-page.tsx
      legal-help-form.tsx
      medical-aid-form.tsx
      request-list.tsx
```

Prefer one page/component and small child components over a complex
architecture. Use the app's existing design system and conventions.

Do not add or modify the main dashboard link. Instead, tell Laptop 1
exactly which route/component should be linked from the shared
navigation.

## 10. Antigravity prompt for Laptop 2

Paste this into Antigravity:

> You own the `feature/community-help` branch. Inspect the repository
> and existing Firebase setup, but implement Community Help as an
> isolated page/component with minimal integration requirements. Do not
> modify the main dashboard, shared navigation, global styles, package
> manifest/lockfile, Firebase initialization, authentication files,
> existing Gemini route, or deployment configuration.
>
> Build a responsive Community Help page with two simple sections: Legal
> Help and Medical Aid. Each section should have a short request form,
> validation, loading/error states, a request listing, and a basic
> status/close workflow where supported. Keep the scope small. Do not
> add a general social network, chat system, gig marketplace, or
> elaborate branding.
>
> Use the existing backend only if it is configured and can be used
> securely. If Firestore is already available, inspect the existing
> schema and rules before adding collections. Do not weaken rules. If
> secure persistence cannot be completed in the available time, be
> explicit about that limitation and do not show false success messages.
> Do not expose phone numbers, exact addresses, medical details, or
> sensitive case text in public lists. Do not claim that legal or
> medical help is verified or guaranteed. Provide emergency guidance for
> urgent medical situations.
>
> Keep feature-specific code in clearly named, isolated files. If you
> need a change to shared navigation, global styling, package
> configuration, or another shared file, report the exact requested
> change to the integration owner instead of making it yourself. Avoid
> new dependencies. Run available checks, commit, and push only to
> `feature/community-help`. In your final report, list files changed,
> how the feature should be integrated, what works, and what remains
> incomplete.

## 11. Test your feature

-   [ ] Community Help page loads.
-   [ ] Legal Help form validates required fields.
-   [ ] Medical Aid form validates required fields.
-   [ ] Submission shows loading state.
-   [ ] Success appears only after real persistence succeeds.
-   [ ] Failed save shows a clear error.
-   [ ] Empty request list has a useful empty state.
-   [ ] Public list does not reveal sensitive details.
-   [ ] Status/close action works if displayed.
-   [ ] Urgent medical request shows emergency guidance.
-   [ ] Mobile layout is usable.
-   [ ] No fake records are presented as real requests.
-   [ ] No secrets or environment files are committed.

Run the available build/type checks if time permits. Do not modify
shared configuration just to silence a build issue; report the exact
problem to Laptop 1.

## 12. Commit and push

Before committing:

``` bash
git status
git branch --show-current
```

Stage only your own files:

``` bash
git add PATH/TO/COMMUNITY/FILES
git commit -m "Add Community Help workflows"
git push -u origin feature/community-help
```

Avoid `git add .` if it could stage environment files, credentials, or
unrelated changes.

## 13. Handoff to Laptop 1

Send Laptop 1 a concise handoff containing:

1.  Branch name and commit hash.
2.  Files created/modified.
3.  Component/page export name and file path.
4.  Route or navigation link required.
5.  Any environment variables or backend collections required.
6.  Whether requests are genuinely persisted.
7.  How to test a successful submission and a failed save.
8.  Known limitations and unfinished work.

Do not edit Laptop 1's branch. If a shared-file change is needed, ask
Laptop 1 to make it after reviewing the request.

## Definition of done

Community Help is a small, isolated feature on `feature/community-help`;
forms validate; persistence is accurately represented; sensitive data is
not exposed; the branch is pushed; and Laptop 1 has the integration
details.

**Stay within scope. A working, honest Community Help flow is better
than an unfinished social platform.**
