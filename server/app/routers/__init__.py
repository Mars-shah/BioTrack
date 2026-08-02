from app.routers.auth import router as auth_router
from app.routers.health_metrics import router as health_metrics_router
from app.routers.users import router as users_router

__all__ = [
    "auth_router",
    "health_metrics_router",
    "users_router",
]