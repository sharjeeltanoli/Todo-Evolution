from backend.db import engine
from backend.models import User, Task
from sqlmodel import SQLModel

def reset_db():
    SQLModel.metadata.drop_all(engine)
    SQLModel.metadata.create_all(engine)
    print("Database reset successfully.")

if __name__ == "__main__":
    reset_db()
