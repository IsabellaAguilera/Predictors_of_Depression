# import necessary libraries
import os
import json
from numpy import genfromtxt
from time import time
from datetime import datetime
from sqlalchemy import create_engine
from geojson import Feature, FeatureCollection, Point
import csv
import pandas as pd
import pprint

#Creating engine object to the Depression Database
engine = create_engine('sqlite:///depression.db')
#Creating FileName variables pre CSV
npao_file_name = 'cdc_npao.csv'
depression_file_name = 'depression_data.csv'
alcohol_file_name = 'alcohol_data.csv'
income_file_name = 'income_data.csv'
poverty_file_name = 'poverty_data.csv'

#Reading file contents into respective DataFrame
npao_df = pd.read_csv(npao_file_name)
depression_df = pd.read_csv(depression_file_name)
depression_df = depression_df.filter(["STATE NAME", "Yes%"])
depression_df.rename(columns = {"STATE NAME":'state', "Yes%": "yes_percent"}, inplace = True) 
alcohol_df = pd.read_csv(alcohol_file_name)
alcohol_df = alcohol_df.filter(["state","factor","yes_percent"])
income_df = pd.read_csv(income_file_name)
income_df = income_df.filter(["state","factor","yes_percent"])
poverty_df = pd.read_csv(poverty_file_name)
poverty_df = poverty_df.filter(["state","factor","yes_percent"])

#Writing the DataFrame into Sqlite tables
npao_df.to_sql(con=engine, index_label='id', name='npao', if_exists='replace')
depression_df.to_sql(con=engine, index_label='id', name='depression', if_exists='replace')
alcohol_df.to_sql(con=engine, index_label='id', name='alcohol', if_exists='replace')
income_df.to_sql(con=engine, name='income', if_exists='replace')
poverty_df.to_sql(con=engine,  name='poverty', if_exists='replace')
con = engine.connect() 
#Filtering out data for Obesity from the NutritionPhysicalActivityObesity table
sql_query = "select LocationDesc as state,data_value as factor, yes_percent  from npao inner join depression on upper(npao.LocationDesc) = upper(depression.state) where npao.Total = 'Total' and QuestionID = 'Q036' and LocationDesc <> 'National' and YearStart = '2014'"
#Creating DataFrame for Obesity data
obesity_df = pd.read_sql(sql_query, con)
obesity_df.to_sql(con=engine, index_label='id', name='obesity', if_exists='replace')


#Creating empty Dictionaries for individual data sets
depression = {}
obesity = {}
alcohol = {}
income = {}
poverty = {}

#Querying data from Database and saving it in variables
depression_result = con.execute("select * from depression")
obesity_result = con.execute("select * from obesity")
alcohol_result = con.execute("select * from alcohol")
income_result = con.execute("select * from income where STATE <> 'United States'")
poverty_result = con.execute("select * from poverty where STATE <> 'United States'")

#Appending data to individual dictionaries
for row in depression_result:
    depression[row[1].upper()] = round(row[2],2)
for row in obesity_result:
    obesity[row[1].upper()] = row[2]
for row in alcohol_result:
    alcohol[row[1].upper()] = round(row[2],2)   
for row in income_result:
    income[row[1].upper()] = row[2]    
for row in poverty_result:
    poverty[row[1].upper()] = row[2]  


# Reading the State Co-ordinated GeoJSON file
with open('StateCoord_geojson.json', 'r') as geo_json:
    json_load_dep = json.load(geo_json)
    
# #Appending Depression data to the GeoJSON file
for k, v in depression.items():
    for i in range(len(json_load_dep['features'])):
        if json_load_dep['features'][i]['properties']['NAME'].upper() == k:
            json_load_dep['features'][i]['properties']['DEPRESSION'] = v            
            json_load_dep['features'][i]['properties']['FACTOR'] = 'Depression'

#Writing the Depression GeoJSON into a new file
with open('depression_geojson.json', 'w') as dep_geo_json:
    json.dump(json_load_dep, dep_geo_json)
    

# Reading the State Co-ordinated GeoJSON file
with open('StateCoord_geojson.json', 'r') as geo_json:
    json_load_alcohol = json.load(geo_json)
    
# #Appending Alcohol data to the GeoJSON file
for k, v in alcohol.items():
    for i in range(len(json_load_alcohol['features'])):
        if json_load_alcohol['features'][i]['properties']['NAME'].upper() == k:
            json_load_alcohol['features'][i]['properties']['ALCOHOL'] = v            
            json_load_alcohol['features'][i]['properties']['FACTOR'] = 'Alcohol'
            

#Writing the Alcohol GeoJSON into a new file
with open('alcohol_geojson.json', 'w') as alcohol_geo_json:
    json.dump(json_load_alcohol, alcohol_geo_json)

# Reading the State Co-ordinated GeoJSON file
with open('StateCoord_geojson.json', 'r') as geo_json:
    json_load_obesity = json.load(geo_json)
    
# #Appending obesity data to the GeoJSON file
for k, v in obesity.items():
    for i in range(len(json_load_obesity['features'])):
        if json_load_obesity['features'][i]['properties']['NAME'].upper() == k:
            json_load_obesity['features'][i]['properties']['OBESITY'] = v            
            json_load_obesity['features'][i]['properties']['FACTOR'] = 'Obesity'
            

#Writing the obesity GeoJSON into a new file
with open('obesity_geojson.json', 'w') as obesity_geo_json:
    json.dump(json_load_obesity, obesity_geo_json)
    

# Reading the State Co-ordinated GeoJSON file
with open('StateCoord_geojson.json', 'r') as geo_json:
    json_load_income = json.load(geo_json)
    
# #Appending income data to the GeoJSON file
for k, v in income.items():
    for i in range(len(json_load_income['features'])):
        if json_load_income['features'][i]['properties']['NAME'].upper() == k:
            json_load_income['features'][i]['properties']['INCOME'] = v            
            json_load_income['features'][i]['properties']['FACTOR'] = 'Income'
            

#Writing the income GeoJSON into a new file
with open('income_geojson.json', 'w') as income_geo_json:
    json.dump(json_load_income, income_geo_json)

# Reading the State Co-ordinated GeoJSON file
with open('StateCoord_geojson.json', 'r') as geo_json:
    json_load_poverty = json.load(geo_json)
    
# #Appending income data to the GeoJSON file
for k, v in poverty.items():
    for i in range(len(json_load_poverty['features'])):
        if json_load_poverty['features'][i]['properties']['NAME'].upper() == k:
            json_load_poverty['features'][i]['properties']['POVERTY'] = v            
            json_load_poverty['features'][i]['properties']['FACTOR'] = 'Poverty'
            

#Writing the income GeoJSON into a new file
with open('poverty_geojson.json', 'w') as poverty_geo_json:
    json.dump(json_load_poverty, poverty_geo_json)

