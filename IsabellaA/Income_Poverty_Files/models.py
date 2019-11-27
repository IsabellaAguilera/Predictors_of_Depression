from .app import db

class Income_poverty(db.Model):
    __tablename__ = 'state_income_poverty'

    id = db.Column(db.Integer, primary_key=True)
    abbreviation = db.Column(db.String(64))
    state = db.Column(db.String(64))
    poverty_percent_15 = db.Column(db.Integer)
    median_household_income_15 = db.Column(db.Integer)
    poverty_percent_16 = db.Column(db.Integer)
    median_household_income_16 = db.Column(db.Integer)
    poverty_percent_17 = db.Column(db.Integer)
    median_household_income_17 = db.Column(db.Integer)


    def __repr__(self):
        return '<Income_poverty %r>' % (self.name)