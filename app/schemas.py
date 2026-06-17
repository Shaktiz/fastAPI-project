from pydantic import BaseModel, EmailStr, Field, conint
from datetime import datetime
from typing import Optional

class PostBase(BaseModel):
    title: str
    content: str
    published: bool = True
    
class PostCreate(PostBase):
    pass

class UserOut(BaseModel):
    id: int
    email: EmailStr
    address: Optional[str]
    phone_number: Optional[str]
    bio: Optional[str]
    profile_image: Optional[str]

    class Config:
        from_attributes = True
        
class Post(PostBase):
    id: int
    owner_id:int
    
    owner:UserOut #to saw owner details
    
    class Config:
        from_attributes = True

class PostResponse(PostBase):
    id: int
    owner_id: int
    
    
    class Config:
        from_attributes = True


class UserCreate(BaseModel):
    email: EmailStr
    password: str = Field(min_length=8, max_length=72)
    phone_number: Optional[int]= None
    address:str

class UserUpdate(BaseModel):
    email: str
    address: str
    phone_number: str
    bio: Optional[str] = None
    profile_image: Optional[str] = None


                
class UserLogin(BaseModel):
    email:EmailStr
    password:str
    
class Token(BaseModel):
    access_token:str
    token_type:str

class Tokendata(BaseModel):
    id: Optional[int] = None

class Vote(BaseModel):
    post_id:int
    dir: conint (le=1) # type: ignore
    
class PostOut(BaseModel):
    Post: Post #calling Post class to acquire Post parameters
    votes: int # +1(add vote) or 0(remove vote) based on user input

    class Config: 
        from_attributes = True