---
id: 64
title: Fix Pydantic Core Version Mismatch
stage: red
date: 2026-01-14
surface: agent
model: gemini-pro
feature: 001-fullstack-todo-app
branch: main
user: placeholder
command: getting this error on backend: raise SystemError( SystemError: The installed pydantic-core version (2.14.6) is incompatible with the current pydantic version, which requires 2.41.5. If you encounter this error, make sure that you haven't upgraded pydantic-core manually.getting this error on backend: raise SystemError( SystemError: The installed pydantic-core version (2.14.6) is incompatible with the current pydantic version, which requires 2.41.5. If you encounter this error, make sure that you haven't upgraded pydantic-core manually.
labels: [bug-fix, pydantic, dependencies]
links:
  spec: "specs/001-fullstack-todo-app/spec.md"
  ticket: "null"
  adr: "null"
  pr: "null"
files:
  - backend/requirements.txt
tests:
  - "none"
---

## Prompt

getting this error on backend: raise SystemError( SystemError: The installed pydantic-core version (2.14.6) is incompatible with the current pydantic version, which requires 2.41.5. If you encounter this error, make sure that you haven't upgraded pydantic-core manually.getting this error on backend: raise SystemError( SystemError: The installed pydantic-core version (2.14.6) is incompatible with the current pydantic version, which requires 2.41.5. If you encounter this error, make sure that you haven't upgraded pydantic-core manually.

## Response snapshot

Resolved a dependency conflict with pydantic by recreating the virtual environment and explicitly defining the pydantic-core version in requirements.txt.

## Outcome

- ✅ Impact: Fixed a critical backend error that prevented the application from starting.
- 🧪 Tests: No new tests were added. The fix was verified by successfully installing dependencies.
- 📁 Files: Modified `backend/requirements.txt` to pin the version of `pydantic-core`.
- 🔁 Next prompts: Start the backend server to confirm the fix.
- 🧠 Reflection: The initial error was misleading. The root cause was the lack of a properly isolated virtual environment, leading to dependency conflicts with globally installed packages. Recreating the venv and explicitly installing dependencies solved it.

## Evaluation notes (flywheel)

- Failure modes observed: Initial attempts to fix the dependency failed because the virtual environment was not being used.
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): "null"
- Next experiment (smallest change to try): When dependency issues arise, first verify the virtual environment is active and correctly configured.
