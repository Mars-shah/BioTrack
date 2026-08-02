from datetime import date, datetime

from sqlalchemy import Date, DateTime, Numeric, String, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base

from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from app.models.health_metrics import HealthMetric


class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    email: Mapped[str] = mapped_column(
        String(255),
        unique=True,
        nullable=False,
        index=True,
    )
    password_hash: Mapped[str] = mapped_column(String(255), nullable=False)

    date_of_birth: Mapped[date | None] = mapped_column(
        Date,
        nullable=True,
    )

    height_cm: Mapped[float | None] = mapped_column(
        Numeric(5, 2),
        nullable=True,
    )

    profile_picture: Mapped[str | None] = mapped_column(
        String(255),
        nullable=True,
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        server_default=func.now(),
        nullable=False,
    )

    health_metrics: Mapped[list["HealthMetric"]] = relationship(
    back_populates="user",
    cascade="all, delete-orphan",
)