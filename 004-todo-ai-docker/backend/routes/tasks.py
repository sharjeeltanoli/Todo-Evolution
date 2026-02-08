from typing import List, Optional

from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlmodel import Session, select, or_, desc, asc
from datetime import datetime

from db import get_session
from middleware.auth import get_current_user_id
from models import Task, User, TaskCreate, TaskUpdate, TaskRead, Tag, TaskTag, TagRead
from services.tasks import handle_recurrence
from services.event_publisher import event_publisher

router = APIRouter()

@router.get("/users/{user_id}/tasks", response_model=List[TaskRead])
def get_user_tasks(
    user_id: int,
    current_user_id: int = Depends(get_current_user_id),
    session: Session = Depends(get_session),
    search: Optional[str] = Query(None),
    priority: Optional[str] = Query(None), # Comma separated
    tags: Optional[str] = Query(None), # Comma separated names
    overdue: Optional[bool] = Query(None),
    sort_by: str = Query("due_date"),
    sort_order: str = Query("asc")
):
    if user_id != current_user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to access tasks of other users"
        )
    
    query = select(Task).where(Task.user_id == user_id)
    
    # Search
    if search:
        # Simple search using ILIKE (Postgres specific if using ILIKE, SQLite uses LIKE)
        # For true FTS, we would use tsvector, but let's start with flexible LIKE
        search_filter = f"%{search}%"
        query = query.where(or_(
            Task.title.ilike(search_filter),
            Task.description.ilike(search_filter)
        ))
    
    # Priority filter
    if priority:
        priorities = priority.split(",")
        query = query.where(Task.priority.in_(priorities))
    
    # Overdue filter
    if overdue:
        now = datetime.utcnow()
        query = query.where(Task.due_date < now, Task.completed == False)
    
    # Tag filter
    if tags:
        tag_names = tags.split(",")
        query = query.join(TaskTag).join(Tag).where(Tag.name.in_(tag_names))

    # Sorting
    order_func = asc if sort_order == "asc" else desc
    if sort_by == "priority":
        # Custom priority sorting might need case expression, but let's do alphabetical for now
        # High, Medium, Low -> alphabetical order is H, L, M. Not ideal.
        query = query.order_by(order_func(Task.priority))
    elif sort_by == "created_at":
        query = query.order_by(order_func(Task.created_at))
    else: # Default due_date
        query = query.order_by(order_func(Task.due_date))

    tasks = session.exec(query).all()
    
    # Prepare response with is_overdue calculated and tags loaded
    now = datetime.utcnow()
    results = []
    for task in tasks:
        # Load tags
        tag_read_list = [TagRead(id=t.id, name=t.name, color=t.color) for t in task.tags]
        
        task_read = TaskRead(
            **task.dict(),
            tags=tag_read_list,
            is_overdue=task.due_date < now if task.due_date and not task.completed else False
        )
        results.append(task_read)
        
    return results

@router.post("/users/{user_id}/tasks", response_model=TaskRead, status_code=status.HTTP_201_CREATED)
def create_user_task(
    user_id: int,
    task_create: TaskCreate,
    current_user_id: int = Depends(get_current_user_id),
    session: Session = Depends(get_session)
):
    if user_id != current_user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to create tasks for other users"
        )
    
    # Separate tags from the rest of task data
    task_data = task_create.dict(exclude={"tags"})
    task = Task(**task_data, user_id=user_id)
    
    # Handle tags
    if task_create.tags:
        for tag_name in task_create.tags:
            # Check if tag exists for user
            tag = session.exec(select(Tag).where(Tag.user_id == user_id, Tag.name == tag_name)).first()
            if not tag:
                tag = Tag(user_id=user_id, name=tag_name)
                session.add(tag)
                session.flush() # Get ID
            task.tags.append(tag)

    session.add(task)
    session.commit()
    session.refresh(task)
    
    # Publish event
    event_publisher.publish_event("task.created", task.dict())
    
    # Re-fetch to ensure tags and is_overdue are correct
    return get_user_task_by_id(user_id, task.id, session)

def get_user_task_by_id(user_id: int, task_id: int, session: Session) -> TaskRead:
    task = session.exec(select(Task).where(Task.id == task_id, Task.user_id == user_id)).first()
    if not task:
         raise HTTPException(status_code=404, detail="Task not found")
    
    now = datetime.utcnow()
    tag_read_list = [TagRead(id=t.id, name=t.name, color=t.color) for t in task.tags]
    return TaskRead(
        **task.dict(),
        tags=tag_read_list,
        is_overdue=task.due_date < now if task.due_date and not task.completed else False
    )

@router.put("/users/{user_id}/tasks/{task_id}", response_model=TaskRead)
def update_user_task(
    user_id: int,
    task_id: int,
    task_update: TaskUpdate,
    current_user_id: int = Depends(get_current_user_id),
    session: Session = Depends(get_session)
):
    if user_id != current_user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to update tasks for other users"
        )
    
    existing_task = session.exec(select(Task).where(Task.id == task_id, Task.user_id == user_id)).first()
    if not existing_task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found or does not belong to the user"
        )
    
    # Update core fields
    update_data = task_update.dict(exclude_unset=True, exclude={"tags"})
    for key, value in update_data.items():
        setattr(existing_task, key, value)
    
    # Handle tags update
    if task_update.tags is not None:
        # Clear existing
        existing_task.tags = []
        for tag_name in task_update.tags:
            tag = session.exec(select(Tag).where(Tag.user_id == user_id, Tag.name == tag_name)).first()
            if not tag:
                tag = Tag(user_id=user_id, name=tag_name)
                session.add(tag)
                session.flush()
            existing_task.tags.append(tag)

    existing_task.updated_at = datetime.utcnow()
    
    session.add(existing_task)
    session.commit()
    session.refresh(existing_task)
    
    # Publish event
    event_publisher.publish_event("task.updated", existing_task.dict())
    
    return get_user_task_by_id(user_id, task_id, session)

@router.delete("/users/{user_id}/tasks/{task_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_user_task(
    user_id: int,
    task_id: int,
    current_user_id: int = Depends(get_current_user_id),
    session: Session = Depends(get_session)
):
    if user_id != current_user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to delete tasks of other users"
        )
    
    task = session.exec(select(Task).where(Task.id == task_id, Task.user_id == user_id)).first()
    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found or does not belong to the user"
        )
    
    # Keep data for event
    task_data = task.dict()
    
    session.delete(task)
    session.commit()
    
    # Publish event
    event_publisher.publish_event("task.deleted", task_data)
    
    return None

@router.patch("/users/{user_id}/tasks/{task_id}/complete", response_model=TaskRead)
def toggle_task_completion(
    user_id: int,
    task_id: int,
    current_user_id: int = Depends(get_current_user_id),
    session: Session = Depends(get_session)
):
    if user_id != current_user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to modify tasks of other users"
        )
    
    existing_task = session.exec(select(Task).where(Task.id == task_id, Task.user_id == user_id)).first()
    if not existing_task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found or does not belong to the user"
        )
    
    existing_task.completed = not existing_task.completed
    existing_task.updated_at = datetime.utcnow()
    
    session.add(existing_task)
    session.commit()
    session.refresh(existing_task)
    
    # Publish event
    if existing_task.completed:
        event_publisher.publish_event("task.completed", existing_task.dict())
    else:
        # Re-opened
        event_publisher.publish_event("task.updated", existing_task.dict())
    
    # Handle recurrence if task was just marked completed
    if existing_task.completed:
        handle_recurrence(session, existing_task)
    
    return get_user_task_by_id(user_id, task_id, session)

# --- Dapr Jobs and Reminders ---
import json
import logging
from fastapi import Request
from models import Reminder
from services.reminders import schedule_reminder_job

logger = logging.getLogger(__name__)

@router.post("/api/jobs/reminder-trigger")
async def handle_reminder_job(request: Request, session: Session = Depends(get_session)):
    """
    Callback endpoint for Dapr Jobs.
    """
    try:
        body = await request.body()
        data = json.loads(body)
        reminder_id = data.get("reminder_id")
        
        logger.info(f"Dapr Job triggered for reminder {reminder_id}")
        
        reminder = session.get(Reminder, reminder_id)
        if not reminder:
            return {"status": "not_found", "reminder_id": reminder_id}
            
        if reminder.sent:
            return {"status": "already_sent"}
            
        task = session.get(Task, reminder.task_id)
        
        # Publish reminder.triggered event
        event_payload = {
            "reminder_id": reminder.id,
            "task_id": task.id,
            "user_id": task.user_id,
            "title": task.title,
            "remind_at": reminder.remind_at.isoformat()
        }
        event_publisher.publish_event("reminder.triggered", event_payload)
        
        # Update Reminder status
        reminder.sent = True
        reminder.status = "sent"
        session.add(reminder)
        session.commit()
        
        return {"status": "success"}
    except Exception as e:
        logger.error(f"Error handling reminder job: {e}")
        return {"status": "error", "message": str(e)}, 500

@router.post("/users/{user_id}/tasks/{task_id}/reminders", response_model=Reminder, status_code=status.HTTP_201_CREATED)
def add_reminder(
    user_id: int,
    task_id: int,
    remind_at: datetime,
    current_user_id: int = Depends(get_current_user_id),
    session: Session = Depends(get_session)
):
    if user_id != current_user_id:
        raise HTTPException(status_code=403, detail="Forbidden")
        
    task = session.exec(select(Task).where(Task.id == task_id, Task.user_id == user_id)).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
        
    reminder = Reminder(task_id=task_id, remind_at=remind_at, status="scheduled")
    session.add(reminder)
    session.commit()
    session.refresh(reminder)
    
    # Schedule with Dapr
    schedule_reminder_job(reminder.id, remind_at)
    
    return reminder