# 📝 Full-stack Todo Web Application

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
![Python](https://img.shields.io/badge/Python-3.13%2B-blue)
![Next.js](https://img.shields.io/badge/Next.js-16%2B-black)
![FastAPI](https://img.shields.io/badge/FastAPI-0.109%2B-009688)
[![Vercel](https://img.shields.io/badge/Vercel-Live%20Demo-000000?logo=vercel)](https://todo-evolution-sigma.vercel.app/)

<!-- Placeholder for Project Logo -->
<div align="center">
  <img src="https://img.icons8.com/fluency/240/todo-list.png" alt="Project Logo" width="160" height="160">
  <br>
  <br>
</div>

A secure, multi-user task management application built with a modern full-stack architecture, featuring strict user isolation, persistent storage, and an intelligent AI assistant.

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [AI Capabilities](#-ai-capabilities)
- [Usage](#-usage)
- [Environment Variables](#-environment-variables)
- [Contributing](#-contributing)
- [License](#-license)

## ✨ Features

- **🔐 Secure Authentication**: Robust user signup, sign-in, and logout functionality.
- **🛡️ Data Isolation**: Strict privacy ensures users only access and manage their own data.
- **✅ Task Management**: Complete CRUD (Create, Read, Update, Delete) operations for personal tasks.
- **🤖 AI-Powered Chatbot**: Manage tasks using natural language via an intelligent assistant.
- **📱 Responsive Design**: A modern, mobile-friendly interface built with Next.js 16 and Tailwind CSS 4.
- **🔌 RESTful API**: A stateless backend API built with FastAPI and SQLModel.
- **🚀 Live Demo**: [todo-evolution-sigma.vercel.app](https://todo-evolution-sigma.vercel.app/)

## 🛠 Tech Stack

**Frontend:**
- **Next.js 16** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS 4**
- **Lucide React** (Icons)

**Backend:**
- **Python 3.13+**
- **FastAPI**
- **SQLModel**
- **SQLite** (Local) / **PostgreSQL** (Production)
- **OpenRouter AI** (LLM Gateway)

## 🤖 AI Capabilities

The integrated AI assistant allows you to manage your tasks naturally:
- **Natural Language Creation**: "Add a task to buy milk tomorrow morning."
- **Context-Aware Referencing**: The bot understands which task you mean.
- **Positional Commands**: "Delete the first task", "Mark the 3rd item as complete", "Update the last one".
- **Real-time Synchronization**: Changes made via chat reflect instantly on your task list.

## ⚙️ Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher)
- [Python](https://www.python.org/) (v3.13 or higher)
- [uv](https://github.com/astral-sh/uv) (Fast Python package installer)

## 🚀 Installation

### Backend Setup

1.  Navigate to the backend directory:
    ```bash
    cd backend
    ```

2.  Create a virtual environment and install dependencies:
    ```bash
    uv venv
    uv pip install -r requirements.txt
    ```

3.  Configure environment variables in `backend/.env` (see [Environment Variables](#-environment-variables)).

4.  Start the backend server:
    ```bash
    uvicorn main:app --reload
    ```
    The API will be available at `http://localhost:8000`.

### Frontend Setup

1.  Navigate to the frontend directory:
    ```bash
    cd frontend
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Configure environment variables in `frontend/.env.local` (see [Environment Variables](#-environment-variables)).

4.  Start the development server:
    ```bash
    npm run dev
    ```
    The application will be accessible at `http://localhost:3000`.

## 🎮 Usage

1.  Ensure both the backend (`http://localhost:8000`) and frontend (`http://localhost:3000`) servers are running.
2.  Open your browser and visit `http://localhost:3000`.
3.  Sign up for a new account or log in if you already have one.
4.  Start creating and managing your tasks manually or via the Chatbot!

## 🔑 Environment Variables

**Backend (`backend/.env`)**
```ini
# Database Connection (SQLite example)
DATABASE_URL=sqlite:///./todo.db

# OpenRouter / OpenAI Config
OPENAI_API_KEY=your_api_key_here

# Security
SECRET_KEY=your_jwt_secret_key
```

**Frontend (`frontend/.env.local`)**
```ini
# Backend API URL
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/amazing-feature`).
3.  Commit your changes (`git commit -m 'Add some amazing feature'`).
4.  Push to the branch (`git push origin feature/amazing-feature`).
5.  Open a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
