#!/usr/bin/env bash

# Health check script for Todo App Cloud Deployment

set -e

echo "--- Checking DOKS Node Status ---"
kubectl get nodes

echo "--- Checking Pod Status ---"
kubectl get pods -o wide

echo "--- Checking Dapr Sidecar Health ---"
# Check if dapr sidecars are running in application pods
kubectl get pods -l dapr.io/enabled=true -o jsonpath='{range .items[*]}{.metadata.name}{"	"}{.spec.containers[*].name}{"
"}{end}' | grep daprd

echo "--- Checking Redpanda Connectivity (via Dapr) ---"
# This checks if the pubsub component is successfully initialized
kubectl get components pubsub

echo "--- Checking Service LoadBalancer ---"
kubectl get svc todo-frontend

echo "--- Deployment Health Summary ---"
kubectl get deployments
