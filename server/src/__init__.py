# To Do: Create React App
# To Do: Create all routes
# To Do: Deploy

import os
import json
from flask import Flask, request, Response
from flask_cors import CORS
import src.helper
from . import db


def create_app(test_config=None):
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
    def hello():
        return 'Hello, World!'

    db.init_app(app)

    @app.route('/items/new', methods=['POST'])
    def add_item():
        # Get item from the POST body
        req_data = request.get_json()
        item = req_data['item']

        # Add item to the list
        res_data = src.helper.add_to_list(item)

        # Return error if item not added
        if res_data is None:
            response = Response("{'error': 'Item not added - " +
                                item + "'}", status=400, mimetype='application/json')
            return response

        # Return response
        response = Response(json.dumps(res_data), mimetype='application/json')

        return response

    @app.route('/items/all')
    def get_all_items():
        # Get items from the helper
        res_data = src.helper.get_all_items()

        # Return response
        response = Response(json.dumps(res_data), mimetype='application/json')
        return response

    return app
