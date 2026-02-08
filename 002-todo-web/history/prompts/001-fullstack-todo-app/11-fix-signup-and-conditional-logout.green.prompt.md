# PHR: Fix signup and conditional logout

- **ID:** 11
- **TITLE:** Fix signup and conditional logout
- **STAGE:** green
- **DATE_ISO:** 2026-01-07
- **SURFACE:** agent
- **MODEL:** gemini-2.0-flash-thinking-exp
- **FEATURE:** 001-fullstack-todo-app
- **BRANCH:** main
- **USER:** anonymous
- **COMMAND:** when i am registering new accout. showing Not Found on clicking signup button. and in navbar sign out button is showing on statup, withoutout signin
- **LABELS:** ["frontend", "backend", "auth", "bugfix"]
- **LINKS:**
  - **SPEC:** specs/001-fullstack-todo-app/spec.md
  - **PLAN:** specs/001-fullstack-todo-app/plan.md
  - **TASKS:** specs/001-fullstack-todo-app/tasks.md
  - **ADR:** null
  - **PR:** null

## PROMPT_TEXT

when i am registering new accout. showing Not Found on clicking signup button. and in navbar sign out button is showing on statup, withoutout signin

## RESPONSE_TEXT

I addressed two main issues:

1.  **Signup "Not Found" Error:**
    *   Diagnosed that the backend was missing authentication routes.
    *   Installed `passlib` and `bcrypt` for password hashing.
    *   Implemented `backend/utils/security.py` for JWT and password logic.
    *   Updated `User` model to include `hashed_password` and reset the DB.
    *   Implemented `backend/routes/auth.py` with `/signup` and `/login` endpoints.
    *   Registered routers in `backend/main.py` matching frontend expectations (`/auth` for auth, `/` for tasks).

2.  **Unconditional Sign Out Button:**
    *   Modified `frontend/components/LogoutButton.tsx` to include client-side state for authentication.
    *   Used `useEffect` to check for a user ID on mount and conditionally render the button only when authenticated.

## FILES_YAML

- backend/main.py
- backend/models.py
- backend/routes/auth.py
- backend/utils/security.py
- frontend/components/LogoutButton.tsx
- reset_db.py

## TESTS_YAML

- Manual verification of API routes via code analysis.

## OUTCOME

Signup now hits a valid endpoint, and the "Sign Out" button is hidden for unauthenticated users.
