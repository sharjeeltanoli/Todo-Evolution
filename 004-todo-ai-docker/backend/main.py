import os
from dotenv import load_dotenv
from pathlib import Path

env_path = Path(__file__).resolve().parent / '.env'
load_dotenv(dotenv_path=env_path)

from fastapi import FastAPI, Depends
from starlette.middleware.cors import CORSMiddleware
from sqlmodel import Session, SQLModel

from db import create_db_and_tables, engine, get_session
from models import Task 
from middleware.auth import get_current_user_id 
from routes import tasks, auth, chat

BETTER_AUTH_SECRET = os.getenv("BETTER_AUTH_SECRET")
if not BETTER_AUTH_SECRET:
    raise ValueError("BETTER_AUTH_SECRET environment variable not set.")


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://todo-evolution-sigma.vercel.app",
        "https://sharjeeel4-todo-ai-web.hf.space"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ... existing code ...

app.include_router(tasks.router)
app.include_router(auth.router, prefix="/auth")
app.include_router(chat.router, prefix="/api")

@app.on_event("startup")
def on_startup():
    create_db_and_tables()

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/health")
def health_check():
    return {"status": "healthy"}

# Add a protected endpoint to test the authentication middleware
@app.get("/protected-route")
def protected_route(current_user_id: int = Depends(get_current_user_id)):
    return {"message": f"Hello, user {current_user_id}! You have accessed a protected route."}
