

from http import HTTPStatus
from flask import current_app
from tests.unit.test_baics import BasicTestClient


class BasiAppTest(BasicTestClient):

    def tearDown(self) -> None:
        self.app_context.pop()

    def test_app_exists(self):
        self.assertFalse(current_app is None)

    def test_home_page(self):
        res = self.client.get('/')
        self.assertEqual(res.status_code, HTTPStatus.OK)
        self.assertIn('Menu Planning Service', res.text)

    def test_app_is_in_testing_mode(self):
        self.assertTrue(current_app.config.get("TESTING") == True)
