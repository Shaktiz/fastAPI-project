from .database import Base
from sqlalchemy import TIME, TIMESTAMP,Column, DateTime, ForeignKey,Integer,String,Boolean, func,text
from sqlalchemy.orm import relationship

class Post(Base):
    __tablename__='posts'
    
    id=Column(Integer,primary_key=True,nullable=False)
    title=Column(String,nullable=False)
    content=Column(String,nullable=False)
    published=Column(Boolean,server_default="True",nullable=False)
    owner_id=Column(Integer,ForeignKey("users.id",ondelete="CASCADE"),nullable=False)
    created_at = Column(TIMESTAMP(timezone=True),server_default=text("now()"),nullable=False)
    owner=relationship("Users")

class Users(Base):
    __tablename__="users"
    
    id=Column(Integer,primary_key=True,nullable=False)
    profile_image = Column(String, nullable=True)
    bio = Column(String, nullable=True)
    email=Column(String,unique=True,nullable=False)
    password=Column(String,nullable=False)
    phone_number=Column(String)
    address=Column(String)
    profile_image = Column(String, nullable=True)
    bio = Column(String, nullable=True)
    
class Vote(Base):
    __tablename__="votes"
    user_id=Column(Integer,ForeignKey("users.id",ondelete="CASCADE"),primary_key=True)
    post_id=Column(Integer,ForeignKey("posts.id",ondelete="CASCADE"),primary_key=True)
    
    
class SavedPost(Base):
    __tablename__ = "saved_posts"

    user_id = Column(Integer,ForeignKey("users.id", ondelete="CASCADE"),primary_key=True)

    post_id = Column(Integer,ForeignKey("posts.id", ondelete="CASCADE"),primary_key=True)

    created_at = Column(TIMESTAMP(timezone=True),server_default=text("now()"),nullable=False)


class Comment(Base):
    __tablename__ = "comments"

    id = Column(Integer,primary_key=True,nullable=False)

    content = Column(String,nullable=False)

    user_id = Column(Integer,ForeignKey("users.id", ondelete="CASCADE"),nullable=False)

    post_id = Column(Integer,ForeignKey("posts.id", ondelete="CASCADE"),nullable=False)

    created_at = Column(TIMESTAMP(timezone=True),server_default=text("now()"),nullable=False)

    user = relationship("Users")
    post = relationship("Post")