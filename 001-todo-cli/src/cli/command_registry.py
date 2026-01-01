# src/cli/command_registry.py

from src.cli.commands.add import add_task_command
from src.cli.commands.view import view_tasks_command
from src.cli.commands.update import update_task_command
from src.cli.commands.toggle import toggle_task_command
from src.cli.commands.delete import delete_task_command

COMMAND_REGISTRY = {
    "add": add_task_command,
    "view": view_tasks_command,
    "update": update_task_command,
    "toggle": toggle_task_command,
    "delete": delete_task_command,
    "exit": None, # Handled in main.py
    "quit": None  # Handled in main.py
}