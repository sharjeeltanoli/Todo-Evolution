# Corrected Kubernetes Manifests for Cloud Deployment

## Backend Deployment (k8s/cloud/backend-deployment.yaml)
- Strategy: Recreate
- Replicas: 1
- Probes: initialDelaySeconds: 60
- Annotations: Added sidecar probe delays
- Image: registry.digitalocean.com/todo-app-registry-123/todo-backend:latest
- ImagePullSecrets: todo-app-registry-123

## Frontend Deployment (k8s/cloud/frontend-deployment.yaml)
- Strategy: Recreate
- Replicas: 1
- Probes: initialDelaySeconds: 60
- Image: registry.digitalocean.com/todo-app-registry-123/todo-frontend:latest
- ImagePullSecrets: todo-app-registry-123

## Dapr PubSub Component (dapr-components/cloud/pubsub-kafka-cloud.yaml)
- Brokers: d647u43t489913vp2r0g.any.us-east-1.mpx.prd.cloud.redpanda.com:9092
- saslUsername: user (from kafka-secrets)
