""" helper file """
import sqlite3
from flask import current_app
import logger  # To Do: check if this logger is coded correctly
from datetime import datetime


NOTSTARTED = 'Not Started'
INPROGRESS = 'In Progress'
COMPLETED = 'Completed'


def add_to_list(title, description, deadline):
    """ adds a item to the list """
    try:
        connection = sqlite3.connect(
            current_app.config['DATABASE'],
            detect_types=sqlite3.PARSE_DECLTYPES)

        # Once a connection has been established, we use the cursor
        # object to execute queries
        cursor = connection.cursor()

        # Keep the initial status as Not Started
        cursor.execute('insert into items(title, description, deadline, completed_at) values(?,?,?,?)',
                       (title, description, deadline, ''))

        # We commit to save the change
        connection.commit()
        return {"title": title, "description": description, "deadline": deadline, "completed_at": ''}
    except BaseException as error:
        print('Error: ', error)
        return None


def get_all_items():
    """ gets all items from the list """
    try:
        connection = sqlite3.connect(
            current_app.config['DATABASE'],
            detect_types=sqlite3.PARSE_DECLTYPES)
        cursor = connection.cursor()
        cursor.execute('select * from items')
        rows = cursor.fetchall()
        return {"count": len(rows), "items": rows}
    except BaseException as error:
        logger.error('Error!', error)
        return None


def update_status(title, completed_at):
    try:
        conn = sqlite3.connect(
            current_app.config['DATABASE'],
            detect_types=sqlite3.PARSE_DECLTYPES)
        cursor = conn.cursor()
        cursor.execute(
            'update items set completed_at=? where title=?', (datetime.now(), title))
        conn.commit()
        return {title: completed_at}
    except BaseException as error:
        print('Error: ', error)
        return None
