from sqlmodel import SQLModel
from sqlalchemy.ext.asyncio import create_async_engine
from dotenv import load_dotenv
import os

# Load .env from the same directory as this file
load_dotenv(os.path.join(os.path.dirname(__file__), ".env"))

DATABASE_URL = os.getenv("DATABASE_URL")

# Ensure DATABASE_URL is set, or provide a default/error
if not DATABASE_URL:
    # Fallback or warning. For now, we assume .env will be present.
    # We might want to use sqlite+aiosqlite for local testing if no postgres.
    # But plan says Neon PostgreSQL.
    pass

# We need to handle the case where DATABASE_URL might be None during build/test without .env
# For now, we'll let it fail if missing when running.
engine = create_async_engine(DATABASE_URL if DATABASE_URL else "sqlite+aiosqlite:///database.db", echo=True, future=True)

async def init_db():
    async with engine.begin() as conn:
        # await conn.run_sync(SQLModel.metadata.drop_all)
        await conn.run_sync(SQLModel.metadata.create_all)
