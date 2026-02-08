from datetime import datetime
from typing import List, Optional

from sqlmodel import Field, Relationship, SQLModel


class User(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    email: str = Field(unique=True, index=True)
    name: str = Field(nullable=False)
    gender: str = Field(nullable=False)
    hashed_password: str = Field(nullable=False)

class TaskBase(SQLModel):
    title: str = Field(max_length=200, nullable=False)
    description: Optional[str] = Field(max_length=1000, default=None)
    completed: bool = Field(default=False, nullable=False)

class Task(TaskBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    created_at: datetime = Field(default_factory=datetime.utcnow, nullable=False)
    updated_at: datetime = Field(default_factory=datetime.utcnow, nullable=False)

    user_id: Optional[int] = Field(default=None, foreign_key="user.id", index=True)

class TaskCreate(TaskBase):
    pass # No additional fields needed for creation beyond TaskBase

class TaskRead(Task):
    pass # Task itself is sufficient for reading

class TaskUpdate(SQLModel): # TaskUpdate allows partial updates, so all fields are optional
    title: Optional[str] = Field(default=None, max_length=200)
    description: Optional[str] = Field(default=None, max_length=1000)
    completed: Optional[bool] = Field(default=None)
