import attrs
from http import HTTPStatus
from typing import Dict

from flask import Response
from app.model.recipe import Recipe
from app.model.weekly_menu import WeeklyMenu
from app.model.rating import Rating
from tests.unit.test_baics import BasicTestClient
from tests.util import _get_test_recipe, _get_test_weekly_menu_with_recipe_ids


class TestRecipeRatingAPI(BasicTestClient):
    def setUp(self) -> None:
        super().setUp()

        test_recipe = _get_test_recipe()
        jwt = self._get_test_jwt(role='admin')
        self.jwt_headers = self._get_test_jwt_headers(jwt)
        res = self.client.post(
            '/api/recipe', json=attrs.asdict(test_recipe), headers=self.jwt_headers)
        self.recipe_id = res.json.get('data').get('id')

    def tearDown(self) -> None:
        super().tearDown()
        self.client.delete(
            f'/api/recipe?recipe_id={self.recipe_id}', headers=self.jwt_headers)

    def _create_test_recipe(self) -> Response:
        test_recipe = _get_test_recipe()
        jwt = self._get_test_jwt(role='admin')
        self.jwt_headers = self._get_test_jwt_headers(jwt)
        res = self.client.post(
            '/api/recipe', json=attrs.asdict(test_recipe), headers=self.jwt_headers)

        self.assertEqual(res.status_code, HTTPStatus.OK)
        return res

    def _get_test_rating(self) -> Rating:
        rating = Rating(rating=4, review="I love unit testing")
        return rating

    def test_can_not_add_rating_if_not_logged_in(self):
        # recipe_created_res = self._create_test_recipe()
        # recipe_id = recipe_created_res.json.get("data").get("id")
        res = self.client.put(f'/api/recipe/rating/{self.recipe_id}')

        self.assertEqual(res.status_code, HTTPStatus.UNAUTHORIZED)

    def test_can_not_add_rating_if_request_is_invalid(self):
        # recipe_created_res = self._create_test_recipe()
        # recipe_id = recipe_created_res.json.get("data").get("id")

        res = self.client.put(
            f'/api/recipe/rating/{self.recipe_id}', headers=self.jwt_headers, json={})

        self.assertEqual(res.status_code, HTTPStatus.BAD_REQUEST)

    def test_can_not_add_rating_if_request_is_invalid(self):
        test_rating = self._get_test_rating()
        dict_test_rating = attrs.asdict(test_rating)
        del dict_test_rating['rating']

        self.client.put('/api/recipe/rating/')

    def test_can_add_rating(self):
        # recipe_created_res = self._create_test_recipe()
        test_rating = self._get_test_rating()
        # recipe_id = recipe_created_res.json.get("data").get("id")
        res = self.client.put(
            f'/api/recipe/rating/{self.recipe_id}', headers=self.jwt_headers, json=attrs.asdict(test_rating))

        self.assertEqual(res.status_code, HTTPStatus.OK)


class TestWeeklyMenuRatingAPI(BasicTestClient):
    def setUp(self) -> None:
        return super().setUp()

    def tearDown(self) -> None:
        return super().tearDown()

    def _get_test_rating(self) -> Rating:
        rating = Rating(rating=4, review="I love unit testing")
        return rating

    def _create_test_weekly_menu(self):
        test_weekly_menu = _get_test_weekly_menu_with_recipe_ids()
        jwt = self._get_test_jwt(role='admin')
        self.jwt_headers = self._get_test_jwt_headers(jwt)
        res = self.client.post(
            '/api/weekly_menu', json=attrs.asdict(test_weekly_menu), headers=self.jwt_headers)
        self.assertEqual(res.status_code, HTTPStatus.OK)

        return res

    def test_can_not_add_rating_if_not_logged_in(self):

        test_rating = self._get_test_rating()
        weekly_menu_created_res = self._create_test_weekly_menu()
        weekly_menu_id = weekly_menu_created_res.json.get("data").get("id")
        rating_res = self.client.put(
            f'/api/weekly_menu/rating/{weekly_menu_id}', headers={}, json=attrs.asdict(test_rating))

        self.assertEqual(rating_res.status_code, HTTPStatus.UNAUTHORIZED)

    def test_can_not_add_rating_if_request_is_invalid(self):
        test_rating = self._get_test_rating()
        dict_test_rating = attrs.asdict(test_rating)
        weekly_menu_created_res = self._create_test_weekly_menu()
        weekly_menu_id = weekly_menu_created_res.json.get("data").get("id")
        del dict_test_rating['rating']
        res = self.client.put(
            f'/api/weekly_menu/rating/{weekly_menu_id}', headers=self.jwt_headers, json=dict_test_rating)

        self.assertEqual(res.status_code, HTTPStatus.BAD_REQUEST)

    def test_can_add_rating(self):
        test_rating = self._get_test_rating()
        weekly_menu_created_res = self._create_test_weekly_menu()

        weekly_menu_id = weekly_menu_created_res.json.get("data").get("id")
        res = self.client.put(
            f'/api/weekly_menu/rating/{weekly_menu_id}', headers=self.jwt_headers, json=attrs.asdict(test_rating))

        self.assertEqual(res.status_code, HTTPStatus.OK)
