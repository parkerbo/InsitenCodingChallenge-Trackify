from app.models import db, Contact
from datetime import date
today = date.today()


def seed_contacts():
    contact1 = Contact(
        target_id=1,
        name='Bobby Greene',
        title='CEO',
        email='bobby@insiten.com',
        phone='678-612-4277',
        created_at=today,
        updated_at=today)

    contact2= Contact(
        target_id=1,
        name='Jane Doe',
        title='Marketing Director',
        email='jane@insiten.com',
        phone='678-612-4277',
        created_at=today,
        updated_at=today)


    db.session.add(contact1)
    db.session.add(contact2)

    db.session.commit()


def undo_contacts():
    db.session.execute('TRUNCATE contacts RESTART IDENTITY CASCADE;')
    db.session.commit()
