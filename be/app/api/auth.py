import attr
from flask import g
from flask_login import current_user
from app.exception import TokenExpiredException, TokenInvalidException


from app.login import login_manager, login_required
from app.api import BaseAPI
from app.decorator import validation_required
from app.http_errors import un_authorized
from app.model.recipe import Recipe, RecipeSchema
from app.model.response import get_response_model
from app.model.user import UserSchema
from app.proxy import get_proxy_client
from app.util.json_web_token import decode_auth_token


@login_manager.request_loader
def load_user(request):
    jwt = request.headers.get('x-auth-token')
    if jwt == None:
        return None
    try:
        payload = decode_auth_token(jwt)
        user = UserSchema(unknown='EXCLUDE').load(payload)
        return user
    except (TokenExpiredException, TokenInvalidException) as e:
        return None


class AuthAPI(BaseAPI):
    def __init__(self) -> None:
        client = get_proxy_client()
        super().__init__(schema=RecipeSchema(), client=client)

    @login_required
    def get(self):
        return get_response_model(data=attr.asdict(current_user))

    @validation_required(RecipeSchema())
    def post(self):
        recipe: Recipe = g.parsed_request
        self.client.create_recipe(recipe=recipe)
        return attr.asdict(recipe)
