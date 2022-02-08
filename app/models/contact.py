from .db import db

class Contact(db.Model):
    __tablename__ = 'contacts'

    id = db.Column(db.Integer, primary_key=True)
    target_id = db.Column(db.Integer, db.ForeignKey("targets.id"), nullable=False)
    name = db.Column(db.String(255), nullable=False)
    title = db.Column(db.String(255))
    email = db.Column(db.String(255))
    phone = db.Column(db.String(15))
    created_at = db.Column(db.DateTime(timezone=True), nullable=False)
    updated_at = db.Column(db.DateTime(timezone=True), nullable=False)

    contacts = db.relationship("Target", backref='target_contacts')

    def to_dict(self):

        return {
            'id': self.id,
            'target_id': self.target_id,
            'name': self.name,
            'title': self.title,
            'email': self.email,
            'phone': self.phone,
            'created_at' : self.created_at,
            'updated_at': self.updated_at
        }
