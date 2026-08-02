from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models import HealthMetric
from app.schemas import HealthMetricCreate


def create_health_metric(
    db: Session,
    user_id: int,
    metric_data: HealthMetricCreate,
) -> HealthMetric:
    metric = HealthMetric(
        user_id=user_id,
        heart_rate=metric_data.heart_rate,
        weight_kg=metric_data.weight_kg,
        steps=metric_data.steps,
        sleep_hours=metric_data.sleep_hours,
    )

    db.add(metric)
    db.commit()
    db.refresh(metric)

    return metric


def get_health_metrics(
    db: Session,
    user_id: int,
) -> list[HealthMetric]:
    statement = (
        select(HealthMetric)
        .where(HealthMetric.user_id == user_id)
        .order_by(HealthMetric.recorded_at.desc())
    )

    return list(db.scalars(statement).all())