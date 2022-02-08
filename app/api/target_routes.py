from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Target, Contact, Financial, db
from app.forms import EditTargetForm
from operator import itemgetter
from datetime import datetime
today = datetime.now()

target_routes = Blueprint('targets', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{error}')
    return errorMessages

@target_routes.route('/<int:id>')
@login_required
def get_target(id):
    result = {}
    target = Target.query.get(id)
    result['target'] = target.to_dict()

    contacts = {}
    contacts_query = Contact.query.filter(Contact.target_id == id).all()
    if contacts_query:
        contacts = {contact.id: contact.to_dict() for contact in contacts_query}
    result['contacts'] = contacts

    financials = {}
    financials_query = Financial.query.filter(Financial.target_id == id).first()
    if financials_query:
        financials = financials_query.to_dict()
    result['financials'] = financials

    return result

@target_routes.route('/<int:id>', methods=['POST'])
@login_required
def editTarget(id):
    form = EditTargetForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        target = Target.query.get(id)
        target.company_name=form.data['company_name']
        target.description=form.data['description']
        target.location=form.data['location']
        target.status=form.data['status']
        target.phone=form.data['phone']
        target.website=form.data['website']
        target.updated_at=today
        db.session.commit()
        return target.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@target_routes.route('/<int:id>/notes', methods=['POST'])
@login_required
def updateNotes(id):
    notes_content = itemgetter('notes')(request.json)
    target = Target.query.get(id)
    if target:
        target.notes = notes_content
        db.session.commit()
        return "Notes updated successfully"
    else:
        return {'Error':'Target does not exist'}, 400
