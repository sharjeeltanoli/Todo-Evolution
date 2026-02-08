import asyncio
import json
import logging
from fastapi import APIRouter, Depends, Request
from fastapi.responses import StreamingResponse
from typing import Dict, List
from middleware.auth import get_current_user_id

router = APIRouter()
logger = logging.getLogger(__name__)

# user_id -> List of asyncio.Queue
user_streams: Dict[int, List[asyncio.Queue]] = {}

@router.get("/sync/stream")
async def event_stream(current_user_id: int = Depends(get_current_user_id)):
    """
    Server-Sent Events endpoint for real-time frontend updates.
    """
    async def generator():
        queue = asyncio.Queue()
        if current_user_id not in user_streams:
            user_streams[current_user_id] = []
        user_streams[current_user_id].append(queue)
        
        logger.info(f"User {current_user_id} connected to sync stream")
        
        try:
            # Send initial ping
            yield "data: {\"type\": \"connected\"}\n\n"
            
            while True:
                message = await queue.get()
                yield f"data: {message}\n\n"
        except asyncio.CancelledError:
            logger.info(f"User {current_user_id} disconnected from sync stream")
        finally:
            if current_user_id in user_streams:
                user_streams[current_user_id].remove(queue)
                if not user_streams[current_user_id]:
                    del user_streams[current_user_id]

    return StreamingResponse(generator(), media_type="text/event-stream")

from fastapi import APIRouter, Depends, Request, Response

# ...

@router.post("/sync/push")

async def push_to_stream(request: Request):

    """

    Internal endpoint called by Dapr to push events to connected users.

    """

    try:

        event = await request.json()

        data = event.get("data", {})

        user_id = data.get("user_id")

        

        if user_id and user_id in user_streams:

            message = json.dumps(event)

            for queue in user_streams[user_id]:

                await queue.put(message)

                

        return Response(status_code=204)

    except Exception as e:

        logger.error(f"Error in sync push: {e}")

        return Response(content=str(e), status_code=500)
