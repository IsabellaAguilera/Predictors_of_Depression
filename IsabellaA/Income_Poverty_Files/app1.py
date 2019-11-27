import os
from flask import (
    Flask,
    render_template,
    jsonify,
    request,
    redirect)
from flask_sqlalchemy import SQLAlchemy
from .app import income_poverty_db
from .models import Incomepoverty

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', '') or "sqlite:///db/state_poverty_income.sqlite"
db = SQLAlchemy(app)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/api/incomepoverty")
def incomepoverty():
    results = db.session.query(Incomepoverty.abbreviation, Incomepoverty.state, Incomepoverty.poverty_percent_15, Incomepoverty.median_household_income_15,Incomepoverty.poverty_percent_16,Incomepoverty.median_household_income_16, Incomepoverty.poverty_percent_17,Incomepoverty.median_household_income_17)