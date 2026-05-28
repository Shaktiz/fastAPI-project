from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from app import models, schemas,oauth2
from app.database import get_db
import bcrypt
from .. import utils
# router=APIRouter(tags=['Authentication'])

# @router.post("/login")
# def login(user_credentials:schemas.UserLogin,db: Session=Depends(database.get_db)):
    
#     user = db.query(models.Users).filter(models.Users.email==user_credentials.email).first()
#     if not user:
#         raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail=f'Invalid Credentials')
#     if not utils.verify(user_credentials.password,user.password):
#         raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail=f'Invalid Credentials')
    
#     #creating a token:
#     return {"token":"Example Token"}


router = APIRouter(tags=['Authentication'])

@router.post("/login",response_model=schemas.Token)
 # def login(user_credentials: schemas.UserLogin, db: Session = Depends(get_db)):
def login(user_credentials: OAuth2PasswordRequestForm=Depends(), db: Session = Depends(get_db)):
    user = db.query(models.Users).filter(models.Users.email == user_credentials.username).first()

    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail="Invalid credentials")

    # if not bcrypt.checkpw(user_credentials.password.encode('utf-8'),user.password.encode('utf-8')):
    #     raise HTTPException(status_code=status.HTTP_403_FORBIDDEN,detail="Invalid credentials")
    if not utils.verify(user_credentials.password, user.password):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN,detail="Invalid Credentials")
     
    # return {"message": "Login successful"}
    access_token=oauth2.create_access_token(data={"user_id":user.id})
    return {"access_token":access_token,"token_type":"bearer"}




