---
id: 44
title: fix-bcrypt-password-truncation
stage: red
date: 2026-01-13
surface: agent
model: gemini
feature: 001-fullstack-todo-app
branch: main
user: Sharing
command: fix bug
labels: ["bugfix", "backend", "auth", "bcrypt"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - backend/routes/auth.py
 - backend/utils/security.py
tests: []
---

## Prompt

the backend and frontend is runnning but getting Failed to fetch when trying to signup. backend is showing this error: ValueError: password cannot be longer than 72 bytes, truncate manually if necessary (e.g. my_password[:72])

## Response snapshot

Modified `backend/routes/auth.py` to catch `ValueError` during signup and return 400. Modified `backend/utils/security.py` to truncate passwords to 72 bytes to prevent bcrypt crash.

## Outcome

- ✅ Impact: Fixed backend crash on signup with long passwords.
- 🧪 Tests: Manual verification required.
- 📁 Files: Updated auth.py and security.py.
- 🔁 Next prompts: Verify signup works.
- 🧠 Reflection: Bcrypt limitation handled by truncation.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): n/a
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): n/a
