# Todo Evolution Project

This repository documents the evolution of a task management application, progressing from a simple command-line interface to a sophisticated, AI-enhanced web application. Each directory represents a distinct stage in this development journey.

## Projects Overview

### 1. 001-todo-cli
**Description:** A lightweight, in-memory command-line interface (CLI) for personal task management.
*   **Tech Stack:** Python.
*   **Key Features:**
    *   Simple text-based interface.
    *   Core CRUD operations: Add, View, Update, Delete tasks.
    *   Task completion toggling.
    *   Modular code structure separating concerns.

### 2. 002-todo-web
**Description:** A secure, modern full-stack web application featuring user authentication and persistent cloud storage.
*   **Tech Stack:** Next.js 15+ (Frontend), FastAPI (Backend), PostgreSQL (Database), Better Auth.
*   **Key Features:**
    *   **Secure Authentication:** Robust user signup and login.
    *   **Data Isolation:** Private data management for individual users.
    *   **Persistent Storage:** Tasks are saved to a Postgres database.
    *   **Responsive UI:** Mobile-friendly design built with Tailwind CSS.
    *   **RESTful API:** Stateless backend architecture.

### 3. 003-todo-app-ai
**Description:** An advanced iteration of the web application that integrates an intelligent AI assistant for natural language task management.
*   **Tech Stack:** Next.js 16 (Frontend), React 19, FastAPI (Backend), SQLModel, OpenRouter AI.
*   **Key Features:**
    *   **AI Chatbot:** Manage tasks using natural language (e.g., "Add a meeting for tomorrow").
    *   **Context Awareness:** The AI understands positional references (e.g., "Delete the last task").
    *   **Real-time Sync:** Chat actions are instantly reflected in the task list.
    *   **Modern Tech:** Built on the latest Next.js 16 and Tailwind CSS 4 standards.

---
**Note:** Please refer to the `README.md` file within each specific project directory for detailed installation instructions, configuration guides, and usage examples.
