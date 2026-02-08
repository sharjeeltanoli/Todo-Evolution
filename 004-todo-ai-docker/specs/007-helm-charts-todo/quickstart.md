# Quickstart for Helm Charts Feature

## Prerequisites

- Kubernetes Cluster (e.g., Minikube, Docker Desktop)
- Helm 3.x installed
- kubectl installed

## Deployment

1. **Start Minikube** (if using Minikube):
   ```bash
   minikube start
   ```

2. **Install the Chart**:
   ```bash
   # From the project root
   helm install todo-app ./helm/todo-app
   ```

3. **Verify Deployment**:
   ```bash
   kubectl get pods
   kubectl get svc
   ```

## Configuration

- **Development**:
  ```bash
  helm install todo-app ./helm/todo-app -f helm/todo-app/values-dev.yaml
  ```

- **Production**:
  ```bash
  helm install todo-app ./helm/todo-app -f helm/todo-app/values-prod.yaml
  ```

## Accessing the Application

- **Port Forwarding**:
  ```bash
  kubectl port-forward svc/todo-app-frontend 3000:3000
  ```
  Access at http://localhost:3000

- **Ingress** (if enabled):
  Enable ingress in `values.yaml` (set `ingress.enabled: true`) and configure hosts.