from abc import ABCMeta, abstractmethod
from typing import List, TypedDict

from app.model.recipe import Recipe
from app.model.rating import Rating
from app.model.user import User
from app.model.weekly_menu import WeeklyMenu


class GetPaginatedRecipiesResponse(TypedDict):
    paginated_recipies: List[Recipe]
    total_recipies: int


class BaseProxy(metaclass=ABCMeta):
    """
    Base Proxy, which behaves like an interface for all the 
    proxy clients in our menu planning service
    """

    @abstractmethod
    def create_recipe(self, recipe: Recipe) -> Recipe:
        pass

    @abstractmethod
    def delete_recipe(self, recipe_id: str) -> Recipe:
        pass

    @abstractmethod
    def edit_recipe(self, recipe_id: str, recipe: Recipe):
        pass

    @abstractmethod
    def edit_weekly_menu(self, weekly_menu_id: str, weekly_menu: WeeklyMenu):
        pass

    @abstractmethod
    def add_review_on_recipe(self, user_id: str, recipe_id: str, rating: Rating):
        pass

    @abstractmethod
    def get_rating_on_recipe(self, recipe_id: str):
        pass

    @abstractmethod
    def get_rating_on_weekly_menu(self, weekly_menu_id: str):
        pass

    @abstractmethod
    def add_review_on_weekly_menu(self, user_id: str,  weekly_menu_id: str, rating: Rating):
        pass

    @abstractmethod
    def add_user(self, user: User):
        pass

    @abstractmethod
    def create_weekly_menu(self, weekly_menu: WeeklyMenu):
        pass

    @abstractmethod
    def get_recipe_by_id(self, recipe_id: str) -> Recipe:
        pass

    @abstractmethod
    def get_paginated_recipes(self, page_number=0, page_size=10) -> GetPaginatedRecipiesResponse:
        pass

    @abstractmethod
    def get_paginated_weekly_menus(self, page_number=0, page_size=10):
        pass

    @abstractmethod
    def get_weekly_menus_count(self):
        pass

    @abstractmethod
    def get_weekly_menu_by_id(self, menu_id: str) -> WeeklyMenu:
        pass

    @abstractmethod
    def add_recipe_in_weekly_menu(self):
        pass

    @abstractmethod
    def remove_recipe_from_weekly_menu(self):
        pass
