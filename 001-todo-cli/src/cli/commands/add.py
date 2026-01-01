# src/cli/commands/add.py

from src.utils.validation import validate_title, validate_description

from src.context import Context # Import Context



def add_task_command(context: Context): # Accept context

    title = input("Enter task title: ")

    is_valid_title, title_error = validate_title(title)

    if not is_valid_title:

        print(f"Error: {title_error}")

        return



    description = input("Enter task description (optional): ")

    is_valid_description, description_error = validate_description(description)

    if not is_valid_description:

        print(f"Error: {description_error}")

        return



    # Use task_manager from context to add the task

    new_task = context.task_manager.add_task(title=title, description=description)

    print(f"Task '{new_task.title}' added with ID: {new_task.id}")
    # Further implementation for description, validation, and storage will come in later tasks
