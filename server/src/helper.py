""" helper file """
import sqlite3
from datetime import datetime
from flask import current_app


def add_to_list(title="", description='', deadline=''):
    """ adds a item to the list """

    try:
        connection = sqlite3.connect(
            current_app.config['DATABASE'],
            detect_types=sqlite3.PARSE_DECLTYPES)

        # Once a connection has been established, we use the cursor
        # object to execute queries
        cursor = connection.cursor()

        # print(title)
        # # Get task id
        # if 'title' is None:
        #     print('hoia')
        #     cursor.execute('select * from items order by id desc')
        #     taskid = cursor.lastrowid
        #     title = "My task #sd"+taskid

        # Keep the initial status as Not Started
        cursor.execute('insert into items(title, description, deadline) values(?,?,?)',
                       (title, description, deadline))

        # We commit to save the change
        connection.commit()

        return {"title": title, "description": description, "deadline": deadline}
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
        cursor.execute('select * from items order by id desc')
        rows = cursor.fetchall()
        return {"count": len(rows), "items": rows}
    except BaseException as error:
        print('Error!', error)
        return None


def update_status(taskid, completed_at):
    try:
        conn = sqlite3.connect(
            current_app.config['DATABASE'],
            detect_types=sqlite3.PARSE_DECLTYPES)
        cursor = conn.cursor()

        def convertdate(date):
            """ convert date from put request to UTC """
            if date is not None:
                return datetime.strptime(date, "%Y-%m-%dT%H:%M:%S.%fZ")
            else:
                return ""
        newdate = convertdate(completed_at)

        cursor.execute(
            'update items set completed_at=? where id=?', (newdate, taskid))
        conn.commit()
        return {taskid: completed_at}
    except BaseException as error:
        print('Error: ', error)
        return None
