---
id: 32
title: Sync Tasks Page Visuals with Home Page
stage: green
date: 2026-01-08
surface: agent
model: gemini
feature: 001-fullstack-todo-app
branch: 002-todo-mvp-auth
user: Sharing
command: Update the Task Page (/tasks) background to match the Home Page exactly.
labels: ["frontend", "ui", "glassmorphism", "dark-theme"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - frontend/app/layout.tsx
  - frontend/app/page.tsx
  - frontend/app/tasks/page.tsx
  - frontend/components/TaskCard.tsx
  - frontend/components/TaskForm.tsx
  - frontend/components/Navbar.tsx
  - frontend/components/TaskList.tsx
tests:
  - visual verification
---

## Prompt

Update the Task Page (/tasks) background to match the Home Page exactly.

Background Style: Apply the same dark gradient background (dark purple/black) and grid pattern from the homepage to the tasks page.

Text Contrast: Change all text colors on the task page (like 'Your Tasks', welcome message, and task titles) to white or light gray so they are readable against the new dark background.

Task Cards: Update the task cards to have a 'Glassmorphism' effect (semi-transparent dark background with a subtle border) instead of the current white boxes, so they blend in perfectly.

Navbar/Header: Ensure the 'TodoEvolution' logo and 'Sign Out' button area also blend with this dark background without any white gaps.

## Response snapshot

Synchronized the visual language of the Tasks page with the premium dark theme of the Landing page.
- **Global Theme**: Fixed `layout.tsx` to use `bg-[#050505]` on the body to eliminate white gaps.
- **Atmospheric Background**: Added the signature linear-gradient grid pattern (24px size) and indigo radial glow to both the Landing and Tasks pages.
- **Glassmorphism**: Re-engineered `TaskCard`, `TaskForm`, and form containers to use semi-transparent dark backgrounds (`bg-[#0a0a0a]/60`), `backdrop-blur-xl`, and subtle borders.
- **Enhanced Contrast**: Shifted all text to white, gray-400, and indigo-400/50 for optimal readability on dark surfaces.
- **Unified Navigation**: Updated the `Navbar` with a glass effect (`bg-black/40`, `backdrop-blur-md`) and a consistent logo mark.

## Outcome

- ✅ Impact: The transition from the Landing page to the Tasks page is now seamless, providing a unified and high-end brand experience.
- 🧪 Tests: Visual verification of all components on dark background.
- 📁 Files: `frontend/app/layout.tsx`, `frontend/app/page.tsx`, `frontend/app/tasks/page.tsx`, `frontend/components/TaskCard.tsx`, `frontend/components/TaskForm.tsx`, `frontend/components/Navbar.tsx`, `frontend/components/TaskList.tsx`
- 🔁 Next prompts: none
- 🧠 Reflection: Introducing the grid pattern globally (even though it wasn't explicitly in the landing page code before) significantly improved the "depth" of the UI.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): standard
- Next experiment (smallest change to try): none
