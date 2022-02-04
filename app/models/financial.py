from .db import db

class Financial(db.Model):
    __tablename__ = 'financials'

    id = db.Column(db.Integer, primary_key=True)
    target_id = db.Column(db.Integer, db.ForeignKey("targets.id"), nullable=False)
    peRatio = db.Column(db.Numeric(4,2))
    avgVolume = db.Integer
    YTDhigh = db.Column(db.Numeric(8,2))
    YTDlow = db.Column(db.Numeric(8,2))
    netProScore = db.Integer
    created_at = db.Column(db.DateTime(timezone=True), nullable=False)
    updated_at = db.Column(db.DateTime(timezone=True), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'target_id': self.target_id,
            'peRatio': self.peRatio,
            'avgVolume': self.avgVolume,
            'YTDhigh': self.YTDhigh,
            'YTDlow': self.YTDlow,
            'netProScore' : self.netProScore,
            'created_at' : self.created_at,
            'updated_at': self.updated_at
        }
