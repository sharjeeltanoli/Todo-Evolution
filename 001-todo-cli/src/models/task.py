import uuid
from typing import Optional

class Task:
    def __init__(self, id: str, title: str, description: str = "", status: str = "pending"):
        self.id = id
        self.title = title
        self.description = description
        self.status = status # e.g., "pending", "completed"

    def __repr__(self):
        return f"Task(id='{self.id}', title='{self.title}', status='{self.status}')"

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "status": self.status
        }
