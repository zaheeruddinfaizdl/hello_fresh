from abc import ABCMeta, abstractmethod

from app.model.recipe import Recipe


class BaseProxy(metaclass=ABCMeta):
    """
    Base Proxy, which behaves like an interface for all the 
    proxy clients in our menu planning service
    """

    @abstractmethod
    def create_recipe(self, recipe: Recipe):
        pass

    @abstractmethod
    def create_weekly_menu(self):
        pass

    @abstractmethod
    def add_recipe_in_weekly_menu(self):
        pass

    @abstractmethod
    def remove_recipe_from_weekly_menu(self):
        pass
