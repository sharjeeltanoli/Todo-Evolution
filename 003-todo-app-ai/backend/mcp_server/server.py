from mcp.server import Server
from .tools import add_task, list_tasks, complete_task, delete_task, update_task

mcp_server = Server("todo-mcp")

@mcp_server.tool()
def add_task_tool(user_id: int, title: str, description: str = None) -> str:
    """Add a new task for the user."""
    result = add_task(user_id, title, description)
    return str(result)

@mcp_server.tool()
def list_tasks_tool(user_id: int, status: str = None) -> str:
    """List tasks for the user. Status can be 'pending' or 'completed'."""
    result = list_tasks(user_id, status)
    return str(result)

@mcp_server.tool()
def complete_task_tool(user_id: int, task_id: int) -> str:
    """Mark a task as completed."""
    result = complete_task(user_id, task_id)
    return str(result)

@mcp_server.tool()
def delete_task_tool(user_id: int, task_id: int) -> str:
    """Delete a task."""
    result = delete_task(user_id, task_id)
    return str(result)

@mcp_server.tool()
def update_task_tool(user_id: int, task_id: int, title: str = None, description: str = None) -> str:
    """Update a task's title or description."""
    result = update_task(user_id, task_id, title, description)
    return str(result)
