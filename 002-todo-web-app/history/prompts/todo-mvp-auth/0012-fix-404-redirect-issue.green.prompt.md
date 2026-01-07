---
id: "0012"
title: "fix-404-redirect-issue"
stage: "green"
date: "2026-01-07"
surface: "agent"
model: "gemini-2.0-flash-exp"
feature: "todo-mvp-auth"
branch: "002-todo-mvp-auth"
user: "Sharing"
command: "fix 404 error"
labels:
  - "bugfix"
  - "routing"
  - "auth"
links:
  spec: "specs/002-todo-mvp-auth/spec.md"
  ticket: null
  adr: null
  pr: null
files:
  - "frontend/app/(auth)/sign-up/page.tsx"
  - "frontend/.env.local"
tests: []
---

# Prompt
after signin still getting 404
This page could not be found.

# Response
Investigated the 404 error.
Found that `sign-up/page.tsx` was redirecting to `/tasks` (non-existent) instead of `/`.
Also identified missing `NEXT_PUBLIC_BETTER_AUTH_URL` in environment variables, which could affect client-side auth.

## Changes
1.  **Fixed Redirect**: Updated `frontend/app/(auth)/sign-up/page.tsx` to redirect to `/` on success.
2.  **Added Env Var**: Created `frontend/.env.local` with `NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000`.

This should resolve the 404 if the user was hitting the sign-up flow or if the client was misconfigured.
