from typing import Dict, List, Optional
from src.models.task import Task

class TaskStorage:
    def __init__(self):
        self._tasks: Dict[str, Task] = {}
        self._next_id = 1 # Initialize sequential ID counter

    def add_task(self, task: Task) -> None:
        # Assign sequential ID to the task
        task.id = f"T{self._next_id:03d}" # Format as T001, T002, etc.
        self._next_id += 1
        self._tasks[task.id] = task

    def get_task(self, task_id: str) -> Optional[Task]:
        return self._tasks.get(task_id)

    def get_all_tasks(self) -> List[Task]:
        return list(self._tasks.values())

    def update_task(self, task: Task) -> None:
        if task.id in self._tasks:
            self._tasks[task.id] = task
        else:
            raise ValueError(f"Task with ID {task.id} not found.")

    def delete_task(self, task_id: str) -> None:
        if task_id in self._tasks:
            del self._tasks[task_id]
        else:
            raise ValueError(f"Task with ID {task_id} not found.")
