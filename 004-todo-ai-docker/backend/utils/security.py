from datetime import datetime, timedelta
from typing import Optional
import bcrypt
import jwt
import os

BETTER_AUTH_SECRET = os.getenv("BETTER_AUTH_SECRET")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

def verify_password(plain_password: str, hashed_password: str) -> bool:
    try:
        return bcrypt.checkpw(
            plain_password.encode('utf-8'), 
            hashed_password.encode('utf-8')
        )
    except (ValueError, TypeError):
        return False

def get_password_hash(password: str) -> str:
    password_bytes = password.encode('utf-8')
    if len(password_bytes) > 72:
        # Truncate to 72 bytes as per bcrypt requirements
        password_bytes = password_bytes[:72]
    
    hashed = bcrypt.hashpw(password_bytes, bcrypt.gensalt())
    return hashed.decode('utf-8')

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, BETTER_AUTH_SECRET, algorithm=ALGORITHM)
    return encoded_jwt

# Idempotency Helpers
from sqlmodel import Session
from db import engine
from models import ProcessedEvent

def is_event_processed(event_id: str) -> bool:
    """Check if an event has already been processed."""
    with Session(engine) as session:
        event = session.get(ProcessedEvent, event_id)
        return event is not None

def mark_event_processed(event_id: str):
    """Mark an event as processed."""
    with Session(engine) as session:
        event = ProcessedEvent(event_id=event_id)
        session.add(event)
        session.commit()

