---
id: 43
title: fix-bcrypt-password-length-error
stage: red
date: 2026-01-09
surface: agent
model: gemini-2.0-flash-exp
feature: 001-fullstack-todo-app
branch: main
user: user
command: fix-password-error
labels: ["backend", "security", "bugfix", "vercel"]
links:
  spec: specs/001-fullstack-todo-app/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - backend/utils/security.py
tests:
 - null
---

## Prompt

after your modifcation getting this on backendValueError: password cannot be longer than 72 bytes, truncate manually if necessary (e.g. my_password[:72])

geting failed to fetch when trying to signin

## Response snapshot

Fixed `ValueError` in `backend/utils/security.py` caused by bcrypt's 72-byte limit.

1.  Updated `verify_password` to catch `ValueError` and return `False`.
2.  Updated `get_password_hash` to raise a descriptive `ValueError` if the password is too long.

## Outcome

- ✅ Impact: Prevented backend crashes when handling long passwords, which was causing "failed to fetch" errors on the frontend.
- 🧪 Tests: Manual verification of code changes.
- 📁 Files: Modified `backend/utils/security.py`.
- 🔁 Next prompts: null
- 🧠 Reflection: The 72-byte limit is a known bcrypt constraint. The previous implementation didn't handle it, leading to crashes with long inputs.

## Evaluation notes (flywheel)

- Failure modes observed: null
- Graders run and results (PASS/FAIL): null
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): null
