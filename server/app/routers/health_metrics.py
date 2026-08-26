from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.dependencies import get_current_user
from app.models import User
from app.schemas import HealthMetricCreate, HealthMetricResponse

from app.services.health_metric_service import (
    create_health_metric,
    delete_health_metric,
    get_health_metrics,
    update_health_metric,
)

router = APIRouter(
    prefix="/health-metrics",
    tags=["Health Metrics"],
)


@router.post(
    "",
    response_model=HealthMetricResponse,
    status_code=status.HTTP_201_CREATED,
)
def add_health_metric(
    metric_data: HealthMetricCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> HealthMetricResponse:
    return create_health_metric(
        db,
        current_user.id,
        metric_data,
    )


@router.get(
    "",
    response_model=list[HealthMetricResponse],
)
def read_health_metrics(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> list[HealthMetricResponse]:
    return get_health_metrics(
        db,
        current_user.id,
    )


@router.put(
    "/{metric_id}",
    response_model=HealthMetricResponse,
)
def edit_health_metric(
    metric_id: int,
    metric_data: HealthMetricCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> HealthMetricResponse:
    updated_metric = update_health_metric(
        db,
        current_user.id,
        metric_id,
        metric_data,
    )

    if updated_metric is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Health metric not found.",
        )

    return updated_metric


@router.delete(
    "/{metric_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def remove_health_metric(
    metric_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    deleted = delete_health_metric(
        db,
        current_user.id,
        metric_id,
    )

    if not deleted:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Health metric not found.",
        )