import pandas as pd
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from flask import Flask, render_template, redirect, request, flash, jsonify
from database_creator import databaser



app = Flask(__name__)

#app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', '') or "sqlite:///project2.sqlite"

engine = create_engine('sqlite:///project2.sqlite')

# depression_df = pd.read_sql_query("SELECT * FROM depression", con = engine)
# depression_json = depression_df.to_json(orient = 'records')

# alcohol_df = pd.read_sql_query("SELECT * FROM alcohol", con = engine)
# alcohol_json = alcohol_df.to_json(orient = 'records')
#databaser(engine, 'depression_data.csv', 'alcohol_data.csv')

@app.route('/')
def index():
    return render_template('index.html')


@app.route('/alcohol')
def alcohol():
    return render_template("alcohol.html")

@app.route("/api_alcohol")
def alcohol_data():
    #engine = create_engine('sqlite:///project2.sqlite')
    alcohol_df = pd.read_sql_query("SELECT * FROM alcohol", con = engine)
    alcohol_json = alcohol_df.to_json(orient = 'records')
    return alcohol_json

@app.route("/api_depression")
def depression_data():
    engine = create_engine('sqlite:///project2.sqlite', convert_unicode=True)
    depression_df = pd.read_sql_query("SELECT * FROM depression", con = engine)
    depression_json = depression_df.to_json(orient = 'records')
    return jsonify(depression_json)


if __name__ == '__main__':
    app.run()