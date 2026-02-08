# Implementation Plan: Phase V Part B - Dapr and Kafka Integration

**Branch**: `013-dapr-kafka-integration` | **Date**: 2026-02-07 | **Spec**: `/specs/013-dapr-kafka-integration/spec.md`
**Input**: Feature specification from `/specs/013-dapr-kafka-integration/spec.md`

## Summary

Transform the Todo application from a monolithic architecture to an event-driven microservices architecture using Dapr and Kafka. This involves integrating Dapr sidecars for pub/sub messaging, setting up Redpanda as a Kafka broker, and implementing dedicated microservices for notifications and recurring task management.

## Technical Context

**Language/Version**: Python 3.13+, TypeScript (Next.js 16)
**Primary Dependencies**: FastAPI, Dapr Python SDK, python-dateutil, Redpanda (Kafka)
**Storage**: PostgreSQL (Neon Serverless)
**Testing**: pytest (backend), Playwright (E2E/Browser automation)
**Target Platform**: Minikube (Kubernetes)
**Project Type**: Full-stack web app with microservices
**Performance Goals**: Event publish latency < 50ms (p95), Consumer lag < 1s (p95)
**Constraints**: Stateless design, user isolation, sidecar-based integration, at-least-once delivery
**Scale/Scope**: Task events, notification service, recurring task service, Dapr Jobs API

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] **Architecture Principles**:
  - [x] Separation of Concerns: Frontend/backend decoupled, REST only, no direct DB access from frontend, single service responsibility.
  - [x] Stateless Design: Backend services stateless, state in DB, no in-memory session.
  - [x] User Isolation: All resources scoped to authenticated user, no cross-user data access, ownership validation enforced.
  - [x] Scalability First: Horizontal scaling possible, no hardcoded URLs/ports, environment-based config.
- [x] **Technology Stack Constraints**:
  - [x] Frontend: Next.js 16+ (App Router), TypeScript, Tailwind CSS 4.
  - [x] Backend: Python 3.13+, FastAPI, SQLModel.
  - [x] Development: Gemini CLI, Spec-Kit Plus, UV.
  - [x] Forbidden: No Express.js/Node backends, NoSQL, GraphQL (Phase II), inline styles, localStorage, manual SQL.
- [x] **Security Requirements**:
  - [x] Authentication: JWT required, custom auth with bcrypt, 7-day expiry.
  - [x] Authorization: Every endpoint validates user identity, user ID from JWT matches URL param, 401/403 for invalid/unauthorized.
  - [x] Data Protection: Environment variables for secrets, no creds in code/VC, HTTPS in prod, API keys never exposed to frontend.
- [x] **Code Standards**:
  - [x] Python Backend: Type hints, async/await, Pydantic for validation, HTTPException for errors, single responsibility per handler.
  - [x] TypeScript Frontend: Strict mode, no `any`, Server Components by default, Client Components for interactivity, async/await for API calls.
  - [x] Naming Conventions: snake_case (Python), camelCase (TypeScript), PascalCase (components/classes), SCREAMING_SNAKE_CASE for constants.
- [x] **API Design Standards**:
  - [x] REST Conventions: Resource-based URLs, HTTP methods, status codes, JSON only, consistent error format.
  - [x] Response Structure: Consistent success/list/error JSON formats.
  - [x] Request Validation: All fields validated via Pydantic, 400 for invalid input, sanitize input.
- [x] **Database Standards**:
  - [x] Schema Rules: PK auto-increment, FK referential integrity, created/updated timestamps, soft deletes, indexes on FK/query fields.
  - [x] Model Standards: Reflect constitution's Task model example.
  - [x] Query Standards: Filter by user_id, SQLModel select(), limit result sets, handle not found, no N+1.
- [x] **Testing Requirements**:
  - [x] What Must Be Tested: All API endpoints, auth/authz, user isolation, input validation, DB ops.
  - [x] Testing Standards: pytest (backend), Playwright (E2E), mock external dependencies, isolated test data.
- [x] **Performance Standards**:
  - [x] Response Times: API < 200ms, page loads < 2s, no blocking ops, async I/O.
  - [x] Resource Usage: DB pooling, close connections, no memory leaks, efficient queries.
- [x] **Phase V: Part A - Advanced Features Principles**:
  - [x] Automation: RFC 5545 recurrence, completion-triggered generation, historical integrity.
  - [x] Time-Sensitive: UTC storage, proactive notifications, visual urgency.
  - [x] Organizational: Priority hierarchy, flexible tagging, alphanumeric/hyphenated sanitization.
  - [x] Retrieval: Indexed full-text search, additive filtering (AND), predictable sorting.
- [x] **Phase V: Part B - Dapr & Kafka Integration Principles**:
  - [x] Decoupling: Standardized event schema, async communication, sidecar-based integration (Dapr).
  - [x] Reliability: At-least-once delivery (Kafka), idempotent consumers, backward compatibility.
  - [x] Observability: Structured logging, failure handling (dead-letter), health check endpoints.
  - [x] Scheduling: Exact-time reminders via sidecar job scheduling.
- [x] **Error Handling**:
  - [x] Backend: Try-except, HTTPException, log errors, graceful degradation.
  - [x] Frontend: Try-catch, user-friendly messages, no technical details, fallback UI.
- [x] **Deployment Standards**:
  - [x] Environment Variables Required: Listed example env vars.
  - [x] Production Requirements: HTTPS, env-specific configs, automated DB migrations, health check endpoint.

## Project Structure

### Documentation (this feature)

```text
specs/013-dapr-kafka-integration/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── checklists/
│   └── requirements.md  # Spec quality checklist
├── contracts/           # Phase 1 output
└── tasks.md             # Phase 2 output
```

### Source Code (repository root)

```text
backend/
├── main.py
├── models.py
├── routes/
├── middleware/
├── services/
│   └── event_publisher.py   # NEW
└── db.py

notification-service/       # NEW
├── main.py
├── requirements.txt
└── Dockerfile

recurring-task-service/      # NEW
├── main.py
├── requirements.txt
└── Dockerfile

dapr-components/            # NEW
├── pubsub-kafka.yaml
└── state-postgresql.yaml
```

**Structure Decision**: Adhering to microservices pattern with Dapr sidecars. New services added for specific event-driven domains.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| Multiple Microservices | Separation of concerns for event handling | Monolith would be harder to scale and less resilient for background tasks |
| Dapr Sidecars | Abstract infrastructure from code | Direct Kafka integration is brittle and harder to swap brokers |