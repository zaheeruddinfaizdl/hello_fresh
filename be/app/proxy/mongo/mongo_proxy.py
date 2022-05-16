from typing import Dict, List
import attr
from pymongo.errors import DuplicateKeyError
from pymongo.results import InsertOneResult
from app import mongo
from app.model.rating import Rating
from app.model.user import User
from app.model.weekly_menu import WeeklyMenu, WeeklyMenuSchema

from app.proxy.base_proxy import BaseProxy
from app.model.recipe import Recipe
from app.exception import ResourceAlreadyExistsException

from flask_pymongo import ObjectId


class CollectionNames:
    RECIPE = 'recipe'
    RECIPE_RATING = 'recipe_rating'
    WEEKLY_MENU_RATING = 'weekly_menu_rating'
    USER = 'user'
    WEEKLY_MENU = 'weekly_menu'


class MongoProxy(BaseProxy):
    def create_recipe(self, recipe: Recipe):
        res = mongo.db[CollectionNames.RECIPE].insert_one(attr.asdict(recipe))
        recipe.id = str(res.inserted_id)
        return recipe

    def delete_recipe(self, recipe_id: str) -> Recipe:
        mongo.db[CollectionNames.RECIPE].find_one_and_delete(
            {"_id": ObjectId(recipe_id)})

    def add_review_on_recipe(self, user_id: str,  recipe_id: str, rating: Rating):
        res = mongo.db[CollectionNames.RECIPE_RATING].find_one_and_update(
            {"user_id": user_id, "recipe_id": recipe_id},
            {"$set": {**attr.asdict(rating), "user_id": user_id,
                      "recipe_id": recipe_id}},
            upsert=True
        )
        return res

    def add_review_on_weekly_menu(self, user_id: str,  weekly_menu_id: str, rating: Rating):
        res = mongo.db[CollectionNames.WEEKLY_MENU_RATING].find_one_and_update(
            {"user_id": user_id, "weekly_menu_id": weekly_menu_id},
            {"$set": {**attr.asdict(rating), "user_id": user_id,
                      "weekly_menu_id": weekly_menu_id}},
            upsert=True
        )
        return res

    def get_rating_on_recipe(self, recipe_id: str):
        rating_records = mongo.db[CollectionNames.RECIPE_RATING].find(
            {"recipe_id": recipe_id})
        res = self._response_helper(records=rating_records)
        return res

    def get_rating_on_weekly_menu(self, weekly_menu_id: str):
        rating_records = mongo.db[CollectionNames.WEEKLY_MENU_RATING].find(
            {"weekly_menu_id": weekly_menu_id})
        res = self._response_helper(records=rating_records)
        return res

    def edit_recipe(self, recipe_id: str, recipe: Recipe):
        result = mongo.db[CollectionNames.RECIPE].find_one_and_update(
            {"_id": ObjectId(recipe_id)}, {"$set": attr.asdict(recipe)})
        return result

    def edit_weekly_menu(self, weekly_menu_id: str, weekly_menu: WeeklyMenu):
        result = mongo.db[CollectionNames.WEEKLY_MENU].find_one_and_update(
            {"_id": ObjectId(weekly_menu_id)}, {"$set": attr.asdict(weekly_menu)})
        return result

    def add_user(self, user: User):
        try:
            res = mongo.db[CollectionNames.USER].insert_one(attr.asdict(user))
        except DuplicateKeyError:
            raise ResourceAlreadyExistsException()

    def get_weekly_menus_count(self):
        try:
            doc_count = mongo.db[CollectionNames.WEEKLY_MENU].count_documents({
            })
            return doc_count
        except Exception as e:
            raise e

    def get_recipe_by_id(self, recipe_id: str) -> Recipe:
        try:
            recipe = mongo.db[CollectionNames.RECIPE].find_one(
                ObjectId(recipe_id))
            result = self._response_helper(records=[recipe])
            return result[0]
        except Exception as e:
            pass

    def _response_helper(self, records: List[Dict]):
        result = []
        for res_recipe in records:
            res_recipe['id'] = str(res_recipe['_id'])
            del res_recipe['_id']

            result.append(res_recipe)

        return result

    def get_paginated_recipes(self, page_number=1, page_size=10):
        skip = page_size * (page_number - 1)
        result = mongo.db[CollectionNames.RECIPE].aggregate([
            {
                "$facet": {
                    "paginated_recipies": [
                        {"$sort": {"_id": -1}},
                        {"$skip": skip},
                        {"$limit": page_size}
                    ],
                    "total_recipies": [{"$count": 'count'}]
                },
            }

        ])
        result = list(result)[0]

        paginated_recipies = result['paginated_recipies']
        total_recipies = result['total_recipies'][0]['count']
        recipies = self._response_helper(paginated_recipies)
        result = {
            "paginated_recipies": recipies,
            "total_recipies": total_recipies
        }
        return result

    def get_paginated_weekly_menus(self, page_number=0, page_size=10):
        skip = page_size * (page_number - 1)
        result = mongo.db[CollectionNames.WEEKLY_MENU].find().skip(
            skip).limit(page_size)
        weekly_menus = []
        for res_wkly_menu in result:
            res_wkly_menu['id'] = str(res_wkly_menu['_id'])
            del res_wkly_menu['_id']

            weekly_menus.append(res_wkly_menu)
        return weekly_menus

    def get_weekly_menu_by_id(self, menu_id: str) -> WeeklyMenu:
        result = mongo.db[CollectionNames.WEEKLY_MENU].find_one(
            ObjectId(menu_id))
        if result == None:
            return None

        loaded_res: WeeklyMenu = WeeklyMenuSchema(
            unknown='EXCLUDE').load(data=result)
        recipies_details_list = []
        for recipe in loaded_res.recipies_list:
            recipe = self.get_recipe_by_id(recipe_id=recipe)
            recipies_details_list.append(recipe)

        loaded_res.recipies_list = recipies_details_list
        loaded_res.id = str(result["_id"])

        return attr.asdict(loaded_res)

    def create_weekly_menu(self, weekly_menu: WeeklyMenu):
        try:
            res = mongo.db[CollectionNames.WEEKLY_MENU].insert_one(
                attr.asdict(weekly_menu))
            weekly_menu.id = str(res.inserted_id)
            return weekly_menu
        except Exception as e:
            raise e

    def add_recipe_in_weekly_menu(self):
        pass

    def remove_recipe_from_weekly_menu(self):
        pass
