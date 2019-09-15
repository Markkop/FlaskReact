import sqlite3
from flask import current_app

NOTSTARTED = 'Not Started'
INPROGRESS = 'In Progress'
COMPLETED = 'Completed'


def add_to_list(item):
    try:
        conn = sqlite3.connect(
            current_app.config['DATABASE'],
            detect_types=sqlite3.PARSE_DECLTYPES)

        # Once a connection has been established, we use the cursor
        # object to execute queries
        c = conn.cursor()

        # Keep the initial status as Not Started
        c.execute('insert into items(item, status) values(?,?)',
                  (item, NOTSTARTED))

        # We commit to save the change
        conn.commit()
        return {"item": item, "status": NOTSTARTED}
    except Exception as e:
        print('Error: ', e)
        return None


def get_all_items():
    try:
        conn = sqlite3.connect(
            current_app.config['DATABASE'],
            detect_types=sqlite3.PARSE_DECLTYPES)
        c = conn.cursor()
        c.execute('select * from items')
        rows = c.fetchall()
        return {"count": len(rows), "items": rows}
    except Exception as e:
        print('Error: ', e)
        return None
