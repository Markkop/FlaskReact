""" helper file """
import sqlite3
import logger
from flask import current_app

NOTSTARTED = 'Not Started'
INPROGRESS = 'In Progress'
COMPLETED = 'Completed'


def add_to_list(item):
    """ adds a item to the list """
    try:
        connection = sqlite3.connect(
            current_app.config['DATABASE'],
            detect_types=sqlite3.PARSE_DECLTYPES)

        # Once a connection has been established, we use the cursor
        # object to execute queries
        cursor = connection.cursor()

        # Keep the initial status as Not Started
        cursor.execute('insert into items(item, status) values(?,?)',
                       (item, NOTSTARTED))

        # We commit to save the change
        connection.commit()
        return {"item": item, "status": NOTSTARTED}
    except Exception as error:
        print('Error: ', error)
        return None


def get_all_items():
    """ gets all items from the list """
    # noinspection PyBroadException
    try:
        connection = sqlite3.connect(
            current_app.config['DATABASE'],
            detect_types=sqlite3.PARSE_DECLTYPES)
        cursor = connection.cursor()
        cursor.execute('select * from items')
        rows = cursor.fetchall()
        return {"count": len(rows), "items": rows}
    except Exception as error:
        logger.exception('Error!', error)
        return None
