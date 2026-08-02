from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.dependencies import get_current_user
from app.models import User
from app.schemas import UserCreate, UserResponse

from app.services.user_service import (
    EmailAlreadyExistsError,
    create_user,
)

router = APIRouter(
    prefix="/users",
    tags=["Users"],
)


@router.post(
    "/register",
    response_model=UserResponse,
    status_code=status.HTTP_201_CREATED,
)
def register_user(
    user_data: UserCreate,
    db: Session = Depends(get_db),
) -> UserResponse:
    try:
        return create_user(db, user_data)
    except EmailAlreadyExistsError:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="An account with this email already exists.",
        )
    
@router.get(
    "/me",
    response_model=UserResponse,
)
def read_current_user(
    current_user: User = Depends(get_current_user),
) -> User:
    return current_user