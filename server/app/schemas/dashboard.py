from pydantic import BaseModel

from app.schemas.health_metric import HealthMetricResponse


class DashboardUser(BaseModel):
    name: str


class DashboardResponse(BaseModel):
    user: DashboardUser
    latest_metrics: HealthMetricResponse | None