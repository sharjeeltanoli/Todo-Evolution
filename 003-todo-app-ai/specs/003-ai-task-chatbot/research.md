# Research & Technical Decisions: AI-Powered Task Chatbot

**Feature**: 003-ai-task-chatbot
**Date**: 2026-01-20

## 1. Technical Stack Decisions

### Backend Orchestration
**Decision**: OpenAI Agents SDK
**Rationale**: Mandated by project constitution (Phase III) and user requirements. Provides a standardized way to manage agent behaviors and tool calling.
**Implementation**: Will be integrated within the existing FastAPI application as a new route handler (`routes/chat.py`).

### Frontend Interface
**Decision**: OpenAI ChatKit
**Rationale**: Mandated by user requirements. Provides pre-built, accessible React components for chat interfaces that integrate seamlessly with Vercel AI SDK/OpenAI backends.
**Configuration**: Requires `NEXT_PUBLIC_OPENAI_DOMAIN_KEY` and specific endpoint configuration.

### Tool Protocol
**Decision**: Model Context Protocol (MCP) - Stateless
**Rationale**: Mandated by constitution (Phase III, 13.2). Ensures standardized tool interfaces.
**Tools**:
- `add_task(user_id, title, description)`
- `list_tasks(user_id, status)`
- `complete_task(user_id, task_id)`
- `delete_task(user_id, task_id)`
- `update_task(user_id, task_id, title, description)`
**Statelessness**: The MCP server will not hold state. It will query the `todo.db` (PostgreSQL) for every request using the provided `user_id` for scoping.

## 2. Architecture & Patterns

### Stateless Chat Loop
**Pattern**:
1.  **Request**: Client sends message + (optional) conversation_id + JWT.
2.  **Auth**: Middleware validates JWT, extracts `user_id`.
3.  **Load**: Backend loads full conversation history from `messages` table for `conversation_id`.
4.  **Process**: OpenAI Agents SDK processes history + new message.
5.  **Tool Execution**: If tools are called, they execute against DB (scoped by `user_id`).
6.  **Persist**: New user message and assistant response (and tool outputs) are saved to `messages` table.
7.  **Response**: JSON response returned to client.

### Backward Compatibility
**Strategy**:
- Existing `routes/tasks.py` remains untouched.
- New `routes/chat.py` is additive.
- `models.py` will be updated with new tables, existing `Task` model remains compatible.

## 3. Unknowns & Clarifications

*   **Resolved**: All major architectural decisions are mandated by the Constitution Phase III.
*   **Resolved**: Database schema is explicitly defined in Spec/Constitution.
*   **Resolved**: Tool definitions are explicitly defined.

## 4. Security Implications

-   **JWT Scoping**: Every tool *must* take `user_id` as an argument, and the implementation *must* verify this `user_id` matches the authenticated token (or simply trust the token and inject the `user_id` from the token into the tool call context, preventing the LLM from hallucinating a different user ID).
-   **Decision**: The tool functions will *require* `user_id`. The orchestration layer will inject the authenticated `user_id` into the tool context or arguments, ensuring the LLM cannot spoof it.
