# Troubleshooting Guide

This guide provides steps to diagnose and resolve common issues encountered while developing or deploying the Todo application in a Kubernetes (Minikube) environment.

## 1. General Kubernetes Troubleshooting Commands

Before diving into specific issues, these commands are your first line of defense:

*   **Check Pods Status:**
    ```bash
    kubectl get pods -n todo-app
    ```
    Look for pods that are not in a `Running` state or have `Restarts` count increasing.

*   **Describe a Pod (for details on why it's failing):**
    ```bash
    kubectl describe pod <pod-name> -n todo-app
    ```
    Pay attention to `Events` at the bottom for errors like `ImagePullBackOff`, `CrashLoopBackOff`, `FailedScheduling`.

*   **View Pod Logs:**
    ```bash
    kubectl logs <pod-name> -n todo-app
    # Follow logs in real-time
    kubectl logs -f <pod-name> -n todo-app
    ```
    Application-specific errors will usually appear here.

*   **Check Service Status:**
    ```bash
    kubectl get services -n todo-app
    ```
    Verify that services are correctly exposing pods.

*   **Check Events Across Namespace:**
    ```bash
    kubectl get events -n todo-app
    ```
    Provides a chronological view of activities and warnings in the namespace.

## 2. Common Scenarios and Solutions

### 2.1 Pod in `ImagePullBackOff` State

**Cause**: Kubernetes cannot pull the Docker image for a pod.

**Possible Reasons**:
*   Incorrect image name or tag.
*   Private registry authentication failure.
*   Image not available in the registry (or not loaded into Minikube if local).

**Diagnosis**:
*   Run `kubectl describe pod <pod-name> -n todo-app` and check `Events` for `Failed to pull image` errors.
*   Manually try to pull the image: `docker pull <image-name>:<tag>` (if using Docker Desktop) or `minikube cache add <image-name>:<tag>` (if Minikube image cache is broken).

**Solution**:
*   **Correct Image Name/Tag**: Verify `Deployment` manifest or Helm `values.yaml` for correct image names and tags.
*   **Minikube Local Images**: If using Minikube and local images, ensure you've loaded them:
    ```bash
    minikube image load todo-frontend:latest
    minikube image load todo-backend:latest
    ```
*   **Registry Credentials**: For private registries, ensure `ImagePullSecrets` are correctly configured in your `Deployment`.

### 2.2 Pod in `CrashLoopBackOff` State

**Cause**: A pod starts, crashes, and Kubernetes restarts it repeatedly.

**Possible Reasons**:
*   Application error on startup (e.g., failed database connection, invalid environment variables, port conflict).
*   Insufficient memory or CPU resources.
*   Incorrect command/entrypoint in `Dockerfile` or Kubernetes manifest.

**Diagnosis**:
*   Run `kubectl logs <pod-name> -n todo-app` immediately after the pod starts (or just `kubectl logs --previous <pod-name> -n todo-app` for logs of the previous crashed container) to see application startup errors.
*   Run `kubectl describe pod <pod-name> -n todo-app` and check `Events` for `OOMKilled` (Out Of Memory Killed) or other relevant messages.

**Solution**:
*   **Check Application Logs**: The most common solution is to fix the error in the application code or configuration.
*   **Environment Variables**: Double-check `ConfigMaps` and `Secrets` to ensure all necessary environment variables are correctly injected and valid.
*   **Resource Limits**: Increase `resources.limits.memory` and `resources.limits.cpu` in your `Deployment` manifest or Helm `values.yaml` if `OOMKilled` is present.
*   **Command/Entrypoint**: Verify the `command` and `args` in your container specification are correct.

### 2.3 Service Unreachable or "Connection Refused"

**Cause**: Cannot access the application or a specific service.

**Possible Reasons**:
*   Service not running or not exposed correctly.
*   Incorrect port forwarding or `minikube tunnel` not active.
*   Ingress rules misconfigured.
*   NetworkPolicy blocking traffic.

**Diagnosis**:
*   **Check Pods**: Ensure all relevant pods are `Running` using `kubectl get pods -n todo-app`.
*   **Check Service**: Verify service is running and has endpoints: `kubectl get service <service-name> -n todo-app` and `kubectl get endpoints <service-name> -n todo-app`.
*   **Check Ingress**: If using Ingress, check its status: `kubectl get ingress -n todo-app`.
*   **Minikube Tunnel**: If accessing via `minikube tunnel`, ensure it's running in a separate terminal.

**Solution**:
*   **Service Selectors**: Ensure `service.selector` in your Service manifest matches the `labels` on your `Deployment` pods.
*   **Port Configuration**: Verify container port, service port, and target port are correctly mapped.
*   **Ingress Rules**: Correct hostnames, paths, and backend service names in your Ingress manifest.
*   **Minikube Tunnel**: Start `minikube tunnel` in a new terminal if not already running.
*   **NetworkPolicy**: Temporarily disable `NetworkPolicy` (if any) to rule it out.

### 2.4 Database Connection Failure

**Cause**: Backend application cannot connect to the PostgreSQL database.

**Possible Reasons**:
*   Incorrect `DATABASE_URL` in backend environment variables.
*   Database not running or not accessible from the cluster.
*   Firewall rules blocking connections to the database.

**Diagnosis**:
*   Check backend pod logs for connection errors: `kubectl logs -f <backend-pod-name> -n todo-app`.
*   Verify the `DATABASE_URL` in the `todo-secrets` Kubernetes Secret:
    ```bash
    kubectl get secret todo-secrets -n todo-app -o jsonpath='{.data.DATABASE_URL}' | base64 --decode
    ```
*   Test connectivity from within a pod (if possible, using `kubectl exec`).

**Solution**:
*   **Verify `DATABASE_URL`**: Ensure the `DATABASE_URL` in your `backend/.env` file (and subsequently your Kubernetes Secret) is correct and points to your Neon PostgreSQL instance.
*   **Network Access**: Ensure your Neon database is configured to allow connections from your Kubernetes cluster's egress IPs (if applicable) or from `0.0.0.0/0` during development for testing.
*   **Database Status**: Check the status of your Neon PostgreSQL instance.

### 2.5 `Pending` Pods

**Cause**: Pods are created but never reach a `Running` state.

**Possible Reasons**:
*   Insufficient cluster resources (CPU, Memory).
*   `PersistentVolumeClaim` (PVC) not bound (if using persistent storage).
*   Node taints or tolerations preventing scheduling.

**Diagnosis**:
*   `kubectl describe pod <pod-name> -n todo-app` and check `Events` for `FailedScheduling`.
*   `kubectl get nodes` to check node resources.
*   `kubectl get pvc -n todo-app` to check PVC status.

**Solution**:
*   **Increase Minikube Resources**: If in Minikube, stop and restart with more resources: `minikube stop && minikube start --cpus=8 --memory=16g`.
*   **Check PVC/PV**: If using in-cluster persistent storage, ensure your PVC is `Bound` to a `PersistentVolume`. Check storage class.
*   **Taints/Tolerations**: Adjust node taints or pod tolerations if necessary.

## 3. Advanced Troubleshooting

For more complex issues, consider using these tools:

*   **`kubectl-ai`**: An AI assistant for `kubectl` commands. Can help diagnose issues and suggest fixes.
    ```bash
    kubectl-ai "why is my frontend pod crashing?"
    ```
*   **`Kagent`**: For cluster health analysis and optimization.
    ```bash
    kagent "analyze cluster health"
    ```
*   **Debugging containers**: Use `kubectl exec -it <pod-name> -n todo-app -- sh` to get a shell inside a running container to inspect files, run commands, etc.
