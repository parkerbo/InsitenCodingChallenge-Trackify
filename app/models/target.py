from .db import db

class Target(db.Model):
    __tablename__ = 'targets'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    company_name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text)
    notes = db.Column(db.Text)
    location = db.Column(db.Text)
    phone = db.Column(db.String(15))
    website = db.Column(db.Text)
    status = db.Column(db.Text)
    created_at = db.Column(db.DateTime(timezone=True), nullable=False)
    updated_at = db.Column(db.DateTime(timezone=True), nullable=False)

    targets = db.relationship("User", backref='user_targets')
    contacts = db.relationship("Contact", cascade="all, delete, delete-orphan")
    financials = db.relationship("Financial", cascade="all, delete, delete-orphan")


    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'company_name': self.company_name,
            'description': self.description,
            'location': self.location,
            'phone': self.phone,
            'website': self.website,
            'status': self.status,
            'notes': self.notes,
            'created_at' : self.created_at,
            'updated_at': self.updated_at
        }
