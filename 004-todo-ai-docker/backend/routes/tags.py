from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select, func
from db import get_session
from middleware.auth import get_current_user_id
from models import Tag, TaskTag

router = APIRouter()

@router.get("/users/{user_id}/tags")
def get_user_tags(
    user_id: int,
    current_user_id: int = Depends(get_current_user_id),
    session: Session = Depends(get_session)
):
    if user_id != current_user_id:
        raise HTTPException(status_code=403, detail="Forbidden")
    
    # Get tags with task counts
    # Simple list for now, counting can be added later if needed
    tags = session.exec(select(Tag).where(Tag.user_id == user_id)).all()
    return tags

@router.post("/users/{user_id}/tags")
def create_tag(
    user_id: int,
    name: str,
    color: str = None,
    current_user_id: int = Depends(get_current_user_id),
    session: Session = Depends(get_session)
):
    if user_id != current_user_id:
        raise HTTPException(status_code=403, detail="Forbidden")
    
    existing = session.exec(select(Tag).where(Tag.user_id == user_id, Tag.name == name)).first()
    if existing:
        return existing
        
    tag = Tag(user_id=user_id, name=name, color=color)
    session.add(tag)
    session.commit()
    session.refresh(tag)
    return tag

@router.delete("/users/{user_id}/tags/{tag_id}", status_code=204)
def delete_tag(
    user_id: int,
    tag_id: int,
    current_user_id: int = Depends(get_current_user_id),
    session: Session = Depends(get_session)
):
    if user_id != current_user_id:
        raise HTTPException(status_code=403, detail="Forbidden")
    
    tag = session.exec(select(Tag).where(Tag.id == tag_id, Tag.user_id == user_id)).first()
    if not tag:
        raise HTTPException(status_code=404, detail="Tag not found")
        
    session.delete(tag)
    session.commit()
    return None
