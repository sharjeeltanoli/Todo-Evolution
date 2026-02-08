from unittest.mock import patch, MagicMock
from services.event_publisher import EventPublisher
from datetime import datetime
import json

def test_publish_event_success():
    publisher = EventPublisher(pubsub_name="test-pubsub")
    mock_dapr = MagicMock()
    
    # Mock DaprClient context manager
    with patch("services.event_publisher.DaprClient") as MockClient:
        MockClient.return_value.__enter__.return_value = mock_dapr
        
        data = {"id": 1, "title": "Test Task", "created_at": datetime.utcnow()}
        publisher.publish_event("task.created", data)
        
        # Verify publish_event called
        mock_dapr.publish_event.assert_called_once()
        args, kwargs = mock_dapr.publish_event.call_args
        assert kwargs['pubsub_name'] == "test-pubsub"
        assert kwargs['topic_name'] == "task.created"
        
        # Verify data serialization
        published_data = json.loads(kwargs['data'])
        assert published_data['title'] == "Test Task"
        assert published_data['id'] == 1

def test_publish_event_failure():
    publisher = EventPublisher(pubsub_name="test-pubsub")
    mock_dapr = MagicMock()
    mock_dapr.publish_event.side_effect = Exception("Dapr Error")
    
    with patch("services.event_publisher.DaprClient") as MockClient:
        MockClient.return_value.__enter__.return_value = mock_dapr
        
        data = {"id": 1}
        # Should catch exception and log it (not raise)
        publisher.publish_event("task.created", data)
        
        mock_dapr.publish_event.assert_called_once()
