# To Do: Create all routes
# To Do: Deploy

import os
import json
from flask import Flask, request, Response
from flask_cors import CORS
import src.helper
from . import db
from datetime import datetime


def create_app(test_config=None):
    """ create server's app """
    # create and configure the app
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_mapping(
        SECRET_KEY='dev',
        DATABASE=os.path.join(app.instance_path, 'flaskr.sqlite'),
    )

    # CORS
    CORS(app)

    if test_config is None:
        # load the instance config, if it exists, when not testing
        app.config.from_pyfile('config.py', silent=True)
    else:
        # load the test config if passed in
        app.config.from_mapping(test_config)

    # ensure the instance folder exists
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    # a simple page that says hello
    @app.route('/hello')
    def _hello():
        """ returns a Hello World String """
        return 'Hello, World!'

    db.init_app(app)

    @app.route('/items/new', methods=['POST'])
    def _add_item():
        """ add a new task item """
        # Get item from the POST body
        req_data = request.get_json()
        title = req_data['title']

        # Add item to the list
        res_data = src.helper.add_to_list(
            title, 'default description', '')

        # Return error if item not added
        if res_data is None:
            response = Response("{'error': 'Item not added - " +
                                title + "'}", status=400, mimetype='application/json')
            return response

        # Return response
        response = Response(json.dumps(res_data), mimetype='application/json')

        return response

    @app.route('/items/all')
    def _get_all_items():
        """ gets all task items """
        # Get items from the helper
        res_data = src.helper.get_all_items()
        # Return response

        # Convert timestamp to string before json dumping
        # new_data = [(data[0], data[1], data[2], data[3].strftime(
        #     "%Y-%m-%d %H:%M:%S"), data[4])
        #     for data in res_data['items']]

        #strftime("%Y-%m-%d %H:%M:%S")
        # new_data = [(data[0], data[1], data[2], data[3], data[4].strftime("%Y-%m-%d %H:%M:%S"))
        #             for data in res_data['items']]

        def converttime(item):
            """ converts a datetime field to string to be dumped by json.dump()"""
            newitem = list(item)
            for value in item:
                if isinstance(value, datetime):
                    newitem[newitem.index(value)] = value.strftime(
                        "%Y-%m-%d %H:%M:%S")

            return newitem

        new_data = list(map(converttime, res_data['items']))
        response = Response(json.dumps(new_data), mimetype='application/json')
        return response

    @app.route('/item/update', methods=['PUT'])
    def _update_status():
        """ updates an item """
        # Get item from the POST body
        req_data = request.get_json()
        title = req_data['title']
        completed_at = req_data['completed_at']

        # Update item in the list
        res_data = src.helper.update_status(title, completed_at)

        # Return error if the status could not be updated
        if res_data is None:
            response = Response("{'error': 'Error updating item - '" + title +
                                "}", status=400, mimetype='application/json')
            return response

        # Return response
        response = Response(json.dumps(res_data), mimetype='application/json')

        return response

    return app
