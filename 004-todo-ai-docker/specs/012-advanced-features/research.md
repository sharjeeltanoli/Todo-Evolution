# Research: Phase V Part A - Advanced Features

This document consolidates research findings and technical decisions for the advanced task management features.

## 1. Recurring Tasks Implementation

**Decision**: Use `python-dateutil.rrule` for RFC 5545 compliance.
**Rationale**:
- Native support for frequency (Daily, Weekly, Monthly) and intervals.
- Handles complex calendar math (leap years, month days).
- Lightweight and well-tested in the Python ecosystem.
**Implementation Pattern**:
- Store `recurrence_rule` as an RRULE string.
- Trigger generation of the next occurrence synchronously when the current task is marked "completed".
**Alternatives Considered**:
- `croniter`: Rejected because it is focused on cron-style scheduling rather than calendar recurrence.
- Manual Logic: Rejected due to the high probability of edge-case bugs.

## 2. Full-Text Search (FTS)

**Decision**: PostgreSQL `tsvector` and `tsquery`.
**Rationale**:
- Integrated directly into the existing database.
- Significantly faster than `ILIKE` for large datasets.
- Supports ranking and multi-word matching.
**Implementation Pattern**:
- Create a GIN index on a generated column or a composite of `title` and `description`.
**Alternatives Considered**:
- SQLite FTS5: Only viable for dev; production target is PostgreSQL.
- Elasticsearch: Rejected as it introduces unnecessary infrastructure complexity for the current scale.

## 3. Reminder & Notification System

**Decision**: Polling-based background worker.
**Rationale**:
- Simplest to implement within a containerized environment without adding external message brokers.
- A single minute-resolution job is sufficient for task reminders.
**Implementation Pattern**:
- A dedicated Python script (or FastAPI background loop) that queries for unsent reminders where `remind_at <= NOW()`.
- Uses Browser Push API (frontend) for notifications.
**Alternatives Considered**:
- Celery + Redis: Better for high-volume, but adds weight to the Kubernetes deployment.
- PostgreSQL Listen/Notify: Efficient but requires a persistent connection and more complex logic.

## 4. Tagging System

**Decision**: Normalized Many-to-Many junction table.
**Rationale**:
- standard relational database pattern.
- Allows for easy filtering and aggregation (e.g., counting tasks per tag).
**Implementation Pattern**:
- `tags` table and `task_tags` junction table.
- Case-insensitive indexing on tag names.
**Alternatives Considered**:
- JSONB array in tasks table: Easier to query but harder to perform cross-task tag management (renaming/deleting tags).
