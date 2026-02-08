# Implementation Plan: Phase V Part A - Advanced Features

**Branch**: `012-advanced-features` | **Date**: 2026-02-05 | **Spec**: [specs/012-advanced-features/spec.md](spec.md)
**Input**: Feature specification from `/specs/012-advanced-features/spec.md`

## Summary
Transform the Todo application into a comprehensive productivity tool by implementing recurring tasks, due dates with reminders, priority levels, user-scoped tagging, and advanced search/filter/sort capabilities. The technical approach leverages `python-dateutil` for recurrence, PostgreSQL Full-Text Search for retrieval, and a normalized relational schema for metadata.

## Technical Context

**Language/Version**: Python 3.13+, TypeScript 5+  
**Primary Dependencies**: FastAPI, SQLModel, Next.js 16, python-dateutil  
**Storage**: PostgreSQL (Production) / SQLite (Dev)  
**Testing**: pytest (backend)  
**Target Platform**: Kubernetes (Minikube)  
**Project Type**: Web app (Next.js + FastAPI)  
**Performance Goals**: API response < 200ms, FTS search < 500ms  
**Constraints**: Stateless backend, user isolation, 10 tags per task limit  
**Scale/Scope**: Support 1,000+ tasks per user with efficient filtering

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] **Architecture Principles**:
  - [x] Separation of Concerns: Decoupled frontend/backend via REST.
  - [x] Stateless Design: All state in DB; recurrence generated on-the-fly.
  - [x] User Isolation: All metadata (tags, reminders) scoped to `user_id`.
  - [x] Scalability First: Optimized indexes for FTS and filtering.
- [x] **Technology Stack Constraints**:
  - [x] Frontend: Next.js 16+, Tailwind CSS 4.
  - [x] Backend: FastAPI, SQLModel.
  - [x] Forbidden: No NoSQL, no raw SQL.
- [x] **Security Requirements**:
  - [x] Authentication: JWT required for all new metadata endpoints.
  - [x] Data Protection: Secrets via Env vars.
- [x] **Code Standards**:
  - [x] Python Backend: Async/await used for all DB/API ops.
- [x] **API Design Standards**:
  - [x] REST Conventions: Resource-based URLs for tags and tasks.
- [x] **Database Standards**:
  - [x] Schema Rules: Junction table for many-to-many tags.
- [x] **Performance Standards**:
  - [x] Response Times: Targeted < 300ms for filtered lists.

## Project Structure

### Documentation (this feature)

```text
specs/012-advanced-features/
├── plan.md              # This file
├── spec.md              # Feature requirements
├── research.md          # Technology decisions (RRule, FTS)
├── data-model.md        # Extended schema & junction tables
├── quickstart.md        # Verification guide
├── contracts/           
│   └── api.md           # New/Extended API endpoints
└── checklists/          
    └── requirements.md  # Quality validation
```

### Source Code (repository root)

```text
backend/
├── main.py           # Extended with search/filter params
├── models.py         # Added Tag, TaskTag, Reminder models
├── routes/           
│   ├── tasks.py      # Updated for new metadata
│   ├── tags.py       # New tag management routes
│   └── chat.py       # Updated for NLP extraction
├── mcp_server/
│   ├── tools.py      # Updated MCP tools
└── migrations/       # Alembic scripts
```

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| Many-to-Many Tags | Required for flexible organization | JSON arrays in tasks table are harder to manage globally. |
| Background Reminders | Required for time-based triggers | Polling is simpler than full task queues for this phase. |