# Tasks: Phase V Part B - Dapr and Kafka Integration

**Input**: Design documents from `/specs/013-dapr-kafka-integration/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3, US4)

## Phase 1: Setup (Infrastructure)

**Purpose**: Kubernetes infrastructure and Dapr initialization

- [ ] T001 Initialize Dapr on Minikube using `dapr init -k`
- [ ] T002 Deploy Redpanda Kafka using Helm in `redpanda` namespace
- [X] T003 [P] Create Dapr Pub/Sub component in `dapr-components/pubsub-kafka.yaml`
- [X] T004 [P] Create Dapr State store component in `dapr-components/state-postgresql.yaml`
- [ ] T005 Verify Dapr control plane pods are healthy in `dapr-system` namespace

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core logic and database updates needed for event-driven flows

- [X] T006 Add `ProcessedEvent` model to `backend/models.py` for idempotency
- [X] T007 Add `parent_task_id` to `Task` model in `backend/models.py`
- [X] T008 Add `status` field to `Reminder` model in `backend/models.py`
- [X] T009 [P] Generate and run database migrations for new models/fields
- [X] T010 Implement `EventPublisher` helper in `backend/services/event_publisher.py`
- [X] T011 Create `idempotency` decorator/helper in `backend/utils/security.py`

---

## Phase 3: User Story 1 - Task Event Publishing (Priority: P1) 🎯 MVP

**Goal**: Enable the backend to emit events for all task operations

**Independent Test**: Perform CRUD operations via API and verify events appear in Kafka using `rpk topic consume task-events`

- [X] T012 [P] [US1] Update `create_task` in `backend/routes/tasks.py` to publish `task.created`
- [X] T013 [P] [US1] Update `update_task` in `backend/routes/tasks.py` to publish `task.updated`
- [X] T014 [P] [US1] Update `delete_task` in `backend/routes/tasks.py` to publish `task.deleted`
- [X] T015 [P] [US1] Update `complete_task` in `backend/routes/tasks.py` to publish `task.completed`
- [X] T016 [US1] Add unit tests for `EventPublisher` in `backend/tests/test_events.py`

---

## Phase 4: User Story 2 - Automated Task Notifications (Priority: P2)

**Goal**: Decouple notifications into a separate microservice and use Dapr Jobs

**Independent Test**: Schedule a reminder and verify `notification-service` logs the alert at the exact due time

- [X] T017 [P] Create `notification-service/requirements.txt` with FastAPI and Dapr dependencies
- [X] T018 [US2] Implement `notification-service/main.py` with `/reminders` Dapr subscription
- [X] T019 [US2] Replace background polling in `backend/services/reminders.py` with Dapr Jobs API
- [X] T020 [US2] Implement `/api/jobs/reminder-trigger` callback in `backend/routes/tasks.py`
- [X] T021 [P] Create `notification-service/Dockerfile` for the new service
- [X] T022 [US2] Create Kubernetes manifest in `k8s/notification-deployment.yaml` with Dapr annotations

---

## Phase 5: User Story 3 - Automatic Recurring Task Generation (Priority: P3)

**Goal**: Automate next-occurrence creation via event-driven microservice

**Independent Test**: Complete a recurring task and verify a new task is created by the `recurring-task-service`

- [X] T023 [P] Create `recurring-task-service/requirements.txt`
- [X] T024 [US3] Implement `recurring-task-service/main.py` subscribing to `task.completed`
- [X] T025 [US3] Integrate `python-dateutil` for recurrence calculation in `recurring-task-service/main.py`
- [X] T026 [P] Create `recurring-task-service/Dockerfile`
- [X] T027 [US3] Create Kubernetes manifest in `k8s/recurring-task-deployment.yaml`

---

## Phase 6: User Story 4 - Multi-Client Real-Time Sync (Priority: P4)

**Goal**: Real-time frontend updates via event stream

**Independent Test**: Open two browser tabs and see task updates propagate without refresh

- [X] T028 [US4] Implement Server-Sent Events (SSE) or WebSocket endpoint in `backend/routes/sync.py`
- [X] T029 [US4] Update `frontend/lib/api.ts` to handle real-time event stream
- [X] T030 [US4] Integrate real-time updates into `frontend/components/TaskList.tsx`

---

## Phase 7: Polish & Cross-Cutting Concerns

- [X] T031 [P] Add liveness and readiness probes to all `Dockerfile`s and K8s manifests
- [ ] T032 [P] Implement structured JSON logging across all microservices
- [X] T033 Configure Dapr Dead Letter Queues (DLQ) for failed events in `pubsub-kafka.yaml`
- [X] T034 Update `docs/architecture.md` with the new event-driven topology

---

## Dependencies & Execution Order

1. **Infrastructure (Phase 1)** must be complete to enable Dapr sidecars.
2. **Foundational (Phase 2)** blocks all user stories as they rely on the `EventPublisher` and `ProcessedEvent` table.
3. **User Story 1 (P1)** is the MVP and should be prioritized.
4. **User Story 2 & 3** can be developed in parallel after US1 is functional.
5. **User Story 4** depends on the stable event flow from US1.

## Parallel Execution Examples

```bash
# Parallel Phase 2:
Task T006: "Add ProcessedEvent model"
Task T007: "Add parent_task_id to Task"
Task T008: "Add status to Reminder"

# Parallel Phase 3:
Task T012: "Update create_task route"
Task T013: "Update update_task route"
Task T014: "Update delete_task route"
```

## Implementation Strategy

1. **MVP**: Complete Phases 1, 2, and 3. This gives us a functional event-emitting backend.
2. **Incremental**: Add `notification-service` (Phase 4), then `recurring-task-service` (Phase 5).
3. **Enhancement**: Add real-time sync (Phase 6) and final polish (Phase 7).