from datetime import datetime
from typing import List, Optional

from sqlmodel import Field, Relationship, SQLModel


class User(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    email: str = Field(unique=True, index=True)
    name: str = Field(nullable=False)
    gender: str = Field(nullable=False)
    hashed_password: str = Field(nullable=False)

class TaskTag(SQLModel, table=True):
    task_id: int = Field(foreign_key="task.id", primary_key=True)
    tag_id: int = Field(foreign_key="tag.id", primary_key=True)

class Tag(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: int = Field(foreign_key="user.id", index=True)
    name: str = Field(max_length=50)
    color: Optional[str] = Field(default=None, max_length=7)
    created_at: datetime = Field(default_factory=datetime.utcnow)

    tasks: List["Task"] = Relationship(back_populates="tags", link_model=TaskTag)

class ProcessedEvent(SQLModel, table=True):
    event_id: str = Field(primary_key=True)
    processed_at: datetime = Field(default_factory=datetime.utcnow)

class Reminder(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    task_id: int = Field(foreign_key="task.id", index=True)
    remind_at: datetime = Field(nullable=False)
    sent: bool = Field(default=False)
    status: str = Field(default="pending")  # pending, scheduled, sent, failed
    created_at: datetime = Field(default_factory=datetime.utcnow)

    task: "Task" = Relationship(back_populates="reminders")

class TaskBase(SQLModel):
    title: str = Field(max_length=200, nullable=False)
    description: Optional[str] = Field(max_length=1000, default=None)
    completed: bool = Field(default=False, nullable=False)
    priority: str = Field(default="medium", max_length=10) # high, medium, low
    due_date: Optional[datetime] = Field(default=None)
    recurrence_rule: Optional[str] = Field(default=None, max_length=200)

class Task(TaskBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    created_at: datetime = Field(default_factory=datetime.utcnow, nullable=False)
    updated_at: datetime = Field(default_factory=datetime.utcnow, nullable=False)
    user_id: Optional[int] = Field(default=None, foreign_key="user.id", index=True)
    parent_task_id: Optional[int] = Field(default=None, foreign_key="task.id", index=True)

    tags: List[Tag] = Relationship(back_populates="tasks", link_model=TaskTag)
    reminders: List[Reminder] = Relationship(back_populates="task")

class TaskCreate(TaskBase):
    tags: Optional[List[str]] = None # List of tag names

class TagRead(SQLModel):
    id: int
    name: str
    color: Optional[str]

class TaskRead(TaskBase):
    id: int
    created_at: datetime
    updated_at: datetime
    user_id: Optional[int]
    parent_task_id: Optional[int]
    tags: List[TagRead] = []
    is_overdue: bool = False

class TaskUpdate(SQLModel):
    title: Optional[str] = Field(default=None, max_length=200)
    description: Optional[str] = Field(default=None, max_length=1000)
    completed: Optional[bool] = Field(default=None)
    priority: Optional[str] = Field(default=None, max_length=10)
    due_date: Optional[datetime] = Field(default=None)
    recurrence_rule: Optional[str] = Field(default=None, max_length=200)
    tags: Optional[List[str]] = None

class Conversation(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: int = Field(foreign_key="user.id", index=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class Message(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    conversation_id: int = Field(foreign_key="conversation.id", index=True)
    user_id: int = Field(foreign_key="user.id", index=True)
    role: str = Field()  # "user", "assistant"
    content: str = Field()
    created_at: datetime = Field(default_factory=datetime.utcnow)