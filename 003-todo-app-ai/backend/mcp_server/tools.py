from typing import Optional
from sqlmodel import Session, select
from datetime import datetime
from models import Task
from db import engine

def add_task(user_id: int, title: str, description: Optional[str] = None) -> dict:
    with Session(engine) as session:
        task = Task(title=title, description=description, user_id=user_id)
        session.add(task)
        session.commit()
        session.refresh(task)
        return {"success": True, "task_id": task.id, "title": task.title}

def list_tasks(user_id: int, status: Optional[str] = None) -> dict:
    with Session(engine) as session:
        statement = select(Task).where(Task.user_id == user_id)
        if status == "completed":
            statement = statement.where(Task.completed == True)
        elif status == "pending":
            statement = statement.where(Task.completed == False)
        
        tasks = session.exec(statement).all()
        return {
            "success": True, 
            "tasks": [{"id": t.id, "title": t.title, "completed": t.completed} for t in tasks]
        }

def complete_task(user_id: int, task_id: int) -> dict:
    with Session(engine) as session:
        task = session.exec(select(Task).where(Task.id == task_id, Task.user_id == user_id)).first()
        if not task:
            return {"success": False, "error": "Task not found"}
        
        task.completed = True
        task.updated_at = datetime.utcnow()
        session.add(task)
        session.commit()
        return {"success": True, "task_id": task.id, "completed": True}

def delete_task(user_id: int, task_id: int) -> dict:
    with Session(engine) as session:
        task = session.exec(select(Task).where(Task.id == task_id, Task.user_id == user_id)).first()
        if not task:
            return {"success": False, "error": "Task not found"}
        
        session.delete(task)
        session.commit()
        return {"success": True, "message": f"Task {task_id} deleted"}

def update_task(user_id: int, task_id: int, title: Optional[str] = None, description: Optional[str] = None) -> dict:
    with Session(engine) as session:
        task = session.exec(select(Task).where(Task.id == task_id, Task.user_id == user_id)).first()
        if not task:
            return {"success": False, "error": "Task not found"}
        
        if title is not None:
            task.title = title
        if description is not None:
            task.description = description
        
        task.updated_at = datetime.utcnow()
        session.add(task)
        session.commit()
        session.refresh(task)
        return {"success": True, "task_id": task.id, "title": task.title}
