import bcrypt
from fastapi import FastAPI,Depends,Response,status,HTTPException,APIRouter
from .. import models,schemas,oauth2
from ..database import get_db
from .. import utils
from sqlalchemy.orm import Session
from fastapi import UploadFile, File
import os
import shutil

router=APIRouter(prefix="/users",tags=['Users'])

@router.post("/", status_code=status.HTTP_201_CREATED, response_model=schemas.UserOut)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):

    hashed_password = utils.hash(user.password)

    user.password = hashed_password

    new_user = models.Users(**user.dict())

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user


@router.get("/")
def get_all_users(db:Session=Depends(get_db),current_user:int =Depends(oauth2.get_current_user)): # type: ignore
# def get_all_users_id(db:Session=Depends(get_db),current_user:int =Depends(oauth2.get_current_user)): # type: ignore
    # users=db.query(models.Users).filter(models.Users.id==current_user.id).all() #type:ignore
    
    users=db.query(models.Users).all()
    return users


@router.get("/me", response_model=schemas.UserOut)
def get_my_profile(current_user: models.Users = Depends(oauth2.get_current_user)):
    return current_user

@router.put("/me", response_model=schemas.UserOut)
def update_my_profile(updated_user: schemas.UserUpdate,db: Session = Depends(get_db),current_user: models.Users = Depends(oauth2.get_current_user)):
    user_query = db.query(models.Users).filter(models.Users.id == current_user.id)
    user_query.update(updated_user.model_dump(exclude_unset=True),synchronize_session=False) # type: ignore
    db.commit()
    return user_query.first()

@router.post("/upload-profile-image")
def upload_profile_image(file: UploadFile = File(...),db: Session = Depends(get_db),current_user: models.Users = Depends(oauth2.get_current_user)):
    folder = "app/uploads/profile_pics"

    os.makedirs(folder, exist_ok=True)

    filename = f"user_{current_user.id}_{file.filename}"

    filepath = os.path.join(folder, filename)

    with open(filepath, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    image_url = f"/uploads/profile_pics/{filename}"

    current_user.profile_image = image_url # type: ignore

    db.commit()

    return {
        "message": "Image uploaded successfully",
        "profile_image": image_url}

@router.get("/{id}",response_model=schemas.UserOut)
def get_user_by_id(id:int,db:Session=Depends(get_db)): # type: ignore
    user=db.query(models.Users).filter(models.Users.id == id).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f'User with id:{id} was not found')   
    return user

@router.put("/{id}", response_model=schemas.UserOut)
# def update_user(id: int,updated_user: schemas.UserUpdate,db: Session = Depends(get_db),current_user=Depends(oauth2.get_current_user)):
def update_user(id: int,updated_user: schemas.UserUpdate,db: Session = Depends(get_db),current_user: models.Users = Depends(oauth2.get_current_user)):
    user_query = db.query(models.Users).filter(models.Users.id == id)
    user = user_query.first()
    if not user:
        raise HTTPException(status_code=404,detail="User not found")
    if user.id != current_user.id: # type: ignore
        raise HTTPException(status_code=403,detail="Not authorized")
    # user_query.update(updated_user.dict(),synchronize_session=False) # type: ignore
    user_query.update(updated_user.model_dump(),synchronize_session=False) # type: ignore
    db.commit()
    return user_query.first()

@router.delete("/{id}")
def delete_users(id:int,db:Session=Depends(get_db),current_user:int =Depends(oauth2.get_current_user)): # type: ignore
    user_query=db.query(models.Users).filter(models.Users.id==id)
    user=user_query.first()
    
    if user == None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"User with id:{id} does not exist")
        
    if user.id !=current_user.id: #type: ignore
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN,
                            detail=f"not autorize")
    user_query.delete(synchronize_session=False)
    db.commit()
    return {"message":"deleting Successful!"}