from datetime import datetime
from typing import Optional
from sqlmodel import Session
from models import Task, TaskCreate
from utils.recurrence import get_next_occurrence

def handle_recurrence(session: Session, completed_task: Task) -> Optional[Task]:
    """
    Checks if a completed task has a recurrence rule and creates the next occurrence.
    """
    if not completed_task.completed or not completed_task.recurrence_rule:
        return None
    
    # Calculate next due date
    # Base it on the current task's due date if it exists, otherwise use completion time
    base_date = completed_task.due_date if completed_task.due_date else datetime.utcnow()
    next_due = get_next_occurrence(completed_task.recurrence_rule, base_date)
    
    if not next_due:
        return None
        
    # Create next task
    new_task = Task(
        title=completed_task.title,
        description=completed_task.description,
        user_id=completed_task.user_id,
        priority=completed_task.priority,
        due_date=next_due,
        recurrence_rule=completed_task.recurrence_rule,
        parent_task_id=completed_task.id,
        completed=False
    )
    
    session.add(new_task)
    session.commit()
    session.refresh(new_task)
    return new_task
