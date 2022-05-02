
from flask import Blueprint, Flask
from flask_restful import Api


from app.api.recipe import RecipeAPI
from config import config

from flask_pymongo import PyMongo

mongo = PyMongo()

def create_app(config_name: str) -> Flask:
    app = Flask(__name__)
    app.config.from_object(config[config_name])
    config[config_name].init_app(app)
    api_bp = Blueprint('api', __name__)
    api = Api(api_bp)
    api.add_resource(RecipeAPI, '/recipie')
    app.register_blueprint(api_bp)
    mongo.init_app(app)
    return app
