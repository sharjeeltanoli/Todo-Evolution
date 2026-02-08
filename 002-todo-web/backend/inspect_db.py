from sqlalchemy import inspect
from db import engine

def inspect_db():
    inspector = inspect(engine)
    print("Tables in database:", inspector.get_table_names())
    print("Columns in 'user' table:")
    for column in inspector.get_columns("user"):
        print(f"- {column['name']} ({column['type']})")

if __name__ == "__main__":
    inspect_db()
