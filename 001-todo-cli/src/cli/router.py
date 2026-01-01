# src/cli/router.py
from src.cli.command_registry import COMMAND_REGISTRY
from src.cli.parser import parse_input
from src.context import Context # Import Context

class CommandRouter:
    def __init__(self, context: Context): # Accept context
        self.commands = COMMAND_REGISTRY
        self.context = context # Store context

    def route_command(self, command: str, args: list[str]) -> None:
        if command == "exit" or command == "quit":
            return

        command_handler = self.commands.get(command)
        if command_handler:
            if callable(command_handler):
                # Pass context as the first argument
                command_handler(self.context, *args)
            else:
                print(f"Command '{command}' is not yet implemented.") # More informative message
