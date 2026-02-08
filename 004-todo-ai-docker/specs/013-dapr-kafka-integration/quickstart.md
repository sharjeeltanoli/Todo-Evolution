# Quickstart: Phase V Part B - Dapr and Kafka Integration

## Prerequisites
- Minikube running
- Dapr CLI installed
- Helm installed

## Setup Infrastructure

1. **Initialize Dapr on Minikube**:
   ```bash
   dapr init -k
   ```

2. **Deploy Redpanda (Kafka)**:
   ```bash
   helm repo add redpanda https://charts.redpanda.com
   helm install redpanda redpanda/redpanda --namespace redpanda --create-namespace --set statefulset.replicas=1
   ```

3. **Deploy Dapr Components**:
   ```bash
   kubectl apply -f dapr-components/pubsub-kafka.yaml
   ```

## Local Development

1. **Start Backend with Dapr**:
   ```bash
   dapr run --app-id backend-service --app-port 8000 -- uv run main.py
   ```

2. **Start Notification Service**:
   ```bash
   cd notification-service
   dapr run --app-id notification-service --app-port 8001 -- uv run main.py
   ```

3. **Start Recurring Task Service**:
   ```bash
   cd recurring-task-service
   dapr run --app-id recurring-task-service --app-port 8002 -- uv run main.py
   ```

## Verification

1. **Check Dapr Sidecars**:
   ```bash
   dapr list -k
   ```

2. **Test Pub/Sub**:
   ```bash
   dapr publish --publish-app-id backend-service --pubsub kafka-pubsub --topic task-events --data '{"test": true}'
   ```
