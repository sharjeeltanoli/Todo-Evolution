# Data Model: Phase V Part C - Cloud Deployment

## Overview
The data model for Phase V Part C remains consistent with the local (Minikube) version. The primary transition is from local storage to cloud-managed storage (Neon PostgreSQL and Redpanda Cloud).

## Persistent Entities (Neon PostgreSQL)

### Task
- **Fields**: `id`, `user_id`, `title`, `description`, `completed`, `priority`, `due_date`, `recurrence_rule`, `parent_task_id`, `created_at`, `updated_at`.
- **Validation**: Title mandatory, recurrence_rule must be RFC 5545 compatible.

### User
- **Fields**: `id`, `username`, `email`, `password_hash`, `created_at`.
- **Validation**: Unique email/username.

### Tag / TaskTag
- **Fields**: `id`, `name`, `user_id` / `task_id`, `tag_id`.
- **Validation**: Max 10 tags per task.

## Messaging Entities (Redpanda Cloud)

### Event Schema (Standardized)
- `event_id`: UUID
- `event_type`: `task.created`, `task.completed`, `reminder.triggered`
- `user_id`: int
- `timestamp`: ISO-8601 (UTC)
- `payload`: JSON (Entity details)

## State Store (Dapr)
- Used for scheduling reminders and potentially caching session-lite data.
- Backed by: Neon PostgreSQL (shared or separate table).
