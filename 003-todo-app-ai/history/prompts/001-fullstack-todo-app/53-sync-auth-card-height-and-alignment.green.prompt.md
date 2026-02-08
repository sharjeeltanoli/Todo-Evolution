---
id: 53
title: sync-auth-card-height-and-alignment
stage: green
date: 2026-01-13
surface: agent
model: gemini
feature: 001-fullstack-todo-app
branch: main
user: Sharing
command: fix layout
labels: ["frontend", "react", "ui-ux", "layout-stability"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - frontend/app/page.tsx
 - frontend/components/SignInForm.tsx
 - frontend/components/SignUpForm.tsx
tests: []
---

## Prompt

I want to make the Sign In and Sign Up cards the exact same height so the layout remains stable when switching between them. ... Apply a fixed minimum height to the card container (e.g., min-h-[550px]) ... Use flex flex-col justify-between ...

## Response snapshot

Synchronized the height of Sign In and Sign Up cards by setting a `min-h-[550px]` on their shared container in `frontend/app/page.tsx`. Updated both `SignInForm.tsx` and `SignUpForm.tsx` to use `flex flex-col justify-between`, ensuring that the header/form content stays at the top while the footer link remains pinned to the bottom. This prevents layout shifts during the transition.

## Outcome

- ✅ Impact: Smooth, stable transition between login and registration forms.
- 🧪 Tests: Manual verification by toggling forms on landing page.
- 📁 Files: Updated page.tsx, SignInForm.tsx, and SignUpForm.tsx.
- 🔁 Next prompts: none
- 🧠 Reflection: Using `justify-between` with a fixed `min-height` is the cleanest way to handle variable content length in fixed-size containers.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): n/a
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): n/a
