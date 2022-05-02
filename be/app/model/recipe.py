from typing import List
import attr
from marshmallow3_annotations.ext.attrs import AttrsSchema


@attr.s(auto_attribs=True, kw_only=True)
class Ingredient:
    name: str = attr.ib()
    quantity: str = attr.ib()


class IngredientSchema(AttrsSchema):
    class Meta:
        target = Ingredient
        register_as_scheme = True

@attr.s(auto_attribs=True, kw_only=True)
class Instruction:
    # image_link: str = attr.ib()
    pass


@attr.s(auto_attribs=True, kw_only=True)
class Nutirtion:
    name: str = attr.ib()
    amount: str = attr.ib()

class NutirtionSchema(AttrsSchema):
    class Meta:
        target = Nutirtion
        register_as_scheme = True


@attr.s(auto_attribs=True, kw_only=True)
class Recipe:
    name: str = attr.ib()
    ingredients: List[Ingredient] = attr.ib()
    instructions: List[str] = attr.ib()
    nutirtional_info: List[Nutirtion] = attr.ib()
    classification: str = attr.ib()


class RecipeSchema(AttrsSchema):
    class Meta:
        target = Recipe
        register_as_scheme = True
