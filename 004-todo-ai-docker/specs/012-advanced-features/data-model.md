# Data Model: Phase V Part A - Advanced Features

## Entities

### 1. Task (Extended)
**Table**: `tasks`
- `priority`: `VARCHAR(10)` - ('high', 'medium', 'low'), NOT NULL, Default 'medium'.
- `due_date`: `TIMESTAMP WITH TIME ZONE` - NULLable.
- `recurrence_rule`: `VARCHAR(200)` - RRULE string (RFC 5545). NULLable.
- `parent_task_id`: `INTEGER` - FK to `tasks.id`. Tracks recurrence chains. NULLable.

### 2. Tag
**Table**: `tags`
- `id`: `INTEGER` (PK, auto-increment)
- `user_id`: `VARCHAR(255)` (FK to users)
- `name`: `VARCHAR(50)` (NOT NULL)
- `color`: `VARCHAR(7)` (Hex code, NULLable)
- `created_at`: `TIMESTAMP`

**Constraints**:
- `UNIQUE(user_id, LOWER(name))` - Case-insensitive uniqueness per user.

### 3. TaskTag (Junction)
**Table**: `task_tags`
- `task_id`: `INTEGER` (FK to tasks, ON DELETE CASCADE)
- `tag_id`: `INTEGER` (FK to tags, ON DELETE CASCADE)

**Constraints**:
- `UNIQUE(task_id, tag_id)`

### 4. Reminder
**Table**: `task_reminders`
- `id`: `INTEGER` (PK, auto-increment)
- `task_id`: `INTEGER` (FK to tasks, ON DELETE CASCADE)
- `remind_at`: `TIMESTAMP WITH TIME ZONE` (NOT NULL)
- `sent`: `BOOLEAN` (Default: FALSE)

## State Transitions (Recurrence)

1. **Task Completion**: `Task(id=1, status='completed', recurrence_rule='FREQ=DAILY')`
2. **Trigger**: System calculates `next_due_date` using `recurrence_rule`.
3. **Action**: Creates `Task(id=2, parent_task_id=1, due_date=next_due_date, recurrence_rule='FREQ=DAILY', ...)`
4. **Link**: The original task's `recurrence_rule` is preserved in the new task.

## Search Indexes

- `idx_tasks_fts`: GIN index on `to_tsvector('english', title || ' ' || coalesce(description, ''))`.
- `idx_tasks_due_date`: B-Tree index on `due_date`.
- `idx_tasks_priority`: B-Tree index on `priority`.
