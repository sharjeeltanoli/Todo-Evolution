# 📝 Todo AI - Intelligent Task Manager

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
![Python](https://img.shields.io/badge/Python-3.13%2B-blue)
![Next.js](https://img.shields.io/badge/Next.js-16.1-black)
![FastAPI](https://img.shields.io/badge/FastAPI-0.109%2B-009688)
![MCP](https://img.shields.io/badge/MCP-Enabled-orange)

<div align="center">
  <img src="https://img.icons8.com/fluency/240/todo-list.png" alt="Project Logo" width="160" height="160">
  <br>
  <br>
</div>

A production-ready, full-stack task management application featuring a modern React 19 frontend, a high-performance FastAPI backend, and deep AI integration via the Model Context Protocol (MCP). Built for scalability with Docker and Kubernetes support.

## 📋 Table of Contents

- [✨ Features](#-features)
- [🛠 Tech Stack](#-tech-stack)
- [⚙️ Prerequisites](#-prerequisites)
- [🚀 Installation & Setup](#-installation--setup)
  - [Local Development](#local-development)
  - [Docker Compose](#docker-compose)
  - [Kubernetes (Minikube)](#kubernetes-minikube)
  - [Cloud Deployment (DigitalOcean)](#cloud-deployment-digitalocean)
- [🤖 AI & MCP Capabilities](#-ai--mcp-capabilities)
- [🔑 Environment Variables](#-environment-variables)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

## ✨ Features

- **🔐 Secure Authentication**: Custom JWT-based auth with bcrypt hashing (Sign up, Login, Logout).
- **🛡️ Data Isolation**: Private workspaces for each user; you see only your own tasks.
- **✅ Full CRUD**: Comprehensive task management (Create, Read, Update, Delete).
- **🤖 Context-Aware AI Chat**: Integrated chatbot that understands your tasks and can modify them (e.g., "Mark the first task as done").
- **🔌 MCP Server**: Exposes task operations as MCP tools, allowing external AI agents to interact with the database safely.
- **📱 Modern UI**: Built with **Next.js 16** (App Router) and **Tailwind CSS 4** for a responsive, fluid experience.
- **🐳 DevOps Ready**: Fully Dockerized with optimized multi-stage builds and Helm charts for Kubernetes deployment.

## 🛠 Tech Stack

**Frontend:**
- **Framework:** Next.js 16.1.3 (App Router)
- **Library:** React 19.2.3
- **Styling:** Tailwind CSS 4
- **Language:** TypeScript
- **Icons:** Lucide React
- **AI SDK:** Vercel AI SDK

**Backend:**
- **Framework:** FastAPI
- **Database ORM:** SQLModel (SQLAlchemy)
- **Database:** SQLite (Dev) / PostgreSQL (Prod ready)
- **AI/LLM:** OpenAI API / OpenRouter
- **Protocol:** Model Context Protocol (MCP) SDK
- **Package Manager:** uv

**Infrastructure:**
- **Containerization:** Docker & Docker Compose
- **Orchestration:** Kubernetes (Minikube supported)
- **Package Management:** Helm

## ⚙️ Prerequisites

- [Node.js](https://nodejs.org/) (v20+ recommended)
- [Python](https://www.python.org/) (v3.13+)
- [Docker Desktop](https://www.docker.com/products/docker-desktop)
- [uv](https://github.com/astral-sh/uv) (Recommended for Python dependency management)
- [Minikube](https://minikube.sigs.k8s.io/docs/start/) (Optional, for K8s)

## 🚀 Installation & Setup

### Local Development

#### 1. Backend Setup
```bash
cd backend
# Create virtual environment
uv venv
# Activate it (Windows: .venv\Scripts\activate, Unix: source .venv/bin/activate)
# Install dependencies
uv pip install -r requirements.txt

# Run the server
uvicorn main:app --reload
```
API runs at `http://localhost:8000`.

#### 2. Running with Dapr (Recommended for Events/Microservices)
Ensure you have the [Dapr CLI](https://docs.dapr.io/getting-started/install-dapr-cli/) installed.

**Start Backend with Dapr:**
```bash
cd backend
dapr run --app-id todo-backend --app-port 8000 --resources-path ../dapr-components -- python main.py
```

**Start Notification Service:**
```bash
cd notification-service
dapr run --app-id notification-service --app-port 8001 --resources-path ../dapr-components -- python main.py
```

**Start Recurring Task Service:**
```bash
cd recurring-task-service
dapr run --app-id recurring-task-service --app-port 8002 --resources-path ../dapr-components -- python main.py
```

#### 3. Frontend Setup
```bash
cd frontend
# Install dependencies
npm install
# Run the dev server
npm run dev
```
App runs at `http://localhost:3000`.

### Docker Compose

Run the entire stack with a single command:

```bash
docker-compose up --build
```
This starts:
- Backend on port `8000`
- Frontend on port `3000`

### Kubernetes (Minikube)

See [deployment-runbook.md](docs/deployment-runbook.md) or [quickstart.md](docs/quickstart.md) for detailed Kubernetes instructions.

**Quick Summary:**
1. Start Minikube: `minikube start`
2. Build images: `docker build -t todo-backend backend/` & `docker build -t todo-frontend frontend/`
3. Load images: `minikube image load todo-backend todo-frontend`
4. Install Chart: `helm install todo-app ./helm/todo-app -n todo-app --create-namespace`

### Cloud Deployment (DigitalOcean)

The application is configured for automated deployment to **DigitalOcean Kubernetes (DOKS)** using **Redpanda Cloud** and **GitHub Actions**.

**Deployment Flow:**
1. Code pushed to `main` branch.
2. GitHub Actions builds Docker images and pushes to **DigitalOcean Container Registry**.
3. Workflow applies Kubernetes manifests to the DOKS cluster.
4. App is accessible via the LoadBalancer public IP.

**Setup Requirements:**
- Set GitHub Secrets: `DIGITALOCEAN_TOKEN`, `DO_REGISTRY_NAME`, `DO_CLUSTER_NAME`.
- Provision DOKS cluster and Redpanda Cloud Serverless cluster.
- Configure Kubernetes Secrets in the cluster (see `specs/014-cloud-deployment/quickstart.md`).

## 🤖 AI & MCP Capabilities

This project implements the **Model Context Protocol (MCP)**.
- The backend includes an MCP server (`backend/mcp_server`) that exposes tools: `add_task`, `list_tasks`, `complete_task`, `delete_task`, `update_task`.
- The built-in Chat interface uses these tools to perform actions on your behalf based on natural language requests.

**Example Prompts:**
- "Add a task to review the PR by 5 PM"
- "Show me my pending tasks"
- "Complete the task about grocery shopping"

## 🔑 Environment Variables

Create `.env` files in `backend/` and `frontend/` (or use `.env.local`).

**Backend (`backend/.env`)**
```ini
# Database (default is local sqlite)
DATABASE_URL=sqlite:///./todo.db

# Authentication Secret (Critical for JWT)
BETTER_AUTH_SECRET=your_super_secret_key_change_me_in_prod

# AI Configuration
OPENAI_API_KEY=your_openai_or_openrouter_key
```

**Frontend (`frontend/.env.local`)**
```ini
# API Connection
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
# Fallback if above is not set
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## 🤝 Contributing

1. Fork the repo.
2. Create a branch: `git checkout -b feature/cool-feature`
3. Commit changes: `git commit -m "Add cool feature"`
4. Push: `git push origin feature/cool-feature`
5. Open a Pull Request.

## 📄 License

MIT License. See [LICENSE](LICENSE) for details.