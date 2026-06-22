from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app import models, schemas, oauth2
from app.database import get_db

router = APIRouter(
    prefix="/comments",
    tags=["Comments"]
)


@router.post("/{post_id}")
def add_comment(
    post_id: int,
    comment: schemas.CommentCreate,
    db: Session = Depends(get_db),
    current_user=Depends(oauth2.get_current_user)
):

    new_comment = models.Comment(
        content=comment.content,
        post_id=post_id,
        user_id=current_user.id
    )

    db.add(new_comment)
    db.commit()
    db.refresh(new_comment)

    return new_comment


@router.get("/{post_id}")
def get_comments(
    post_id: int,
    db: Session = Depends(get_db)
):

    return db.query(models.Comment)\
        .filter(models.Comment.post_id == post_id)\
        .all()
        
# ===========================
# UPDATE COMMENT
# ===========================

@router.put("/{comment_id}")
def update_comment(
    comment_id: int,
    comment: schemas.CommentCreate,
    db: Session = Depends(get_db),
    current_user=Depends(oauth2.get_current_user)
):

    db_comment = db.query(models.Comment).filter(
        models.Comment.id == comment_id
    ).first()

    if not db_comment:
        raise HTTPException(
            status_code=404,
            detail="Comment not found"
        )

    if db_comment.user_id != current_user.id:
        raise HTTPException(
            status_code=403,
            detail="Not authorized"
        )

    db_comment.content = comment.content # type: ignore

    db.commit()
    db.refresh(db_comment)

    return db_comment


# ===========================
# DELETE COMMENT
# ===========================

@router.delete("/{comment_id}")
def delete_comment(
    comment_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(oauth2.get_current_user)
):

    db_comment = db.query(models.Comment).filter(
        models.Comment.id == comment_id
    ).first()

    if not db_comment:
        raise HTTPException(
            status_code=404,
            detail="Comment not found"
        )

    if db_comment.user_id != current_user.id:
        raise HTTPException(
            status_code=403,
            detail="Not authorized"
        )

    db.delete(db_comment)

    db.commit()

    return {
        "message": "Comment deleted successfully"
    }