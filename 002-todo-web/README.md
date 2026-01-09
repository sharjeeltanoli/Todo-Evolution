# 📝 Full-stack Todo Web Application

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
![Python](https://img.shields.io/badge/Python-3.13%2B-blue)
![Next.js](https://img.shields.io/badge/Next.js-15%2B-black)
![FastAPI](https://img.shields.io/badge/FastAPI-0.109%2B-009688)

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

## 🎮 Usage

1.  Ensure both the backend (`http://localhost:8000`) and frontend (`http://localhost:3000`) servers are running.
2.  Open your browser and visit `http://localhost:3000`.
3.  Sign up for a new account or log in if you already have one.
4.  Start creating and managing your tasks!

## 🔑 Environment Variables

Create `.env` files in the respective directories with the following keys:

**Backend (`backend/.env`)**
```ini
DATABASE_URL=postgresql://user:password@host/dbname?sslmode=require
BETTER_AUTH_SECRET=your_super_secret_key
ALLOWED_ORIGINS=http://localhost:3000
```

**Frontend (`frontend/.env.local`)**
```ini
NEXT_PUBLIC_API_URL=http://localhost:8000
BETTER_AUTH_SECRET=your_super_secret_key
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
