# Quickstart: Building Container Images

**Feature**: Dockerize Todo Application

This guide provides instructions on how to build the container images for all application services using the automated script.

## Prerequisites

- Docker Desktop must be installed and running.
- You must be in the root directory of the project.
- The build script must be executable: `chmod +x scripts/docker-build.sh`.

## Building the Images

To build all container images (frontend and backend) with the `latest` tag, run the following command:

```bash
./scripts/docker-build.sh
```

### Building with a Version Tag

To build and tag the images with a specific version (e.g., `v1.0.0`), pass the version as an argument to the script:

```bash
./scripts/docker-build.sh v1.0.0
```

## Verifying the Build

After the script completes successfully, you can verify that the images have been created by listing the local Docker images:

```bash
docker images | grep "todo-"
```

You should see output similar to this (with your specified tag):

```
todo-frontend   v1.0.0    ...
todo-backend    v1.0.0    ...
```
