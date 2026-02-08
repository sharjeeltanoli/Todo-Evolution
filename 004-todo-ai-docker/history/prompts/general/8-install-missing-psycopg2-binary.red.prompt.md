---
id: 8
title: Install missing psycopg2-binary package
stage: red
date: 2026-01-07
surface: agent
model: gemini-1.5-pro-001
feature: none
branch: none
user: {{USER}}
command: |-
  File "C:\Users\Sharing\Documents\002-todo-web\backend\.venv\Lib\site-packages\sqlalchemy\engine\create.py", line 617, in create_engine
      dbapi = dbapi_meth(**dbapi_args)
              ^^^^^^^^^^^^^^^^^^^^^^^^
    File "C:\Users\Sharing\Documents\002-todo-web\backend\.venv\Lib\site-packages\sqlalchemy\dialects\postgresql\psycopg2.py", line 696, in import_dbapi
      import psycopg2
  ModuleNotFoundError: No module named 'psycopg2'
labels: [bug, backend, dependencies]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
- none
tests:
- none
---

## Prompt

File "C:\Users\Sharing\Documents\002-todo-web\backend\.venv\Lib\site-packages\sqlalchemy\engine\create.py", line 617, in create_engine
    dbapi = dbapi_meth(**dbapi_args)
            ^^^^^^^^^^^^^^^^^^^^^^^^
  File "C:\Users\Sharing\Documents\002-todo-web\backend\.venv\Lib\site-packages\sqlalchemy\dialects\postgresql\psycopg2.py", line 696, in import_dbapi
    import psycopg2
ModuleNotFoundError: No module named 'psycopg2'

## Response snapshot

The psycopg2-binary package has been installed and the backend has been restarted.

## Outcome

- ✅ Impact: The backend should now be able to connect to the PostgreSQL database.
- 🧪 Tests: No tests were run.
- 📁 Files: No files were modified, only a package was installed.
- 🔁 Next prompts: User to confirm if the backend is working as expected.
- 🧠 Reflection: The application failed because a required database driver (psycopg2) was not installed in the virtual environment. Installing the package resolved the ModuleNotFoundError.

## Evaluation notes (flywheel)

- Failure modes observed: missing dependencies
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): none
