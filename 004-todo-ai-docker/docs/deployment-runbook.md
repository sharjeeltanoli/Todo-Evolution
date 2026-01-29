# Deployment Runbook

This document outlines the standard procedures for deploying, upgrading, and rolling back the Todo application on Kubernetes.

## 1. Prerequisites

- Access to the Kubernetes cluster (`kubectl` configured).
- Helm installed and configured.
- Docker images for frontend and backend available in a registry or locally loaded into Minikube.

## 2. Deployment Procedure

### 2.1 Initial Deployment

1.  **Ensure Namespace exists:**
    ```bash
    kubectl create namespace todo-app || true
    ```

2.  **Create Secrets (if not already present):**
    Ensure your `backend/.env` file is configured.
    ```bash
    kubectl create secret generic todo-secrets --from-env-file=backend/.env -n todo-app
    ```
    *Note: If updating secrets, you'll need to delete and recreate the secret, then restart affected pods.*

3.  **Install Helm Chart:**
    ```bash
    helm install todo-app ./helm/todo-app -f values-prod.yaml -n todo-app
    ```
    *Adjust `values-prod.yaml` as needed for your environment.*

4.  **Verify Deployment:**
    ```bash
    kubectl get pods -n todo-app
    kubectl get services -n todo-app
    # Check logs for any issues
    kubectl logs -f <pod-name> -n todo-app
    ```

### 2.2 Upgrading an Existing Deployment

1.  **Update Docker Images:**
    Build and push new Docker images to your container registry (e.g., Docker Hub, GCR).
    ```bash
    docker build -t your-registry/todo-frontend:new-version frontend/
    docker push your-registry/todo-frontend:new-version
    docker build -t your-registry/todo-backend:new-version backend/
    docker push your-registry/todo-backend:new-version
    ```

2.  **Update Helm Chart:**
    Modify `helm/todo-app/values-prod.yaml` (or equivalent) to reference the new image versions.
    ```yaml
    # Example change in values-prod.yaml
    # frontend:
    #   image:
    #     repository: your-registry/todo-frontend
    #     tag: new-version
    # backend:
    #   image:
    #     repository: your-registry/todo-backend
    #     tag: new-version
    ```

3.  **Perform Helm Upgrade:**
    ```bash
    helm upgrade todo-app ./helm/todo-app -f values-prod.yaml -n todo-app
    ```

4.  **Monitor Rollout:**
    ```bash
    kubectl rollout status deployment/todo-frontend -n todo-app
    kubectl rollout status deployment/todo-backend -n todo-app
    ```

5.  **Verify Application Functionality.**

## 3. Rollback Procedure

In case of a failed deployment or critical issues after an upgrade, you can rollback to a previous stable version.

### 3.1 Helm Rollback

1.  **List Helm Revisions:**
    Identify the last known stable revision number.
    ```bash
    helm history todo-app -n todo-app
    ```

2.  **Perform Rollback:**
    ```bash
    helm rollback todo-app <REVISION_NUMBER> -n todo-app
    ```
    Replace `<REVISION_NUMBER>` with the number of the target stable release.

3.  **Verify Rollback:**
    Monitor the pod status and application functionality.

### 3.2 Kubernetes Deployment Rollback (Direct)

*This method is less preferred when using Helm, as Helm manages the deployment state. Use with caution if Helm state is corrupted.*

1.  **Check Deployment History:**
    ```bash
    kubectl rollout history deployment/todo-frontend -n todo-app
    ```

2.  **Undo Last Rollout:**
    ```bash
    kubectl rollout undo deployment/todo-frontend -n todo-app
    kubectl rollout undo deployment/todo-backend -n todo-app
    ```
    To rollback to a specific revision:
    ```bash
    kubectl rollout undo deployment/todo-frontend --to-revision=<REVISION_NUMBER> -n todo-app
    ```

3.  **Verify Rollback:**
    Monitor the pod status and application functionality.

## 4. Troubleshooting During Deployment

-   **ImagePullBackOff**: Check image name, tag, registry access, and Minikube image load if using local images.
-   **CrashLoopBackOff**: Check application logs (`kubectl logs`), resource limits, and health probes.
-   **Pending Pods**: Check node resources, taints/tolerations, and persistent volume claims.
-   **Service Unreachable**: Check service selector, port configuration, and Ingress rules.
