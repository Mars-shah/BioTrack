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


def update_health_metric(
    db: Session,
    user_id: int,
    metric_id: int,
    metric_data: HealthMetricCreate,
) -> HealthMetric | None:
    metric = db.get(HealthMetric, metric_id)

    if metric is None:
        return None

    if metric.user_id != user_id:
        return None

    metric.heart_rate = metric_data.heart_rate
    metric.weight_kg = metric_data.weight_kg
    metric.steps = metric_data.steps
    metric.sleep_hours = metric_data.sleep_hours

    db.commit()
    db.refresh(metric)

    return metric


def delete_health_metric(
    db: Session,
    user_id: int,
    metric_id: int,
) -> bool:
    metric = db.get(HealthMetric, metric_id)

    if metric is None:
        return False

    if metric.user_id != user_id:
        return False

    db.delete(metric)
    db.commit()

    return True