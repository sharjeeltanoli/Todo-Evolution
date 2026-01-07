---
id: "0013"
title: "fix-auth-header-missing"
stage: "green"
date: "2026-01-07"
surface: "agent"
model: "gemini-2.0-flash-exp"
feature: "todo-mvp-auth"
branch: "002-todo-mvp-auth"
user: "Sharing"
command: "now not adding task"
labels:
  - "bugfix"
  - "auth"
  - "api"
links:
  spec: "specs/002-todo-mvp-auth/spec.md"
  ticket: null
  adr: null
  pr: null
files:
  - "frontend/lib/api.ts"
tests: []
---

# Prompt
signup signin is ready. now not adding task

# Response
Investigated why adding tasks was failing.
Found that `frontend/lib/api.ts` was not including the Authentication header in requests to the backend.
The backend requires a Bearer token to identify the user (`get_current_user` dependency).

## Changes
1.  **Updated `frontend/lib/api.ts`**:
    - Imported `authClient` from `@/lib/auth-client`.
    - Added logic to fetch the current session using `authClient.getSession()`.
    - Injected the `Authorization: Bearer <token>` header if a token is present.

This ensures that requests to `/api/tasks/` are authenticated, allowing the backend to extract the `user_id` and create the task.
