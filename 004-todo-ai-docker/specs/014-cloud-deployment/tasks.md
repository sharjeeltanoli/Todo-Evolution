# Tasks: Phase V Part C - Cloud Deployment

**Input**: Design documents from `/specs/014-cloud-deployment/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Test tasks are included for verification of infrastructure connectivity and CI/CD pipelines.

**Organization**: Tasks are grouped by phase and user story to enable independent implementation and testing.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization for cloud-native manifests and directory structure

- [x] T001 Create cloud-specific Kubernetes manifests directory in `k8s/cloud/`
- [x] T002 Create cloud-specific Dapr components directory in `dapr-components/cloud/`
- [x] T003 [P] Initialize `.github/workflows/` for CI/CD pipelines

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core cloud infrastructure and security configuration

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T004 Provision DigitalOcean Kubernetes (DOKS) cluster via DO Console or doctl per `quickstart.md`
- [ ] T005 Provision Redpanda Cloud Serverless cluster and initialize topics (task-events, reminders) per `quickstart.md`
- [ ] T006 Configure DigitalOcean Container Registry and link to DOKS cluster
- [x] T007 [P] Create Kubernetes secret for Redpanda SASL/SCRAM credentials in `k8s/cloud/kafka-secrets.yaml`
- [x] T008 [P] Create Kubernetes secret for application environment variables (DATABASE_URL, OPENAI_API_KEY) in `k8s/cloud/todo-secrets.yaml`
- [x] T009 [P] Configure Dapr PubSub component for Redpanda Cloud in `dapr-components/cloud/pubsub-kafka-cloud.yaml`
- [x] T010 [P] Configure Dapr State Store for cloud persistence in `dapr-components/cloud/state-postgresql-cloud.yaml`

**Checkpoint**: Foundation ready - cloud infrastructure is provisioned and secrets are secured.

---

## Phase 3: User Story 2 - Automated Deployment (Priority: P1) 🎯 MVP

**Goal**: Establish an automated CI/CD pipeline that auto-deploys on code push to the `main` branch.

**Independent Test**: Push a minor change to `main` and verify the GitHub Action builds, pushes, and deploys the update successfully.

### Implementation for User Story 2

- [ ] T011 [US2] Configure GitHub Secrets (DIGITALOCEAN_TOKEN, DO_REGISTRY_NAME, DO_CLUSTER_NAME) in repository settings
- [x] T012 [P] [US2] Implement GitHub Actions job for Backend Docker build and push in `.github/workflows/deploy.yml`
- [x] T013 [P] [US2] Implement GitHub Actions job for Frontend Docker build and push in `.github/workflows/deploy.yml`
- [x] T014 [P] [US2] Implement GitHub Actions job for Notification Service Docker build and push in `.github/workflows/deploy.yml`
- [x] T015 [P] [US2] Implement GitHub Actions job for Recurring Task Service Docker build and push in `.github/workflows/deploy.yml`
- [x] T016 [US2] Implement Kubernetes deployment step using `doctl` and `kubectl` in `.github/workflows/deploy.yml`
- [x] T017 [US2] Add rollout status checks for all deployments in `.github/workflows/deploy.yml`

**Checkpoint**: At this point, any code change to `main` is automatically deployed to the cloud.

---

## Phase 4: User Story 1 - Public Application Access (Priority: P1) 🎯 MVP

**Goal**: Enable users to access the Todo application via a public LoadBalancer IP.

**Independent Test**: Access the public IP in a browser and verify the frontend loads and communicates with the backend.

### Implementation for User Story 1

- [x] T018 [US1] Create Backend Deployment and ClusterIP Service in `k8s/cloud/backend-deployment.yaml`
- [x] T019 [P] [US1] Create Notification Service Deployment in `k8s/cloud/notification-deployment.yaml`
- [x] T020 [P] [US1] Create Recurring Task Service Deployment in `k8s/cloud/recurring-task-deployment.yaml`
- [x] T021 [US1] Create Frontend Deployment and LoadBalancer Service in `k8s/cloud/frontend-deployment.yaml`
- [x] T022 [US1] Configure Frontend environment variables to use the internal Backend service name in `k8s/cloud/frontend-deployment.yaml`
- [ ] T023 [US1] Verify public IP assignment via `kubectl get svc todo-frontend -w`

**Checkpoint**: The application is now live and accessible to the public.

---

## Phase 5: User Story 3 - High Availability & Reliability (Priority: P2)

**Goal**: Ensure the application is resilient to pod failures and handles traffic efficiently.

**Independent Test**: Delete a backend pod and verify a new one is automatically created without service interruption.

### Implementation for User Story 3

- [x] T024 [US3] Configure `replicas: 2` for Frontend and Backend in `k8s/cloud/*-deployment.yaml`
- [x] T025 [P] [US3] Implement Liveness and Readiness probes for all services in `k8s/cloud/*-deployment.yaml`
- [x] T026 [P] [US3] Configure resource requests and limits (CPU/Memory) in `k8s/cloud/*-deployment.yaml`
- [x] T027 [US3] Implement RollingUpdate strategy for zero-downtime deployments in `k8s/cloud/*-deployment.yaml`

**Checkpoint**: The system is now resilient and self-healing.

---

## Phase 6: User Story 4 - Cloud Infrastructure Management (Priority: P3)

**Goal**: Manage and verify the cloud-native infrastructure effectively.

**Independent Test**: Run the verification script and see all checks pass for cluster, kafka, and app health.

### Implementation for User Story 4

- [x] T028 [US4] Create a cloud health check script in `scripts/verify-cloud-health.sh`
- [x] T029 [US4] Add checks for DOKS node status and Dapr sidecar health in `scripts/verify-cloud-health.sh`
- [x] T030 [US4] Add checks for Redpanda topic connectivity in `scripts/verify-cloud-health.sh`

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Final documentation and cleanup

- [x] T031 [P] Update `docs/architecture.md` with the Cloud/DOKS deployment diagram
- [x] T032 [P] Update `README.md` with the public URL and deployment status
- [ ] T033 Perform final cluster cleanup of any unused test resources

---

## Dependencies & Execution Order

### Phase Dependencies

1. **Setup (Phase 1)**: Must be done first to organize manifests.
2. **Foundational (Phase 2)**: Provisioning MUST be complete before any deployments.
3. **Automated Deployment (Phase 3)**: Establish CI/CD so manifests in Phase 4 are applied automatically.
4. **Public Access (Phase 4)**: Deploy the app and expose it.
5. **HA & Reliability (Phase 5)**: Optimize the existing deployments.
6. **Polish (Phase 7)**: Finalize documentation.

### Parallel Opportunities

- T007-T010 (Secrets and Dapr components) can be written in parallel.
- T012-T015 (CI/CD jobs for different services) can be developed in parallel.
- T019-T020 (Microservice deployments) can be created in parallel.
- T025-T026 (Probes and resources) can be added in parallel across files.

---

## Implementation Strategy

### MVP First (CI/CD + Public Access)

1. Provision DOKS and Redpanda (Foundational).
2. Set up GitHub Actions for the Backend and Frontend (US2).
3. Deploy to the cloud and get a Public IP (US1).
4. Verify the core Todo CRUD loop in the cloud.

### Incremental Delivery

1. Foundation ready.
2. Deployment automated.
3. App accessible publicly.
4. HA and Probes added for reliability.
5. Documentation updated.
