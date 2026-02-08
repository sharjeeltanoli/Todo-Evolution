from sqlmodel import Session, text, SQLModel
from db import engine
# Import models so SQLModel knows about them
from models import ProcessedEvent, Reminder, Task

def migrate():
    print("Running migrations...")
    
    # 1. Create new tables (like ProcessedEvent) if they don't exist
    SQLModel.metadata.create_all(engine)
    print("SQLModel.metadata.create_all executed.")

    # 2. Alter existing tables
    with Session(engine) as session:
        # Add status to reminder
        try:
            # Check if column exists first? 
            # SQLite doesn't support IF NOT EXISTS in ADD COLUMN easily, but Postgres does.
            # We'll just try and catch error.
            session.exec(text("ALTER TABLE reminder ADD COLUMN status VARCHAR DEFAULT 'pending'"))
            print("Added status column to reminder table")
        except Exception as e:
            print(f"Could not add status column (might exist): {e}")

        session.commit()
    print("Migrations complete.")

if __name__ == "__main__":
    migrate()
