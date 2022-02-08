from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Target, Contact, Financial

target_routes = Blueprint('targets', __name__)


@target_routes.route('/<int:id>')
@login_required
def get_target(id):
    result = {}
    target = Target.query.get(id)

    result['target'] = target.to_dict()

    contacts = {}

    contacts_query = Contact.query.filter(Contact.target_id == id).all()


    if contacts_query:
        contacts = [contact.to_dict() for contact in contacts_query]


    result['contacts'] = contacts

    financials = {}

    financials_query = Financial.query.filter(Financial.target_id == id).first()


    if financials_query:
        financials = financials_query.to_dict()

    result['financials'] = financials

    return result
