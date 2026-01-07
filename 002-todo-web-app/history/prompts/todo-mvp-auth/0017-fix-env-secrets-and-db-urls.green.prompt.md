---
id: "0017"
title: "fix-env-secrets-and-db-urls"
stage: "green"
date: "2026-01-07"
surface: "agent"
model: "gemini-2.0-flash-exp"
feature: "todo-mvp-auth"
branch: "002-todo-mvp-auth"
user: "Sharing"
command: "API Error (500): BETTER_AUTH_SECRET not set"
labels:
  - "bugfix"
  - "env"
  - "secrets"
  - "database"
links:
  spec: "specs/002-todo-mvp-auth/spec.md"
  ticket: null
  adr: null
  pr: null
files:
  - "backend/.env"
  - "frontend/.env"
tests: []
---

# Prompt
after sigin getting this error API Error (500): BETTER_AUTH_SECRET not set. if we need to change api key tell me

# Response
Investigated the 500 error. 
Even though `BETTER_AUTH_SECRET` was present in the files, the backend might have been failing to load it properly if it contained placeholder text or if there was a mismatch.
I also updated the `DATABASE_URL` in the environment files to reflect the switch to SQLite, as they were still pointing to a non-existent PostgreSQL instance.

## Changes
1.  **Generated New Secret**: Created a secure 32-character random string for `BETTER_AUTH_SECRET`.
2.  **Updated Backend `.env`**: Set `BETTER_AUTH_SECRET` and pointed `DATABASE_URL` to `sqlite+aiosqlite:///database.db`.
3.  **Updated Frontend `.env`**: Set matching `BETTER_AUTH_SECRET` and updated `DATABASE_URL`.

This ensures both servers have the same secret for JWT verification and use the correct database file.
