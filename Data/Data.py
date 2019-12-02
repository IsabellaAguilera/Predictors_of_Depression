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

engine = create_engine('sqlite:///cdc_npao.db')

file_name = 'cdc_npao.csv'
df = pd.read_csv(file_name)

df.to_sql(con=engine, index_label='id', name='cdc_npao', if_exists='replace')
con = engine.connect() 
sql_query = "select LocationDesc,LocationAbbr ,Sample_Size,Latitude,Longitude,data_value from cdc_npao where Total = 'Total' and QuestionID = 'Q036' and LocationDesc <> 'National'"

obesity_df = pd.read_sql(sql_query, con)
#obesity_df.head()

obesity_df.to_sql(con=engine, index_label='id', name='cdc_npao_obesity', if_exists='replace')
obesity_df.to_csv('obesity_data.csv')
# result = con.execute("select * from cdc_npao_obesity")
# for row in result:
#     print(row)
    

features = []
result = con.execute("select * from cdc_npao_obesity")
for row in result:
    #print(row[1])
    latitude, longitude = map(float, (row[4], row[5]))
    features.append(
        Feature(
                geometry = Point((row[4], row[5])),
                properties = {
                    'LocationDesc': row[1],
                    'LocationAbbr': row[2],
                    'Sample_Size': row[3],
                    'Data_Value': row[6]
                }
            )
        )
con.close()
collection = FeatureCollection(features)
with open("GeoObs.json", "w") as f:
    f.write('%s' % collection)