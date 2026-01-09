---
id: 24
title: Adjust Navbar Visibility Based on Route
stage: green
date: 2026-01-08
surface: agent
model: gemini
feature: 001-fullstack-todo-app
branch: 002-todo-mvp-auth
user: Sharing
command: Adjust navbar visibility based on route
labels: ["frontend", "ui", "navigation", "responsiveness"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - frontend/components/Navbar.tsx
  - frontend/app/layout.tsx
tests:
  - browser verification
---

## Prompt

Adjust navbar visibility based on route.

Requirements:
Hide navbar on landing page (/)
Show navbar on authenticated pages (e.g. /tasks)
No auth logic changes

Constraints:
Layout-based solution preferred

Output:
Conditional navbar rendering

## Response snapshot

Implemented a conditional `Navbar` component that uses `usePathname` to control visibility.
- Created `frontend/components/Navbar.tsx` (Client Component).
- Configured it to return `null` when the path is exactly `/`.
- Updated `RootLayout` in `frontend/app/layout.tsx` to include the new `Navbar`.
- Verified via browser tools that the navbar is hidden on the landing page and visible on the tasks page.

## Outcome

- ✅ Impact: Landing page now has a cleaner look without the app navbar, while authenticated pages maintain full navigation.
- 🧪 Tests: Verified with Playwright (navCount is 0 on `/`, 1 on `/tasks`).
- 📁 Files: `frontend/components/Navbar.tsx`, `frontend/app/layout.tsx`
- 🔁 Next prompts: none
- 🧠 Reflection: Moving the navbar into its own client component keeps the root layout clean and allows for easy route-based logic.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): standard
- Next experiment (smallest change to try): none
