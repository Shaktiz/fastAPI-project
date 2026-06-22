from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app import models, oauth2
from app.database import get_db

router = APIRouter(
    prefix="/saved-posts",
    tags=["Saved Posts"]
)


@router.post("/{post_id}")
def save_post(
    post_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(oauth2.get_current_user)
):

    already_saved = db.query(models.SavedPost).filter(
        models.SavedPost.post_id == post_id,
        models.SavedPost.user_id == current_user.id
    ).first()

    if already_saved:
        return {
            "message": "Post already saved"
        }

    save = models.SavedPost(
        post_id=post_id,
        user_id=current_user.id
    )

    db.add(save)
    db.commit()

    return {
        "message": "Post Saved Successfully"
    }
    
@router.get("/")
def get_saved_posts(
    db: Session = Depends(get_db),
    current_user=Depends(oauth2.get_current_user)
):

    posts = (
        db.query(models.Post)
        .join(
            models.SavedPost,
            models.SavedPost.post_id == models.Post.id
        )
        .filter(
            models.SavedPost.user_id == current_user.id
        )
        .all()
    )

    print("CURRENT USER:", current_user.id)
    print("POSTS:", posts)

    return posts

@router.get("/ids")
def get_saved_post_ids(
    db: Session = Depends(get_db),
    current_user=Depends(oauth2.get_current_user)
):

    saved = db.query(models.SavedPost).filter(
        models.SavedPost.user_id == current_user.id
    ).all()

    return [s.post_id for s in saved]

@router.delete("/{post_id}")
def unsave_post(
    post_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(oauth2.get_current_user)
):

    saved_post = db.query(models.SavedPost).filter(
        models.SavedPost.post_id == post_id,
        models.SavedPost.user_id == current_user.id
    ).first()

    if not saved_post:
        raise HTTPException(
            status_code=404,
            detail="Saved post not found"
        )

    db.delete(saved_post)

    db.commit()

    return {
        "message": "Post removed from saved posts"
    }