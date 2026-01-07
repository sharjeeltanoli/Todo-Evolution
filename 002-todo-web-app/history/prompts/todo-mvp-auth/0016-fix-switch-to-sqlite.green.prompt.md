---
id: "0016"
title: "fix-switch-to-sqlite"
stage: "green"
date: "2026-01-07"
surface: "agent"
model: "gemini-2.0-flash-exp"
feature: "todo-mvp-auth"
branch: "002-todo-mvp-auth"
user: "Sharing"
command: "signup login not working"
labels:
  - "bugfix"
  - "database"
  - "sqlite"
  - "better-auth"
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
i have restarted bot servers. now signup login is again not working

# Response
Investigated the failure.
Found that while I configured `pg`, the PostgreSQL server was not running/accessible (Connection Refused).
The backend was falling back to `database.db` (SQLite).
To align frontend and backend and ensure it works without external dependencies, I switched `better-auth` to use SQLite as well.

## Changes
1.  **Installed `better-sqlite3`**: Added SQLite driver to `frontend`.
2.  **Updated `frontend/lib/auth.ts`**:
    - Switched from `pg` to `better-sqlite3`.
    - Pointed database to `../../database.db` (shared with backend).
3.  **Ran Migrations**: Executed `npx @better-auth/cli migrate` to create `user`, `session`, etc., tables in `database.db`.

This ensures both frontend (auth) and backend (tasks) use the same SQLite file.
