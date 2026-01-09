---
id: 31
title: Cleanup auth routing and remove redundant pages
stage: green
date: 2026-01-08
surface: agent
model: gemini-2.0-flash
feature: 001-fullstack-todo-app
branch: main
user: Sharing
command: /cleanup
labels: ["auth", "cleanup", "routing"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files_yaml:
  - frontend/components/LogoutButton.tsx
  - frontend/components/UserMenu.tsx
  - frontend/app/tasks/page.tsx
  - frontend/app/signin/ (deleted)
  - frontend/app/signup/ (deleted)
tests_yaml:
  - none
---

### Prompt
Update Sign-Out Redirect: Modify the Sign-Out function so that after a successful logout, the user is redirected to the home page (/) instead of /signin.

Remove Redundant Pages: Delete the /signin and /signup page files (e.g., app/signin/page.tsx or similar) since these are now components on the home page.

Update Auth Config: In the auth-client.ts or wherever the BetterAuth client is initialized, update any secondaryPaths or redirects to point to / instead of /signin.

Check Links: Ensure any 'Logout' button in your navigation or UI uses the updated redirect logic.

No Logic Change: Do not touch the core session management, only the path routing.

### Response
I have completed the cleanup as requested:
1. Updated `frontend/components/LogoutButton.tsx` to redirect to `/` after logout.
2. Deleted `frontend/app/signin` and `frontend/app/signup` directories.
3. Updated `frontend/components/UserMenu.tsx` to point links to `/`.
4. Updated `frontend/app/tasks/page.tsx` to redirect unauthenticated users to `/`.
5. Verified that no other hardcoded links to `/signin` or `/signup` remain in the UI.

### Outcome
The authentication flow now correctly redirects users to the home page, and redundant page files have been removed to align with the new component-based landing page structure.
