---
id: 1
title: Specify Dockerization for Todo App
stage: spec
date: 2026-01-28
surface: agent
model: gemini-cli
feature: 011-dockerize-todo-app
branch: 011-dockerize-todo-app
user: "user"
command: "/sp.specify"
labels: ["spec", "docker", "containerization"]
links:
  spec: "specs/011-dockerize-todo-app/spec.md"
  ticket: null
  adr: null
  pr: null
files:
  - specs/011-dockerize-todo-app/spec.md
  - specs/011-dockerize-todo-app/checklists/requirements.md
tests:
  - "N/A"
---

## Prompt

"Phase IV: Dockerize Todo Application for Kubernetes Objective: Create production-ready Docker images for all services Services to Dockerize: 1. Frontend (Next.js) - Port 3000 2. Backend (FastAPI) - Port 8000 3. MCP Server (FastAPI) - Port 8001 Requirements for Each Dockerfile: Frontend (frontend/Dockerfile): - Stage 1 (dependencies): Install dependencies with npm ci - Stage 2 (builder): Build Next.js app with npm run build - Stage 3 (runner): Copy standalone output, run as non-root - Base: node:22-alpine - User: node (UID 1000) - Healthcheck: curl http://localhost:3000/api/health - Environment: NEXT_PUBLIC_API_URL from ConfigMap Backend (backend/Dockerfile): - Stage 1 (dependencies): Install Python deps with UV - Stage 2 (runner): Copy app and deps, run with uvicorn - Base: python:3.13-slim - User: app (UID 1000) - Healthcheck: curl http://localhost:8000/health - Environment: DATABASE_URL, BETTER_AUTH_SECRET from Secret MCP Server (backend/mcp-server/Dockerfile or separate): - Stage 1 (dependencies): Install Python deps with UV - Stage 2 (runner): Copy MCP server code, run with uvicorn - Base: python:3.13-slim - User: mcp (UID 1000) - Healthcheck: curl http://localhost:8001/health - Environment: DATABASE_URL from Secret Docker Ignore Files: - frontend/.dockerignore: node_modules, .next, .git, .env* - backend/.dockerignore: __pycache__, .venv, .git, .env* Build Script (scripts/docker-build.sh): - Build all images with version tag - Use docker build --target for multi-stage - Optional: Use Gordon for optimization Follow Constitution: 14.5 (Docker Standards), 14.6 (Gordon Integration) Files to Create: - frontend/Dockerfile - frontend/.dockerignore - backend/Dockerfile - backend/.dockerignore - backend/mcp-server/Dockerfile (if separate) - scripts/docker-build.sh Acceptance Criteria: - All images build successfully - Images under 200MB (alpine/slim optimized) - No root user execution - Health checks respond 200 OK - No secrets baked into images - Build script runs without errors"

## Response snapshot

Created a new feature branch `011-dockerize-todo-app` and generated a detailed feature specification in `specs/011-dockerize-todo-app/spec.md`. The specification outlines the user stories, functional requirements, and success criteria for containerizing the frontend, backend, and MCP server applications. A quality checklist was also created at `specs/011-dockerize-todo-app/checklists/requirements.md`.

## Outcome

- ✅ Impact: High. This is a foundational step for Kubernetes deployment.
- 🧪 Tests: N/A
- 📁 Files: 
  - `specs/011-dockerize-todo-app/spec.md`
  - `specs/011-dockerize-todo-app/checklists/requirements.md`
- 🔁 Next prompts: `/sp.plan`
- 🧠 Reflection: The user provided a very detailed technical spec, which made creating the formal specification straightforward. The process was smooth. The PHR script failure was an unexpected but handled issue.

## Evaluation notes (flywheel)

- Failure modes observed: The `create-phr.sh` script failed to find its template.
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): N/A
- Next experiment: Investigate why the PHR script is failing.
