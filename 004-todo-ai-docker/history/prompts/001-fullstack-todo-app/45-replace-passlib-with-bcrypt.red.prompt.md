---
id: 45
title: replace-passlib-with-bcrypt
stage: red
date: 2026-01-13
surface: agent
model: gemini
feature: 001-fullstack-todo-app
branch: main
user: Sharing
command: fix bug
labels: ["bugfix", "backend", "auth", "bcrypt", "passlib"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - backend/utils/security.py
 - backend/requirements.txt
tests: []
---

## Prompt

the error is not resolved. backend: AttributeError: module 'bcrypt' has no attribute '__about__' ... frontend: password cannot be longer than 72 bytes ...

## Response snapshot

Replaced `passlib` with `bcrypt` directly in `backend/utils/security.py` to resolve compatibility issues and manually handle password truncation (72 bytes limit). Updated `backend/requirements.txt` to remove `passlib` and ensure `bcrypt` is present.

## Outcome

- ✅ Impact: Fixed `AttributeError` and `ValueError` by bypassing `passlib`.
- 🧪 Tests: Manual verification required.
- 📁 Files: Updated security.py and requirements.txt.
- 🔁 Next prompts: Verify signup works.
- 🧠 Reflection: `passlib` is unmaintained and has issues with newer `bcrypt`. Direct usage is safer.

## Evaluation notes (flywheel)

- Failure modes observed: Dependency incompatibility.
- Graders run and results (PASS/FAIL): n/a
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): n/a
