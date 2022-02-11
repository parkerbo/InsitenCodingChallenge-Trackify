from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Target, Contact, Financial, db
from app.forms import FinanceForm
from operator import itemgetter
from datetime import datetime
import pyEX
today = datetime.now()

finance_routes = Blueprint('finances', __name__)

stockAPI= pyEX.Client(api_token='Tpk_3d1d43f8163d48718ee23f604dc69c83', version='sandbox')


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{error}')
    return errorMessages


# update financial
@finance_routes.route('/', methods=['POST'])
@login_required
def updateFinances():
    id, targetId = itemgetter('id', 'target_id')(request.json)
    print(request.json)
    form = FinanceForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        if id == "null":
            try:
                finance = Financial(
                    target_id=targetId,
                    peRatio=form.data['peRatio'],
                    avgVolume=form.data['avgVolume'],
                    YTDhigh=form.data['YTDhigh'],
                    YTDlow=form.data['YTDlow'],
                    netProScore=form.data['netProScore'],
                    created_at=today,
                    updated_at=today
                )
                db.session.add(finance)
                db.session.commit()
                return finance.to_dict()
            except AssertionError as message:
                print(str(message))
                return jsonify({'error': str(message)}), 400
        else:
            try:
                finance=Financial.query.get(id)
                finance.peRatio=form.data['peRatio'] ,
                finance.avgVolume=form.data['avgVolume'],
                finance.YTDhigh=form.data['YTDhigh'],
                finance.YTDlow=form.data['YTDlow'],
                finance.netProScore=form.data['netProScore'],
                finance.updated_at=today
                db.session.commit()
                return finance.to_dict()
            except AssertionError as message:
                print(str(message))
                return jsonify({'error': str(message)}), 400
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

# get stock data for edit financial form
@finance_routes.route('/stock', methods=['POST'])
@login_required
def getStock():
    ticker = itemgetter('ticker')(request.json)
    try:
        stock = stockAPI.quote(symbol=ticker)
        return {"avgVolume":stock['avgTotalVolume'],"peRatio": stock['peRatio'],"YTDhigh": stock['week52High'],"YTDlow": stock['week52Low'],}
    except AssertionError as message:
        print(str(message))
        return jsonify({'error': str(message)}), 400
