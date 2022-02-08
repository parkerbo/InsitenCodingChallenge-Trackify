from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Target, Contact, Financial, db
from app.forms import ContactForm
from operator import itemgetter
from datetime import datetime
today = datetime.now()

contact_routes = Blueprint('contacts', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{error}')
    return errorMessages

@contact_routes.route('/<int:id>', methods=['POST'])
@login_required
def editContact(id):
    form = ContactForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        contact = Contact.query.get(id)
        contact.name=form.data['name']
        contact.title=form.data['title']
        contact.email=form.data['email']
        contact.phone=form.data['phone']
        contact.updated_at=today
        db.session.commit()
        return contact.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@contact_routes.route('/', methods=['POST'])
@login_required
def addContact():
    print(request.json)
    targetId = itemgetter('target_id')(request.json)
    form = ContactForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        try:
            contact = Contact(
            target_id= targetId,
            name=form.data['name'],
            title=form.data['title'],
            email=form.data['email'],
            phone=form.data['phone'],
            created_at=today,
            updated_at=today
            )
            db.session.add(contact)
            db.session.commit()
            return contact.to_dict()
        except AssertionError as message:
            print(str(message))
            return jsonify({'error': str(message)}), 400
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@contact_routes.route('/<int:id>/delete')
@login_required
def deleteContact(id):
    contact = Contact.query.get(id)
    try:
        db.session.delete(contact)
        db.session.commit()
        return contact.to_dict()
    except AssertionError as message:
        print(str(message))
        return jsonify({"error": str(message)}), 400
