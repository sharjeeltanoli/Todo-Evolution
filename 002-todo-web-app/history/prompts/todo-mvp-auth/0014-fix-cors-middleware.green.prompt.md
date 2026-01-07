---
id: "0014"
title: "fix-cors-middleware"
stage: "green"
date: "2026-01-07"
surface: "agent"
model: "gemini-2.0-flash-exp"
feature: "todo-mvp-auth"
branch: "002-todo-mvp-auth"
user: "Sharing"
command: "add task button stuck"
labels:
  - "bugfix"
  - "cors"
  - "backend"
links:
  spec: "specs/002-todo-mvp-auth/spec.md"
  ticket: null
  adr: null
  pr: null
files:
  - "backend/main.py"
tests: []
---

# Prompt
add task button is showing Adding but task is stuck here

# Response
Investigated the "stuck" state when adding a task.
Suspected CORS (Cross-Origin Resource Sharing) issues because the frontend (port 3000) calls the backend (port 8000) and no CORS middleware was configured.
This causes the browser to block the request, often silently or with a generic network error, leaving the UI in a loading state if not properly handled.

## Changes
1.  **Added CORS Middleware**: Updated `backend/main.py` to include `CORSMiddleware`.
    - Allowed origin: `http://localhost:3000`
    - Allowed credentials, methods, and headers.

This should allow the frontend to successfully communicate with the backend.
