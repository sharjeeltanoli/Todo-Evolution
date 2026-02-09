# Todo AI - Spec-Driven Task Management App

A full-stack AI-powered task management application built with Next.js and FastAPI, deployed on DigitalOcean Kubernetes (DOKS).

## Architecture

```
Frontend (Next.js 16)  -->  Backend (FastAPI/Python)  -->  PostgreSQL (Neon)
         |                         |
         |-- /_api proxy --------->|
         |                         |-- OpenRouter (GPT-4o-mini) for AI chat
         |                         |-- Dapr (optional, for pub/sub events)
```

### Services

| Service | Port | Description |
|---------|------|-------------|
| **todo-frontend** | 3000 | Next.js 16 app with Tailwind CSS |
| **todo-backend** | 8000 | FastAPI REST API + AI chatbot |
| **notification-service** | 8001 | Event-driven notifications (requires Dapr) |
| **recurring-task-service** | 8002 | Recurring task scheduling (requires Dapr) |

## Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript, Tailwind CSS
- **Backend**: Python 3.13, FastAPI, SQLModel/SQLAlchemy, Uvicorn
- **Database**: PostgreSQL (Neon serverless)
- **AI**: OpenRouter API (GPT-4o-mini) with tool-calling for task management
- **Auth**: Custom JWT authentication
- **Infrastructure**: Docker, Kubernetes (DigitalOcean DOKS), GitHub Actions CI/CD
- **Event Bus**: Dapr + Redpanda/Kafka (optional)

## Features

- Task CRUD with priorities, due dates, tags, and search/filter
- AI chatbot that can create, list, update, and delete tasks via natural language
- Recurring task support
- Real-time sync (via Dapr pub/sub when enabled)
- JWT-based authentication (signup/login)

## Local Development

### Prerequisites

- Docker & Docker Compose
- Node.js 22+ (for frontend development)
- Python 3.13+ (for backend development)

### Quick Start with Docker Compose

```bash
docker compose up --build
```

- Frontend: http://localhost:3000
- Backend: http://localhost:8000

### Environment Variables

**Backend** (`backend/.env`):
```
DATABASE_URL=postgresql://...
BETTER_AUTH_SECRET=your-secret-key
OPENAI_API_KEY=your-openrouter-key
DAPR_ENABLED=true|false
```

**Frontend** (build-time):
```
NEXT_PUBLIC_API_URL=http://localhost:8000   # local dev
NEXT_PUBLIC_API_URL=/_api                   # production (uses Next.js rewrites)
```

## Kubernetes Deployment

The app deploys to DigitalOcean Kubernetes via GitHub Actions on push to `main`.

### Deployment Architecture

- Frontend exposed via LoadBalancer (external IP)
- Backend is ClusterIP (internal only) — frontend proxies API calls via Next.js rewrites (`/_api/*` -> `http://todo-backend/*`)
- Secrets managed via Kubernetes Secrets (`todo-secrets`, `kafka-secrets`)
- Rolling update strategy with zero-downtime deploys

### Manual Deployment

```bash
# Apply secrets
kubectl apply -f k8s/cloud/kafka-secrets.yaml
kubectl apply -f k8s/cloud/todo-secrets.yaml

# Deploy all services
kubectl apply -f k8s/cloud/

# Verify
kubectl get pods
kubectl rollout status deployment/todo-backend
```

## Project Structure

```
004-todo-ai-docker/
├── backend/
│   ├── main.py              # FastAPI app entry point
│   ├── db.py                # Database engine & session
│   ├── models.py            # SQLModel data models
│   ├── Dockerfile
│   ├── routes/              # API route handlers
│   │   ├── tasks.py         # Task CRUD + reminders
│   │   ├── auth.py          # JWT signup/login
│   │   ├── chat.py          # AI chatbot endpoint
│   │   ├── tags.py          # Tag management
│   │   └── sync.py          # Real-time sync
│   └── services/            # Business logic
│       ├── event_publisher.py
│       ├── reminders.py
│       ├── chat.py          # OpenRouter AI orchestrator
│       └── tasks.py         # Recurrence handling
├── frontend/
│   ├── app/                 # Next.js App Router pages
│   ├── components/          # React components
│   ├── lib/                 # Auth, API client, constants
│   ├── next.config.ts       # Rewrites for API proxy
│   └── Dockerfile
├── notification-service/    # Dapr event consumer
├── recurring-task-service/  # Scheduled task processor
├── k8s/
│   └── cloud/               # Production K8s manifests
├── dapr-components/
│   └── cloud/               # Dapr pub/sub config
├── docker-compose.yml
└── .github/workflows/
    └── deploy.yml           # CI/CD pipeline
```
