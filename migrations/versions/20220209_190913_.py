"""empty message

Revision ID: 0defeb4f1671
Revises: e3ab5bf5d6cf
Create Date: 2022-02-09 19:09:13.603124

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '0defeb4f1671'
down_revision = 'e3ab5bf5d6cf'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('financials', 'peRatio')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('financials', sa.Column('peRatio', sa.NUMERIC(precision=4, scale=2), autoincrement=False, nullable=True))
    # ### end Alembic commands ###
