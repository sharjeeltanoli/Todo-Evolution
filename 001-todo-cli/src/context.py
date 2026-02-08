# src/context.py
from src.services.task_manager import TaskManager
from src.services.task_storage import TaskStorage

class Context:
    def __init__(self):
        self.task_storage = TaskStorage()
        self.task_manager = TaskManager(self.task_storage)
