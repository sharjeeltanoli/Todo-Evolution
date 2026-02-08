# Implementation Plan - AI-Powered Task Chatbot

**Feature**: AI-Powered Task Chatbot (`003-ai-task-chatbot`)
**Status**: Draft

## 1. Technical Context

### 1.1 Architecture Overview
We are adding a stateless AI chatbot feature to the existing Todo application.
-   **Frontend**: Next.js with OpenAI ChatKit for the UI.
-   **Backend**: FastAPI with OpenAI Agents SDK for orchestration.
-   **Protocol**: Model Context Protocol (MCP) for tool execution.
-   **State**: All conversation state persisted in PostgreSQL (Neon).

### 1.2 Component Changes
-   **Frontend**:
    -   New page: `/chat` (protected route).
    -   New component: `ChatInterface` using `<ChatKit>`.
    -   Env var: `NEXT_PUBLIC_OPENAI_DOMAIN_KEY`.
-   **Backend**:
    -   New tables: `conversations`, `messages`.
    -   New route: `POST /api/{user_id}/chat`.
    -   New service: `services/chat.py` (Orchestrator).
    -   New module: `mcp_server/` (Stateless tool definitions).
    -   Env var: `OPENAI_API_KEY`.

## 2. Constitution Check

-   **Statelessness**: ✅ Confirmed. Server loads history from DB per request.
-   **User Isolation**: ✅ Confirmed. `user_id` required for all tools and API calls.
-   **Tech Stack**: ✅ Confirmed. Using mandated OpenAI SDKs and Python MCP SDK.
-   **Schema**: ✅ Confirmed. Matches Section 13.4 of Constitution.
-   **Backward Compatibility**: ✅ Confirmed. Existing APIs untouched.

## 3. Data Model

See [Data Model Definition](data-model.md) for full details.

-   **Conversation**: `id`, `user_id`, `created_at`, `updated_at`.
-   **Message**: `id`, `conversation_id`, `user_id`, `role`, `content`, `created_at`.

## 4. API & Interface Contracts

See [API Contracts](contracts/chat-api.yaml) and [MCP Tools](contracts/mcp-tools.json).

### Endpoints
-   `POST /api/{user_id}/chat`: Main interaction point.

### Tools
-   `add_task`
-   `list_tasks`
-   `complete_task`
-   `delete_task`
-   `update_task`

## 5. Security & Risk Assessment

### Risks
-   **Prompt Injection**: User trying to override system prompt.
    -   *Mitigation*: Strict system prompt, `user_id` enforcement in code (not just prompt).
-   **Data Leakage**: Accessing other users' tasks.
    -   *Mitigation*: Middleware validation + Tool-level `user_id` filtering.
-   **Cost**: High OpenAI API usage.
    -   *Mitigation*: Rate limiting (future scope, but noted).

## 6. Testing Strategy

### 6.1 Backend Tests
-   **Unit**: Test MCP tools individually with mock DB session.
-   **Integration**: Test `/chat` endpoint with mocked OpenAI API (verify history loading and DB persistence).
-   **Security**: Attempt to access Chat API with wrong `user_id` token.

### 6.2 Frontend Tests
-   **Component**: Verify ChatKit renders and handles authentication headers.

## 7. Execution Phases

### Phase 1: Database & Models
1.  Create `Conversation` and `Message` SQLModel classes.
2.  Run migration/init script to update DB schema.

### Phase 2: Backend Core (MCP)
1.  Implement `mcp_server` module with the 5 tools.
2.  Unit test tools against database.

### Phase 3: Backend Orchestration
1.  Implement `services/chat.py` using OpenAI Agents SDK.
2.  Implement `routes/chat.py` endpoint.
3.  Integration test with mocked OpenAI.

### Phase 4: Frontend Implementation
1.  Setup environment variables.
2.  Create `/app/chat/page.tsx`.
3.  Implement ChatKit integration.

### Phase 5: Verification
1.  End-to-end manual testing.
2.  Verify backward compatibility of existing Task UI.