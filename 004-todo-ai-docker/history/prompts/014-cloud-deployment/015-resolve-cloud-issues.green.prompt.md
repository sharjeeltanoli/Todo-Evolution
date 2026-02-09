# Prompt History Record (PHR) - Resolve Cloud Deployment Issues

- ID: 015
- TITLE: Resolve DOKS CrashLoopBackOff and Registry Issues
- STAGE: green
- DATE_ISO: 2026-02-09
- SURFACE: agent
- MODEL: gemini-2.0-flash
- FEATURE: 014-cloud-deployment
- BRANCH: 014-cloud-deployment
- USER: Sharing
- COMMAND: Resolve CrashLoopBackOff in DigitalOcean Kubernetes
- LABELS: ["kubernetes", "dapr", "digitalocean", "kafka", "fix"]
- LINKS: 
  - SPEC: specs/014-cloud-deployment/spec.md
  - PLAN: specs/014-cloud-deployment/plan.md
- FILES_YAML: 
  - k8s/cloud/backend-deployment.yaml
  - k8s/cloud/frontend-deployment.yaml
  - k8s/cloud/notification-deployment.yaml
  - k8s/cloud/recurring-task-deployment.yaml
  - dapr-components/cloud/pubsub-kafka-cloud.yaml
- TESTS_YAML: 
  - kubectl get pods
  - kubectl describe pod
  - kubectl logs
- PROMPT_TEXT: |
    I am deploying to a DigitalOcean Kubernetes cluster, but my todo-backend pods are failing with CrashLoopBackOff and a status of 1/2 READY.
    +1
    
    Your Task:
    
    Analyze Logs & State: Use kubectl describe pod and kubectl logs (specifically for the daprd container) to identify why the Dapr sidecar is failing with Exit Code 1.
    
    Review Specifications: Read the project specs in /specs/ (especially architecture.md, rest-endpoints.md, and schema.md) to verify if the implementation matches the defined architecture.
    +2
    
    Verify File Structure: Ensure you are looking at the correct deployment files in k8s/cloud/ as shown in my file explorer.
    
    Identify & Fix Root Cause:
    
    Resource Exhaustion: My node is a small $10 droplet. Change the deployment strategy to type: Recreate and reduce replicas to 1 across all services to save RAM.
    
    Health Probes: Increase initialDelaySeconds to 60s in backend-deployment.yaml to allow both the FastAPI app (port 8000) and Dapr (port 3501) to initialize.
    
    Secret Verification: Ensure DATABASE_URL and BETTER_AUTH_SECRET are correctly injected from todo-secrets.
    +1
    
    Constraint: Do not write manual code. You must update the YAML files in k8s/cloud/ based on the provided specifications. Ensure that dapr.io/app-port is correctly set to 8000 as per the backend spec.
    +1
    
    Expected Output: Provide the corrected YAML for backend-deployment.yaml and any other affected files, then verify the fix by checking the pod status again.
- RESPONSE_TEXT: |
    I fixed the registry names, added imagePullSecrets, updated deployment strategies to Recreate, reduced replicas to 1, and increased probe delays. I also identified the actual Redpanda Cloud URL from cluster secrets and updated the Dapr component.
- OUTCOME: The todo-frontend is now READY (1/1). Other services are pulling images but failing on Kafka auth/timeout due to placeholder passwords in secrets.
