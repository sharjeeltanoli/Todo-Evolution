# src/cli/commands/delete.py
from src.context import Context

def delete_task_command(context: Context, *args):
    if not args:
        print("Usage: delete <task_id>")
        return

    task_id = args[0]
    try:
        context.task_manager.delete_task(task_id)
        print(f"Task '{task_id}' deleted successfully.")
    except ValueError as e:
        print(f"Error deleting task: {e}")
    # Further implementation will validate existence and delete the task
