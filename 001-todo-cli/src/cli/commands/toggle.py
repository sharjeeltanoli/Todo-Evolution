# src/cli/commands/toggle.py
from src.context import Context

def toggle_task_command(context: Context, *args):
    if not args:
        print("Usage: toggle <task_id>")
        return

    task_id = args[0]
    try:
        updated_task = context.task_manager.toggle_task_status(task_id)
        print(f"Task '{task_id}' status toggled to '{updated_task.status}'.")
    except ValueError as e:
        print(f"Error toggling task status: {e}")
    # Further implementation will validate existence and toggle status
