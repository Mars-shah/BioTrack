from datetime import date, datetime
from decimal import Decimal

from pydantic import BaseModel, ConfigDict, EmailStr, Field


class UserCreate(BaseModel):
    name: str = Field(min_length=2, max_length=255)
    email: EmailStr
    password: str = Field(min_length=8, max_length=128)
    date_of_birth: date | None = None
    height_cm: Decimal | None = Field(default=None, gt=0, le=300)


class UserResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    email: EmailStr
    date_of_birth: date | None
    height_cm: Decimal | None
    profile_picture: str | None
    created_at: datetime