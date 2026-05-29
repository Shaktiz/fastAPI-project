# from sqlalchemy import create_engine
# from sqlalchemy.ext.declarative import declarative_base
# from sqlalchemy.orm import sessionmaker
# from pydantic import BaseModel
# from random import randrange
# import psycopg2
# from psycopg2.extras import RealDictCursor
# import time
# from typing import Optional,List
# import bcrypt
# from fastapi.params import Body, Depends
# from .config import settings

# # SQLALCHEMY_DATABASE_URL=f'postgresql://postgres:123456@localhost:5432/fastapi'
# SQLALCHEMY_DATABASE_URL=f'postgresql://{settings.database_username}:{settings.database_password}@{settings.database_hostname}:{settings.database_port}/{settings.database_name}'

# engine=create_engine(SQLALCHEMY_DATABASE_URL)
# sessionlocal=sessionmaker(autocommit=False,autoflush=False,bind=engine)
# Base=declarative_base()

# #Dependency:-
# def get_db():
#     db=sessionlocal()
#     try:
#         yield db
#     finally:
#         db.close()


# # class Post(BaseModel):
# #     title: str
# #     content: str
# #     published: bool=True
    
# # while True:
# #     try:
# #         conn=psycopg2.connect(host='localhost',database='fastapi',user='postgres',
# #                               password='123456',cursor_factory=RealDictCursor)
# #         cursor=conn.cursor()
# #         print("Database connection was successfull!")
# #         break
# #     except Exception as error:
# #         print("connecting to DB failed!")
# #         print("Error:",error)
# #         # time.sleep(2)

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os

DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    raise Exception("DATABASE_URL environment variable not set")

if DATABASE_URL.startswith("postgres://"):
    DATABASE_URL = DATABASE_URL.replace(
        "postgres://",
        "postgresql://",
        1
    )

engine = create_engine(DATABASE_URL)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()