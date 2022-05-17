import attr
from typing import List
from marshmallow3_annotations.ext.attrs import AttrsSchema
from marshmallow.exceptions import ValidationError

from .recipe import Recipe


@attr.s(auto_attribs=True, kw_only=True)
class WeeklyMenu:
    id: str = attr.ib(default="")
    week_number: int = attr.ib(default="")
    recipies_list: List[str] = attr.ib()

    @recipies_list.validator
    def check_recipies_are_not_empty(self, attr, recipies_list: List[str]):
        for recipe in recipies_list:
            if recipe == "" or recipe == None:
                raise ValidationError("recipe value can not be empty")


class WeeklyMenuSchema(AttrsSchema):
    class Meta:
        target = WeeklyMenu
        register_as_scheme = True


@attr.s(auto_attribs=True, kw_only=True)
class WeeklyMenuWithDates(WeeklyMenu):
    start_date: str = attr.ib(default='')
    end_date: str = attr.ib(default='')


class WeeklyMenuWithDatesSchema(AttrsSchema):
    class Meta:
        target = WeeklyMenuWithDates
        register_as_scheme = True


@attr.s(auto_attribs=True, kw_only=True)
class WeeklyMenuWithRecipes(WeeklyMenu):
    recipies_list: List[Recipe]


class WeeklyMenuWithRecipesSchema:
    class Meta:
        target = WeeklyMenuWithRecipes
        register_as_scheme = True
