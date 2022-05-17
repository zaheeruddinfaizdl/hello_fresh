import os
import pathlib
from typing import Any

from flask import Blueprint, Flask, render_template
from flask_restful import Api
import jinja2
import logging


from app.api.recipe import RecipeAPI, RecipeIDAPI
from app.api.review import RecipeRatingAPI, WeeklyMenuRatingAPI
from app.api.weekly_menu import WeeklyMenuAPI, WeeklyMenuIDAPI
from app.api.oauth import GoogleOAuth, GoogleOAuthCallback
from app.api.auth import AuthAPI
from app.login import login_manager
from config import config

from flask_pymongo import PyMongo

mongo = PyMongo()

LOGGER = logging.getLogger(__name__)


def index(path: str) -> Any:
    try:
        return render_template("index.html")  # pragma: no cover
    except jinja2.exceptions.TemplateNotFound as e:
        LOGGER.error(
            "index.html template not found, have you built the front-end JS (npm run build in static/?")
        raise e


def create_app(config_name: str) -> Flask:
    root_project_dir = str(pathlib.Path(__file__).parent.parent.parent.resolve())
    static_folder = os.path.join(root_project_dir, 'fe', 'dist')
    template_folder = os.path.join(root_project_dir, 'fe', 'dist', 'templates')
    app = Flask(__name__, static_folder=static_folder,
                template_folder=template_folder)
    app.add_url_rule('/', 'index', index, defaults={'path': ''})
    app.add_url_rule('/<path:path>', 'index', index)  # catch_all

    app.config.from_object(config[config_name])
    config[config_name].init_app(app)

    api_bp = Blueprint('api', __name__)
    api = Api(api_bp)

    api.add_resource(RecipeAPI, '/api/recipe')
    api.add_resource(RecipeRatingAPI, '/api/recipe/rating/<recipe_id>')
    api.add_resource(WeeklyMenuRatingAPI,
                     '/api/weekly_menu/rating/<weekly_menu_id>')
    api.add_resource(RecipeIDAPI, '/api/recipe/<recipe_id>')
    api.add_resource(WeeklyMenuAPI, '/api/weekly_menu')
    api.add_resource(WeeklyMenuIDAPI, '/api/weekly_menu/<menu_id>')
    api.add_resource(AuthAPI, '/api/auth')
    api.add_resource(GoogleOAuth, '/api/google/login')
    api.add_resource(GoogleOAuthCallback, '/api/google/login/callback')
    app.register_blueprint(api_bp)

    login_manager.init_app(app)
    mongo.init_app(app)

    return app
