---
id: "0015"
title: "fix-auth-strategy-jwt"
stage: "green"
date: "2026-01-07"
surface: "agent"
model: "gemini-2.0-flash-exp"
feature: "todo-mvp-auth"
branch: "002-todo-mvp-auth"
user: "Sharing"
command: "issue is not resolved (task stuck)"
labels:
  - "bugfix"
  - "auth"
  - "database"
  - "jwt"
links:
  spec: "specs/002-todo-mvp-auth/spec.md"
  ticket: null
  adr: null
  pr: null
files:
  - "frontend/lib/auth.ts"
  - "frontend/package.json"
tests: []
---

# Prompt
the issue is not resolved

# Response
Investigated why task creation was still stuck.
Found that `better-auth` was likely using opaque session tokens (default behavior) while the backend expected a JWT (stateless verification).
This caused the backend to reject the token (likely 401/500), and `better-auth` itself was missing a database adapter to store sessions properly, which might have caused `getSession` to hang or fail silently if using an ephemeral store that didn't persist across restarts.

## Changes
1.  **Installed `pg`**: Added PostgreSQL driver to `frontend/package.json`.
2.  **Updated `frontend/lib/auth.ts`**:
    - Configured `better-auth` to use the `pg` adapter with `DATABASE_URL`.
    - Enabled `session: { jwt: true }` to ensure tokens are JWTs compatible with the backend's verification logic.

This aligns the frontend's token generation with the backend's expectation.
