
from http import HTTPStatus
import unittest

from flask import current_app

from app import LOGGER, create_app
from app.util.json_web_token import encode_auth_token
from app.model.user import User, UserSchema


class BasicTestClient(unittest.TestCase):
    """Test if the app can be created"""

    def setUp(self) -> None:
        self.app = create_app('testing')
        self.app_context = self.app.app_context()
        self.app_context.push()
        self.client = self.app.test_client()
        return super().setUp()

    def _get_test_jwt_headers(self, jwt: str = None):
        if jwt == None:
            jwt = self._get_test_jwt()
        return {"x-auth-token": jwt}

    def _get_test_user(self, role='defult') -> User:
        user = User(name="Test User", email="test@user.com", role=role)
        return user

    def _get_test_jwt(self, role="default") -> str:
        user = self._get_test_user(role=role)
        jwt = encode_auth_token(user=user)
        return jwt