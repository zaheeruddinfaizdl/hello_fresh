from app.model.weekly_menu import WeeklyMenu
from app.model.recipe import Recipe


def _get_test_weekly_menu_with_recipe_ids() -> WeeklyMenu:
    w = WeeklyMenu(recipies_list=["1", "2", "3"], week_number=1)
    return w


def _get_test_recipe() -> Recipe:
    r = Recipe(name="Ginger Tofu & Peanut Rice", ingredients=[
        {"name": "garlic", "quantity": "3 clove"}],
        classification="Plant Based",
        instructions=["Chop Garlic", "Now its done 🙂"],
        nutirtional_info=[{"name": "Energy (kJ)", "amount": "2664 kJ"}])

    return r
