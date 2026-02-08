# Research: Phase V Part B - Dapr and Kafka Integration

## Decision: Dapr Pub/Sub Component Configuration
**Rationale**: Redpanda is Kafka-compatible, allowing us to use the standard Dapr `pubsub.kafka` component. This simplifies local development while providing production-grade performance.
**Alternatives considered**: 
- **Direct Kafka SDK**: Rejected because it couples the code to Kafka and requires manual consumer group management and retry logic.
- **Redis Pub/Sub**: Rejected because it lacks the persistence and "at-least-once" guarantees provided by Kafka, which are critical for reminders and recurring tasks.

## Decision: Dapr Jobs API for Reminders
**Rationale**: The Dapr Jobs API provides exact-time scheduling, which is perfect for reminders. It eliminates the need for a polling-based background worker, reducing database load and improving precision.
**Alternatives considered**:
- **Cron Jobs**: Rejected because they are periodic, not exact-time for specific task IDs.
- **Celery/Redis**: Rejected because it adds another heavy infrastructure dependency (Redis + Celery worker) compared to the lightweight Dapr sidecar.

## Decision: Idempotent Consumer Pattern
**Rationale**: Since Kafka guarantees at-least-once delivery, consumers must handle potential duplicates. We will implement a `processed_events` table in PostgreSQL to track `event_id`s.
**Implementation**:
1. Receive event.
2. Check if `event_id` exists in `processed_events`.
3. If exists, skip.
4. If not, process event and insert `event_id` in the same database transaction (if possible) or immediately after success.

## Decision: Dapr Python SDK Integration
**Rationale**: Use the official `dapr-sdk` for Python. The backend will use `DaprClient` to publish events, and microservices will use FastAPI endpoints that Dapr calls via HTTP.
**Pattern**: Declarative subscription via `@app.get("/dapr/subscribe")` endpoint in each microservice.

## Technical Unknowns Resolved
- **Dapr on Minikube**: Requires `dapr init -k`.
- **Redpanda Access**: Can be accessed via `host.minikube.internal:9092` or as a service within the cluster.
- **Event Schema**: Standardized on CloudEvents format (Dapr default).
