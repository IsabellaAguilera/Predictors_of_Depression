import sqlite3
from sqlite3 import Error


def state_income_poverty():
    database1 = "state_income.sqlite"
    database2 = "state_poverty.sqlite"
    conn1 = sqlite3.connect(database1)
    conn2 = sqlite3.connect(database2)
    c1 = conn1.cursor()
    c2 = conn2.cursor()
    c1.execute('SELECT * FROM state_income')
    c2.execute('SELECT * FROM state_poverty')
    # for row in c1.fetchall():
    #     print (row)
    # for row in c2.fetchall():
    #     print (row)

if __name__ == '__main__':
    state_income_poverty()