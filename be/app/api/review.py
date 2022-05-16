from flask import g, request

from app.api import BaseAPI
from app.decorator import validation_required
from app.model.rating import RatingSchema
from app.model.response import get_response_model
from app.proxy import get_proxy_client

from app.login import login_required, current_user


class RecipeRatingAPI(BaseAPI):
    def __init__(self) -> None:
        client = get_proxy_client()
        super().__init__(RatingSchema(), client)

    @login_required
    @validation_required(RatingSchema())
    def put(self, recipe_id: str):
        rating_for_recipe = g.parsed_request

        self.client.add_review_on_recipe(
            recipe_id=recipe_id,
            user_id=current_user.email,
            rating=rating_for_recipe
        )

    @login_required
    def get(self, recipe_id: str):
        res = self.client.get_rating_on_recipe(recipe_id=recipe_id)
        return get_response_model(data=res)


class WeeklyMenuRatingAPI(BaseAPI):
    def __init__(self) -> None:
        client = get_proxy_client()
        super().__init__(RatingSchema(), client)

    @login_required
    @validation_required(RatingSchema())
    def put(self, weekly_menu_id: str):
        rating_for_recipe = g.parsed_request

        self.client.add_review_on_weekly_menu(
            weekly_menu_id=weekly_menu_id,
            user_id=current_user.email,
            rating=rating_for_recipe
        )

    @login_required
    def get(self, weekly_menu_id: str):
        res = self.client.get_rating_on_weekly_menu(
            weekly_menu_id=weekly_menu_id)
        return get_response_model(data=res)
