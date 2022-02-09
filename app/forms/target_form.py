from flask_wtf import FlaskForm
from wtforms import StringField, SelectField
from wtforms.validators import DataRequired, ValidationError, URL, Optional

def check_phone(form, field):
    # Checking if valid phone
    phone = field.data
    if phone.isupper() or phone.islower():
        raise ValidationError('Please enter a valid phone number')
    if len(phone) > 12 or len(phone) < 11:
        raise ValidationError('Phone number must be 10 digits long(with dashes)')



class TargetForm(FlaskForm):
    company_name = StringField(
        'company_name', validators=[DataRequired()])
    location = StringField('location', validators=[Optional()])
    description = StringField('description',validators=[Optional()])
    website = StringField('website', validators=[Optional(), URL(message='Please enter a valid URL')])
    phone = StringField('phone', validators=[Optional(), check_phone])
    status = SelectField('status',validators=[Optional()], choices=['Researching', 'Pending Approval', 'Approved', 'Declined'])
