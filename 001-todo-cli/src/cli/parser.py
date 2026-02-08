# src/cli/parser.py

def parse_input(user_input: str) -> tuple[str, list[str]]:
    """
    Parses user input into a command and a list of arguments.
    """
    parts = user_input.strip().split()
    if not parts:
        return "", []
    command = parts[0].lower()
    args = parts[1:]
    return command, args
