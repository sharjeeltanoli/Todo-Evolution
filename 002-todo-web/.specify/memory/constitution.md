<!--
Sync Impact Report:
- Version change: Initial 0.0.0 -> 1.0.0 (New constitution or major overhaul)
- List of modified principles: All principles are new or significantly redefined.
- Added sections: All sections are new.
- Removed sections: None.
- Templates requiring updates:
    - .specify/templates/plan-template.md: ✅ updated
    - .specify/templates/spec-template.md: ✅ updated (no structural changes needed)
    - .specify/templates/tasks-template.md: ✅ updated
    - .gemini/commands/sp.adr.toml: ✅ updated (no changes needed)
    - .gemini/commands/sp.analyze.toml: ✅ updated (no changes needed)
    - .gemini/commands/sp.checklist.toml: ✅ updated (no changes needed)
    - .gemini/commands/sp.clarify.toml: ✅ updated (no changes needed)
    - .gemini/commands/sp.constitution.toml: ✅ updated (no changes needed)
    - .gemini/commands/sp.git.commit_pr.toml: ✅ updated (no changes needed)
    - .gemini/commands/sp.implement.toml: ✅ updated (no changes needed)
    - .gemini/commands/sp.phr.toml: ✅ updated (no changes needed)
    - .gemini/commands/sp.plan.toml: ✅ updated (no changes needed)
    - .gemini/commands/sp.reverse-engineer.toml: ✅ updated (no changes needed)
    - .gemini/commands/sp.specify.toml: ✅ updated (no changes needed)
    - .gemini/commands/sp.tasks.toml: ✅ updated (no changes needed)
    - .gemini/commands/sp.taskstoissues.toml: ✅ updated (no changes needed)
- Follow-up TODOs:
    - TODO: RATIFICATION_DATE: YYYY-MM-DD (Original adoption date) needs to be set.
    - manual follow-up for README.md, docs/quickstart.md (files not found)
-->
# Project Constitution

## Purpose
This constitution defines the non-negotiable principles, constraints, and standards for the Hackathon Todo application. All agents, developers, and implementations must adhere to these rules.

**Version:** 1.0.0
**Ratification Date:** TODO: YYYY-MM-DD (Original adoption date)
**Last Amended Date:** 2026-01-03

---

## 1. Architecture Principles

### 1.1 Separation of Concerns
- Frontend and backend are completely decoupled
- Communication happens exclusively via REST APIs
- No direct database access from frontend
- Each service has clear, single responsibility

### 1.2 Stateless Design
- Backend services must be stateless
- All state persisted in database
- No in-memory session storage
- Every request is independent and reproducible

### 1.3 User Isolation
- Every resource must be scoped to authenticated user
- No cross-user data access permitted
- All queries filtered by user_id
- API endpoints enforce ownership validation

### 1.4 Scalability First
- Horizontal scaling must be possible
- No hardcoded URLs or ports in code
- Environment-based configuration only
- Database connections via connection pooling

---

## 2. Technology Stack Constraints

### 2.1 Required Technologies
**Frontend:**
- Next.js 15+ with App Router only
- TypeScript for type safety
- Tailwind CSS for styling (no CSS-in-JS)
- Better Auth for authentication

**Backend:**
- Python 3.13+
- FastAPI for API framework
- SQLModel as ORM (not raw SQL)
- Neon Serverless PostgreSQL

**Development:**
- Gemini CLI for code generation
- Spec-Kit Plus for specification management
- UV for Python package management

### 2.2 Forbidden Technologies
- No Express.js or other Node backends
- No MongoDB or NoSQL databases
- No GraphQL (REST only for Phase II)
- No inline styles or CSS modules
- No localStorage or sessionStorage
- No manual SQL queries (use ORM)

---

## 3. Security Requirements

### 3.1 Authentication
- JWT tokens required for all API endpoints
- Tokens issued by Better Auth on frontend
- Shared secret between frontend and backend
- Token expiry: 7 days maximum
- No API access without valid token

### 3.2 Authorization
- Every endpoint validates user identity
- User ID from JWT must match URL user_id parameter
- Return 401 for invalid/missing tokens
- Return 403 for unauthorized resource access
- No sensitive data in JWT payload

### 3.3 Data Protection
- Environment variables for all secrets
- No credentials in code or version control
- HTTPS required in production
- Database credentials via environment only
- API keys never exposed to frontend

---

## 4. Code Standards

### 4.1 Python Backend
- Type hints required for all functions
- Async/await for all I/O operations
- Pydantic models for request/response validation
- HTTPException for all error responses
- Single responsibility per route handler

### 4.2 TypeScript Frontend
- Strict mode enabled
- No `any` types (use `unknown` if needed)
- Server Components by default
- Client Components only for interactivity
- Async/await for all API calls

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
- snake_case for Python (variables, functions, files)
- camelCase for TypeScript (variables, functions)
- PascalCase for components and classes
- SCREAMING_SNAKE_CASE for constants
- Descriptive names over abbreviations

---

<h2>5. API Design Standards</h2>

<h3>5.1 REST Conventions</h3>
- Resource-based URLs: `/api/{user_id}/tasks`
- HTTP methods: GET (read), POST (create), PUT (update), DELETE (delete), PATCH (partial update)
- Status codes: 200 (success), 201 (created), 400 (bad request), 401 (unauthorized), 403 (forbidden), 404 (not found), 500 (server error)
- JSON request/response bodies only
- Consistent error format: `{"detail": "error message"}`

<h3>5.2 Response Structure</h3>
```json
// Success
{
  "id": 1,
  "title": "Task title",
  "completed": false
}

// List
[
  {"id": 1, "title": "Task 1"},
  {"id": 2, "title": "Task 2"}
]

// Error
{
  "detail": "Task not found"
}
```

<h3>5.3 Request Validation</h3>
- All required fields validated via Pydantic
- Return 400 with clear message for invalid input
- No processing of invalid requests
- Sanitize user input (prevent injection)

---

<h2>6. Database Standards</h2>

<h3>6.1 Schema Rules</h3>
- Primary keys: integer auto-increment
- Foreign keys: enforce referential integrity
- Created/updated timestamps on all tables
- Soft deletes preferred over hard deletes
- Indexes on foreign keys and query fields

<h3>6.2 Model Standards</h3>
```python
class Task(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    user_id: str = Field(foreign_key="user.id", index=True)
    title: str = Field(max_length=200)
    description: str | None = Field(default=None, max_length=1000)
    completed: bool = Field(default=False)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
```

<h3>6.3 Query Standards</h3>
- Always filter by user_id
- Use SQLModel select() for queries
- Limit result sets (pagination later)
- Handle not found gracefully
- No N+1 query problems

---

<h2>7. Testing Requirements</h2>

<h3>7.1 What Must Be Tested</h3>
- All API endpoints (happy path + errors)
- Authentication/authorization logic
- User isolation (cannot access other's data)
- Input validation
- Database operations

<h3>7.2 Testing Standards</h3>
- Use pytest for backend
- Use Jest for frontend (Phase III+)
- Mock external dependencies
- Test data isolated per test
- No tests depending on other tests

---

<h2>8. Performance Standards</h2>

<h3>8.1 Response Times</h3>
- API endpoints: < 200ms (database queries)
- Page loads: < 2s (first contentful paint)
- No blocking operations on main thread
- Async operations for I/O

<h3>8.2 Resource Usage</h3>
- Database connection pooling (max 10)
- Close connections after use
- No memory leaks
- Efficient queries (use indexes)

---

<h2>9. Error Handling</h2>

<h3>9.1 Backend</h3>
- Try-except around database operations
- HTTPException with appropriate status codes
- Log errors server-side (don't expose internals)
- Graceful degradation

<h3>9.2 Frontend</h3>
- Try-catch around API calls
- User-friendly error messages
- No exposing technical details to users
- Fallback UI states

---

<h2>10. Development Workflow</h2>

<h3>10.1 Spec-Driven Development (Mandatory)</h3>
1. **Specify** - Write requirements in specs/
2. **Plan** - Generate technical approach
3. **Tasks** - Break into atomic tasks with IDs
4. **Implement** - Code only what tasks authorize

<h3>10.2 Code Generation Rules</h3>
- Reference Task IDs in code comments
- No code without corresponding task
- Update specs when requirements change
- All agents must read AGENTS.md first

<h3>10.3 Git Workflow</h3>
- Meaningful commit messages
- One feature per commit
- Reference Task IDs in commits
- No committing secrets or credentials

---

<h2>11. Deployment Standards</h2>

<h3>11.1 Environment Variables Required</h3>
```
# Backend
DATABASE_URL=postgresql://...
BETTER_AUTH_SECRET=xxx
ALLOWED_ORIGINS=https://frontend-url.com

# Frontend
NEXT_PUBLIC_API_URL=https://api-url.com
BETTER_AUTH_SECRET=xxx
```

<h3>11.2 Production Requirements</h3>
- HTTPS only
- Environment-specific configs
- Database migrations automated
- Health check endpoint: GET /health

---

<h2>12. Change Management</h2>

<h3>12.1 Modifying This Constitution</h3>
- Requires explicit approval
- Update version number
- Document rationale
- Notify all agents/developers

<h3>12.2 Hierarchy of Truth</h3>
When conflicts arise:
1. **Constitution** (this file) - principles
2. **Specify** - requirements
3. **Plan** - architecture
4. **Tasks** - implementation details

---

## Version
**Version:** 1.0.0