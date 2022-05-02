import attr
from app import mongo

from app.proxy.base_proxy import BaseProxy
from app.model.recipe import Recipe


class MongoCollectionNames:
    RECIPE = 'recipe'


class MongoProxy(BaseProxy):
    def create_recipe(self, recipe: Recipe):
        res = mongo.db[MongoCollectionNames.RECIPE].insert_one(attr.asdict(recipe))

    def create_weekly_menu(self):
        pass

    def add_recipe_in_weekly_menu(self):
        pass

    def remove_recipe_from_weekly_menu(self):
        pass
