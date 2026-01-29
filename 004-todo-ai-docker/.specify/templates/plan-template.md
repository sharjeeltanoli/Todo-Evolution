# Implementation Plan: [FEATURE]

**Branch**: `[###-feature-name]` | **Date**: [DATE] | **Spec**: [link]
**Input**: Feature specification from `/specs/[###-feature-name]/spec.md`

**Note**: This template is filled in by the `/sp.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

[Extract from feature spec: primary requirement + technical approach from research]

## Technical Context

<!--
  ACTION REQUIRED: Replace the content in this section with the technical details
  for the project. The structure here is presented in advisory capacity to guide
  the iteration process.
-->

**Language/Version**: [e.g., Python 3.11, Swift 5.9, Rust 1.75 or NEEDS CLARIFICATION]  
**Primary Dependencies**: [e.g., FastAPI, UIKit, LLVM or NEEDS CLARIFICATION]  
**Storage**: [if applicable, e.g., PostgreSQL, CoreData, files or N/A]  
**Testing**: [e.g., pytest, XCTest, cargo test or NEEDS CLARIFICATION]  
**Target Platform**: [e.g., Linux server, iOS 15+, WASM or NEEDS CLARIFICATION]
**Project Type**: [single/web/mobile - determines source structure]  
**Performance Goals**: [domain-specific, e.g., 1000 req/s, 10k lines/sec, 60 fps or NEEDS CLARIFICATION]  
**Constraints**: [domain-specific, e.g., <200ms p95, <100MB memory, offline-capable or NEEDS CLARIFICATION]  
**Scale/Scope**: [domain-specific, e.g., 10k users, 1M LOC, 50 screens or NEEDS CLARIFICATION]

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

**Structure Decision**: [Document the selected structure and reference the real
directories captured above]

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |
