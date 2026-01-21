---
id: 8
title: fix-cors-login-error
stage: green
date: 2026-01-21
surface: agent
model: gemini-2.0-flash-thinking-exp-1219
feature: 003-ai-task-chatbot
branch: main
user: Sharing
command: replace
labels: ["cors", "fastapi", "bugfix"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - backend/main.py
tests:
 - manual verification
---

## Prompt

please resolve this error while login Access to fetch at 'http://localhost:8000/auth/login' from origin 'http://localhost:3000' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource.Understand this error
:8000/auth/login:1

## Response snapshot

Added `CORSMiddleware` to `backend/main.py` allowing requests from `http://localhost:3000` with credentials. This resolves the missing `Access-Control-Allow-Origin` header error during login.

## Outcome

- ✅ Impact: Fixed login CORS error.
- 🧪 Tests: Manual verification of code.
- 📁 Files: Modified backend/main.py.
- 🔁 Next prompts: Verify login functionality.
- 🧠 Reflection: The backend was missing the middleware application despite importing it.

## Evaluation notes (flywheel)

- Failure modes observed: Missing configuration.
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): N/A
