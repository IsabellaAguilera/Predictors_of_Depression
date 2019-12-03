import os
import pandas as pd
from flask import (
    Flask,
    render_template,
    jsonify,
    request,
    redirect)
from flask_sqlalchemy import SQLAlchemy
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
# from database_creator import databaser

app = Flask(__name__)

# app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', '') or "sqlite:///state_income.sqlite"
# db = SQLAlchemy(app)

engine1 = create_engine('sqlite:///db/state_income.sqlite')
engine2 = create_engine('sqlite:///db/state_poverty.sqlite')

@app.route("/")
def index():
    return render_template("index1.html")

@app.route('/income')
def income():
    return render_template("income.html")

@app.route('/poverty')
def poverty():
    return render_template("poverty.html")

@app.route("/api_Income")
def income_data():
    income_df = pd.read_sql_query("SELECT * FROM state_income", con = engine1)
    income_json = income_df.to_json(orient = 'records')
    return income_json

@app.route("/api_Poverty")
def poverty_data():
    poverty_df = pd.read_sql_query("SELECT * FROM state_poverty", con = engine2)
    poverty_json = poverty_df.to_json(orient = 'records')
    return poverty_json

if __name__ == '__main__':
    app.run(debug=True)
    