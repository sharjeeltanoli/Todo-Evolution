import logging
import json
from datetime import datetime
from typing import Optional
from sqlmodel import Session
from db import engine
from models import Reminder, Task
try:
    from dapr.clients import DaprClient
    DAPR_AVAILABLE = True
except ImportError:
    DAPR_AVAILABLE = False

logger = logging.getLogger(__name__)

def schedule_reminder_job(reminder_id: int, remind_at: datetime):
    """
    Schedules a Dapr Job to trigger the reminder at the specified time.
    """
    if not DAPR_AVAILABLE:
        logger.warning(f"Dapr SDK not installed. Cannot schedule job for reminder {reminder_id}")
        return

    try:
        with DaprClient() as d:
            job_id = f"reminder-{reminder_id}"
            # Payload sent back to the callback
            data = {"reminder_id": reminder_id}
            
            # Dapr expects ISO8601 string. 
            due_time = remind_at.isoformat()
            if not due_time.endswith('Z') and '+' not in due_time:
                due_time += 'Z'
            
            # Using alpha1 Jobs API
            d.schedule_job_alpha1(
                name=job_id,
                data=json.dumps(data).encode('utf-8'),
                due_time=due_time
            )
            logger.info(f"Scheduled Dapr Job '{job_id}' for {due_time}")
    except Exception as e:
        err_msg = str(e)
        if "Connection refused" in err_msg or "Failed to connect" in err_msg:
             logger.warning(f"Dapr sidecar not found. Could not schedule job for reminder {reminder_id}")
        else:
            logger.error(f"Failed to schedule Dapr Job for reminder {reminder_id}: {e}")

async def reminder_worker():
    """
    DEPRECATED: Polling-based reminder worker.
    """
    logger.warning("Polling-based reminder_worker is deprecated.")
    return
