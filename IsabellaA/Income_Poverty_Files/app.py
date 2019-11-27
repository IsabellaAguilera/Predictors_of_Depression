import sqlite3
from sqlite3 import Error


def income_poverty_db():
    file = "state_income_poverty.sqlite"
    conn = sqlite3.connect(file)
    c = conn.cursor()
    c.execute('SELECT * FROM state_income_poverty')
    # for row in c.fetchall():
    #     print (row)

if __name__ == '__main__':
    income_poverty_db()