from fastapi import APIRouter, Depends
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

    save = models.SavedPost(
        post_id=post_id,
        user_id=current_user.id
    )

    db.add(save)
    db.commit()

    return {"message": "Post Saved"}

@router.get("/")
def get_saved_posts(
    db: Session = Depends(get_db),
    current_user=Depends(oauth2.get_current_user)
):

    posts = db.query(models.Post)\
        .join(
            models.SavedPost,
            models.SavedPost.post_id == models.Post.id
        )\
        .filter(
            models.SavedPost.user_id == current_user.id
        )\
        .all()

    return posts