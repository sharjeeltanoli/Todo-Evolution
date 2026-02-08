from sqlmodel import Session, select
from db import engine
from models import User

def list_users():
    with Session(engine) as session:
        users = session.exec(select(User)).all()
        print(f"Total users: {len(users)}")
        for user in users:
            print(f"ID: {user.id}, Email: {user.email}, Name: {user.name}, Gender: {user.gender}")

if __name__ == "__main__":
    list_users()
