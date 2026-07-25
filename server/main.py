from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def root():
    return {"message": "BioTrack API is running"}