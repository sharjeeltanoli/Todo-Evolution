# Research: Full-stack Todo Application

This document outlines the research and decisions made for the technical implementation of the full-stack todo application.

## Technology Stack Confirmation

The technology stack for this project is determined by the project constitution. No further research into alternative technologies was conducted, as the choices are pre-defined.

-   **Frontend**: Next.js 15+, TypeScript, Tailwind CSS, Better Auth
-   **Backend**: Python 3.13+, FastAPI, SQLModel
-   **Database**: Neon Serverless PostgreSQL
-   **Authentication**: Better Auth with JWT tokens

## Best Practices

-   **FastAPI**: Follow official documentation for structuring the application, including dependency injection for database sessions and Pydantic for data validation.
-   **Next.js**: Utilize the App Router for server components by default, with client components for interactive UI elements.
-   **SQLModel**: Use for defining database models and for ORM queries to prevent manual SQL.
-   **JWT Authentication**: Follow best practices for JWT security, including using a strong secret key, setting appropriate token expiry times, and storing tokens securely on the client-side (e.g., in an HttpOnly cookie).
