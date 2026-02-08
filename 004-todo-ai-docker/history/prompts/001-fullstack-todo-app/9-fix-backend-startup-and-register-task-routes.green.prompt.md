# PHR: Fix backend startup and register task routes

- **ID:** 9
- **TITLE:** Fix backend startup and register task routes
- **STAGE:** green
- **DATE_ISO:** 2026-01-07
- **SURFACE:** agent
- **MODEL:** gemini-2.0-flash-thinking-exp
- **FEATURE:** 001-fullstack-todo-app
- **BRANCH:** main
- **USER:** anonymous
- **COMMAND:** run backend and see to errors are fixed
- **LABELS:** ["backend", "fastapi", "sqlmodel", "bugfix"]
- **LINKS:**
  - **SPEC:** specs/001-fullstack-todo-app/spec.md
  - **PLAN:** specs/001-fullstack-todo-app/plan.md
  - **TASKS:** specs/001-fullstack-todo-app/tasks.md
  - **ADR:** null
  - **PR:** null

## PROMPT_TEXT

run backend and see to  errors are fixed

## RESPONSE_TEXT

I diagnosed and fixed two critical issues in the backend:
1.  **Missing `User` Model:** The `Task` model had a foreign key reference to a `user` table, but the `User` model was not defined in SQLModel's metadata. I added a minimal `User` model to `backend/models.py`.
2.  **Unregistered Task Routes:** The `tasks.router` was defined but not included in the main FastAPI application. I updated `backend/main.py` to include the router under the `/api` prefix.

I verified the fixes by running a diagnostic script that successfully initialized the database and created all tables.

## FILES_YAML

- backend/models.py
- backend/main.py

## TESTS_YAML

- check_startup.py (manual diagnostic script)

## OUTCOME

The backend now starts without errors and correctly initializes the database schema with both `user` and `task` tables. Routes are now correctly served under `/api`.
