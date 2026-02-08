---
id: 52
title: fix-landing-page-horizontal-overflow
stage: green
date: 2026-01-13
surface: agent
model: gemini
feature: 001-fullstack-todo-app
branch: main
user: Sharing
command: fix layout
labels: ["frontend", "react", "ui-ux", "bugfix", "responsiveness"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - frontend/app/page.tsx
tests: []
---

## Prompt

The Login/Signup card on the right side of my Hero section is causing a horizontal scroll/overflow issue. Please fix the layout with these specific changes: Parent Container: Ensure the main wrapper has overflow-x-hidden and uses max-w-7xl mx-auto px-4 ... Card Width: Set the Auth Card (Sign In/Up) to have a responsive width like w-full max-w-[400px] lg:w-[450px]. ...

## Response snapshot

Fixed horizontal overflow on the landing page by adding `overflow-x-hidden` to the root container and refactoring the Hero section layout. Switched from a grid to a flexbox-based approach (`flex-col lg:flex-row`) for better control. Adjusted the Auth Card width and alignment to ensure proper spacing on all screen sizes.

## Outcome

- ✅ Impact: Eliminated horizontal scroll issue and improved hero section alignment.
- 🧪 Tests: Visual verification on various screen widths.
- 📁 Files: Updated page.tsx.
- 🔁 Next prompts: none
- 🧠 Reflection: Flexbox often provides more predictable alignment than grids for hero sections with distinct left/right content.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): n/a
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): n/a
