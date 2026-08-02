from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers import users_router

app = FastAPI(title="BioTrack AI API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(users_router)


@app.get("/")
def root():
    return {
        "message": "Welcome to BioTrack AI",
        "version": "1.0",
    }