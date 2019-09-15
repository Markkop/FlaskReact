""" database python file """
import sqlite3

import click
from flask import current_app, g
from flask.cli import with_appcontext

NOTSTARTED = 'Not Started'
INPROGRESS = 'In Progress'
COMPLETED = 'Completed'


def get_db():
    """ gets db """
    if 'db' not in g:
        g.db = sqlite3.connect(
            current_app.config['DATABASE'],
            detect_types=sqlite3.PARSE_DECLTYPES
        )
        g.db.row_factory = sqlite3.Row

    return g.db


def close_db(error=None):
    """ closes db """
    database = g.pop('db', None)

    if database is not None:
        database.close()
    if error is not None:
        print error


def init_db():
    """ initiates db """
    database = get_db()

    with current_app.open_resource('schema.sql') as function:
        database.executescript(function.read().decode('utf8'))


@click.command('init-db')
@with_appcontext
def init_db_command():
    """Clear the existing data and create new tables."""
    init_db()
    click.echo('Initialized the database.')


def init_app(app):
    """ initiates db """
    app.teardown_appcontext(close_db)
    app.cli.add_command(init_db_command)
