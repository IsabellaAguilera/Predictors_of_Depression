import pandas as pd
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from flask import Flask, render_template, redirect, request, flash, jsonify
from database_creator import databaser



app = Flask(__name__)

#app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', '') or "sqlite:///project2.sqlite"

engine = create_engine('sqlite:///depression.db')

# depression_df = pd.read_sql_query("SELECT * FROM depression", con = engine)
# depression_json = depression_df.to_json(orient = 'records')

# alcohol_df = pd.read_sql_query("SELECT * FROM alcohol", con = engine)
# alcohol_json = alcohol_df.to_json(orient = 'records')
#databaser(engine, 'depression_data.csv', 'alcohol_data.csv')

@app.route('/')
def index():
    return render_template('results.html')

@app.route('/geojson_Alcohol')
def geojson_alcohol():
    file = "alcohol_geojson.json"
    contents = open(file,'r').read()
    return contents

@app.route('/geojson_Income')
def geojson_income():
    file = "income_geojson.json"
    contents = open(file,'r').read()
    return contents

@app.route('/geojson_Poverty')
def geojson_poverty():
    file = "poverty_geojson.json"
    contents = open(file,'r').read()
    return contents

@app.route('/geojson_Obesity')
def geojson_obesity():
    file = "obesity_geojson.json"
    contents = open(file,'r').read()
    return contents

@app.route('/geojson_Depression')
def geojson_depression():
    file = "us_states_geojson_depression_final.geojson"
    contents = open(file,'r').read()
    return contents

@app.route("/api_Alcohol")
def alcohol_data():
    #engine = create_engine('sqlite:///project2.sqlite')
    alcohol_df = pd.read_sql_query("SELECT * FROM alcohol", con = engine)
    alcohol_json = alcohol_df.to_json(orient = 'records')
    return alcohol_json


@app.route("/api_Income")
def income_data():
    #engine = create_engine('sqlite:///project2.sqlite')
    income_df = pd.read_sql_query("SELECT * FROM income", con = engine)
    income_json = income_df.to_json(orient = 'records')
    return income_json

@app.route("/api_Poverty")
def poverty_data():
    #engine = create_engine('sqlite:///project2.sqlite')
    poverty_df = pd.read_sql_query("SELECT * FROM poverty", con = engine)
    poverty_json = poverty_df.to_json(orient = 'records')
    return poverty_json

@app.route("/api_Obesity")
def obesity_data():
    #engine = create_engine('sqlite:///project2.sqlite')
    obesity_df = pd.read_sql_query("SELECT * FROM obesity", con = engine)
    obesity_json = obesity_df.to_json(orient = 'records')
    return obesity_json

@app.route("/api_Depression")
def depression_data():
    #engine = create_engine('sqlite:///project2.sqlite', convert_unicode=True)
    depression_df = pd.read_sql_query("SELECT * FROM depression", con = engine)
    depression_json = depression_df.to_json(orient = 'records')
    return depression_json


if __name__ == '__main__':
    app.run()
