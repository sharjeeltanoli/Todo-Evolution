# Quickstart: Phase V Part A - Advanced Features

## 1. Environment Setup
Ensure the database migrations for Phase V are applied:
```bash
# From backend directory
python -m alembic upgrade head
```

## 2. Verification Steps

### Recurring Tasks
1. Add a task with `recurrence_rule`: `FREQ=DAILY`.
2. Mark the task as `completed` via the UI or Chatbot.
3. Verify a new task is created with the same title and a `due_date` set to the next day.

### Full-Text Search
1. Create a task with a unique keyword in the description (e.g., "Xylophone").
2. Search for "Xylophone" in the search bar.
3. Verify only the relevant task is returned.

### Priority & Sorting
1. Create three tasks with High, Medium, and Low priorities.
2. Sort the task list by Priority (Descending).
3. Verify the High priority task appears at the top.

### Tags
1. Add a tag "Project-X" to a task.
2. Filter the list by the "Project-X" tag.
3. Verify only tasks with that tag are visible.

## 3. Tool Verification (MCP)
Test the updated MCP tools:
```python
# Verify search_tasks tool
search_tasks(user_id="test_user", search_term="Xylophone")
```
