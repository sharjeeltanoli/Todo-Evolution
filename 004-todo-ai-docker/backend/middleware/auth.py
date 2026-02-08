from fastapi import Depends, HTTPException, status, Request
from fastapi.security import OAuth2PasswordBearer
from typing import Optional
import os
import jwt

# Make auto_error=False to handle missing token manually (for query param support)
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/token", auto_error=False)

BETTER_AUTH_SECRET = os.getenv("BETTER_AUTH_SECRET")
if not BETTER_AUTH_SECRET:
    raise ValueError("BETTER_AUTH_SECRET environment variable not set.")

def get_current_user_id(request: Request, token: Optional[str] = Depends(oauth2_scheme)) -> int:
    # --- Dapr Service-to-Service Bypass ---
    # When Dapr invokes a service, it adds the 'dapr-caller-app-id' header.
    # We can trust this if we are running in a secure internal network (like K8s).
    dapr_caller = request.headers.get("dapr-caller-app-id")
    if dapr_caller in ["recurring-task-service"]:
        # For internal calls, the user_id is usually passed in the path or body.
        # Here we extract it from the path if available.
        user_id_path = request.path_params.get("user_id")
        if user_id_path:
            return int(user_id_path)

    # Check query parameter if header is missing
    token_query = request.query_params.get("token")
    actual_token = token if token else token_query
    
    if not actual_token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not authenticated",
            headers={"WWW-Authenticate": "Bearer"},
        )
        
    try:
        payload = jwt.decode(actual_token, BETTER_AUTH_SECRET, algorithms=["HS256"])
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

