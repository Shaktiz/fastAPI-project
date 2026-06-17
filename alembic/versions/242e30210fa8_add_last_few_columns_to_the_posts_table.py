"""add last few columns to the posts table

Revision ID: 242e30210fa8
Revises: 7cdfedb5d2e9
Create Date: 2026-05-27 13:57:29.384610

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '242e30210fa8'
down_revision: Union[str, Sequence[str], None] = '7cdfedb5d2e9'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade():
    # """Upgrade schema."""
    op.add_column('posts', sa.Column('published', sa.Boolean(), nullable=False, server_default="True"))
    
    pass


def downgrade():
    # """Downgrade schema."""
    op.drop_column('posts','published')
    
    pass
