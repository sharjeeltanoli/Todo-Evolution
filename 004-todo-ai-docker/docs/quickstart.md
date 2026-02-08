# Quickstart Guide

This guide provides the steps to get the Todo application up and running on your local machine using Minikube.

## Prerequisites

- Docker
- Minikube
- Helm
- kubectl

## Setup

1.  **Clone the repository.**
2.  **Start Minikube:** `minikube start --cpus=4 --memory=8192`
3.  **Build Docker images:** `docker build -t todo-frontend:latest frontend/` and `docker build -t todo-backend:latest backend/`
4.  **Load images into Minikube:** `minikube image load todo-frontend:latest` and `minikube image load todo-backend:latest`
5.  **Create a namespace:** `kubectl create namespace todo-app`
6.  **Create secrets:** `kubectl create secret generic todo-secrets --from-env-file=.env -n todo-app`
7.  **Install the Helm chart:** `helm install todo-app ./helm/todo-app -f values-dev.yaml -n todo-app`
8.  **Access the application:** `minikube tunnel` and navigate to the provided URL.
