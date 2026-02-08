---
id: 005
title: Deploy Dapr and Kafka Integration to Minikube
stage: green
date: 2026-02-07
surface: agent
model: gemini-2.0-pro-exp
feature: 013-dapr-kafka-integration
branch: 013-dapr-kafka-integration
user: User
command: deploy
labels: ["minikube", "dapr", "redpanda", "deployment"]
links:
  spec: /specs/013-dapr-kafka-integration/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - k8s/backend-deployment.yaml
 - k8s/notification-deployment.yaml
 - k8s/recurring-task-deployment.yaml
 - k8s/redpanda-service.yaml
 - k8s/secrets.yaml
 - dapr-components/pubsub-kafka.yaml
 - dapr-components/state-postgresql.yaml
tests:
 - manual event publishing test
---

## Prompt

Deploy Phase V Part B to Minikube with the following steps...

## Response snapshot

Deployed the event-driven architecture to Minikube. Fixed Docker daemon access, installed Dapr, started Redpanda with correct advertised listeners, built Docker images in the Minikube context, and applied all Kubernetes manifests. Verified successful event publishing from the backend to the notification service via Dapr and Kafka.

## Outcome

- ✅ Impact: High. System is now running in a production-like microservices environment.
- 🧪 Tests: Verified end-to-end event delivery from `todo-backend` to `notification-service`.
- 📁 Files: Created all necessary K8s manifests and secrets.
- 🔁 Next prompts: Implement E2E tests for recurring tasks and reminders in the K8s environment.
- 🧠 Reflection: Configuring Kafka advertised listeners is critical for sidecar connectivity in K8s. Returning 204 from pubsub handlers ensures clean Dapr delivery.

## Evaluation notes (flywheel)

- Failure modes observed: Corruption of sync.py due to unescaped strings; Kafka connectivity issues due to wrong advertised listeners.
- Graders run and results (PASS/FAIL): PASS.
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): Use Dapr dashboard to visualize traffic.
