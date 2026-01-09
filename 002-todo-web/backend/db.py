from typing import Generator

from sqlmodel import Session, create_engine, SQLModel
from dotenv import load_dotenv
import os
from pathlib import Path

env_path = Path(__file__).resolve().parent / '.env'
load_dotenv(dotenv_path=env_path)
DATABASE_URL = os.getenv("DATABASE_URL")
if not DATABASE_URL:
    raise ValueError("DATABASE_URL environment variable not set.")

engine = create_engine(DATABASE_URL, echo=True)


def create_db_and_tables():
    SQLModel.metadata.create_all(engine)


def get_session() -> Generator[Session, None, None]:
    with Session(engine) as session:
        yield session
