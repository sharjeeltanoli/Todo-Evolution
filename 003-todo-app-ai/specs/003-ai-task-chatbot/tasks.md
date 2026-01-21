---
description: "Task list for AI-Powered Task Chatbot implementation"
---

# Tasks: AI-Powered Task Chatbot

**Input**: Design documents from `/specs/003-ai-task-chatbot/`
**Prerequisites**: plan.md, spec.md, data-model.md
**Tests**: Tests are included where critical for security (US3), otherwise optional per spec.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1, US2, US3)
- Path conventions: `backend/` and `frontend/` roots.

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Install Backend dependencies (openai, mcp) in backend/requirements.txt
- [x] T002 Install Frontend dependencies (vercel ai sdk, openai) in frontend/package.json
- [x] T003 Setup Environment Variables (OPENAI_API_KEY, NEXT_PUBLIC_OPENAI_DOMAIN_KEY) in backend/.env and frontend/.env.local
- [x] T004 Configure OpenAI Domain Allowlist for ChatKit in frontend/.env.local (and Vercel dashboard)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T005 Define Conversation and Message models in backend/models.py
- [x] T006 Update database initialization to include new tables in backend/init_db.py
- [x] T007 [P] Scaffold mcp_server directory structure in backend/mcp_server/__init__.py
- [x] T008 [P] Create initial chat service shell in backend/services/chat.py

**Checkpoint**: Database schema ready, dependencies installed, folders created.

---

## Phase 3: User Story 1 - Natural Language Task Management (Priority: P1) 🎯 MVP

**Goal**: A logged-in user can manage their tasks (create, read, update, delete) by conversing with an AI assistant.

**Independent Test**: Login, go to /chat, say "Add buy milk", verify task appears in /tasks.

### Implementation for User Story 1

- [x] T009 [P] [US1] Implement 'add_task' tool in backend/mcp_server/tools.py
- [x] T010 [P] [US1] Implement 'list_tasks' tool in backend/mcp_server/tools.py
- [x] T011 [P] [US1] Implement 'complete_task' tool in backend/mcp_server/tools.py
- [x] T012 [P] [US1] Implement 'delete_task' tool in backend/mcp_server/tools.py
- [x] T013 [P] [US1] Implement 'update_task' tool in backend/mcp_server/tools.py
- [x] T014 [US1] Implement MCP server setup and tool registration in backend/mcp_server/server.py
- [x] T015 [US1] Define AI system prompt (persona, constraints) in backend/services/chat.py
- [x] T016 [US1] Implement user_id injection from JWT into tool context in backend/services/chat.py
- [x] T017 [US1] Implement Chat Service orchestration (OpenAI adapter) in backend/services/chat.py
- [x] T018 [US1] Integrate JWT middleware on /chat endpoint in backend/routes/chat.py
- [x] T019 [US1] Create Chat API endpoint in backend/routes/chat.py
- [x] T020 [US1] Register new router in backend/main.py
- [x] T021 [US1] Create ChatInterface component in frontend/components/ChatInterface.tsx
- [x] T022 [US1] Create Chat Page in frontend/app/chat/page.tsx
- [x] T023 [US1] Add navigation link to Chat in frontend/components/Navbar.tsx

**Checkpoint**: Basic chat works, tasks are modified via AI.

---

## Phase 4: User Story 2 - Conversation Persistence (Priority: P2)

**Goal**: Users can leave the application and return later to find their previous conversation history intact.

**Independent Test**: Send message, refresh page, message persists.

### Implementation for User Story 2

- [x] T024 [US2] Implement history loading logic in backend/services/chat.py
- [x] T025 [US2] Implement history saving logic (user & assistant msgs) in backend/services/chat.py
- [x] T026 [US2] Update Frontend to handle initial history state in frontend/components/ChatInterface.tsx

**Checkpoint**: Chat history persists across reloads.

---

## Phase 5: User Story 3 - Secure User Isolation (Priority: P1)

**Goal**: Users must only be able to access their own conversations and tasks through the AI interface.

**Independent Test**: User A creates task via chat. User B asks "list tasks" -> sees only B's tasks.

### Implementation for User Story 3

- [x] T027 [P] [US3] Verify/Enforce user_id in 'add_task' tool in backend/mcp_server/tools.py
- [x] T028 [P] [US3] Verify/Enforce user_id in 'list_tasks' tool in backend/mcp_server/tools.py
- [x] T029 [P] [US3] Verify/Enforce user_id in 'update/delete/complete' tools in backend/mcp_server/tools.py
- [x] T030 [US3] Add integration test for user isolation in backend/tests/test_chat_isolation.py

**Checkpoint**: Security verification complete.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [x] T031 [P] Add error handling for OpenAI API failures in backend/services/chat.py
- [x] T032 [P] Polish Chat UI (loading states, empty states) in frontend/components/ChatInterface.tsx
- [x] T033 Update README.md with Chat feature details

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 & 2** are BLOCKING.
- **Phase 3 (US1)** depends on Phase 2.
- **Phase 4 (US2)** depends on Phase 3 (extends it with persistence).
- **Phase 5 (US3)** depends on Phase 3 (secures it), can run in parallel with Phase 4.

### Parallel Opportunities

- **Tools Implementation**: T009-T013 can be implemented in parallel by different devs.
- **Frontend/Backend**: T021-T022 (Frontend) can be started once T019 (Backend API) contract is agreed.
- **US2 & US3**: Can be worked on in parallel after US1.

## Implementation Strategy

### MVP First (User Story 1)

1. Setup & Foundation (Phases 1-2)
2. Implement Tools & Basic Chat (Phase 3)
3. **Validate**: Can I talk to the bot and manage tasks?

### Incremental Delivery

1. **v0.1**: Chatbot that forgets history on reload (US1).
2. **v0.2**: Chatbot that remembers history (US2).
3. **v0.3**: Security audit passed (US3) + UI Polish.
