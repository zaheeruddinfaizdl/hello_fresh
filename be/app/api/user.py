import attr
from flask import current_app as app, request, g


from app.api import BaseAPI
from app.decorator import validation_required
from app.http_errors import un_authorized
from app.model.recipe import Recipe, RecipeSchema
from app.proxy import get_proxy_client


class UserAPI(BaseAPI):
    def __init__(self) -> None:
        client = get_proxy_client()
        super().__init__(schema=RecipeSchema(), client=client)

    def get(self):
        return un_authorized(message="You are not authorized to perform this request")

    @validation_required(RecipeSchema())
    def post(self):
        recipe: Recipe = g.parsed_request
        self.client.create_recipe(recipe=recipe)
        return attr.asdict(recipe)
