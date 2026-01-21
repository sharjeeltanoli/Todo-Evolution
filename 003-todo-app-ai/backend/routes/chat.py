from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select
from db import get_session
from middleware.auth import get_current_user_id
from models import Conversation, Message
from services.chat import chat_orchestrator
from pydantic import BaseModel

router = APIRouter()

class ChatRequest(BaseModel):
    message: str
    conversation_id: Optional[int] = None

@router.post("/chat")
def chat_endpoint(
    request: ChatRequest,
    current_user_id: int = Depends(get_current_user_id),
    session: Session = Depends(get_session)
):
    # 1. Get or Create Conversation
    if request.conversation_id:
        conversation = session.exec(
            select(Conversation).where(
                Conversation.id == request.conversation_id, 
                Conversation.user_id == current_user_id
            )
        ).first()
        if not conversation:
            raise HTTPException(status_code=404, detail="Conversation not found")
    else:
        conversation = Conversation(user_id=current_user_id)
        session.add(conversation)
        session.commit()
        session.refresh(conversation)
    
    # 2. Call Orchestrator
    try:
        response_text = chat_orchestrator(
            user_id=current_user_id,
            conversation_id=conversation.id,
            user_message=request.message
        )
        return {
            "response": response_text,
            "conversation_id": conversation.id
        }
    except Exception as e:
        print(f"Chat Error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/chat/history/{conversation_id}")
def get_chat_history(
    conversation_id: int,
    current_user_id: int = Depends(get_current_user_id),
    session: Session = Depends(get_session)
):
    history = session.exec(
        select(Message)
        .where(Message.conversation_id == conversation_id, Message.user_id == current_user_id)
        .order_by(Message.created_at)
    ).all()
    return history

@router.get("/chat/conversations")
def get_conversations(
    current_user_id: int = Depends(get_current_user_id),
    session: Session = Depends(get_session)
):
    conversations = session.exec(
        select(Conversation).where(Conversation.user_id == current_user_id)
    ).all()
    return conversations
