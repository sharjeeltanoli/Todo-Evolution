<!--
Sync Impact Report:
- Version change: 1.1.0 -> 1.2.0 (Added Phase IV: Kubernetes Deployment)
- List of modified principles: None.
- Added sections:
    - 14. Phase IV: Kubernetes Deployment Principles
        - 14.1 Container-First Architecture
        - 14.2 Kubernetes-Native Design
        - 14.3 Local Development with Minikube
        - 14.4 Technology Stack for Phase IV
        - 14.5 Docker Standards
        - 14.6 Docker AI (Gordon) Integration
        - 14.7 Helm Chart Structure
        - 14.8 Kubernetes Resource Standards
        - 14.9 Configuration Management
        - 14.10 kubectl-ai and Kagent Integration
        - 14.11 Service Architecture
        - 14.12 Health Checks and Monitoring
        - 14.13 Networking and Ingress
        - 14.14 Resource Management
        - 14.15 Persistent Storage
        - 14.16 Security Standards for Phase IV
        - 14.17 Deployment Workflow
        - 14.18 Rollback Strategy
        - 14.19 Testing Requirements for Phase IV
        - 14.20 Documentation Requirements
        - 14.21 Performance Standards for Phase IV
        - 14.22 Backward Compatibility
        - 14.23 AI-Assisted DevOps Principles
        - 14.24 Minikube-Specific Considerations
        - 14.25 Change Management for Phase IV
        - 14.26 Production Readiness Checklist
- Removed sections: None.
- Templates requiring updates:
    - .specify/templates/plan-template.md: ✅ updated
    - .specify/templates/spec-template.md: ✅ updated
    - .specify/templates/tasks-template.md: ✅ updated
    - .gemini/commands/sp.adr.toml: ✅ updated
    - .gemini/commands/sp.analyze.toml: ✅ updated
    - .gemini/commands/sp.checklist.toml: ✅ updated
    - .gemini/commands/sp.clarify.toml: ✅ updated
    - .gemini/commands/sp.constitution.toml: ✅ updated
    - .gemini/commands/sp.git.commit_pr.toml: ✅ updated
    - .gemini/commands/sp.implement.toml: ✅ updated
    - .gemini/commands/sp.phr.toml: ✅ updated
    - .gemini/commands/sp.plan.toml: ✅ updated
    - .gemini/commands/sp.reverse-engineer.toml: ✅ updated
    - .gemini/commands/sp.specify.toml: ✅ updated
    - .gemini/commands/sp.tasks.toml: ✅ updated
    - .gemini/commands/sp.taskstoissues.toml: ✅ updated
- Follow-up TODOs:
    - TODO: RATIFICATION_DATE: YYYY-MM-DD (Original adoption date) needs to be set.
-->
# Project Constitution

## Purpose
This constitution defines the non-negotiable principles, constraints, and standards for the Hackathon Todo application. All agents, developers, and implementations must adhere to these rules.

**Version:** 1.2.0
**Ratification Date:** TODO: YYYY-MM-DD (Original adoption date)
**Last Amended Date:** 2026-01-26

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
- User ID from JWT match URL user_id parameter
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

## 5. API Design Standards

### 5.1 REST Conventions
- Resource-based URLs: `/api/{user_id}/tasks`
- HTTP methods: GET (read), POST (create), PUT (update), DELETE (delete), PATCH (partial update)
- Status codes: 200 (success), 201 (created), 400 (bad request), 401 (unauthorized), 403 (forbidden), 404 (not found), 500 (server error)
- JSON request/response bodies only
- Consistent error format: `{"detail": "error message"}`

### 5.2 Response Structure
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

### 5.3 Request Validation
- All required fields validated via Pydantic
- Return 400 with clear message for invalid input
- No processing of invalid requests
- Sanitize user input (prevent injection)

---

## 6. Database Standards

### 6.1 Schema Rules
- Primary keys: integer auto-increment
- Foreign keys: enforce referential integrity
- Created/updated timestamps on all tables
- Soft deletes preferred over hard deletes
- Indexes on foreign keys and query fields

### 6.2 Model Standards
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

### 6.3 Query Standards
- Always filter by user_id
- Use SQLModel select() for queries
- Limit result sets (pagination later)
- Handle not found gracefully
- No N+1 query problems

---

## 7. Testing Requirements

### 7.1 What Must Be Tested
- All API endpoints (happy path + errors)
- Authentication/authorization logic
- User isolation (cannot access other's data)
- Input validation
- Database operations

### 7.2 Testing Standards
- Use pytest for backend
- Use Jest for frontend (Phase III+)
- Mock external dependencies
- Test data isolated per test
- No tests depending on other tests

---

## 8. Performance Standards

### 8.1 Response Times
- API endpoints: < 200ms (database queries)
- Page loads: < 2s (first contentful paint)
- No blocking operations on main thread
- Async operations for I/O

### 8.2 Resource Usage
- Database connection pooling (max 10)
- Close connections after use
- No memory leaks
- Efficient queries (use indexes)

---

## 9. Error Handling

### 9.1 Backend
- Try-except around database operations
- HTTPException with appropriate status codes
- Log errors server-side (don't expose internals)
- Graceful degradation

### 9.2 Frontend
- Try-catch around API calls
- User-friendly error messages
- No exposing technical details to users
- Fallback UI states

---

## 10. Development Workflow

### 10.1 Spec-Driven Development (Mandatory)
1. **Specify** - Write requirements in specs/
2. **Plan** - Generate technical approach
3. **Tasks** - Break into atomic tasks with IDs
4. **Implement** - Code only what tasks authorize

### 10.2 Code Generation Rules
- Reference Task IDs in code comments
- No code without corresponding task
- Update specs when requirements change
- All agents must read AGENTS.md first

### 10.3 Git Workflow
- Meaningful commit messages
- One feature per commit
- Reference Task IDs in commits
- No committing secrets or credentials

---

## 11. Deployment Standards

### 11.1 Environment Variables Required
```
# Backend
DATABASE_URL=postgresql://...
BETTER_AUTH_SECRET=xxx
ALLOWED_ORIGINS=https://frontend-url.com

# Frontend
NEXT_PUBLIC_API_URL=https://api-url.com
BETTER_AUTH_SECRET=xxx
```

### 11.2 Production Requirements
- HTTPS only
- Environment-specific configs
- Database migrations automated
- Health check endpoint: GET /health

---

## 12. Change Management

### 12.1 Modifying This Constitution
- Requires explicit approval
- Update version number
- Document rationale
- Notify all agents/developers

### 12.2 Hierarchy of Truth
When conflicts arise:
1. **Constitution** (this file) - principles
2. **Specify** - requirements
3. **Plan** - architecture
4. **Tasks** - implementation details

---

## 13. Phase III: AI Chatbot Principles

### 13.1 Stateless Chat Architecture
- **No In-Memory State**: Server stores zero conversation state in memory
- **Database as Truth**: All conversations and messages persisted in PostgreSQL
- **Request Independence**: Each chat request loads full history from database
- **Horizontal Scalability**: Chat service must survive restarts and load balancing
- **Stateless Cycle**: Receive → Load DB → Process → Store DB → Respond → Clear

### 13.2 MCP Tools as Single Interface
- **Tool-Only Access**: All task operations through MCP tools exclusively
- **No Direct DB**: MCP tools are the only way to interact with tasks table
- **5 Required Tools**: add_task, list_tasks, complete_task, delete_task, update_task
- **Atomic Operations**: Each tool performs one specific operation
- **Consistent Returns**: Standardized response format across all tools

### 13.3 Technology Stack for Phase III
**Required:**
- OpenAI Agents SDK for chat orchestration
- Official MCP SDK (Python) for tool implementation  
- OpenAI ChatKit for frontend chat UI
- Existing FastAPI backend (extend, don't replace)
- Existing Neon PostgreSQL (add 2 new tables)

**Forbidden:**
- Custom chat implementations (use Agents SDK)
- In-memory conversation storage
- localStorage/sessionStorage for chat history
- Alternative AI frameworks

### 13.4 Database Schema for Chat
**New Tables Required:**
```python
# conversations table
- id (PK, auto-increment)
- user_id (FK to users.id, indexed)
- created_at (timestamp)
- updated_at (timestamp)

# messages table  
- id (PK, auto-increment)
- conversation_id (FK to conversations.id, indexed)
- user_id (FK to users.id, indexed)
- role (string: "user" or "assistant")
- content (text)
- created_at (timestamp)
```

**Constraints:**
- Foreign key cascade on delete
- Index on user_id for fast filtering
- Index on conversation_id for message retrieval
- Chronological ordering preserved

### 13.5 MCP Tool Standards

**Tool Structure:**
```python
{
  "name": "tool_name",
  "description": "Clear description of what it does",
  "parameters": {
    "user_id": "string (required)",
    # ... other params
  },
  "returns": {
    "status": "success/error",
    # ... data
  }
}
```

**Requirements:**
- Every tool MUST accept user_id parameter
- Every tool MUST validate user_id against authenticated user
- Every tool MUST filter database queries by user_id
- Every tool MUST return structured response
- Every tool MUST handle errors gracefully

### 13.6 Chat API Standards

**Endpoint:** `POST /api/{user_id}/chat`

**Request:**
```json
{
  "conversation_id": 123,  // optional
  "message": "user message here"
}
```

**Response:**
```json
{
  "conversation_id": 123,
  "response": "assistant response",
  "tool_calls": [...]  // optional
}
```

**Requirements:**
- JWT token required (same as Phase II)
- User ID from token must match URL user_id
- Conversation ownership validated
- All messages stored before responding
- Graceful handling of AI failures

### 13.7 Security for Chat Operations

**Authentication:**
- JWT validation on every chat request
- Same BETTER_AUTH_SECRET as Phase II
- No API access without valid token
- Token must contain user_id claim

**Authorization:**
- Users can only access their own conversations
- Users can only access their own tasks via MCP
- MCP tools enforce user isolation
- No cross-user data leakage

**Input Sanitization:**
- Validate all MCP tool parameters
- Sanitize user messages before storage
- Prevent prompt injection attacks
- Rate limit chat requests

### 13.8 Error Handling for AI Operations

**AI Failures:**
- Graceful degradation when OpenAI API fails
- User-friendly error messages (no technical details)
- Retry logic for transient failures
- Fallback responses when appropriate

**Tool Failures:**
- Return error objects, never throw uncaught exceptions
- Log errors server-side for debugging
- Continue conversation despite tool failures
- Inform user when operations fail

**Data Consistency:**
- Rollback on partial failures
- Atomic operations where possible
- No orphaned messages or conversations
- Maintain conversation integrity

### 13.9 Conversation Management

**Creation:**
- Auto-create conversation if conversation_id not provided
- Associate with authenticated user_id
- Store initial user message immediately

**Retrieval:**
- Load full conversation history from database
- Order messages chronologically
- Include both user and assistant messages
- Filter by user_id for security

**Persistence:**
- Store every user message before processing
- Store assistant response after generation
- Update conversation updated_at timestamp
- Never lose messages due to server restart

### 13.10 ChatKit Integration Standards

**Frontend Requirements:**
- OpenAI domain allowlist configured
- Domain key in environment variables
- API endpoint points to chat route
- Authentication headers included

**Configuration:**
```typescript
<ChatKit
  apiEndpoint={`${API_URL}/api/${userId}/chat`}
  domainKey={process.env.NEXT_PUBLIC_OPENAI_DOMAIN_KEY}
  headers={{
    Authorization: `Bearer ${jwtToken}`
  }}
/>
```

**Forbidden:**
- No HTML <form> tags in React
- No localStorage for chat history
- No custom chat UI (use ChatKit)
- No bypassing ChatKit authentication

### 13.11 Backward Compatibility

**Phase II Must Remain:**
- All REST API endpoints unchanged
- Traditional task management UI functional
- No breaking changes to existing features
- Users can choose UI or chat interface

**Integration:**
- Chat and REST API share same database
- Changes via chat visible in traditional UI
- Changes in traditional UI visible in chat
- No data duplication or synchronization issues

### 13.12 Agent Behavior Mapping

**Natural Language → Tool Calls:**
| User Input | Expected Tool | Parameters |
|------------|---------------|------------|
| "Add task to buy milk" | add_task | title: "Buy milk" |
| "Show my tasks" | list_tasks | status: "all" |
| "What's pending?" | list_tasks | status: "pending" |
| "Mark task 3 done" | complete_task | task_id: 3 |
| "Delete meeting task" | list_tasks → delete_task | Sequential |
| "Change task 1 title" | update_task | task_id: 1, new title |

**Consistency:**
- Predictable tool selection
- User-friendly confirmations
- Clear error messages
- Helpful suggestions

### 13.13 Testing Requirements for Phase III

**MCP Tools:**
- Test each tool independently
- Verify user isolation
- Test error conditions
- Validate return formats

**Chat Endpoint:**
- Test with/without conversation_id
- Test authentication failures
- Test conversation persistence
- Test user isolation

**Integration:**
- Test tool calls from agent
- Test conversation continuity
- Test server restart recovery
- Test concurrent users

### 13.14 Performance Standards for Chat

**Response Times:**
- Chat endpoint: < 3s (includes AI inference)
- MCP tool calls: < 200ms each
- Conversation loading: < 100ms
- Message storage: < 50ms

**Resource Management:**
- Limit conversation history to last 50 messages
- Cleanup old conversations (30+ days)
- Rate limit: 10 requests/minute per user
- Timeout AI requests after 10s

---

## 14. Phase IV: Kubernetes Deployment Principles

### 14.1 Container-First Architecture
- **Immutable Containers**: All services packaged as Docker containers
- **No Host Dependencies**: Containers must be self-contained with all dependencies
- **Multi-Stage Builds**: Optimize image size using multi-stage Dockerfile patterns
- **Base Image Standards**: Use official Python 3.13-slim for backend, Node 22-alpine for frontend
- **Version Pinning**: Lock all dependency versions in requirements.txt and package-lock.json

### 14.2 Kubernetes-Native Design
- **Declarative Configuration**: All infrastructure defined in YAML manifests or Helm charts
- **Helm as Package Manager**: Use Helm charts for deployment management (no raw kubectl apply)
- **Resource Limits Required**: Every container must define CPU/memory requests and limits
- **Health Checks Mandatory**: All services must implement liveness and readiness probes
- **12-Factor Compliance**: Follow 12-factor app principles for cloud-native applications

### 14.3 Local Development with Minikube
- **Minikube as Primary**: Local Kubernetes cluster via Minikube (not Docker Compose)
- **LoadBalancer Simulation**: Use minikube tunnel for LoadBalancer service access
- **Image Loading**: Load local images via minikube image load (no private registry needed)
- **Consistent Environment**: Local setup mirrors production architecture
- **Resource Allocation**: Minikube cluster minimum 4 CPUs, 8GB RAM

### 14.4 Technology Stack for Phase IV
**Required:**
- Docker Desktop 4.53+
- Minikube 1.32+
- Helm 3.13+
- kubectl 1.28+
- kubectl-ai
- Kagent

**Forbidden:**
- Docker Compose for orchestration
- Manual kubectl apply
- Hardcoded localhost URLs
- Non-containerized services

### 14.5 Docker Standards
- **Image Naming**: {service-name}:{semantic-version} (e.g., todo-frontend:1.0.0)
- **Multi-stage builds mandatory**: for all services
- **Non-root user execution**: (never run as root)
- **Health check endpoints implemented**: in application code
- **.dockerignore**: to exclude unnecessary files
- **Layer caching optimization**: Order instructions by change frequency
- **No secrets in images**: (use ConfigMaps/Secrets)

### 14.6 Docker AI (Gordon) Integration
- **AI-assisted Dockerfile generation**: Use Gordon for initial drafts
- **Container debugging and troubleshooting**: Use AI for log analysis
- **Image optimization recommendations**: Continuous scanning for efficiency
- **Security vulnerability scanning**: AI-driven CVE identification
- **Usage**: "docker ai 'create production Dockerfile for FastAPI app'"
- **Fallback**: Standard Docker CLI if Gordon unavailable

### 14.7 Helm Chart Structure
**Required directory structure:**
```text
helm/todo-app/
├── Chart.yaml (metadata)
├── values.yaml (defaults)
├── values-dev.yaml (dev overrides)
├── values-prod.yaml (prod overrides)
└── templates/
    ├── deployment.yaml
    ├── service.yaml
    ├── configmap.yaml
    ├── secret.yaml
    └── ingress.yaml
```

### 14.8 Kubernetes Resource Standards
- **Deployment**: with RollingUpdate strategy (maxSurge: 1, maxUnavailable: 0)
- **Resource requests and limits**: on all containers
- **Liveness and readiness probes**: with proper timing and thresholds
- **Environment variables**: sourced from ConfigMap and Secret
- **Service discovery**: via Kubernetes internal DNS

### 14.9 Configuration Management
- **ConfigMap**: for non-sensitive configuration only
- **Secret**: for sensitive data (database URLs, auth secrets)
- **Never commit secrets to Git**: use templates or external managers
- **Base64 encoding**: for secret values in manifests
- **Environment variable injection**: into pods at runtime

### 14.10 kubectl-ai and Kagent Integration
- **kubectl-ai for day-to-day operations**: "kubectl-ai 'deploy todo-frontend with 2 replicas'"
- **Kagent for advanced analysis**: "kagent 'analyze cluster health'"
- **AI-assisted debugging**: "kubectl-ai 'check why pods are failing'"
- **Documentation**: Document all AI-generated commands in runbooks

### 14.11 Service Architecture
**Traffic Flow:**
LoadBalancer/Ingress → Frontend (Next.js) → Backend (FastAPI) → Database (PostgreSQL)

- **Frontend**: Exposed via LoadBalancer or Ingress
- **Backend**: Internal only via ClusterIP
- **MCP Server**: Internal only via ClusterIP
- **Database**: ExternalName (Neon) or StatefulSet

### 14.12 Health Checks and Monitoring
- **/health endpoint mandatory**: on all services for liveness
- **/health/db**: for backend database connectivity check
- **Liveness probe**: initialDelaySeconds: 30, periodSeconds: 10
- **Readiness probe**: initialDelaySeconds: 10, periodSeconds: 5
- **Logging**: Structured JSON logs to stdout/stderr only

### 14.13 Networking and Ingress
- **ClusterIP**: for internal service communication
- **LoadBalancer**: for external access (simulated via minikube tunnel)
- **Ingress**: for HTTP routing rules and SSL (optional)
- **Kubernetes DNS**: {service}.{namespace}.svc.cluster.local
- **No hardcoded IPs**: in configuration or application code

### 14.14 Resource Management
- **CPU requests/limits**: on all pods (e.g., Frontend: 100m/500m)
- **Memory requests/limits**: (e.g., Backend: 128Mi/512Mi)
- **ResourceQuota**: enforced at namespace level
- **HorizontalPodAutoscaler**: minReplicas: 2, maxReplicas: 5, CPU target: 70%

### 14.15 Persistent Storage
- **Option 1 (Recommended)**: External Neon PostgreSQL via ExternalName service
- **Option 2 (Learning)**: In-cluster PostgreSQL with PersistentVolumeClaim (PVC)
- **Storage Class**: Use default Minikube storage class
- **Backup Strategy**: Must be documented for all persistent data

### 14.16 Security Standards for Phase IV
- **Run as non-root user**: in all containers
- **Read-only root filesystem**: where possible
- **Drop all capabilities**: except those explicitly required
- **NetworkPolicy**: to restrict pod-to-pod communication
- **Kubernetes Secrets**: for sensitive data (not env vars in YAML)
- **No privileged containers**: unless absolutely necessary

### 14.17 Deployment Workflow
1. **Build images**: using Gordon or standard Docker
2. **Load into Minikube**: minikube image load {image}:{tag}
3. **Create namespace**: kubectl create namespace todo-app
4. **Create secrets**: kubectl create secret generic todo-secrets --from-env-file=.env
5. **Deploy**: helm install todo-app ./helm/todo-app -f values-dev.yaml
6. **Verify**: kubectl-ai "check if all pods are running"
7. **Access**: minikube tunnel (in separate terminal)

### 14.18 Rollback Strategy
- **Helm rollback**: helm rollback todo-app -n todo-app
- **kubectl rollback**: kubectl rollout undo deployment/todo-frontend
- **Release History**: Maintain release history using helm history todo-app
- **AI-assisted rollback**: kubectl-ai "rollback frontend to previous version"

### 14.19 Testing Requirements for Phase IV
- **Container testing**: Test images locally before deployment
- **Health check verification**: Verify endpoints respond correctly
- **Load testing**: Test resource limits (simulate high load)
- **Secret validation**: Validate environment variable injection
- **Resilience testing**: Simulate pod failures and verify recovery
- **Zero-downtime testing**: Verify rolling updates work correctly

### 14.20 Documentation Requirements
- **README.md**: with Minikube setup instructions
- **Build Commands**: Docker image build commands documented
- **Helm Guide**: Helm chart installation steps
- **Env Config**: Environment variable configuration guide
- **Troubleshooting**: Guide for common container/K8s issues
- **Architecture Diagrams**: Container topology and network flow
- **Runbooks**: for deployment, rollback, and scaling

### 14.21 Performance Standards for Phase IV
- **Container start time**: < 10s
- **Readiness probe pass**: < 15s
- **Total pod ready**: < 30s
- **CPU utilization**: 30-70% under normal load
- **Memory usage**: < 80% of limits
- **Scale up trigger**: CPU > 70% sustained
- **Scale up time**: < 60s for new pod readiness

### 14.22 Backward Compatibility
- **Phase III preservation**: All AI chat features must work unchanged in containers
- **Tool operations**: MCP tools must remain functional
- **Database schema**: No changes to existing tables required
- **API Contracts**: REST and Chat APIs must remain stable
- **No refactoring**: containerization should not require application code changes

### 14.23 AI-Assisted DevOps Principles
- **Gordon**: for Dockerfile generation and image optimization
- **kubectl-ai**: for day-to-day Kubernetes operations
- **Kagent**: for cluster health analysis and optimization
- **Human Oversight**: All AI-generated manifests must be reviewed
- **Traceability**: Document the AI tool used for each infrastructure artifact

### 14.24 Minikube-Specific Considerations
- **Addons**: Enable ingress, metrics-server, and dashboard
- **Resource allocation**: minikube start --cpus=4 --memory=8192 --disk-size=20g
- **Image management**: Use imagePullPolicy: Never for local images
- **Access**: Use "minikube service {name}" or "minikube tunnel"
- **Hosts**: Edit /etc/hosts for Ingress domain resolution

### 14.25 Change Management for Phase IV
- **Semantic Versioning**: for application and infrastructure changes
- **Chart Versioning**: Helm chart version tracks infra changes
- **App Versioning**: tracks application code changes
- **Git Tagging**: Tag releases (e.g., git tag -a v1.2.0 -m "Phase IV")

### 14.26 Production Readiness Checklist
- [ ] All health checks implemented and tested
- [ ] Resource limits defined for all containers
- [ ] Secrets externalized (not in code or manifests)
- [ ] HorizontalPodAutoscaler configured
- [ ] NetworkPolicy enforced
- [ ] Logging and monitoring enabled
- [ ] Backup and disaster recovery plan documented
- [ ] Security scanning passed
- [ ] Load testing completed
- [ ] Documentation finalized

---

## Version
**Version:** 1.2.0
