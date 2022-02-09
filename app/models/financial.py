from .db import db

class Financial(db.Model):
    __tablename__ = 'financials'

    id = db.Column(db.Integer, primary_key=True)
    target_id = db.Column(db.Integer, db.ForeignKey("targets.id"), nullable=False)
    peRatio = db.Column(db.Numeric(4,2))
    avgVolume = db.Column(db.Integer)
    YTDhigh = db.Column(db.Numeric(8,2))
    YTDlow = db.Column(db.Numeric(8,2))
    netProScore = db.Column(db.Integer)
    created_at = db.Column(db.DateTime(timezone=True), nullable=False)
    updated_at = db.Column(db.DateTime(timezone=True), nullable=False)

    financials = db.relationship("Target", backref='target_financials')

    def to_dict(self):
        return {
            'id': self.id,
            'target_id': self.target_id,
            'peRatio': float(self.peRatio) if self.peRatio else None,
            'avgVolume': self.avgVolume,
            'YTDhigh': float(self.YTDhigh) if self.YTDhigh else None,
            'YTDlow': float(self.YTDlow) if self.YTDlow else None,
            'netProScore' : self.netProScore,
            'created_at' : self.created_at,
            'updated_at': self.updated_at
        }
