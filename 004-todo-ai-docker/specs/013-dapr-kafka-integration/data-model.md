# Data Model: Phase V Part B - Dapr and Kafka Integration

## New Entities

### TaskEvent (Kafka Message)
Represents a change to a task state, published to the `task-events` topic.

| Field | Type | Description |
|-------|------|-------------|
| event_id | UUID | Unique identifier for the event (for idempotency) |
| event_type | String | One of: `task.created`, `task.updated`, `task.deleted`, `task.completed` |
| user_id | String | The owner of the task |
| task_id | Integer | The unique ID of the task |
| timestamp | DateTime | UTC time when the event occurred |
| payload | JSON | The full task object or the delta of changes |

### ReminderEvent (Kafka Message)
Published to the `reminders` topic when a reminder is due.

| Field | Type | Description |
|-------|------|-------------|
| event_id | UUID | Unique identifier |
| user_id | String | The user to notify |
| task_id | Integer | The associated task |
| task_title | String | Title of the task for the notification |
| remind_at | DateTime | Scheduled time for the reminder |

### ProcessedEvent (Database Table)
Used by consumers to ensure idempotency.

| Field | Type | Description |
|-------|------|-------------|
| event_id | UUID (PK) | The ID from the event |
| consumer_id | String | ID of the service that processed it |
| processed_at | DateTime | When it was processed |

## Modified Entities

### Task (Existing)
- Add `parent_task_id: Integer | None` to link recurring task occurrences.

### Reminder (Existing)
- Add `status: String` (e.g., `pending`, `sent`, `failed`) to track notification delivery.
