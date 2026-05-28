"""add content column to posts

Revision ID: ec6d1c0ef542
Revises: 95224ec56f1a
Create Date: 2026-05-27 13:14:26.892361

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'ec6d1c0ef542'
down_revision: Union[str, Sequence[str], None] = '95224ec56f1a'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # """Upgrade schema."""
    op.add_column('posts', sa.Column('content', sa.String(), nullable=False))
    pass


def downgrade() -> None:
    # """Downgrade schema."""
    op.drop_column('posts','content')
    pass
