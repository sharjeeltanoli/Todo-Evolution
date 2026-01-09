from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
import os
import jwt

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/token")

BETTER_AUTH_SECRET = os.getenv("BETTER_AUTH_SECRET")
if not BETTER_AUTH_SECRET:
    raise ValueError("BETTER_AUTH_SECRET environment variable not set.")

def get_current_user_id(token: str = Depends(oauth2_scheme)) -> int:
    try:
        payload = jwt.decode(token, BETTER_AUTH_SECRET, algorithms=["HS256"])
        user_id = payload.get("sub")
        if user_id is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Could not validate credentials",
                headers={"WWW-Authenticate": "Bearer"},
            )
        return int(user_id)
    except jwt.PyJWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
