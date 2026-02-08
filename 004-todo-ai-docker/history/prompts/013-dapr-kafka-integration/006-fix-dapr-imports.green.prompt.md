---
id: 006
title: Fix Dapr ModuleNotFoundError and Add Fallbacks
stage: green
date: 2026-02-08
surface: agent
model: gemini-2.0-flash-exp
feature: 013-dapr-kafka-integration
branch: null
user: null
command: null
labels: ["dapr", "error-handling", "fallbacks"]
links:
  spec: specs/013-dapr-kafka-integration/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - backend/requirements.txt
 - backend/services/event_publisher.py
 - backend/services/reminders.py
 - recurring-task-service/main.py
 - notification-service/requirements.txt
 - recurring-task-service/requirements.txt
tests:
 - null
---

## Prompt

My backend is failing with ModuleNotFoundError: No module named 'dapr'. This phase requires Cloud-Native technologies like Dapr and Kafka.

Objective:
Update my requirements.txt to include all necessary Cloud-Native libraries (dapr, dapr-ext-grpc, aiokafka, etc.).
Fix the import errors in backend/services/event_publisher.py and other relevant files.
Ensure the project structure is ready for Dockerization and Kubernetes deployment as per Phase 5 requirements.
If I am running locally without Dapr sidecars, implement a fallback mechanism or guide me on how to run it using dapr run.

Tasks:
Examine backend/requirements.txt and add missing dependencies.
Verify the Dapr client initialization logic in services/event_publisher.py.
Provide a pip install command to sync my local environment.

## Response snapshot

I have updated the `requirements.txt` files for the backend and sub-services to include `dapr`, `dapr-ext-grpc`, `dapr-ext-fastapi`, and `aiokafka`. I also implemented a fallback mechanism in `backend/services/event_publisher.py`, `backend/services/reminders.py`, and `recurring-task-service/main.py` using `try...except` blocks for the `dapr` import. This ensures the application remains functional even if the Dapr SDK is missing or the sidecar is not reachable.

## Outcome

- ✅ Impact: Fixed critical startup error and improved local development resilience.
- 🧪 Tests: None (Manual verification via Dapr run suggested).
- 📁 Files: Updated requirements and services in backend and microservices.
- 🔁 Next prompts: "Run dapr sidecar" or "Test pubsub integration".
- 🧠 Reflection: Using conditional imports for Cloud-Native sidecars is a best practice for local development.

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): null
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): null
