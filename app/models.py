from .database import Base
from sqlalchemy import TIME, TIMESTAMP,Column, DateTime, ForeignKey,Integer,String,Boolean, func,text
from sqlalchemy.orm import relationship
# from datetime import datetime

class Post(Base):
    __tablename__='posts'
    
    id=Column(Integer,primary_key=True,nullable=False)
    title=Column(String,nullable=False)
    content=Column(String,nullable=False)
    published=Column(Boolean,server_default="True",nullable=False)
    # created_at=Column(TIMESTAMP(timezone=True),nullable=False,server_default=text("now()"))
    # created_at=Column(DateTime(timezone=True),server_default=func.now(),nullable=False)
    owner_id=Column(Integer,ForeignKey("users.id",ondelete="CASCADE"),nullable=False)
    
    owner=relationship("Users")

class Users(Base):
    __tablename__="users"
    
    id=Column(Integer,primary_key=True,nullable=False)
    email=Column(String,unique=True,nullable=False)
    password=Column(String,nullable=False)
    # created_at=Column(TIME(timezone=True),nullable=False,server_default=text("now()"))
    phone_number=Column(String)
    address=Column(String)
    
class Vote(Base):
    __tablename__="votes"
    user_id=Column(Integer,ForeignKey("users.id",ondelete="CASCADE"),primary_key=True)
    post_id=Column(Integer,ForeignKey("posts.id",ondelete="CASCADE"),primary_key=True)