from typing import Optional, List
from sqlmodel import Session, select
from datetime import datetime
from models import Task, Tag, TaskTag
from db import engine
from services.tasks import handle_recurrence

def add_task(
    user_id: int, 
    title: str, 
    description: Optional[str] = None,
    priority: Optional[str] = "medium",
    due_date: Optional[datetime] = None,
    recurrence_rule: Optional[str] = None,
    tags: Optional[List[str]] = None
) -> dict:
    with Session(engine) as session:
        task = Task(
            title=title, 
            description=description, 
            user_id=user_id,
            priority=priority,
            due_date=due_date,
            recurrence_rule=recurrence_rule
        )
        
        if tags:
            for tag_name in tags:
                tag = session.exec(select(Tag).where(Tag.user_id == user_id, Tag.name == tag_name)).first()
                if not tag:
                    tag = Tag(user_id=user_id, name=tag_name)
                    session.add(tag)
                    session.flush()
                task.tags.append(tag)
                
        session.add(task)
        session.commit()
        session.refresh(task)
        return {"success": True, "task_id": task.id, "title": task.title}

def list_tasks(
    user_id: int, 
    status: Optional[str] = None,
    priority: Optional[str] = None,
    search: Optional[str] = None
) -> dict:
    with Session(engine) as session:
        statement = select(Task).where(Task.user_id == user_id)
        if status == "completed":
            statement = statement.where(Task.completed == True)
        elif status == "pending":
            statement = statement.where(Task.completed == False)
        
        if priority:
            statement = statement.where(Task.priority == priority)
            
        if search:
            search_filter = f"%{search}%"
            statement = statement.where(Task.title.ilike(search_filter))
        
        tasks = session.exec(statement).all()
        return {
            "success": True, 
            "tasks": [
                {
                    "id": t.id, 
                    "title": t.title, 
                    "completed": t.completed,
                    "priority": t.priority,
                    "due_date": t.due_date.isoformat() if t.due_date else None,
                    "tags": [tag.name for tag in t.tags]
                } for t in tasks
            ]
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
        session.refresh(task)
        
        # Handle recurrence
        handle_recurrence(session, task)
        
        return {"success": True, "task_id": task.id, "completed": True}

def delete_task(user_id: int, task_id: int) -> dict:
    with Session(engine) as session:
        task = session.exec(select(Task).where(Task.id == task_id, Task.user_id == user_id)).first()
        if not task:
            return {"success": False, "error": "Task not found"}
        
        session.delete(task)
        session.commit()
        return {"success": True, "message": f"Task {task_id} deleted"}

def update_task(
    user_id: int, 
    task_id: int, 
    title: Optional[str] = None, 
    description: Optional[str] = None,
    priority: Optional[str] = None,
    due_date: Optional[datetime] = None,
    tags: Optional[List[str]] = None
) -> dict:
    with Session(engine) as session:
        task = session.exec(select(Task).where(Task.id == task_id, Task.user_id == user_id)).first()
        if not task:
            return {"success": False, "error": "Task not found"}
        
        if title is not None:
            task.title = title
        if description is not None:
            task.description = description
        if priority is not None:
            task.priority = priority
        if due_date is not None:
            task.due_date = due_date
            
        if tags is not None:
            task.tags = []
            for tag_name in tags:
                tag = session.exec(select(Tag).where(Tag.user_id == user_id, Tag.name == tag_name)).first()
                if not tag:
                    tag = Tag(user_id=user_id, name=tag_name)
                    session.add(tag)
                    session.flush()
                task.tags.append(tag)
        
        task.updated_at = datetime.utcnow()
        session.add(task)
        session.commit()
        session.refresh(task)
        return {"success": True, "task_id": task.id, "title": task.title}