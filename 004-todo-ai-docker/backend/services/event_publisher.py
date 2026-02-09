import json
import os
from datetime import datetime
from typing import Any, Dict, Optional

DAPR_ENABLED = os.getenv("DAPR_ENABLED", "true").lower() == "true"

if DAPR_ENABLED:
    try:
        from dapr.clients import DaprClient
        DAPR_AVAILABLE = True
    except ImportError:
        DAPR_AVAILABLE = False
        print("Dapr Python SDK not installed. Event publishing will be disabled.")
else:
    DAPR_AVAILABLE = False
    print("Dapr is disabled via DAPR_ENABLED env var. Event publishing will be skipped.")

class EventPublisher:
    def __init__(self, pubsub_name: str = "pubsub"):
        self.pubsub_name = pubsub_name

    def publish_event(self, topic: str, data: Dict[str, Any], source: str = "todo-backend"):
        """
        Publishes an event to the Dapr pubsub component.
        """
        if not DAPR_AVAILABLE:
            print(f"Skipping event publish to '{topic}' (Dapr SDK missing)")
            return

        def json_serial(obj):
            if isinstance(obj, datetime):
                return obj.isoformat()
            raise TypeError(f"Type {type(obj)} not serializable")

        try:
            # We serialize manually to handle datetimes
            payload = json.dumps(data, default=json_serial)
            
            with DaprClient() as d:
                d.publish_event(
                    pubsub_name=self.pubsub_name,
                    topic_name=topic,
                    data=payload,
                    data_content_type='application/json'
                )
                print(f"Published event to topic '{topic}': {payload[:100]}...")
        except Exception as e:
            # Check if it's a connection error (sidecar missing)
            err_msg = str(e)
            if "Connection refused" in err_msg or "Failed to connect" in err_msg:
                print(f"Dapr sidecar not found. Skipping event publish to '{topic}'.")
            else:
                import traceback
                traceback.print_exc()
                print(f"Error publishing event to topic '{topic}': {e}")
            # Non-blocking: we log and continue, unless strict consistency is required.
            # In a real app, we might queue this locally or raise error.
            
event_publisher = EventPublisher()
