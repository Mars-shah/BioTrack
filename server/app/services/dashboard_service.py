from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models import HealthMetric, User
from app.schemas import DashboardResponse, DashboardUser


def get_dashboard(
    db: Session,
    current_user: User,
) -> DashboardResponse:
    statement = (
        select(HealthMetric)
        .where(HealthMetric.user_id == current_user.id)
        .order_by(HealthMetric.recorded_at.desc())
        .limit(1)
    )

    latest_metric = db.scalar(statement)

    return DashboardResponse(
        user=DashboardUser(name=current_user.name),
        latest_metrics=latest_metric,
    )