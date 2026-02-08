---
id: 26
title: refactor-hero-auth-ui
stage: green
date: 2026-01-08
surface: agent
model: gemini
feature: 001-fullstack-todo-app
branch: main
user: Sharing
command: /refactor hero auth ui
labels: ["ui", "refactor", "auth", "components"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - frontend/app/page.tsx
 - frontend/components/SignInForm.tsx
 - frontend/components/SignUpForm.tsx
tests:
 - npm run build (passed)
---

## Prompt

Refactor the hero section UI while keeping the BetterAuth logic and backend code exactly as it is.

Component Conversion: Convert the existing Sign In and Sign Up pages into UI components.

Right-Side Integration: Replace the 'Secure Access' placeholder box on the right with a dynamic container. This container should now host the Sign In and Sign Up forms.

State Management: Implement a local state (e.g., activeTab) to toggle between the 'Initial Feature View', 'Sign In', and 'Sign Up' inside that right-side box.

Layout Fix: Ensure the entire hero section (Left text + Right box) fits within 100vh to stop the screen overflow issue. Use max-height and overflow-y: auto inside the form box if needed.

Strict Rule: Do not modify any BetterAuth configuration, environment variables, or auth-client logic. Only change the layout and how the forms are rendered in the DOM.

## Response snapshot

Created `SignInForm` and `SignUpForm` components by extracting logic from existing pages. Refactored the landing page (`page.tsx`) to use a dynamic right-side container managed by local state (`activeView`). The "Sign In" and "Create Account" buttons now toggle this state instead of navigating away. The layout was optimized to strictly fit within `100vh` using flexbox and conditional rendering.

## Outcome

- ✅ Impact: Landing page now features inline authentication forms without page reloads, improving UX.
- 🧪 Tests: Build passed.
- 📁 Files: Modified `frontend/app/page.tsx`, created `frontend/components/SignInForm.tsx` and `frontend/components/SignUpForm.tsx`.
- 🔁 Next prompts: none
- 🧠 Reflection: Successfully reused existing auth logic (`@/lib/auth`) without modification, ensuring zero risk to backend integration.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): n/a
- Prompt variant (if applicable): default
- Next experiment (smallest change to try): none
