---
description: "Task list for implementing the Full-stack Todo Application"
---

# Tasks: Full-stack Todo App

**Input**: Design documents from `/specs/001-fullstack-todo-app/`
**Prerequisites**: plan.md, spec.md, data-model.md, contracts/openapi.yaml

## Phase 1: Project Setup

**Purpose**: Initialize the backend and frontend projects and configure basic tooling.

- [X] T001 Initialize FastAPI backend project in `backend/`
- [X] T002 Initialize Next.js frontend project with TypeScript and App Router in `frontend/`
- [X] T003 [P] Configure Tailwind CSS for the Next.js project in `frontend/tailwind.config.ts`
- [X] T004 Create backend directory structure: `backend/routes/`, `backend/middleware/`
- [X] T005 Create frontend directory structure: `frontend/components/`, `frontend/lib/`, `frontend/types/`

---

## Phase 2: Foundational Backend & Database

**Purpose**: Set up the database, data models, and the core FastAPI application.

- [X] T006 Set up Neon PostgreSQL database and add connection string to `backend/.env`
- [X] T007 Implement `User` and `Task` models using SQLModel in `backend/models.py` based on `data-model.md`
- [X] T008 Implement database session management in `backend/db.py`
- [X] T009 [P] Initialize the main FastAPI application in `backend/main.py` with CORS and database session middleware

---

## Phase 3: User Authentication (US1, US2, US5)

**Goal**: Enable users to sign up, sign in, and sign out. Enforce authentication for protected routes.
**Independent Test**: A new user can sign up, log out, and log back in. An existing user can log in. Attempts to access task pages without logging in should fail.

### Backend Tasks (Authentication)

- [X] T010 [US1] [US2] Configure Better Auth on the backend for JWT generation and validation
- [X] T011 [US1] [US2] Implement JWT authentication middleware in `backend/middleware/auth.py` to protect task endpoints
- [X] T012 [US1] [US2] Integrate the authentication middleware into the FastAPI app in `backend/main.py`

### Frontend Tasks (Authentication)

- [X] T013 [P] [US1] [US2] Configure Better Auth on the frontend by creating `frontend/lib/auth.ts`
- [X] T014 [P] [US1] [US2] Create the Better Auth API route handler in `frontend/app/api/auth/[...nextauth]/route.ts`
- [X] T015 [US1] Create the user signup page and form in `frontend/app/signup/page.tsx`
- [X] T016 [US2] Create the user signin page and form in `frontend/app/signin/page.tsx`
- [X] T017 [US5] Implement the signout functionality, including a button in the main layout
- [X] T018 [P] [US1] [US2] Create a global API client in `frontend/lib/api.ts` that automatically attaches the JWT `Authorization` header to requests

---

## Phase 4: Task Management (US1, US3, US4)

**Goal**: Allow authenticated users to create, view, update, delete, and manage the completion status of their tasks.
**Independent Test**: An authenticated user can add a task, see it in their list, update its title, mark it as complete, and delete it. Another authenticated user cannot see or modify this task.

### Backend Tasks (Task CRUD & User Isolation)

- [X] T019 [US1] [US3] Create the API routes for task CRUD operations in `backend/routes/tasks.py`
- [X] T020 [US3] Implement the `POST /api/v1/users/{user_id}/tasks` endpoint to create a task
- [X] T021 [US1] Implement the `GET /api/v1/users/{user_id}/tasks` endpoint to list all of a user's tasks
- [X] T022 [US3] Implement the `PUT /api/v1/users/{user_id}/tasks/{task_id}` endpoint to update a task
- [X] T023 [US3] Implement the `DELETE /api/v1/users/{user_id}/tasks/{task_id}` endpoint to delete a task
- [X] T024 [US4] Implement a `PATCH /api/v1/users/{user_id}/tasks/{task_id}/complete` endpoint to toggle a task's `completed` status
- [X] T025 [US1] [US3] [US4] **CRITICAL**: Enforce user isolation in all task-related endpoints in `backend/routes/tasks.py` by verifying the JWT `user_id` matches the path `user_id`

### Frontend Tasks (Task UI & Logic)

- [X] T026 [P] [US1] Create the `TaskCard` component to display a single task in `frontend/components/TaskCard.tsx`
- [X] T027 [P] [US1] Create the `TaskList` component to display a list of tasks in `frontend/components/TaskList.tsx`
- [X] T028 [P] [US3] Create the `TaskForm` component for creating and editing tasks in `frontend/components/TaskForm.tsx`
- [X] T029 [US1] Build the main tasks page at `frontend/app/tasks/page.tsx` to fetch and display the user's tasks using the `TaskList` component
- [X] T030 [US3] Implement the create task functionality, likely using a modal with the `TaskForm` component
- [X] T031 [US3] Implement the update task functionality on the `TaskCard` or a modal
- [X] T032 [US3] Implement the delete task functionality on the `TaskCard`, including a confirmation dialog
- [X] T033 [US4] Implement the "mark as complete" functionality, likely with a checkbox on the `TaskCard`

---

## Phase 5: Integration, Deployment & Polish

**Purpose**: Perform final testing, deploy the application, and add polish.

- [X] T034 [P] Perform end-to-end testing of all user stories (signup, signin, all CRUD operations, user isolation, logout)
- [X] T035 Deploy the backend to a cloud provider (e.g., Railway, Render) and configure production environment variables
- [X] T036 Deploy the frontend to Vercel, configuring production environment variables including the production API URL
- [X] T037 Create the 90-second demo video showcasing all features
- [X] T038 Review and refactor code for clarity, performance, and adherence to standards

## Dependencies & Execution Order

- **Phase 1 -> Phase 2**: Foundational backend work requires the project structure to be in place.
- **Phase 2 -> Phase 3 & 4**: All application logic depends on the foundational backend and database setup.
- **Backend -> Frontend**: Frontend pages and components that interact with the API depend on the corresponding backend endpoints being implemented first.
- **Within Phases**: Tasks marked `[P]` can be worked on in parallel. For example, multiple frontend components can be built simultaneously. Backend auth (T010-T012) should be done before frontend auth (T013-T018). Backend task routes (T019-T025) must be done before the frontend UI (T026-T033) can be fully implemented.
