
import unittest

from flask import current_app

from app import create_app


class RecipieAPITest(unittest.TestCase):
    def setUp(self) -> None:
        self.app = create_app('testing')
        self.app_context = self.app.app_context()
        self.app_context.push()
        return super().setUp()

    def tearDown(self) -> None:
        self.app_context.pop()

    def test_app_exists(self):
        self.assertFalse(current_app is None)
    
    
