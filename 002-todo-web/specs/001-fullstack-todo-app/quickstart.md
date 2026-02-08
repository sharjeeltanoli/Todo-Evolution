# Quickstart: Full-stack Todo Application

This guide provides the basic steps to set up and run the full-stack todo application locally.

## Prerequisites

-   Node.js and npm/yarn/pnpm
-   Python 3.13+ and `uv` for package management
-   Access to a Neon Serverless PostgreSQL database
-   A Better Auth account and secret key

## Backend Setup

1.  **Navigate to the backend directory:**
    ```bash
    cd backend
    ```

2.  **Create a virtual environment and install dependencies:**
    ```bash
    uv venv
    uv pip install -r requirements.txt
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the `backend` directory with the following variables:
    ```
    DATABASE_URL=postgresql://...
    BETTER_AUTH_SECRET=xxx
    ALLOWED_ORIGINS=http://localhost:3000
    ```

4.  **Run the backend server:**
    ```bash
    uvicorn main:app --reload
    ```
    The API will be available at `http://localhost:8000`.

## Frontend Setup

1.  **Navigate to the frontend directory:**
    ```bash
    cd frontend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env.local` file in the `frontend` directory with the following variables:
    ```
    NEXT_PUBLIC_API_URL=http://localhost:8000
    BETTER_AUTH_SECRET=xxx
    ```

4.  **Run the frontend development server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:3000`.
