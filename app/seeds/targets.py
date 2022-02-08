from app.models import db, Target
from datetime import date
today = date.today()


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

    target2 = Target(
        user_id=1,
        company_name='Fortive',
        location='Everett, WA',
        phone='303-823-5235',
        website='https://fortive.com/',
        status='Approved',
        created_at=today,
        updated_at=today)


    db.session.add(target1)
    db.session.add(target2)

    db.session.commit()


def undo_targets():
    db.session.execute('TRUNCATE targets RESTART IDENTITY CASCADE;')
    db.session.commit()
