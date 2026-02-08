# Quickstart: Phase V Part C - Cloud Deployment

This guide outlines the steps to deploy the Todo application to DigitalOcean Kubernetes (DOKS).

## 1. Cloud Infrastructure Setup

### DigitalOcean (DOKS)
1. Sign up for DigitalOcean and claim the $200 credit.
2. Create a Kubernetes cluster:
   - **Name**: `todo-app-cluster`
   - **Region**: NYC3 (or closest)
   - **Node Pool**: 3 Nodes of `s-2vcpu-2gb` (Basic).
3. Install `doctl` locally and authenticate: `doctl auth init`.
4. Connect to your cluster: `doctl kubernetes cluster kubeconfig save todo-app-cluster`.

### Redpanda Cloud
1. Create a free Serverless cluster at [Redpanda Cloud](https://redpanda.com/cloud).
2. Create topics: `task-events`, `reminders`.
3. Note the Bootstrap URL and SASL credentials.

## 2. Secrets Management
Apply secrets to the cluster:

```bash
# Kafka Secrets
kubectl create secret generic kafka-secrets 
  --from-literal=username='your-redpanda-user' 
  --from-literal=password='your-redpanda-password'

# Application Secrets
kubectl create secret generic todo-secrets 
  --from-literal=DATABASE_URL='postgres://...' 
  --from-literal=BETTER_AUTH_SECRET='your-secret' 
  --from-literal=OPENAI_API_KEY='your-key'
```

## 3. GitHub Actions Setup
1. In your GitHub repository, add the following Secrets:
   - `DIGITALOCEAN_TOKEN`: Your Personal Access Token.
   - `DO_REGISTRY_NAME`: The name of your DO Container Registry.
   - `DO_CLUSTER_NAME`: `todo-app-cluster`.

## 4. Deployment
Push code to the `main` branch. The GitHub Action will:
1. Build and push Docker images.
2. Apply Dapr components (`k8s/cloud-dapr/`).
3. Apply Kubernetes deployments (`k8s/`).
4. Wait for the LoadBalancer IP.

## 5. Verification
```bash
# Get the Public IP
kubectl get svc todo-frontend

# Check pod health
kubectl get pods
```
Navigate to the LoadBalancer IP in your browser (HTTP).
