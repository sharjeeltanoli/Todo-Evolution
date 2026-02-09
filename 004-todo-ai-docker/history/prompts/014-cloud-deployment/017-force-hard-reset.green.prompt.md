# Prompt History Record (PHR) - Force Hard Reset

- ID: 017
- TITLE: Force Hard Reset of todo-backend Rollout
- STAGE: green
- DATE_ISO: 2026-02-09
- SURFACE: agent
- MODEL: gemini-2.0-flash
- FEATURE: 014-cloud-deployment
- BRANCH: 014-cloud-deployment
- USER: Sharing
- COMMAND: Force stop and reset todo-backend deployment
- LABELS: ["kubernetes", "rollout", "reset", "fix"]
- LINKS: 
  - SPEC: specs/014-cloud-deployment/spec.md
- FILES_YAML: 
  - k8s/cloud/backend-deployment.yaml
- TESTS_YAML: 
  - kubectl get pods
  - kubectl get events
- PROMPT_TEXT: |
    Context: The deployment todo-backend is stuck in a rollout loop for 15 minutes. It keeps trying to scale to 2 replicas despite being on a small node. I need an immediate "Hard Reset".
    Tasks for CLI:
    Force Stop Rollout: Execute kubectl rollout undo deployment/todo-backend to stop the current hung process.
    Hard Delete: Execute kubectl delete deployment todo-backend and kubectl delete pod -l app=todo-backend. (Don't worry, the YAML will recreate it).
    Verify YAML Replicas: Check k8s/cloud/backend-deployment.yaml again. Ensure it says replicas: 1 and strategy: type: Recreate. If it still says RollingUpdate or replicas: 2, change it immediately.
    Apply Fresh: Execute kubectl apply -f k8s/cloud/backend-deployment.yaml.
    Check Events: Execute kubectl get events --sort-by=.metadata.creationTimestamp to see if there is an Insufficient memory or FailedScheduling error.
    Goal: Break the rollout status hang and get exactly ONE pod running with the new initialDelaySeconds: 60 setting.
- RESPONSE_TEXT: |
    Undid the rollout, deleted the deployment and pods, verified the YAML was correctly set to 1 replica and Recreate strategy, and then applied it fresh. The deployment is no longer hung in a loop and is running exactly one pod.
- OUTCOME: Rollout hang broken. todo-backend is now at 1 replica with Recreate strategy. Pod is running (but daprd still failing on Kafka connectivity).
