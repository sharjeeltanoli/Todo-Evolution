from fastapi import FastAPI, Request
import logging
import json

app = FastAPI()
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

from fastapi import FastAPI, Request, Response
# ...
@app.get("/dapr/subscribe")
def subscribe():
    """
    Dapr subscription configuration.
    Tells Dapr which topics to subscribe to and where to route them.
    """
    subscriptions = [
        {
            "pubsubname": "pubsub",
            "topic": "reminder.triggered",
            "route": "/reminders"
        },
        {
            "pubsubname": "pubsub",
            "topic": "task.created",
            "route": "/task-events"
        },
        {
            "pubsubname": "pubsub",
            "topic": "task.completed",
            "route": "/task-events"
        }
    ]
    print(f"Dapr subscription requested: {json.dumps(subscriptions)}")
    return subscriptions

@app.post("/task-events")
async def receive_task_event(request: Request):
    """
    Endpoint for general task events.
    """
    try:
        event = await request.json()
        topic = event.get("topic")
        data = event.get("data", {})
        
        logger.info(f"--- [NOTIFICATION-SERVICE] ---")
        logger.info(f"EVENT: {topic}")
        logger.info(f"Task: {data.get('title')}")
        logger.info(f"------------------------------")
        
        return Response(status_code=204)
    except Exception as e:
        logger.error(f"Error processing task event: {e}")
        return Response(content=str(e), status_code=500)

@app.post("/reminders")
async def receive_reminder(request: Request):
    """
    Endpoint called by Dapr when an event is received on 'reminder.triggered' topic.
    """
    try:
        event = await request.json()
        # Dapr sends CloudEvents by default
        data = event.get("data", {})
        
        task_id = data.get("task_id")
        user_id = data.get("user_id")
        title = data.get("title")
        
        logger.info(f"--- [NOTIFICATION-SERVICE] ---")
        logger.info(f"ALARM: Reminder triggered for task {task_id}")
        logger.info(f"User: {user_id}")
        logger.info(f"Message: Don't forget to: {title}")
        logger.info(f"------------------------------")
        
        return Response(status_code=204)
    except Exception as e:
        logger.error(f"Error processing reminder: {e}")
        return Response(content=str(e), status_code=500)

@app.get("/health")
def health():
    return {"status": "ok"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)
