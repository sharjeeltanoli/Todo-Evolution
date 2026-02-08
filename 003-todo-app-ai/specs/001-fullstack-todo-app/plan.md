# Implementation Plan: Full-stack Todo Application

**Branch**: `001-fullstack-todo-app` | **Date**: 2026-01-03 | **Spec**: [link]
**Input**: Feature specification from `/specs/001-fullstack-todo-app/spec.md`

**Note**: This template is filled in by the `/sp.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

This plan outlines the technical architecture for a full-stack todo web application with user authentication, adhering to the project constitution. It covers the frontend (Next.js), backend (FastAPI), database (Neon PostgreSQL), and authentication flow (JWT with Better Auth).

## Technical Context

<!--
  ACTION REQUIRED: Replace the content in this section with the technical details
  for the project. The structure here is presented in advisory capacity to guide
  the iteration process.
-->

**Language/Version**: Python 3.13+, TypeScript  
**Primary Dependencies**: FastAPI, SQLModel, Next.js, Better Auth  
**Storage**: Neon Serverless PostgreSQL  
**Testing**: pytest, Jest  
**Target Platform**: Web (Vercel for frontend)
**Project Type**: Web application  
**Performance Goals**: API < 200ms, Page loads < 2s  
**Constraints**: Stateless backend, JWT auth, User isolation  
**Scale/Scope**: ~10k users, 5 basic features

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [ ] **Architecture Principles**:
  - [ ] Separation of Concerns: Frontend/backend decoupled, REST only, no direct DB access from frontend, single service responsibility.
  - [ ] Stateless Design: Backend services stateless, state in DB, no in-memory session.
  - [ ] User Isolation: All resources scoped to authenticated user, no cross-user data access, ownership validation enforced.
  - [ ] Scalability First: Horizontal scaling possible, no hardcoded URLs/ports, environment-based config.
- [ ] **Technology Stack Constraints**:
  - [ ] Frontend: Next.js 15+ (App Router), TypeScript, Tailwind CSS, Better Auth.
  - [ ] Backend: Python 3.13+, FastAPI, SQLModel, Neon Serverless PostgreSQL.
  - [ ] Development: Gemini CLI, Spec-Kit Plus, UV.
  - [ ] Forbidden: No Express.js/Node backends, NoSQL, GraphQL (Phase II), inline styles, localStorage, manual SQL.
- [ ] **Security Requirements**:
  - [ ] Authentication: JWT required, issued by Better Auth, shared secret, 7-day expiry.
  - [ ] Authorization: Every endpoint validates user identity, user ID from JWT matches URL param, 401/403 for invalid/unauthorized.
  - [ ] Data Protection: Environment variables for secrets, no creds in code/VC, HTTPS in prod, API keys never exposed to frontend.
- [ ] **Code Standards**:
  - [ ] Python Backend: Type hints, async/await, Pydantic for validation, HTTPException for errors, single responsibility per handler.
  - [ ] TypeScript Frontend: Strict mode, no `any`, Server Components by default, Client Components for interactivity, async/await for API calls.
  - [ ] Naming Conventions: snake_case (Python), camelCase (TypeScript), PascalCase (components/classes), SCREAMING_SNAKE_CASE for constants.
- [ ] **API Design Standards**:
  - [ ] REST Conventions: Resource-based URLs, HTTP methods, status codes, JSON only, consistent error format.
  - [ ] Response Structure: Consistent success/list/error JSON formats.
  - [ ] Request Validation: All fields validated via Pydantic, 400 for invalid input, sanitize input.
- [ ] **Database Standards**:
  - [ ] Schema Rules: PK auto-increment, FK referential integrity, created/updated timestamps, soft deletes, indexes on FK/query fields.
  - [ ] Model Standards: Reflect constitution's Task model example.
  - [ ] Query Standards: Filter by user_id, SQLModel select(), limit result sets, handle not found, no N+1.
- [ ] **Testing Requirements**:
  - [ ] What Must Be Tested: All API endpoints, auth/authz, user isolation, input validation, DB ops.
  - [ ] Testing Standards: pytest (backend), Jest (frontend), mock external dependencies, isolated test data.
- [ ] **Performance Standards**:
  - [ ] Response Times: API < 200ms, page loads < 2s, no blocking ops, async I/O.
  - [ ] Resource Usage: DB pooling, close connections, no memory leaks, efficient queries.
- [ ] **Error Handling**:
  - [ ] Backend: Try-except, HTTPException, log errors, graceful degradation.
  - [ ] Frontend: Try-catch, user-friendly messages, no technical details, fallback UI.
- [ ] **Deployment Standards**:
  - [ ] Environment Variables Required: Listed example env vars.
  - [ ] Production Requirements: HTTPS, env-specific configs, automated DB migrations, health check endpoint.

## Project Structure

### Documentation (this feature)

```text
specs/[###-feature]/
├── plan.md              # This file (/sp.plan command output)
├── research.md          # Phase 0 output (/sp.plan command)
├── data-model.md        # Phase 1 output (/sp.plan command)
├── quickstart.md        # Phase 1 output (/sp.plan command)
├── contracts/           # Phase 1 output (/sp.plan command)
└── tasks.md             # Phase 2 output (/sp.tasks command - NOT created by /sp.plan)
```

### Source Code (repository root)
<!--
  The project structure follows the Constitution's mandate for web applications.
-->

```text
backend/
├── main.py           # FastAPI app entry
├── models.py         # SQLModel definitions
├── routes/           # Route handlers
├── middleware/       # Auth middleware
└── db.py            # Database connection

frontend/
├── app/             # Next.js pages
├── components/      # Reusable components
├── lib/
│   ├── api.ts      # API client
│   └── auth.ts     # Auth helpers
└── types/          # TypeScript types
```

**Structure Decision**: The project structure follows the web application model mandated by the constitution, with a decoupled frontend and backend.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |
