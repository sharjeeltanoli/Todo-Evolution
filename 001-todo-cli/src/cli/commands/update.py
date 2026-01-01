# src/cli/commands/update.py
from src.context import Context
from src.utils.validation import validate_title, validate_description # Import validation functions

def update_task_command(context: Context, *args):
    if not args:
        print("Usage: update <task_id>")
        return

    task_id = args[0]
    task = context.task_manager.get_task(task_id)
    if not task:
        print(f"Error: Task with ID '{task_id}' not found.")
        return

    print(f"Current Title: {task.title}")
    new_title = input(f"Enter new title (leave blank to keep '{task.title}'): ")

    if new_title: # Only validate if a new title is provided
        is_valid_title, title_error = validate_title(new_title)
        if not is_valid_title:
            print(f"Error: {title_error}")
            return

    print(f"Current Description: {task.description}")
    new_description = input(f"Enter new description (leave blank to keep '{task.description}'): ")

    if new_description: # Only validate if a new description is provided
        is_valid_description, description_error = validate_description(new_description)
        if not is_valid_description:
            print(f"Error: {description_error}")
            return

    # Apply updates
    updated_title = new_title if new_title else task.title
    updated_description = new_description if new_description else task.description

    try:
        context.task_manager.update_task(task_id, title=updated_title, description=updated_description)
        print(f"Task '{task_id}' updated successfully.")
    except ValueError as e:
        print(f"Error updating task: {e}")
    # Further implementation will prompt for title/description and perform update
