from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, engine
from app.models import HealthMetric, User
from app.routers import (
    auth_router,
    dashboard_router,
    health_metrics_router,
    users_router,
)

Base.metadata.create_all(bind=engine)

app = FastAPI(title="BioTrack AI API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://bio-track-amber.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(users_router)
app.include_router(auth_router)
app.include_router(health_metrics_router)
app.include_router(dashboard_router)


@app.get("/")
def root():
    return {
        "message": "Welcome to BioTrack AI",
        "version": "1.0",
    }