# Implementation Plan: Dockerize Todo Application

**Feature Branch**: `011-dockerize-todo-app`
**Version**: 1.0.0

## 1. Technical Context

This plan outlines the steps to containerize the Todo application's services (Frontend, Backend, MCP Server) using Docker.

- **Services to be Containerized**:
  - `frontend`: Next.js application
  - `backend`: FastAPI application
  - `mcp-server`: FastAPI application (part of the backend)
- **Tooling**:
  - `Docker`: For building and running containers.
  - `npm`: For frontend dependency management.
  - `uv`: For backend Python dependency management.
  - `bash`: For the build script.
- **Key Technologies**:
  - `Docker`: Multi-stage builds, non-root users, health checks.
  - `Next.js`: Standalone build output.
  - `FastAPI`: Running with Uvicorn.

## 2. Constitution Check

This plan adheres to the project constitution, specifically **Section 14: Phase IV: Kubernetes Deployment Principles**.

- **Gate**: `14.1 Container-First Architecture`
  - **Status**: ✅ PASS
  - **Rationale**: The entire plan is centered on creating self-contained, immutable Docker containers for all services.
- **Gate**: `14.5 Docker Standards`
  - **Status**: ✅ PASS
  - **Rationale**: The plan explicitly requires multi-stage builds, non-root users, health checks, `.dockerignore` files, and externalized secrets, in full compliance with this principle.
- **Gate**: `14.6 Docker AI (Gordon) Integration`
  - **Status**: ✅ PASS (Optional)
  - **Rationale**: The plan acknowledges the use of Gordon for generating Dockerfiles as an optional, AI-assisted approach, aligning with the constitution.

**Result**: All constitutional gates are passed.

## 3. Implementation Phases

### Phase 1: Dockerfile and Configuration Setup

#### **Task 1.1: Create Backend Dockerfile**
- **File**: `backend/Dockerfile`
- **Steps**:
  1.  **Dependencies Stage**: Use `python:3.13-slim` as the base. Create a virtual environment, copy `requirements.txt`, and install dependencies using `uv`. This creates a cacheable layer.
  2.  **Runner Stage**: Use `python:3.13-slim` as the base. Create a non-root user `appuser`. Copy the application code and the virtual environment from the dependencies stage.
  3.  Set the `appuser` as the active user.
  4.  Implement a `HEALTHCHECK` instruction that uses `curl` to hit the `/health` endpoint.
  5.  The `CMD` will execute `uvicorn` to run the main FastAPI application, binding to `0.0.0.0:8000`.

#### **Task 1.2: Create Frontend Dockerfile**
- **File**: `frontend/Dockerfile`
- **Steps**:
  1.  **Dependencies Stage**: Use `node:22-alpine` as the base. Copy `package.json` and `package-lock.json`, then run `npm ci` to install dependencies.
  2.  **Builder Stage**: Copy the rest of the source code and run `npm run build` to create the production build.
  3.  **Runner Stage**: Use `node:22-alpine`. Create a non-root user `nextjs`. Copy the standalone output from the `.next/standalone` directory of the builder stage.
  4.  Set the `nextjs` user as the active user.
  5.  Implement a `HEALTHCHECK` that curls the `/api/health` endpoint.
  6.  The `CMD` will be `node server.js` inside the standalone output directory.

#### **Task 1.3: Create Docker Ignore Files**
- **File**: `backend/.dockerignore`
  - **Content**: `__pycache__`, `.venv`, `.git`, `.idea`, `*.pyc`, `todo.db`
- **File**: `frontend/.dockerignore`
  - **Content**: `node_modules`, `.next`, `.git`, `.env*`

### Phase 2: Build Automation

#### **Task 2.1: Create Docker Build Script**
- **File**: `scripts/docker-build.sh`
- **Steps**:
  1.  The script will be written in Bash and be executable.
  2.  It will accept an optional version tag as the first argument (e.g., `./scripts/docker-build.sh v1.0.1`). If no tag is provided, it defaults to `latest`.
  3.  It will navigate to the `backend` directory and run `docker build` to create the `todo-backend` image.
  4.  It will navigate to the `frontend` directory and run `docker build` to create the `todo-frontend` image.
  5.  Both build commands will include the appropriate version tag.
  6.  The script will use `set -e` to exit immediately if any build command fails.
  7.  It will print success messages upon completion of each image build.

## 4. Generated Artifacts

- `specs/011-dockerize-todo-app/research.md`
- `specs/011-dockerize-todo-app/data-model.md`
- `specs/011-dockerize-todo-app/quickstart.md`
- Updates to `.gemini/GEMINI.md` for agent context.
