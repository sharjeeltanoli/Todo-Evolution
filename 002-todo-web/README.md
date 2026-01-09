# 📝 Full-stack Todo Web Application

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
![Python](https://img.shields.io/badge/Python-3.13%2B-blue)
![Next.js](https://img.shields.io/badge/Next.js-15%2B-black)
![FastAPI](https://img.shields.io/badge/FastAPI-0.109%2B-009688)
[![Vercel](https://img.shields.io/badge/Vercel-Live%20Demo-000000?logo=vercel)](https://todo-web-app-ochre.vercel.app/)

<!-- Placeholder for Project Logo -->
<div align="center">
  <img src="path/to/logo.png" alt="Project Logo" width="200" height="200">
  <br>
  <br>
</div>

A secure, multi-user task management application built with a modern full-stack architecture, featuring strict user isolation, persistent storage, and a responsive interface.

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Usage](#-usage)
- [Environment Variables](#-environment-variables)
- [Contributing](#-contributing)
- [License](#-license)

## ✨ Features

- **🔐 Secure Authentication**: Robust user signup, sign-in, and logout functionality powered by Better Auth.
- **🛡️ Data Isolation**: Strict privacy ensures users only access and manage their own data.
- **✅ Task Management**: Complete CRUD (Create, Read, Update, Delete) operations for personal tasks.
- **📱 Responsive Design**: A modern, mobile-friendly interface built with Next.js and Tailwind CSS.
- **🔌 RESTful API**: A stateless backend API built with FastAPI and SQLModel.
- **🚀 Live Demo**: [todo-web-app-ochre.vercel.app](https://todo-web-app-ochre.vercel.app/)

<!-- Placeholder for Screenshots -->
### Screenshots

![Dashboard Screenshot](path/to/screenshot1.png)
*User Dashboard*

## 🛠 Tech Stack

**Frontend:**
- Next.js 15+ (App Router)
- TypeScript
- Tailwind CSS
- Better Auth

**Backend:**
- Python 3.13+
- FastAPI
- SQLModel
- Neon Serverless PostgreSQL

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

3.  Configure environment variables (see [Environment Variables](#-environment-variables)).

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

3.  Configure environment variables (see [Environment Variables](#-environment-variables)).

4.  Start the development server:
    ```bash
    npm run dev
    ```
    The application will be accessible at `http://localhost:3000`.

## ☁️ Vercel Deployment & Auth Setup

To deploy this project on Vercel and ensure authentication works with Neon DB, follow these steps:

1.  **Database (Neon)**:
    -   Create a project on [Neon](https://neon.tech).
    -   Get the connection string from the Dashboard. It should look like `postgresql://user:password@ep-xyz.region.aws.neon.tech/neondb?sslmode=require`.

2.  **Environment Variables (Vercel)**:
    -   Go to your Vercel Project Settings > Environment Variables.
    -   Add the following secrets:

    | Variable | Description | Example Value |
    |:---|:---|:---|
    | `DATABASE_URL` | Neon DB Connection String | `postgresql://user:password@host/db?sslmode=require` |
    | `BETTER_AUTH_SECRET` | Secret key for JWT signing | `openssl rand -hex 32` |
    | `ALLOWED_ORIGINS` | Comma-separated allowed origins | `https://your-app.vercel.app` |
    | `NEXT_PUBLIC_BACKEND_URL` | URL of your backend API | `https://your-backend.vercel.app` |

3.  **Deploy**:
    -   Push your code to GitHub.
    -   Import the project into Vercel.
    -   Vercel will automatically detect the Next.js frontend.
    -   Ensure your backend (FastAPI) is also deployed (e.g., as Vercel Serverless Functions in `api/` or on a separate service like Render/Railway) and reachable via `NEXT_PUBLIC_BACKEND_URL`.

## 🎮 Usage

1.  Ensure both the backend (`http://localhost:8000`) and frontend (`http://localhost:3000`) servers are running.
2.  Open your browser and visit `http://localhost:3000`.
3.  Sign up for a new account or log in if you already have one.
4.  Start creating and managing your tasks!

## 🔑 Environment Variables

Create `.env` files in the respective directories with the following keys:

**Backend (`backend/.env`)**
```ini
# Database Connection (Neon) - Must include sslmode=require
DATABASE_URL=postgresql://user:password@host/dbname?sslmode=require

# Security - 32+ character random string
BETTER_AUTH_SECRET=your_super_secret_key

# CORS - Comma-separated list of allowed origins
ALLOWED_ORIGINS=http://localhost:3000,https://todo-web-app-ochre.vercel.app
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
