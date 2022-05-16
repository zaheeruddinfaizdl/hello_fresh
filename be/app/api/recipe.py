import attr
from flask import current_app as app, request, g
from app.login import login_required, current_user


from app.api import BaseAPI
from app.decorator import validation_required, admin_requried
from app.http_errors import not_found, un_authorized
from app.model.recipe import Recipe, RecipeSchema
from app.model.response import get_response_model
from app.proxy import get_proxy_client


class RecipeIDAPI(BaseAPI):
    def __init__(self) -> None:
        client = get_proxy_client()
        super().__init__(schema=RecipeSchema(), client=client)

    @login_required
    def get(self, recipe_id: str):
        recipe = self.client.get_recipe_by_id(recipe_id=recipe_id)
        if recipe == None:
            return not_found(f"Recipe with id {recipe_id} does not exist")
        return get_response_model(data=recipe)


class RecipeAPI(BaseAPI):
    def __init__(self) -> None:
        client = get_proxy_client()
        super().__init__(schema=RecipeSchema(), client=client)

    @login_required
    def get(self):
        page_number = int(request.args.get('page_number'))
        page_size = int(request.args.get('page_size'))
        paginated_result = self.client.get_paginated_recipes(
            page_number=page_number, page_size=page_size)
        return get_response_model(data=paginated_result)

    @login_required
    @admin_requried()
    @validation_required(RecipeSchema(exclude=['id'], unknown='EXCLUDE'))
    def post(self):
        recipe: Recipe = g.parsed_request
        res = self.client.create_recipe(recipe=recipe)
        return get_response_model(data=attr.asdict(res))

    @login_required
    @admin_requried()
    @validation_required(RecipeSchema(exclude=['id'], unknown='EXCLUDE'))
    def put(self):
        recipe: Recipe = g.parsed_request
        recipe_id = request.args.get('recipe_id')
        self.client.edit_recipe(recipe_id=recipe_id, recipe=recipe)
        return get_response_model(data=attr.asdict(recipe))

    @login_required
    @admin_requried()
    def delete(self):
        recipe_id = request.args.get('recipe_id')
        self.client.delete_recipe(recipe_id=recipe_id)
        return get_response_model(data={})
