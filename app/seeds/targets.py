from app.models import db, Target
from datetime import date
today = date.today()

# Adds a demo user, you can add other users here if you want
def seed_targets():
    target1 = Target(
        user_id=1,
        company_name='Insiten',
        description='A collection of technology experts, business strategists, and advisors who are passionate about their craft and are fanatical about making their clients happy',
        location='Atlanta Tech Village, Atlanta, GA',
        phone='678-612-4277',
        website='https://insiten.com/',
        status='Researching',
        created_at=today,
        updated_at=today)


    db.session.add(target1)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_targets():
    db.session.execute('TRUNCATE targets RESTART IDENTITY CASCADE;')
    db.session.commit()
