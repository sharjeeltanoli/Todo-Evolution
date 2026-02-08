from typing import List

from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select
from datetime import datetime

from db import get_session
from middleware.auth import get_current_user_id
from models import Task, User, TaskCreate, TaskUpdate # Import TaskCreate, TaskUpdate

router = APIRouter()

@router.get("/users/{user_id}/tasks", response_model=List[Task])
def get_user_tasks(
    user_id: int,
    current_user_id: int = Depends(get_current_user_id),
    session: Session = Depends(get_session)
):
    if user_id != current_user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to access tasks of other users"
        )
    
    tasks = session.exec(select(Task).where(Task.user_id == user_id)).all()
    return tasks

@router.post("/users/{user_id}/tasks", response_model=Task, status_code=status.HTTP_201_CREATED)
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
    
    task = Task(**task_create.dict(), user_id=user_id)
    session.add(task)
    session.commit()
    session.refresh(task)
    return task

@router.put("/users/{user_id}/tasks/{task_id}", response_model=Task)
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
    
    # Update only the provided fields
    for key, value in task_update.dict(exclude_unset=True).items():
        setattr(existing_task, key, value)
    
    existing_task.updated_at = datetime.utcnow() # Update timestamp
    
    session.add(existing_task)
    session.commit()
    session.refresh(existing_task)
    return existing_task

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
    
    session.delete(task)
    session.commit()
    return None

@router.patch("/users/{user_id}/tasks/{task_id}/complete", response_model=Task)
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
    existing_task.updated_at = datetime.utcnow() # Update timestamp
    
    session.add(existing_task)
    session.commit()
    session.refresh(existing_task)
    return existing_task # FastAPI requires a dictionary for 204
