from sqlalchemy import select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from app.models import User
from app.schemas import UserCreate
from app.services.password_service import hash_password


class EmailAlreadyExistsError(Exception):
    pass


def get_user_by_email(db: Session, email: str) -> User | None:
    statement = select(User).where(User.email == email.lower())
    return db.scalar(statement)


def create_user(db: Session, user_data: UserCreate) -> User:
    normalized_email = str(user_data.email).lower()

    if get_user_by_email(db, normalized_email):
        raise EmailAlreadyExistsError

    user = User(
        name=user_data.name.strip(),
        email=normalized_email,
        password_hash=hash_password(user_data.password),
        date_of_birth=user_data.date_of_birth,
        height_cm=user_data.height_cm,
    )

    db.add(user)

    try:
        db.commit()
    except IntegrityError:
        db.rollback()
        raise EmailAlreadyExistsError

    db.refresh(user)
    return user