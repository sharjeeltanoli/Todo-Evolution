from sqlalchemy import text
from db import engine

def migrate():
    with engine.connect() as conn:
        print("Migrating 'task' table...")
        # Add new columns
        # Priority
        try:
            conn.execute(text("ALTER TABLE task ADD COLUMN priority VARCHAR(10) DEFAULT 'medium'"))
            conn.commit()
            print("Added 'priority' column.")
        except Exception as e:
            print(f"Priority column might already exist: {e}")

        # Due Date
        try:
            conn.execute(text("ALTER TABLE task ADD COLUMN due_date TIMESTAMP"))
            conn.commit()
            print("Added 'due_date' column.")
        except Exception as e:
            print(f"due_date column might already exist: {e}")

        # Recurrence Rule
        try:
            conn.execute(text("ALTER TABLE task ADD COLUMN recurrence_rule VARCHAR(200)"))
            conn.commit()
            print("Added 'recurrence_rule' column.")
        except Exception as e:
            print(f"recurrence_rule column might already exist: {e}")

        # Parent Task ID
        try:
            conn.execute(text("ALTER TABLE task ADD COLUMN parent_task_id INTEGER REFERENCES task(id)"))
            conn.commit()
            print("Added 'parent_task_id' column.")
        except Exception as e:
            print(f"parent_task_id column might already exist: {e}")

        print("Migration complete.")

if __name__ == "__main__":
    migrate()
