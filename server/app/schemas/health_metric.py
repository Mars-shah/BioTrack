from datetime import datetime
from decimal import Decimal

from pydantic import BaseModel, ConfigDict, Field


class HealthMetricCreate(BaseModel):
    heart_rate: int | None = Field(default=None, ge=20, le=250)
    weight_kg: Decimal | None = Field(default=None, gt=0, le=500)
    steps: int | None = Field(default=None, ge=0)
    sleep_hours: Decimal | None = Field(default=None, ge=0, le=24)


class HealthMetricResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    user_id: int
    heart_rate: int | None
    weight_kg: Decimal | None
    steps: int | None
    sleep_hours: Decimal | None
    recorded_at: datetime