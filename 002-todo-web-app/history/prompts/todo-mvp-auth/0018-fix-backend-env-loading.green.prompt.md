---
id: "0018"
title: "fix-backend-env-loading"
stage: "green"
date: "2026-01-07"
surface: "agent"
model: "gemini-2.0-flash-exp"
feature: "todo-mvp-auth"
branch: "002-todo-mvp-auth"
user: "Sharing"
command: "still 500 error BETTER_AUTH_SECRET not set"
labels:
  - "bugfix"
  - "env"
  - "backend"
links:
  spec: "specs/002-todo-mvp-auth/spec.md"
  ticket: null
  adr: null
  pr: null
files:
  - "backend/auth.py"
  - "backend/db.py"
tests: []
---

# Prompt
error still exists API Error (500): BETTER_AUTH_SECRET not set

# Response
Investigated the persistent 500 error.
Found that `load_dotenv()` without arguments searches the current working directory.
Since the backend is likely being run from the project root (or via a script that doesn't set the CWD to `backend/`), it wasn't finding `backend/.env`.

## Changes
1.  **Updated `backend/auth.py`**: Changed `load_dotenv()` to `load_dotenv(os.path.join(os.path.dirname(__file__), ".env"))`.
2.  **Updated `backend/db.py`**: Applied the same fix for consistency.

This forces the backend to load the `.env` file located in the same directory as the source files, regardless of where the command is run from.
