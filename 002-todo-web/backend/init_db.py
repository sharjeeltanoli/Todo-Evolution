from sqlmodel import SQLModel
from db import engine
from models import User, Task

def init_db():
    print("Creating tables...")
    SQLModel.metadata.create_all(engine)
    print("Tables created.")

if __name__ == "__main__":
    init_db()
