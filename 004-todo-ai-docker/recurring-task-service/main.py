from fastapi import FastAPI, Request
import logging
import json
from datetime import datetime
from dateutil.rrule import rrulestr
try:
    from dapr.clients import DaprClient
    DAPR_AVAILABLE = True
except ImportError:
    DAPR_AVAILABLE = False
    print("Dapr Python SDK not installed in recurring-task-service.")

app = FastAPI()
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def get_next_occurrence(rule: str, after_date: datetime) -> datetime:
    try:
        if not rule.startswith("RRULE:"):
            r = rrulestr(f"RRULE:{rule}")
        else:
            r = rrulestr(rule)
        return r.after(after_date)
    except Exception as e:
        logger.error(f"Error calculating next occurrence: {e}")
        return None

from fastapi import FastAPI, Request, Response
# ...
@app.get("/dapr/subscribe")
def subscribe():
    """
    Configure Dapr to send task.completed events to /handle-task-completed
    """
    return [
        {
            "pubsubname": "pubsub",
            "topic": "task.completed",
            "route": "/handle-task-completed"
        }
    ]

@app.post("/handle-task-completed")
async def handle_task_completed(request: Request):
    """
    Receive task completion event and schedule next occurrence if recurring.
    """
    try:
        event = await request.json()
        data = event.get("data", {})
        
        task_id = data.get("id")
        user_id = data.get("user_id")
        recurrence_rule = data.get("recurrence_rule")
        due_date_str = data.get("due_date")
        
        if not recurrence_rule:
            return Response(status_code=204)
            
        logger.info(f"Task {task_id} completed. Calculating next occurrence for user {user_id}...")
        
        # Parse base date
        base_date = None
        if due_date_str:
            try:
                base_date = datetime.fromisoformat(due_date_str.replace('Z', '+00:00'))
            except:
                base_date = datetime.utcnow()
        else:
            base_date = datetime.utcnow()
        
        next_due = get_next_occurrence(recurrence_rule, base_date)
        if not next_due:
            logger.info(f"No more occurrences for task {task_id}")
            return Response(status_code=204)
            
        # Create next task via Dapr service invocation to backend
        # We call the standard create task endpoint
        new_task_payload = {
            "title": data.get("title"),
            "description": data.get("description"),
            "priority": data.get("priority", "medium"),
            "due_date": next_due.isoformat(),
            "recurrence_rule": recurrence_rule,
            "tags": data.get("tags", [])
        }
        
        if not DAPR_AVAILABLE:
            logger.warning("Dapr SDK missing. Cannot invoke backend to create next task.")
            return Response(status_code=204)

        try:
            with DaprClient() as d:
                # Invoke backend
                d.invoke_method(
                    app_id="todo-backend",
                    method_name=f"users/{user_id}/tasks",
                    data=json.dumps(new_task_payload),
                    http_verb="POST"
                )
            logger.info(f"Successfully scheduled next task occurrence at {next_due}")
        except Exception as e:
            err_msg = str(e)
            if "Connection refused" in err_msg or "Failed to connect" in err_msg:
                logger.warning("Dapr sidecar not found. Could not invoke backend.")
            else:
                raise e
                
        return Response(status_code=204)
        
    except Exception as e:
        logger.error(f"Failed to process recurring task: {e}")
        return Response(content=str(e), status_code=500)

@app.get("/health")
def health():
    return {"status": "ok"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8002)
