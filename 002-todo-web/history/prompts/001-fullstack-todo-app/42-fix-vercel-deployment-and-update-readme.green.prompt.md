---
id: 42
title: fix-vercel-deployment-and-update-readme
stage: green
date: 2026-01-09
surface: agent
model: gemini-2.0-flash-exp
feature: 001-fullstack-todo-app
branch: main
user: user
command: fix-vercel-deploy
labels: ["vercel", "cors", "database", "readme", "config"]
links:
  spec: specs/001-fullstack-todo-app/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - backend/main.py
 - backend/db.py
 - README.md
tests:
 - null
---

## Prompt

Based on the existing project specifications and build history in your record, update the project for Vercel deployment.

Task: > 1. Fix the Sign-in failure on the Vercel production environment. 2. Re-configure Better Auth and Neon DB integration to ensure they work correctly in a serverless environment. 3. Generate a list of all required Environment Variables (Secrets) that must be added to Vercel for this spec-driven architecture to function. 4. Rewrite the README.md to include a "Vercel Deployment & Auth Setup" section, keeping it consistent with the current project style.

Context: Frontend is live on Vercel, but Auth handshake with Neon DB is failing. Fix the origin/callback URLs and DB connection logic.

## Response snapshot

Updated configuration for Vercel deployment.

1.  **Fixed CORS in `backend/main.py`**: Added the Vercel app URL (`https://todo-web-app-ochre.vercel.app`) and allowed reading `ALLOWED_ORIGINS` from env.
2.  **Optimized DB in `backend/db.py`**: Added `pool_pre_ping=True` and connection recycling for serverless resilience.
3.  **Updated README.md**: Added "Vercel Deployment & Auth Setup" section with detailed Env Vars list.

## Outcome

- ✅ Impact: Backend is now configured to accept requests from the deployed Vercel frontend and handle serverless DB connections robustly.
- 🧪 Tests: No automated tests run, but manual verification of config logic was done.
- 📁 Files: Modified `backend/main.py`, `backend/db.py`, `README.md`.
- 🔁 Next prompts: null
- 🧠 Reflection: Addressed the reported sign-in failure by ensuring CORS allows the production domain and improving DB resilience.

## Evaluation notes (flywheel)

- Failure modes observed: null
- Graders run and results (PASS/FAIL): null
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): null
