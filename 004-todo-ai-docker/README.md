# 📝 Todo AI - Intelligent Task Manager

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
![Python](https://img.shields.io/badge/Python-3.13%2B-blue)
![Next.js](https://img.shields.io/badge/Next.js-16.1-black)
![FastAPI](https://img.shields.io/badge/FastAPI-0.109%2B-009688)
![MCP](https://img.shields.io/badge/MCP-Enabled-orange)

**🚀 Live Production Demo: [http://129.212.137.119](http://129.212.137.119)**

<div align="center">
  <img src="https://img.icons8.com/fluency/240/todo-list.png" alt="Project Logo" width="160" height="160">
  <br>
  <br>
</div>

A production-ready, full-stack task management application featuring a modern React 19 frontend, a high-performance FastAPI backend, and deep AI integration via the Model Context Protocol (MCP). Built for extreme scalability with an event-driven microservices architecture powered by Dapr, deployed on DigitalOcean Kubernetes.

## 📋 Table of Contents

- [✨ Features](#-features)
- [🏗️ Architecture](#%EF%B8%8F-architecture)
- [🛠 Tech Stack](#-tech-stack)
- [⚙️ Prerequisites](#-prerequisites)
- [🚀 Installation & Setup](#-installation--setup)
  - [Local Development](#local-development)
  - [Docker Compose](#docker-compose)
  - [Kubernetes (Minikube)](#kubernetes-minikube)
  - [Cloud Deployment (DOKS)](#cloud-deployment-doks)
- [🤖 AI & MCP Capabilities](#-ai--mcp-capabilities)
- [🔑 Environment Variables](#-environment-variables)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

## ✨ Features

- **🔐 Secure Authentication**: Custom JWT-based auth with bcrypt hashing and user-isolated workspaces.
- **🤖 Context-Aware AI Chat**: Integrated chatbot that understands your tasks and can modify them via MCP tools.
- **🔌 MCP Server**: Native Model Context Protocol support, allowing external AI agents to interact with the system.
- **⚡ Event-Driven Microservices**: Decoupled architecture using **Dapr** for state management and **Kafka (Redpanda)** for pub/sub events.
- **⏰ Smart Reminders**: Automated notification service and recurring task engine.
- **📱 Modern UI**: Built with **Next.js 16** (App Router) and **Tailwind CSS 4** for a premium UX.
- **🐳 Cloud Native**: Fully containerized with multi-stage Docker builds, Helm charts, and automated CI/CD.

## 🏗️ Architecture

The system follows a modern event-driven microservices pattern:
- **Todo API**: The core FastAPI service handling CRUD and AI logic.
- **Notification Service**: Consumes events to process user alerts.
- **Recurring Task Service**: Manages scheduled task creation.
- **Dapr Sidecars**: Standardizes service-to-service communication, state, and pub/sub.
- **Redpanda Cloud**: High-performance Kafka-compatible event streaming.
- **Neon PostgreSQL**: Serverless relational database for persistent storage.

## 🛠 Tech Stack

**Frontend:**
- **Framework:** Next.js 16.1.3 (App Router)
- **Library:** React 19.2.3
- **Styling:** Tailwind CSS 4
- **AI SDK:** Vercel AI SDK

**Backend & Services:**
- **Framework:** FastAPI / Python 3.13+
- **ORM:** SQLModel (SQLAlchemy)
- **Messaging:** Redpanda Cloud (Kafka)
- **Sidecar Runtime:** Dapr 1.14+
- **Protocol:** MCP SDK

**Infrastructure:**
- **Cloud Provider:** DigitalOcean Kubernetes (DOKS)
- **Database:** Neon PostgreSQL (Serverless)
- **Containerization:** Docker & Docker Compose
- **Orchestration:** Helm / Kubernetes
- **CI/CD:** GitHub Actions

## ⚙️ Prerequisites

- [Node.js](https://nodejs.org/) (v20+)
- [Python](https://www.python.org/) (v3.13+)
- [Docker Desktop](https://www.docker.com/products/docker-desktop)
- [Dapr CLI](https://docs.dapr.io/getting-started/install-dapr-cli/)
- [uv](https://github.com/astral-sh/uv) (Recommended)

## 🚀 Installation & Setup

### Local Development

#### 1. Backend & Services Setup
```bash
# Backend
cd backend && uv pip install -r requirements.txt
dapr run --app-id todo-backend --app-port 8000 --resources-path ../dapr-components -- python main.py

# Notification Service
cd notification-service && uv pip install -r requirements.txt
dapr run --app-id notification-service --app-port 8001 --resources-path ../dapr-components -- python main.py

# Recurring Task Service
cd recurring-task-service && uv pip install -r requirements.txt
dapr run --app-id recurring-task-service --app-port 8002 --resources-path ../dapr-components -- python main.py
```

#### 2. Frontend Setup
```bash
cd frontend
npm install && npm run dev
```

### Docker Compose

Run the production-like stack locally (without K8s):
```bash
docker-compose up --build
```

### Kubernetes (Minikube)

```bash
# Start and build
minikube start
eval $(minikube docker-env)
docker build -t todo-backend backend/
docker build -t todo-frontend frontend/

# Deploy via Helm
helm install todo-app ./helm/todo-app -n todo-app --create-namespace
```

### Cloud Deployment (DOKS)

The app is deployed to **DigitalOcean Kubernetes** with a fully automated pipeline.

**Pipeline Flow:**
1. Code push to `main` triggers GitHub Actions.
2. Images are built and pushed to **DigitalOcean Container Registry (DOCR)**.
3. Helm charts are updated and deployed to the **DOKS** cluster.
4. Services connect to **Redpanda Cloud** and **Neon PostgreSQL**.

*See [docs/deployment-runbook.md](docs/deployment-runbook.md) for secrets management and cluster setup.*

## 🤖 AI & MCP Capabilities

This project is an **MCP-Native** application.
- The backend serves as an MCP Host and Server.
- Tools exposed: `add_task`, `list_tasks`, `complete_task`, `delete_task`, `update_task`.
- The frontend chat interface allows for natural language task management.

## 🔑 Environment Variables

Required variables for `.env` files:
- `DATABASE_URL`: Connection string for PostgreSQL or SQLite.
- `BETTER_AUTH_SECRET`: JWT signing key.
- `OPENAI_API_KEY`: API key for AI features.
- `KAFKA_BROKERS`, `KAFKA_PASSWORD`: Redpanda Cloud credentials.

## 🤝 Contributing

We welcome contributions! Please follow the standard fork/PR workflow.

## 📄 License

MIT License. See [LICENSE](LICENSE) for details.