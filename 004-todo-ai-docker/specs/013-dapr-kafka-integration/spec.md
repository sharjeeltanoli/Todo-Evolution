# Feature Specification: Phase V Part B - Dapr and Kafka Integration

**Feature Branch**: `013-dapr-kafka-integration`  
**Created**: 2026-02-07  
**Status**: Draft  
**Input**: User description: "Transform the Todo application from a monolithic architecture to an event-driven microservices architecture using Dapr and Kafka. This enables scalability, resilience, and real-time capabilities while maintaining backward compatibility with Part A."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Task Event Publishing (Priority: P1)

As the system, I want to publish events when tasks are created, updated, or deleted, so that other services can react to task changes in real-time without direct coupling.

**Why this priority**: This is the foundation of the event-driven architecture. Without event publishing, no downstream microservices (notifications, recurring tasks) can function.

**Independent Test**: Can be verified by performing task operations (create, update, delete) and observing the corresponding events being emitted to the event bus with complete and accurate task data.

**Acceptance Scenarios**:

1. **Given** a user is logged into the Todo application, **When** they create a new task, **Then** a `task.created` event is published to the event bus containing the task's full details.
2. **Given** an existing task, **When** the user updates the task's priority or due date, **Then** a `task.updated` event is published.
3. **Given** an existing task, **When** the user marks it as completed, **Then** a `task.completed` event is published.
4. **Given** an existing task, **When** the user deletes it, **Then** a `task.deleted` event is published.

---

### User Story 2 - Automated Task Notifications (Priority: P2)

As a user, I want to receive notifications when reminders for my tasks are due, so that I am alerted to important deadlines even if I am not actively using the application.

**Why this priority**: Notifications provide immediate user value and demonstrate the "consumer" side of the event-driven architecture.

**Independent Test**: Can be tested by scheduling a reminder for a task and verifying that an observable notification (e.g., a log entry or notification message) is generated exactly when the reminder is due.

**Acceptance Scenarios**:

1. **Given** a task with a scheduled reminder, **When** the scheduled time is reached, **Then** a notification event is processed by the notification service.
2. **Given** a notification event has been processed, **When** checking the system state, **Then** the reminder is marked as "sent" to avoid duplicate alerts.

---

### User Story 3 - Automatic Recurring Task Generation (Priority: P3)

As a user, I want my recurring tasks to automatically generate the next occurrence when I complete the current one, so that I don't have to manually recreate repetitive tasks.

**Why this priority**: Automates a key workflow, reducing manual effort for the user and demonstrating complex event processing (consuming a completion event to trigger a creation action).

**Independent Test**: Can be tested by completing a task that has a recurrence rule and verifying that a new task for the next occurrence is automatically created with the correct dates and metadata.

**Acceptance Scenarios**:

1. **Given** a task with a recurrence rule (e.g., "Daily"), **When** the user marks the task as complete, **Then** a new task is automatically created for the next scheduled interval.
2. **Given** a newly generated recurring task, **When** viewed by the user, **Then** it must preserve all original tags, priority, and the recurrence rule from its parent.

---

### User Story 4 - Multi-Client Real-Time Synchronization (Priority: P4)

As a user with multiple devices, I want task changes to appear in real-time across all my devices, so that I always see the latest information regardless of which client I am using.

**Why this priority**: Enhances the user experience by providing a seamless multi-device flow, though it is less critical than core task persistence and notifications.

**Independent Test**: Can be tested by having two separate clients open, making a change in one, and verifying the change appears in the second client within 2 seconds without a manual refresh.

**Acceptance Scenarios**:

1. **Given** a user has the application open in two different browser tabs/devices, **When** they update a task in one tab, **Then** the change is reflected in the second tab within 2 seconds.

### Edge Cases

- **Event Bus Down**: If the event bus is temporarily unavailable, the system MUST still persist the task to the database (maintaining core functionality) and should ideally retry the event publication when the bus returns.
- **Duplicate Events**: Consumers MUST be idempotent, ensuring that receiving the same event twice (e.g., due to network retries) does not result in duplicate notifications or duplicate recurring tasks.
- **Malformed Events**: The system should handle events that don't match the expected schema by logging the error and moving the event to a dead-letter queue rather than crashing the consumer service.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The system MUST publish standardized events for all Task CRUD (Create, Read, Update, Delete) operations.
- **FR-002**: Events MUST include the task ID, user ID, timestamp, and the relevant task data or delta.
- **FR-003**: The Notification Service MUST consume reminder events and generate observable alerts.
- **FR-004**: The Recurring Task Service MUST consume task completion events and calculate/create the next occurrence based on the recurrence rule.
- **FR-005**: The system MUST support exact-time scheduling for reminders, replacing polling-based mechanisms.
- **FR-006**: Core task operations MUST remain functional even if event-driven services (notifications, recurring tasks) are temporarily unavailable (backward compatibility).

### Key Entities *(include if feature involves data)*

- **Task Event**: Represents a change to a task state. Includes metadata (ID, type, timestamp) and payload (task data).
- **Reminder Event**: Represents a specific point in time when a user should be notified about a task.
- **Recurrence Rule**: A definition of how and when a task should repeat (e.g., RRULE string).

## Success Criteria *(mandatory)*



### Measurable Outcomes



- **SC-001**: Task events are published and available to consumers within 500ms of the API request completion.

- **SC-002**: Notifications are generated within 5 seconds of a reminder trigger event.

- **SC-003**: New occurrences of recurring tasks are created within 10 seconds of the parent task's completion event.

- **SC-004**: System maintains 100% data consistency between the primary database and the event bus.

- **SC-005**: Zero regression in existing Phase IV functionality (all legacy features work as expected).



## Dependencies & Assumptions



- **Dependency**: Requires a functional Kubernetes environment (as established in Phase IV).

- **Dependency**: Relies on an external or sidecar-based event bus infrastructure.

- **Assumption**: Users have already configured tasks with recurrence rules and reminders (Phase V Part A).

- **Assumption**: The existing database schema supports `parent_task_id` for recurring task linkage.
