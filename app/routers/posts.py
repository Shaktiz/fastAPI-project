from fastapi import FastAPI,Depends,Response,status,HTTPException,APIRouter
from .. import models,schemas,oauth2
from typing import List
from typing import Optional
from app.database import get_db
from sqlalchemy.orm import Session
from sqlalchemy import func


router=APIRouter( prefix="/posts",tags=['Posts'])

@router.get("/",response_model=List[schemas.PostOut])
# @router.get("/")
def get_all_posts(db:Session=Depends(get_db),current_user:int = Depends(oauth2.get_current_user), limit : int = 10, skip:int=0, search:Optional[str]=""): 
    #1
    # return {"data":"This is your posts"}
    # print(posts)
    # return {"data":my_posts}
    
    #2
    # cursor.execute("SELECT * FROM posts")
    # posts=cursor.fetchall()
    # return {"data":posts}
    
    #3
    # posts=db.query(models.Post).all() #to fetch all id from post 
    # print(limit)
    
    # posts=db.query(models.Post).filter(models.Post.title.contains(search)).limit(limit).offset(skip).all()
    
    # posts=db.query(models.Post).filter(models.Post.owner_id==current_user.id).all() #type: ignore 
    # (Above statement) retreive post with specific id as per user login-id(or owner-id)
    
    #4M
    posts=db.query(models.Post, func.count(models.Vote.post_id).label("votes")).join(
        models.Vote, models.Vote.post_id == models.Post.id, isouter=True).group_by(
                                                            models.Post.id).filter(models.Post.title.contains(search)).limit(limit).offset(skip).all()
    # print(results)
    return posts

@router.post("/",status_code=status.HTTP_201_CREATED,response_model=schemas.Post)
# def create_posts(payLoad: dict =Body(...)):
#     print(payLoad)
    # return{"new_post":f"title {payLoad['title']} content: {payLoad['content']}"}
    
# def create_posts(new_post:Post):   # title str, content str #1,2M
    #1M
    # print(new_post) 
    # print(new_post.dict())
    # print(new_post.published)
    # print(new_post.rating)
    # return{"data":"new post"}
    
    #2M
    # post_dict=new_post.dict() 
    # post_dict['id']=randrange(0,100000)
    # my_posts.append(post_dict)
    
def create_posts(post:schemas.PostCreate,db:Session=Depends(get_db),current_user:int =Depends(oauth2.get_current_user)): #user_id #type: ignore
    #3M
    # cursor.execute("""INSERT INTO posts (title,content,published) 
    # VALUES (%s,%s,%s) RETURNING *""",(post.title,
    # post.content,post.published)) #adding new record
    # new_post=cursor.fetchone()
    # conn.commit()  #commit: for changes in Database and to save it
    # return{"data":new_post}

    #4M 
    # new_post=models.Post(title=post.title,content=post.content,published=post.published)
    # db.add(new_post)
    # db.commit()
    # db.refresh(new_post)
    # return new_post 

    #5M
    # print(**post.dict())
    # print(current_user.id)
    # print(current_user.email) # type: ignore
    new_post=models.Post(owner_id=current_user.id,**post.dict())# in this method we don't need to write any parameter (it will automatically distribute) #type: ignore  
    db.add(new_post)
    db.commit()
    db.refresh(new_post)
    return new_post 
    
   
@router.get("/{id}",response_model=schemas.PostOut) #path parameter
def get_post(id:int, response:Response,db:Session=Depends(get_db)): # type: ignore
    
    #1M
    # post=find_post(id)
    # print(post)
    # return{"post_detail":f"Here is post {id}"}
    
    #2M
    # cursor.execute("""SELECT * FROM posts WHERE id=%s""",(str(id),))
    # post=cursor.fetchone()
    # print(post)
    
    #3M
    # post=db.query(models.Post).filter(models.Post.id == id).first()
    
    #4M
    post=db.query(models.Post, func.count(models.Vote.post_id).label("votes")).join(
        models.Vote, models.Vote.post_id == models.Post.id, isouter=True).group_by(models.Post.id).filter(models.Post.id == id).first()
    
    if not post:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f'post with id:{id} was not found')   
    return post


@router.delete("/{id}")
def delete_post(id:int,db:Session=Depends(get_db),current_user:int =Depends(oauth2.get_current_user)): # type: ignore
    #1M
    # find the index in array that has required id
    # index = find_index_post(id)
    # if index is None:
    #     raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
    #                     detail=f'post with id:{id} was not found')
    # my_posts.pop(index)
    # return {"message":"post was succesfully deleted"}
    # if del_post == None:
    #     raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
    #                         detail=f"post with id:{id} does not exist")
    # # return Response(status_code=status.HTTP_204_NO_CONTENT)
    # return {"message":"post was succesfully deleted!"}
    
    #2M
    # cursor.execute(""" DELETE FROM posts WHERE id=%s RETURNING *""",(id,))
    # del_post=cursor.fetchone()
    # conn.commit()
    
    #3M
    post_query=db.query(models.Post).filter(models.Post.id==id)
    post=post_query.first()
    
    if post == None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"post with id:{id} does not exist")
        
    if post.owner_id !=current_user.id: #type: ignore
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN,
                            detail=f"not autorize")
    post_query.delete(synchronize_session=False)
    db.commit()
    return {"message":"deleting Successful!"}


@router.put("/{id}",response_model=schemas.Post)
# def update_post(id:int, post:Post,db:Session=Depends(get_db)):
    # print(post)
    # return{"message":"updated post"}
    
    #1M
    # index = find_index_post(id)
    # if index is None:
    #     raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
    #                     detail=f'post with id:{id} was not found')
    # post_dict=post.dict()
    # post_dict['id']=id
    # my_posts[index]=post_dict
    # return {"data":post_dict}
    
    #2M
    # cursor.execute(""" UPDATE posts SET title=%s,
    # content=%s,published=%s WHERE id=%s RETURNING * """,
    # (post.title,post.content,post.published,str(id),))
    # updated_post=cursor.fetchone()
    # conn.commit()
    # if updated_post==None:
    #     raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
    #                         detail=f"post with id:{id} does not exist")
    # return{"data":updated_post}

    #3M
def update_post(id:int, updated_post:schemas.PostCreate,db:Session=Depends(get_db),current_user:int=Depends(oauth2.get_current_user)): # type: ignore
    post_query=db.query(models.Post).filter(models.Post.id==id)
    post=post_query.first()
    if post==None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"post with id:{id} does not exist")
    if post.owner_id !=current_user.id: #type: ignore
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN,
                            detail=f"not authorize") 
    # post_query.update({'title':'This is updated title','content':'new updated content'}, synchronize_session=False)
    post_query.update(updated_post.dict(), synchronize_session=False) # type: ignore
    db.commit()
    return post_query.first()