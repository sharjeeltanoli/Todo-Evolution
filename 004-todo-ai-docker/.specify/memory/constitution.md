<!--
Sync Impact Report:
- Version change: 1.4.0 -> 1.5.0 (Added Phase V: Part C - Cloud Deployment Principles)
- List of modified principles:
    - 2.1 Required Technologies: Updated Next.js to 16.1.3+, added React 19+, Tailwind CSS 4+, and Lucide React.
    - 4.2 TypeScript Frontend: Updated to reflect React 19 standards.
- Added sections:
    - 17. Phase V: Part C - Cloud Deployment Principles
        - 17.1 Infrastructure as Managed Service
        - 17.2 Production Secrets & Security
        - 17.3 Automated CI/CD Lifecycle
        - 17.4 High Availability & Resilience
- Removed sections: None.
- Templates requiring updates:
    - .specify/templates/plan-template.md: ✅ updated (added Cloud Deployment checks)
    - .specify/templates/spec-template.md: ✅ updated (no changes needed)
    - .specify/templates/tasks-template.md: ✅ updated (added cloud-related task categories)
- Follow-up TODOs:
    - TODO: RATIFICATION_DATE: Still needs original adoption date if available.
-->
# Project Constitution

## Purpose
This constitution defines the non-negotiable principles, constraints, and standards for the Todo AI Intelligent Task Manager. All agents, developers, and implementations must adhere to these rules.

**Version:** 1.5.0
**Ratification Date:** TODO: YYYY-MM-DD
**Last Amended Date:** 2026-02-08

---

## 1. Architecture Principles

### 1.1 Separation of Concerns
- Frontend and backend are completely decoupled.
- Communication happens exclusively via REST APIs.
- No direct database access from frontend.
- Each service has clear, single responsibility.

### 1.2 Stateless Design
- Backend services MUST be stateless.
- All state persisted in database or persistent state stores.
- No in-memory session storage.
- Every request is independent and reproducible.

### 1.3 User Isolation
- Every resource MUST be scoped to authenticated user.
- No cross-user data access permitted.
- All queries filtered by user_id.
- API endpoints enforce ownership validation.

### 1.4 Scalability First
- Horizontal scaling MUST be possible.
- No hardcoded URLs or ports in code; use service discovery or environment variables.
- Environment-based configuration only.
- Database connections MUST use connection pooling.

---

## 2. Technology Stack Constraints

### 2.1 Required Technologies
**Frontend:**
- Next.js 16.1+ with App Router only.
- React 19+ for modern hooks and performance.
- TypeScript for type safety.
- Tailwind CSS 4+ for styling (no CSS-in-JS).
- Lucide React for iconography.
- Custom JWT-based Authentication.

**Backend:**
- Python 3.13+.
- FastAPI for API framework.
- SQLModel as ORM (not raw SQL).
- PostgreSQL (Production) / SQLite (Dev).
- Dapr for microservice integration and sidecar patterns.

**Infrastructure:**
- Docker for containerization.
- Kubernetes (DOKS/Minikube) for orchestration.
- Helm for package management.
- Redpanda Cloud / Kafka for event streaming.

**Development:**
- Gemini CLI for code generation.
- Spec-Kit Plus for specification management.
- UV for Python package management.

### 2.2 Forbidden Technologies
- No Express.js or other Node backends.
- No NoSQL databases.
- No GraphQL (REST only).
- No inline styles.
- No localStorage or sessionStorage for sensitive data.
- No manual SQL queries (use ORM).

---

## 3. Security Requirements

### 3.1 Authentication
- JWT tokens required for all API endpoints.
- Custom JWT auth with bcrypt hashing.
- Token expiry: 7 days maximum.
- No API access without valid token.

### 3.2 Authorization
- Every endpoint MUST validate user identity.
- User ID from JWT MUST match the resource owner.
- Return 401 for invalid/missing tokens.
- Return 403 for unauthorized resource access.
- No sensitive data in JWT payload.

### 3.3 Data Protection
- Environment variables for all secrets.
- No credentials in code or version control.
- HTTPS required in production.
- API keys MUST NEVER be exposed to frontend.

---

## 4. Code Standards

### 4.1 Python Backend
- Type hints required for all functions.
- Async/await for all I/O operations.
- Pydantic models for request/response validation.
- HTTPException for all error responses.
- Single responsibility per route handler.

### 4.2 TypeScript Frontend
- Strict mode enabled.
- No `any` types (use `unknown` if needed).
- Server Components by default.
- Client Components only for interactivity.
- Async/await for all API calls.

### 4.3 File Organization
```
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

### 4.4 Naming Conventions
- snake_case for Python (variables, functions, files).
- camelCase for TypeScript (variables, functions).
- PascalCase for components and classes.
- SCREAMING_SNAKE_CASE for constants.
- Descriptive names over abbreviations.

---

## 5. API Design Standards

### 5.1 REST Conventions
- Resource-based URLs: `/api/tasks` (User filtered via JWT).
- HTTP methods: GET, POST, PUT, DELETE, PATCH.
- Status codes: 200, 201, 400, 401, 403, 404, 500.
- JSON request/response bodies only.
- Consistent error format: `{"detail": "error message"}`.

### 5.2 Response Structure
```json
// Success
{
  "id": 1,
  "title": "Task title",
  "completed": false
}

// Error
{
  "detail": "Task not found"
}
```

---

## 6. Database Standards

### 6.1 Schema Rules
- Primary keys: integer auto-increment.
- Foreign keys: enforce referential integrity.
- Created/updated timestamps on all tables.
- Soft deletes preferred.
- Indexes on foreign keys and query fields.

### 6.2 Model Standards
```python
class Task(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    user_id: int = Field(foreign_key="user.id", index=True)
    title: str = Field(max_length=200)
    completed: bool = Field(default=False)
```

---

## 7. Testing Requirements

### 7.1 What Must Be Tested
- All API endpoints.
- Auth/authz logic.
- User isolation.
- Input validation.
- Database operations.

### 7.2 Testing Standards
- Use pytest for backend.
- Mock external dependencies (Dapr, Kafka).
- Isolated test data per test.

---

## 8. Performance Standards

### 8.1 Response Times
- API endpoints: < 200ms.
- Page loads: < 2s.
- Async operations for all I/O.

### 8.2 Resource Usage
- Database connection pooling.
- Close connections after use.
- Efficient queries (use indexes).

---

## 13. Phase III: AI Chatbot Principles

### 13.1 Stateless Chat Architecture
- **No In-Memory State**: Server stores zero conversation state in memory.
- **Database as Truth**: All conversations and messages persisted in PostgreSQL.
- **Request Independence**: Each chat request loads full history from database.

### 13.2 MCP Tools as Single Interface
- **Tool-Only Access**: All task operations through MCP tools exclusively.
- **No Direct DB**: MCP tools are the only way to interact with tasks table.
- **Atomic Operations**: Each tool performs one specific operation.

---

## 14. Phase IV: Kubernetes Deployment Principles

### 14.1 Container-First Architecture
- **Immutable Containers**: All services packaged as Docker containers.
- **Multi-Stage Builds**: Optimize image size using multi-stage Dockerfile patterns.
- **Non-root user execution**: Mandatory for security.

### 14.2 Kubernetes-Native Design
- **Helm as Package Manager**: Use Helm charts for deployment management.
- **Resource Limits Required**: Every container MUST define CPU/memory limits.
- **Health Checks Mandatory**: Liveness and readiness probes required.

---

## 15. Phase V: Part A - Advanced Features Principles

### 15.1 Automation via Recurrence
- **Recurrence Logic**: System MUST handle recurring tasks using a simplified RFC 5545 format.
- **Stateless Generation**: Next occurrence generation MUST be triggered by task completion.
- **Historical Integrity**: Completed occurrences MUST be preserved as independent records.

### 15.2 Time-Sensitive Management
- **Timezone Awareness**: All due dates MUST be stored as UTC but displayed in user local time.
- **Proactive Notifications**: Reminders MUST be processed by a lightweight worker and marked as sent.
- **Visual Urgency**: Overdue tasks MUST be visually distinct from upcoming tasks.

### 15.3 Organizational Metadata
- **Priority Hierarchy**: Three-level priority (High, Medium, Low) MUST be enforced (Default: Medium).
- **Flexible Tagging**: Tags MUST be user-scoped, many-to-many, and limited to 10 per task.
- **Metadata Sanitization**: Tag names MUST be alphanumeric and hyphenated only.

### 15.4 Intelligent Retrieval
- **Performant Search**: Full-text search MUST be indexed and limited to title/description fields.
- **Additive Filtering**: Filters MUST be cumulative (AND logic) across metadata fields.
- **Predictable Sorting**: Multi-criteria sorting MUST follow a consistent priority order.

---

## 16. Phase V: Part B - Dapr and Kafka Integration Principles

### 16.1 Event-Driven Decoupling
- **Standardized Event Schema**: All task-related events MUST follow a consistent JSON schema including `event_id`, `event_type`, `user_id`, and `timestamp`.
- **Asynchronous Communication**: Services MUST communicate via an event bus (pub/sub) for non-blocking operations.
- **Sidecar-Based Integration**: All event publishing and subscription MUST be handled via a Dapr sidecar to abstract infrastructure details.

### 16.2 Reliable Event Delivery
- **At-Least-Once Guarantee**: The system MUST ensure events are delivered at least once using Kafka as the underlying message broker.
- **Idempotent Consumers**: All event consumers MUST be designed to handle duplicate events without adverse side effects.
- **Backward Compatibility**: Core API operations MUST remain functional even if the event bus is temporarily unavailable (degraded mode).

### 16.3 Observable Event Processing
- **Structured Logging**: All event publish and consume actions MUST be logged with sufficient context for troubleshooting.
- **Failure Handling**: Failed event processing MUST be captured, logged, and moved to a dead-letter queue if persistence fails after retries.
- **Consumer Health**: Each event-driven microservice MUST expose a health check endpoint for liveness/readiness monitoring.

### 16.4 Job Scheduling via Sidecar
- **Exact-Time Reminders**: Polling-based background workers SHOULD be replaced by sidecar-driven job scheduling for precise execution.
- **Job Callback Handlers**: Scheduled jobs MUST trigger specific API endpoints to initiate event-driven notifications.

---

## 17. Phase V: Part C - Cloud Deployment Principles

### 17.1 Infrastructure as Managed Service
- **Managed Clusters**: Production MUST use managed Kubernetes services (e.g., DOKS) for operational stability.
- **Cloud-Native Kafka**: Managed serverless Kafka (e.g., Redpanda Cloud) MUST be used for production event streaming.
- **Registry Integration**: Container images MUST be stored in private cloud registries with automated vulnerability scanning.

### 17.2 Production Secrets & Security
- **Encrypted Secrets**: Production secrets MUST NEVER exist in version control; use Kubernetes Secrets or managed Secret Managers.
- **Least Privilege**: All cloud resources MUST be configured with the minimum necessary permissions (RBAC).

### 17.3 Automated CI/CD Lifecycle
- **Zero Manual Deploys**: All production deployments MUST be initiated via automated CI/CD pipelines (e.g., GitHub Actions).
- **Immutable Artifacts**: Every deployment MUST use a unique, immutable container tag (e.g., commit SHA) rather than 'latest'.

### 17.4 High Availability & Resilience
- **Redundancy**: Critical services (Frontend, Backend) MUST have multiple replicas in production.
- **Self-Healing**: Deployments MUST utilize liveness/readiness probes to trigger automatic restarts of unhealthy containers.
- **Data Persistence**: Production databases MUST be hosted on managed providers with automated backups.

---

## Version
**Version:** 1.5.0