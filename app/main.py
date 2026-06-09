from fastapi import FastAPI
from . import models
from app.database import engine
# from sqlalchemy.orm import Session
from .routers import user,posts,auth,vote
from app.config import settings
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import os
models.Base.metadata.create_all(bind=engine)

app = FastAPI()

os.makedirs("uploads", exist_ok=True)
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

origins=["http://localhost:3000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],)

#defining routers
app.include_router(posts.router)
app.include_router(user.router)
app.include_router(auth.router)
app.include_router(vote.router)

@app.get("/")
def root():
    return {"message": "Welcome To FastAPI App!"}


# @app.get("/sqlalchemy")
# def test_posts(db: Session = Depends(get_db)): # type: ignore
#     posts=db.query(models.Post).all()
#     return {"data":posts}
#     #return{"Success!"}


