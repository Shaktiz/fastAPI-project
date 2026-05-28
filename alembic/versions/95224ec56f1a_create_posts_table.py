"""create posts table

Revision ID: 95224ec56f1a
Revises: 
Create Date: 2026-05-27 12:55:59.089076

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '95224ec56f1a'
down_revision: Union[str, Sequence[str], None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade():
    # """Upgrade schema."""
    op.create_table('posts', sa.Column('id',sa.Integer(),primary_key=True,nullable=False),
                    sa.Column('title', sa.String(),nullable=False))
    pass


def downgrade():
    # """Downgrade schema."""
    op.drop_table('posts')
    pass
