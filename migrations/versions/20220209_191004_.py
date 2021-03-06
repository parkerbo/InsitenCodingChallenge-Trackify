"""empty message

Revision ID: 0ee0e091f3bc
Revises: 0defeb4f1671
Create Date: 2022-02-09 19:10:04.220406

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '0ee0e091f3bc'
down_revision = '0defeb4f1671'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('financials', sa.Column('peRatio', sa.Numeric(precision=8, scale=2), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('financials', 'peRatio')
    # ### end Alembic commands ###
