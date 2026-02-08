# Tasks: Phase V Part A - Advanced Features

**Input**: Design documents from `specs/012-advanced-features/`
**Prerequisites**: `plan.md`, `spec.md`, `data-model.md`, `contracts/api.md`

## Phase 1: Setup

**Purpose**: Environment and dependency initialization

- [X] T001 [P] Add `python-dateutil` to `backend/requirements.txt`
- [X] T002 Initialize Alembic migration for new metadata tables in `backend/migrations/`

---

## Phase 2: Foundational

**Purpose**: Core schema and shared utility implementation

- [X] T003 [P] Update `Task` model with `priority`, `due_date`, `recurrence_rule`, and `parent_task_id` in `backend/models.py`
- [X] T004 [P] Create `Tag` and `TaskTag` models in `backend/models.py`
- [X] T005 [P] Create `Reminder` model in `backend/models.py`
- [X] T006 [P] Implement RFC 5545 validation utility in `backend/utils/recurrence.py`
- [X] T007 Apply database migrations to update local development schema

---

## Phase 3: User Story 1 - Recurring Tasks (P1)

**Goal**: Automate routine task creation via recurrence rules

**Independent Test**: Create a daily recurring task, mark it complete, and verify the next day's task appears automatically.

- [X] T008 [P] [US1] Implement next occurrence calculation service in `backend/services/tasks.py`
- [X] T009 [US1] Update `PATCH /tasks/{id}` to trigger new task creation on completion in `backend/routes/tasks.py`
- [X] T010 [P] [US1] Update MCP `add_task` and `update_task` tools to support `recurrence_rule` in `backend/mcp_server/tools.py`
- [X] T011 [US1] Implement recurrence pattern selector in `frontend/components/TaskForm.tsx`

---

## Phase 4: User Story 2 - Due Dates and Reminders (P1)

**Goal**: Track deadlines and notify users of upcoming tasks

**Independent Test**: Set a reminder for 1 minute in the future and verify notification triggers.

- [X] T012 [P] [US2] Implement reminder background polling service in `backend/services/reminders.py`
- [X] T013 [P] [US2] Add `is_overdue` calculated property logic to Task response in `backend/routes/tasks.py`
- [X] T014 [US2] Integrate `due_date` and `reminder` inputs in `frontend/components/TaskForm.tsx`
- [X] T015 [US2] Implement overdue visual state (red highlighting) in `frontend/components/TaskCard.tsx`

---

## Phase 5: User Story 3 - Priority Management (P2)

**Goal**: Categorize tasks by importance (High, Medium, Low)

**Independent Test**: Assign "High" priority and verify the red warning icon appears on the card.

- [X] T016 [P] [US3] Add priority validation and default logic to Pydantic models in `backend/models.py`
- [X] T017 [US3] Add priority dropdown selector in `frontend/components/TaskForm.tsx`
- [X] T018 [US3] Implement priority badges (High/Medium/Low) in `frontend/components/TaskCard.tsx`

---

## Phase 6: User Story 4 - Tags and Categories (P2)

**Goal**: Organize tasks using flexible user-defined tags

**Independent Test**: Add a tag to a task and verify it appears in the tag list with a correct task count.

- [X] T019 [P] [US4] Implement tag CRUD and task association service in `backend/services/tags.py`
- [X] T020 [US4] Create REST endpoints for tag management in `backend/routes/tags.py`
- [X] T021 [US4] Implement tag input with autocomplete suggestions in `frontend/components/TaskForm.tsx`
- [X] T022 [US4] Add tag badge list to task display in `frontend/components/TaskCard.tsx`

---

## Phase 7: User Story 5 - Search and Filter (P3)

**Goal**: Quickly retrieve tasks using keywords and criteria

**Independent Test**: Search for a specific keyword and filter by "High" priority to find a needle in a haystack.

- [X] T023 [P] [US5] Implement PostgreSQL Full-Text Search (tsvector) query in `backend/routes/tasks.py`
- [X] T024 [P] [US5] Update `GET /tasks` with additive filtering for tags and priority in `backend/routes/tasks.py`
- [X] T025 [US5] Implement search bar and filter sidebar UI in `frontend/app/page.tsx`

---

## Phase 8: User Story 6 - Sort Functionality (P3)

**Goal**: View tasks in a specific order (Due Date, Priority, etc.)

**Independent Test**: Sort by "Due Date (Ascending)" and verify the most urgent tasks are at the top.

- [X] T026 [P] [US6] Implement multi-column sorting logic in `backend/routes/tasks.py`
- [X] T027 [US6] Add sort criteria dropdown to the main task list in `frontend/app/page.tsx`

---

## Phase 9: Polish & Cross-Cutting Concerns

**Purpose**: Documentation and refinement

- [X] T028 [P] Update `docs/architecture.md` with new schema and recurrence logic
- [ ] T029 [P] Refine AI Chatbot NLP extraction for tags and priorities in `backend/routes/chat.py`

---

## Dependencies & Execution Order

1. **Foundational (Phase 2)**: MUST be completed before any User Story.
2. **User Stories (Phase 3 & 4)**: High priority P1 stories; can be worked on in parallel once Phase 2 is done.
3. **User Stories (Phase 5 & 6)**: P2 stories; depend on Phase 2 but independent of P1 stories.
4. **User Stories (Phase 7 & 8)**: P3 stories; depend on Phase 2 and metadata availability from Phase 5/6.

## Parallel Opportunities

- **Phase 2**: T003, T004, T005 can be implemented simultaneously.
- **US Implementation**: Once Phase 2 is complete, US1 (Recurrence), US2 (Reminders), and US3 (Priority) can proceed in parallel as they touch different logic branches.

---

## Implementation Strategy

### MVP First (P1 stories)
1. Complete Setup + Foundational.
2. Complete US1 (Recurring Tasks) and US2 (Due Dates).
3. **Checkpoint**: Basic app now supports automation and deadlines.

### Incremental Delivery
1. Add Priority (US3) + Tags (US4) → Enhanced organization.
2. Add Search/Filter (US5) + Sort (US6) → Final productivity suite.