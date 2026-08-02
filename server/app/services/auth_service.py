from sqlalchemy.orm import Session

from app.models import User
from app.services.password_service import verify_password
from app.services.token_service import create_access_token
from app.services.user_service import get_user_by_email


class InvalidCredentialsError(Exception):
    pass


def authenticate_user(
    db: Session,
    email: str,
    password: str,
) -> User:
    user = get_user_by_email(db, email)

    if user is None:
        raise InvalidCredentialsError

    if not verify_password(password, user.password_hash):
        raise InvalidCredentialsError

    return user


def login_user(
    db: Session,
    email: str,
    password: str,
) -> str:
    user = authenticate_user(db, email, password)
    return create_access_token(user.id)