# src/utils/validation.py

def validate_title(title: str) -> tuple[bool, str]:
    """
    Validates the length of the task title.
    Title must be between 1 and 200 characters (inclusive).
    Returns (True, "") if valid, (False, error_message) otherwise.
    """
    if not title:
        return False, "Title cannot be empty."
    if not (1 <= len(title) <= 200):
        return False, "Title must be between 1 and 200 characters long."
    return True, ""

def validate_description(description: str) -> tuple[bool, str]:
    """
    Validates the length of the task description.
    Description must be at most 1000 characters long.
    Returns (True, "") if valid, (False, error_message) otherwise.
    """
    if len(description) > 1000:
        return False, "Description cannot exceed 1000 characters."
    return True, ""
