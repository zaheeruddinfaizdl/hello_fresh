import attrs
from http import HTTPStatus

from tests.unit.test_baics import BasicTestClient
from tests.util import _get_test_weekly_menu_with_recipe_ids


class TestWeeklyMenuAPI(BasicTestClient):
    def setUp(self) -> None:
        super().setUp()

    def tearDown(self) -> None:
        super().tearDown()

    def test_can_not_get_weekly_menus_if_not_logged_in(self):
        test_weekly_menu = _get_test_weekly_menu_with_recipe_ids()
        res = self.client.post('/api/weekly_menu',
                               json=attrs.asdict(test_weekly_menu))
        self.assertEqual(res.status_code, HTTPStatus.UNAUTHORIZED)

    def test_can_not_create_weekly_menu_if_not_admin(self):
        jwt = self._get_test_jwt(role='default')
        jwt_headers = self._get_test_jwt_headers(jwt)
        test_weekly_menu = _get_test_weekly_menu_with_recipe_ids()
        res = self.client.post('/api/weekly_menu',
                               json=attrs.asdict(test_weekly_menu), headers=jwt_headers)

        self.assertEqual(res.status_code, HTTPStatus.UNAUTHORIZED)

    def test_can_not_create_weekly_menu_if_request_is_invalid(self):
        test_recipe = _get_test_weekly_menu_with_recipe_ids()
        jwt = self._get_test_jwt(role='admin')
        dict_test_recipe = attrs.asdict(test_recipe)
        del dict_test_recipe['recipies_list']
        jwt_headers = self._get_test_jwt_headers(jwt)
        res = self.client.post(
            '/api/weekly_menu', json=dict_test_recipe, headers=jwt_headers)
        self.assertEqual(res.status_code, HTTPStatus.BAD_REQUEST)

    def test_can_create_weekly_menu(self):
        test_recipe = _get_test_weekly_menu_with_recipe_ids()
        jwt = self._get_test_jwt(role='admin')
        jwt_headers = self._get_test_jwt_headers(jwt)
        res = self.client.post(
            '/api/weekly_menu', json=attrs.asdict(test_recipe), headers=jwt_headers)
        self.assertEqual(res.status_code, HTTPStatus.OK)
