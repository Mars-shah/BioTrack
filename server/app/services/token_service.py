import os
from datetime import UTC, datetime, timedelta

import jwt
from dotenv import load_dotenv
from jwt import ExpiredSignatureError, InvalidTokenError

load_dotenv()

SECRET_KEY = os.getenv("JWT_SECRET_KEY")
ALGORITHM = os.getenv("JWT_ALGORITHM", "HS256")
ACCESS_TOKEN_EXPIRE_MINUTES = int(
    os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "30")
)

if not SECRET_KEY:
    raise ValueError("JWT_SECRET_KEY is missing from the .env file")


def create_access_token(user_id: int) -> str:
    expires_at = datetime.now(UTC) + timedelta(
        minutes=ACCESS_TOKEN_EXPIRE_MINUTES
    )

    payload = {
        "sub": str(user_id),
        "exp": expires_at,
    }

    return jwt.encode(
        payload,
        SECRET_KEY,
        algorithm=ALGORITHM,
    )
class InvalidTokenException(Exception):
    pass


def decode_access_token(token: str) -> int:
    try:
        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM],
        )

        user_id = payload.get("sub")

        if user_id is None:
            raise InvalidTokenException

        return int(user_id)

    except (ExpiredSignatureError, InvalidTokenError, ValueError):
        raise InvalidTokenException