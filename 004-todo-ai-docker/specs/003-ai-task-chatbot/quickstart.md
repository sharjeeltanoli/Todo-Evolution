# Quickstart: AI-Powered Task Chatbot

## Prerequisites

-   Existing Todo App setup (Backend + Frontend).
-   OpenAI API Key (`OPENAI_API_KEY`).
-   Valid `BETTER_AUTH_SECRET`.

## Backend Setup

1.  **Environment Variables**:
    Ensure `.env` includes:
    ```bash
    OPENAI_API_KEY=sk-...
    ```

2.  **Database Migration**:
    Run the updated `init_db.py` to create `Conversation` and `Message` tables.
    ```bash
    cd backend
    python init_db.py
    ```

3.  **Run Server**:
    ```bash
    uvicorn main:app --reload --port 8000
    ```

## Frontend Setup

1.  **Environment Variables**:
    Ensure `.env.local` includes:
    ```bash
    NEXT_PUBLIC_OPENAI_DOMAIN_KEY=...
    ```

2.  **Run Server**:
    ```bash
    cd frontend
    npm run dev
    ```

## Usage

1.  Login to the application.
2.  Navigate to the new Chat tab.
3.  Type: "Add a task to buy groceries tomorrow."
4.  The AI should confirm the task creation.
5.  Type: "What tasks do I have?" to verify.
