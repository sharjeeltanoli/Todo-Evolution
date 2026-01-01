# src/cli/commands/view.py
from src.context import Context

def view_tasks_command(context: Context):
    tasks = context.task_manager.get_all_tasks()

    if not tasks:
        print("No tasks found.")
        return

    print("--- Your Tasks ---")
    for task in tasks:
        print(f"ID: {task.id}, Title: {task.title}, Status: {task.status}")
    print("------------------")
