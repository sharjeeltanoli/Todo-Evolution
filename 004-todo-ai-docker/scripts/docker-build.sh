#!/bin/bash
set -e

VERSION=${1:-latest}

echo "Building todo-backend image with tag: $VERSION"
docker build -t todo-backend:$VERSION -f backend/Dockerfile backend

echo "Building todo-frontend image with tag: $VERSION"
docker build -t todo-frontend:$VERSION -f frontend/Dockerfile frontend

echo "Docker images built successfully with tag: $VERSION"
