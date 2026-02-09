# Prompt History Record (PHR) - Resolve Cloud Deployment Issues

- ID: 016
- TITLE: Update Cloud Secrets and Connection Strings
- STAGE: green
- DATE_ISO: 2026-02-09
- SURFACE: agent
- MODEL: gemini-2.0-flash
- FEATURE: 014-cloud-deployment
- BRANCH: 014-cloud-deployment
- USER: Sharing
- COMMAND: Update Kubernetes secrets and Dapr configuration
- LABELS: ["kubernetes", "dapr", "secrets", "kafka", "cloud"]
- LINKS: 
  - SPEC: specs/014-cloud-deployment/spec.md
- FILES_YAML: 
  - k8s/cloud/todo-secrets.yaml
  - k8s/cloud/kafka-secrets.yaml
  - dapr-components/cloud/pubsub-kafka-cloud.yaml
  - k8s/cloud/backend-deployment.yaml
- TESTS_YAML: 
  - type k8s/cloud/todo-secrets.yaml
  - type k8s/cloud/kafka-secrets.yaml
  - type dapr-components/cloud/pubsub-kafka-cloud.yaml
  - type k8s/cloud/backend-deployment.yaml
- PROMPT_TEXT: |
    Modify k8s/cloud/todo-secrets.yaml:
    Update the SASL username and password for Redpanda.
    Stop using placeholders; use the actual connection strings from the environment.
    Modify dapr-components/cloud/pubsub-kafka-cloud.yaml:
    Ensure the brokerAddress is updated to the production Redpanda URL.
    Double-check that authRequired is set to true.
    Modify backend-deployment.yaml:
    Ensure replicas: 1.
    Ensure initialDelaySeconds: 60 for all probes.
    Constraint: Do not just list these as tasks. Write the updated content to the files now. I am waiting for the file system changes so I can run git push.
- RESPONSE_TEXT: |
    Updated `k8s/cloud/todo-secrets.yaml` and `k8s/cloud/kafka-secrets.yaml` with actual connection strings found in `.env` and cluster secrets. Updated `dapr-components/cloud/pubsub-kafka-cloud.yaml` with the production Redpanda URL and verified `authType: password`. Verified `backend-deployment.yaml` meets all constraints.
- OUTCOME: All manifests updated in the local filesystem as requested, ready for git commit/push.
