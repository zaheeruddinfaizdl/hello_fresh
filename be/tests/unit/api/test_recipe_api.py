
from http import HTTPStatus
import json
from select import select
from typing import Dict
import attrs
from app.model.recipe import Recipe
from tests.unit.test_baics import BasicTestClient
from tests.util import _get_test_recipe


class TestRecipeAPI(BasicTestClient):
    def setUp(self) -> None:
        super().setUp()

    def tearDown(self) -> None:
        super().tearDown()

    def test_can_not_get_recipe_without_logged_in(self):
        response = self.client.get('/api/recipe')
        self.assertEqual(response.status_code, HTTPStatus.UNAUTHORIZED)
        self.assertTrue(
            'The server could not verify that you are authorized to access the URL requested.'
            in response.json.get('message'))

    def test_can_not_create_recipe_if_not_admin(self):
        test_recipe = _get_test_recipe()
        jwt = self._get_test_jwt()

        jwt_headers = self._get_test_jwt_headers(jwt)
        res = self.client.post(
            '/api/recipe', json=attrs.asdict(test_recipe), headers=jwt_headers)

        self.assertEqual(res.status_code, HTTPStatus.UNAUTHORIZED)

    def test_can_not_create_recipe_if_request_is_invalid(self):
        test_recipe = _get_test_recipe()
        jwt = self._get_test_jwt(role='admin')
        dict_test_recipe = attrs.asdict(test_recipe)
        del dict_test_recipe['name']
        jwt_headers = self._get_test_jwt_headers(jwt)
        res = self.client.post(
            '/api/recipe', json=dict_test_recipe, headers=jwt_headers)
        self.assertEqual(res.status_code, HTTPStatus.BAD_REQUEST)

    def test_can_create_recipe(self):
        test_recipe = _get_test_recipe()

        jwt = self._get_test_jwt(role='admin')
        jwt_headers = self._get_test_jwt_headers(jwt)

        res = self.client.post(
            '/api/recipe', json=attrs.asdict(test_recipe), headers=jwt_headers)

        self.assertEqual(res.status_code, HTTPStatus.OK)

    def test_can_not_delete_recipe_if_not_admin(self):
        test_recipe = _get_test_recipe()

        jwt = self._get_test_jwt(role='admin')
        jwt_headers = self._get_test_jwt_headers(jwt)

        res = self.client.post(
            '/api/recipe', json=attrs.asdict(test_recipe), headers=jwt_headers)

        recipe_id = res.json.get('data').get('id')
        default_user_jwt = self._get_test_jwt('default')
        default_user_jwt_headers = self._get_test_jwt_headers(default_user_jwt)
        res = self.client.delete(
            f'/api/recipe?recipe_id={recipe_id}', headers=default_user_jwt_headers)

        self.assertEqual(res.status_code, HTTPStatus.UNAUTHORIZED)

    def test_can_delete_recipe(self):
        test_recipe = _get_test_recipe()

        jwt = self._get_test_jwt(role='admin')
        jwt_headers = self._get_test_jwt_headers(jwt)

        res = self.client.post(
            '/api/recipe', json=attrs.asdict(test_recipe), headers=jwt_headers)

        recipe_id = res.json.get('data').get('id')
        res = self.client.delete(
            f'/api/recipe?recipe_id={recipe_id}', headers=jwt_headers)

        self.assertEqual(res.status_code, HTTPStatus.OK)
