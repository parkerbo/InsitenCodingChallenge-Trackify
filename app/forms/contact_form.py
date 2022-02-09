from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError, Optional

def check_phone(form, field):
    # Checking if valid phone
    phone = field.data
    if phone.isupper() or phone.islower():
        raise ValidationError('Please enter a valid phone number')
    if len(phone) > 12 or len(phone) < 11:
        raise ValidationError('Phone number must be 10 digits long(with dashes)')



class ContactForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    title = StringField('title', validators=[Optional()])
    email = StringField('email',validators=[Optional()])
    phone = StringField('phone', validators=[Optional(), check_phone])
