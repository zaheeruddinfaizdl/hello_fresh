from enum import unique
import logging
import pymongo
from .mongo_proxy import CollectionNames
from app import mongo

LOGGER = logging.getLogger(__name__)


class MongoStartup:
    def __init__(self) -> None:
        pass

    def create_user_indexes(self):
        LOGGER.info('Mongo - Creating unique index on user email')
        mongo.db[CollectionNames.USER].create_index(
            [("email", pymongo.ASCENDING)], unique=True)

    def create_user_recipe_index(self):
        LOGGER.info(
            'Mongo - Creating unique compound index for user and recipe id in recipe review collection')
        mongo.db[CollectionNames.RECIPE_RATING].create_index(
            [("user_id", pymongo.ASCENDING), ("recipe_id", pymongo.ASCENDING)], unique=True)

    def create_user_weekly_menu_index(self):
        LOGGER.info(
            'Mongo - Creating unique compound index for user and weekly menu id in weekly menu review collection')
        mongo.db[CollectionNames.WEEKLY_MENU_RATING].create_index(
            [("user_id", pymongo.ASCENDING), ("weekly_menu_id", pymongo.ASCENDING)], unique=True)

    def run_startup(self):
        self.create_user_indexes()
        self.create_user_recipe_index()
        self.create_user_weekly_menu_index()
