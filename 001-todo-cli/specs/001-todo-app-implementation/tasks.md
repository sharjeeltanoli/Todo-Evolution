---

description: "Task list for Todo CLI (In-Memory) feature implementation"
---

# Tasks: Todo CLI (In-Memory)

**Input**: Design documents from `/specs/001-todo-app-implementation/`
**Prerequisites**: plan.md (required), spec.md (required for user stories)

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Single project**: `src/`, `tests/` at repository root

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Create project structure (e.g., src/, tests/)
- [x] T002 Create CLI entry point src/main.py
- [x] T003 Initialize application loop with exit condition src/main.py

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T004 Define task data structure matching specification src/models/task.py
- [x] T005 Implement in-memory task collection src/services/task_storage.py
- [x] T006 Implement sequential task ID generation src/services/task_storage.py
- [x] T007 Define supported CLI actions src/cli/commands.py
- [x] T008 Parse user input safely src/cli/parser.py
- [x] T009 Route input to correct action src/cli/router.py
- [x] T010 Handle unknown commands gracefully src/cli/router.py

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

## Phase 3: User Story 1 - Add Task 🎯 MVP

**Goal**: Allow users to add a new task with a title and description.

**Independent Test**: Verify that a task can be added and its details are correctly stored and retrievable.

### Implementation for User Story 1

- [x] T011 [US1] Prompt user for task title src/cli/commands/add.py
- [x] T012 [US1] Prompt user for task description src/cli/commands/add.py
- [x] T013 [US1] Validate title length (1–200) src/utils/validation.py
- [x] T014 [US1] Validate description length (≤1000) src/utils/validation.py
- [x] T015 [US1] Create new task with default status "incomplete" src/services/task_manager.py
- [x] T016 [US1] Store task in memory via TaskStorage src/services/task_manager.py
- [x] T017 [US1] Display success message with task ID src/cli/commands/add.py

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

## Phase 4: User Story 2 - View Tasks

**Goal**: Allow users to view all existing tasks.

**Independent Test**: Verify that all tasks, including newly added ones, are displayed correctly, and an appropriate message is shown when no tasks exist.

### Implementation for User Story 2

- [x] T018 [US2] Retrieve all tasks from memory via TaskStorage src/services/task_manager.py
- [x] T019 [US2] Display task ID, title, and status src/cli/commands/view.py
- [x] T020 [US2] Display "No tasks found" when empty src/cli/commands/view.py

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

## Phase 5: User Story 3 - Update Task

**Goal**: Allow users to modify an existing task's title or description.

**Independent Test**: Verify that an existing task's details can be updated, and the changes are reflected when viewed.

### Implementation for User Story 3

- [x] T021 [US3] Prompt user for task ID src/cli/commands/update.py
- [x] T022 [US3] Validate task existence src/services/task_manager.py
- [x] T023 [US3] Prompt for updated title (optional) src/cli/commands/update.py
- [x] T024 [US3] Prompt for updated description (optional) src/cli/commands/update.py
- [x] T025 [US3] Validate updated inputs src/utils/validation.py
- [x] T026 [US3] Apply updates to task src/services/task_manager.py
- [x] T027 [US3] Display confirmation message src/cli/commands/update.py

**Checkpoint**: All user stories should now be independently functional

## Phase 6: User Story 4 - Toggle Task Completion

**Goal**: Allow users to mark a task as complete or incomplete.

**Independent Test**: Verify that a task's completion status can be toggled and the new status is correctly displayed.

### Implementation for User Story 4

- [x] T028 [US4] Prompt user for task ID src/cli/commands/toggle.py
- [x] T029 [US4] Validate task existence src/services/task_manager.py
- [x] T030 [US4] Toggle task status src/services/task_manager.py
- [x] T031 [US4] Display updated status src/cli/commands/toggle.py

## Phase 7: User Story 5 - Delete Task

**Goal**: Allow users to remove a task.

**Independent Test**: Verify that a task can be deleted and it no longer appears in the task list.

### Implementation for User Story 5

- [x] T032 [US5] Prompt user for task ID src/cli/commands/delete.py
- [x] T033 [US5] Validate task existence src/services/task_manager.py
- [x] T034 [US5] Remove task from memory via TaskStorage src/services/task_manager.py
- [x] T035 [US5] Display deletion confirmation src/cli/commands/delete.py

## Phase 8: Polish & Cross-Cutting Concerns - Error Handling

**Purpose**: Improvements that affect multiple user stories

- [x] T036 Handle invalid numeric input src/utils/error_handler.py
- [x] T037 Handle non-existent task IDs src/utils/error_handler.py
- [x] T038 Ensure application continues after errors src/utils/error_handler.py

## Phase 9: Final Validation

- [x] T039 Verify compliance with task-crud.md (manual check)
- [x] T040 Verify no persistence is used (manual check)
- [x] T041 Verify CLI-only behavior (manual check)

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phases 3-7)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3 → P4 → P5)
- **Polish (Phase 8)**: Depends on all desired user stories being complete
- **Final Validation (Phase 9)**: Depends on all implementation and polish tasks being complete

### User Story Dependencies

- **User Story 1 (Add Task)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (View Tasks)**: Can start after Foundational (Phase 2) - May be implemented in parallel with US1, but depends on US1 for tasks to view.
- **User Story 3 (Update Task)**: Can start after Foundational (Phase 2) - Depends on US1 for task creation.
- **User Story 4 (Toggle Task Completion)**: Can start after Foundational (Phase 2) - Depends on US1 for task creation.
- **User Story 5 (Delete Task)**: Can start after Foundational (Phase 2) - Depends on US1 for task creation.

### Within Each User Story

- Core implementation before integration
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks (T001-T003) can run in parallel if independent.
- All Foundational tasks (T004-T010) can run in parallel if independent.
- Once Foundational phase completes, all user stories (Phases 3-7) can start in parallel (if team capacity allows).
- Within each story, tasks that modify different files (e.g., creating a command file and a validation utility) can be done in parallel.

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test User Story 1 independently
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 → Test independently → Deploy/Demo
4. Add User Story 3 → Test independently → Deploy/Demo
5. Add User Story 4 → Test independently → Deploy/Demo
6. Add User Story 5 → Test independently → Deploy/Demo
7. Complete Phase 8: Polish & Cross-Cutting Concerns
8. Complete Phase 9: Final Validation
9. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1 (Add Task)
   - Developer B: User Story 2 (View Tasks)
   - Developer C: User Story 3 (Update Task)
   - Developer D: User Story 4 (Toggle Task Completion)
   - Developer E: User Story 5 (Delete Task)
3. Stories complete and integrate independently

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
