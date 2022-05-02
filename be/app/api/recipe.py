import attr
from flask import current_app as app, request, g


from app.api import BaseAPI
from app.decorator import validate_request
from app.errors import un_authorized
from app.model.recipe import Recipe, RecipeSchema
from app.proxy import get_proxy_client


class RecipeAPI(BaseAPI):
    def __init__(self) -> None:
        client = get_proxy_client()
        super().__init__(schema=RecipeSchema(), client=client)

    def get(self):
        return un_authorized(message="You are not authorized to perform this request")

    @validate_request(RecipeSchema())
    def post(self):
        recipe: Recipe = g.parsed_request
        self.client.create_recipe(recipe=recipe)
        return attr.asdict(recipe)
