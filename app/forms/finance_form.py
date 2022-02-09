from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError, Optional, Email

def check_phone(form, field):
    # Checking if valid phone
    phone = field.data
    if phone.isupper() or phone.islower():
        raise ValidationError('Please enter a valid phone number')
    if len(phone) > 12 or len(phone) < 11:
        raise ValidationError('Phone number must be 10 digits long(with dashes)')



class FinanceForm(FlaskForm):
    avgVolume = StringField('avgVolume', validators=[Optional()])
    peRatio = StringField('peRatio', validators=[Optional()])
    YTDhigh = StringField('YTDhigh',validators=[Optional()])
    YTDlow = StringField('YTDlow', validators=[Optional()])
    netProScore = StringField('netProScore', validators=[Optional()])
