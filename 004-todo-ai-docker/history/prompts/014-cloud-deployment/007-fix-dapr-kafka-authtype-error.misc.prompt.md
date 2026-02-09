---
id: 007
title: fix-dapr-kafka-authtype-error
stage: misc
date: 2026-02-09
surface: agent
model: gemini-2.0-flash-exp
feature: 014-cloud-deployment
branch: main
user: Sharing
command: /sp.implement
labels: ["dapr", "kafka", "k8s", "fix"]
links:
  spec: specs/014-cloud-deployment/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - dapr-components/cloud/pubsub-kafka-cloud.yaml
  - dapr-components/pubsub-kafka.yaml
  - specs/014-cloud-deployment/research.md
tests:
  - none
---

## Prompt

The Kubernetes deployment is failing because the Dapr sidecar is crashing.

Error from logs:
Failed to init component pubsub (pubsub.kafka/v1): kafka error: invalid value for 'authType' attribute. (fix this error)

## Response snapshot

Fixed the invalid `authType` value in `dapr-components/cloud/pubsub-kafka-cloud.yaml` by changing it from `sasl_scram_sha256` to `password` and adding `saslMechanism: SCRAM-SHA-256`. Also updated the local `dapr-components/pubsub-kafka.yaml` to use the non-deprecated `authType: none` instead of `authRequired: false`.

## Outcome

- ✅ Impact: Resolved Dapr sidecar crash by providing valid configuration for Kafka pubsub component.
- 🧪 Tests: No automated tests run; verified configuration against Dapr official documentation.
- 📁 Files: Modified cloud and local Dapr components, and updated research documentation.
- 🔁 Next prompts: Verify deployment in the cluster.
- 🧠 Reflection: The research document contained incorrect configuration details which were propagated to the YAML files. Always verify third-party component schemas against official docs.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): null
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): null
