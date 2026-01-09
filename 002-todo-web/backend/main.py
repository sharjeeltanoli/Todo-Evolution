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
from routes import tasks, auth

BETTER_AUTH_SECRET = os.getenv("BETTER_AUTH_SECRET")
if not BETTER_AUTH_SECRET:
    raise ValueError("BETTER_AUTH_SECRET environment variable not set.")


app = FastAPI()

# CORS Middleware
origins = [
    "*",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(tasks.router)
app.include_router(auth.router, prefix="/auth")

@app.on_event("startup")
def on_startup():
    create_db_and_tables()

@app.get("/")
def read_root():
    return {"Hello": "World"}

# Add a protected endpoint to test the authentication middleware
@app.get("/protected-route")
def protected_route(current_user_id: int = Depends(get_current_user_id)):
    return {"message": f"Hello, user {current_user_id}! You have accessed a protected route."}
