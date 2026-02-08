---

description: "Task list for Dockerize Todo Application feature implementation"
---

# Tasks: Dockerize Todo Application

**Input**: Design documents from `/specs/011-dockerize-todo-app/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, quickstart.md

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Web app**: `backend/src/`, `frontend/src/` (as per project structure)

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure. For this feature, no explicit tasks are needed in this phase as the project structure is already established.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T001 Create `backend/Dockerfile` as per plan.md `backend/Dockerfile`
- [X] T002 Create `frontend/Dockerfile` as per plan.md `frontend/Dockerfile`
- [X] T003 Create `backend/.dockerignore` as per plan.md `backend/.dockerignore`
- [X] T004 Create `frontend/.dockerignore` as per plan.md `frontend/.dockerignore`

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Containerize Application Services (Priority: P1) 🎯 MVP

**Goal**: As a DevOps Engineer, I want to create container images for the frontend, backend, and MCP server so that the application is portable and can be deployed consistently across different environments, including Kubernetes.

**Independent Test**: Each service's container image can be built and run locally. The service's health check endpoint can be successfully accessed.

### Implementation for User Story 1

- [X] T005 [P] [US1] Build `todo-backend` Docker image locally using `docker build -f backend/Dockerfile .` `backend/Dockerfile`
- [X] T006 [P] [US1] Run `todo-backend` container and map port 8000
- [X] T007 [P] [US1] Verify `todo-backend` health check at `http://localhost:8000/health`
- [X] T008 [P] [US1] Build `todo-frontend` Docker image locally using `docker build -f frontend/Dockerfile .` `frontend/Dockerfile`
- [X] T009 [P] [US1] Run `todo-frontend` container and map port 3000
- [X] T010 [P] [US1] Verify `todo-frontend` health check at `http://localhost:3000/api/health`
- [X] T011 [US1] Validate `todo-backend` runs as non-root user
- [X] T012 [US1] Validate `todo-frontend` runs as non-root user
- [X] T013 [US1] Check `todo-backend` image size is under 200MB
- [X] T014 [US1] Check `todo-frontend` image size is under 200MB
- [X] T015 [US1] Ensure no secrets are baked into `todo-backend` image
- [X] T016 [US1] Ensure no secrets are baked into `todo-frontend` image

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Automate Image Builds (Priority: P2)

**Goal**: As a Developer, I want a single script that builds all the application's container images and tags them with a version, so I can quickly and reliably create a new release of the application for deployment.

**Independent Test**: The build script can be executed, and it will produce all required container images with the correct tags without any manual intervention.

### Implementation for User Story 2

- [X] T017 [P] Create `scripts/docker-build.sh` as per plan.md `scripts/docker-build.sh`
- [X] T018 [P] Make `scripts/docker-build.sh` executable `scripts/docker-build.sh`
- [X] T019 [US2] Execute `scripts/docker-build.sh` without a tag and verify latest images are built `scripts/docker-build.sh`
- [X] T020 [US2] Execute `scripts/docker-build.sh v1.0.0` and verify images are tagged `v1.0.0` `scripts/docker-build.sh`
- [X] T021 [US2] Verify `scripts/docker-build.sh` exits with error on build failure `scripts/docker-build.sh`

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase N: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [X] T022 Document usage of new `scripts/docker-build.sh` in `quickstart.md` `docs/quickstart.md`
- [X] T023 Update `.gemini/GEMINI.md` to reflect new agent context `.gemini/GEMINI.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - May integrate with US1 but should be independently testable

### Within Each User Story

- Tests (if included) MUST be written and FAIL before implementation
- Models before services
- Services before endpoints
- Core implementation before integration
- Story complete before moving to next priority

### Parallel Opportunities

- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Once Foundational phase completes, all user stories can start in parallel (if team capacity allows)
- All tasks in User Story 1 marked [P] can run in parallel
- All tasks in User Story 2 marked [P] can run in parallel

---

## Parallel Example: User Story 1

```bash
# Example for parallel execution of building images:
Task: "Build todo-backend Docker image locally using docker build -f backend/Dockerfile ."
Task: "Build todo-frontend Docker image locally using docker build -f frontend/Dockerfile ."
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
2. Complete Phase 3: User Story 1
3. **STOP and VALIDATE**: Test User Story 1 independently
4. Deploy/demo if ready

### Incremental Delivery

1. Complete Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 → Test independently → Deploy/Demo
4. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1
   - Developer B: User Story 2
3. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Verify tests fail before implementing
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
