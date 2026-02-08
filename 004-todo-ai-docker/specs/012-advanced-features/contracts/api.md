# API Contracts: Phase V Part A

## 1. Tasks API (Extensions)

### GET /api/{user_id}/tasks
**Description**: List tasks with advanced filtering, search, and sorting.
**Query Parameters**:
- `search`: string (Full-text search)
- `priority`: string (comma-separated: high,medium,low)
- `tags`: string (comma-separated names)
- `overdue`: boolean
- `sort_by`: string (due_date, priority, created_at)
- `sort_order`: string (asc, desc)

**Response (Task Object)**:
```json
{
  "id": 1,
  "title": "Task",
  "priority": "high",
  "due_date": "2026-02-10T15:00:00Z",
  "recurrence_rule": "FREQ=WEEKLY;BYDAY=MO",
  "tags": ["work", "urgent"],
  "is_overdue": false
}
```

### POST /api/{user_id}/tasks
**Extended Request Body**:
```json
{
  "title": "New Task",
  "priority": "medium",
  "due_date": "2026-02-10T15:00:00Z",
  "recurrence_rule": "FREQ=DAILY",
  "tags": ["personal"],
  "reminders": [
    {"offset_minutes": 60}
  ]
}
```

## 2. Tags API (New)

### GET /api/{user_id}/tags
- **Response**: `[{"id": 1, "name": "work", "task_count": 5}]`

### POST /api/{user_id}/tags
- **Body**: `{"name": "new-tag", "color": "#FF0000"}`

### DELETE /api/{user_id}/tags/{tag_id}
- **Status**: 204 No Content

## 3. Reminders API (New/Internal)

### PATCH /api/{user_id}/tasks/{task_id}/reminders
- **Body**: `{"reminders": [{"remind_at": "..."}]}`
