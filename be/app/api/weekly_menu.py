from calendar import week
import datetime
from http import HTTPStatus
import attrs
from flask import current_app as app, request, g
from app.login import login_required, current_user


from app.api import BaseAPI
from app.decorator import admin_requried, validation_required
from app.http_errors import not_found, un_authorized
from app.model.weekly_menu import WeeklyMenuSchema, WeeklyMenuWithRecipesSchema, WeeklyMenu, WeeklyMenuWithDates, WeeklyMenuWithDatesSchema
from app.model.response import get_response_model
from app.proxy import get_proxy_client


class WeeklyMenuIDAPI(BaseAPI):
    def __init__(self) -> None:
        client = get_proxy_client()
        super().__init__(schema=WeeklyMenuSchema(), client=client)

    @login_required
    def get(self, menu_id):
        weekly_menu = self.client.get_weekly_menu_by_id(menu_id=menu_id)
        if weekly_menu == None:
            return not_found(f"Weekly menu with id {menu_id} does not exist")

        return get_response_model(data=weekly_menu)


class WeeklyMenuAPI(BaseAPI):
    def __init__(self) -> None:
        client = get_proxy_client()
        super().__init__(schema=WeeklyMenuSchema(), client=client)

    def _get_current_week_number_of_year(self):
        today = datetime.datetime.today()
        week_number = today.isocalendar()[1]
        return week_number

    def _get_start_date_and_end_date_from_week_number(self, week_number: int):
        current_year = datetime.datetime.today().year
        d = f"{current_year}-W{week_number}"
        start_of_week = datetime.datetime.strptime(d + '-1', "%Y-W%W-%w")
        end_of_week = start_of_week + datetime.timedelta(days=6)
        return (start_of_week, end_of_week)

    @login_required
    def get(self):
        page_number = int(request.args.get('page_number'))
        page_size = int(request.args.get('page_size'))

        weekly_menus = self.client.get_paginated_weekly_menus(
            page_number=page_number, page_size=page_size)
        return get_response_model(data=weekly_menus)

    @login_required
    @admin_requried()
    @validation_required(WeeklyMenuWithDatesSchema())
    def post(self):
        weekly_menu: WeeklyMenuWithDates = g.parsed_request
        count = self.client.get_weekly_menus_count()

        if count > 52:
            return get_response_model(ok=False,
                                      message="You can not add more than 52 weekly menus in 1 year.", status=HTTPStatus.UNPROCESSABLE_ENTITY)

        current_week_number_of_year = self._get_current_week_number_of_year()
        weekly_menu.week_number = count + current_week_number_of_year

        start_date_of_week, end_date_of_week = self._get_start_date_and_end_date_from_week_number(
            week_number=weekly_menu.week_number)
        
        weekly_menu.start_date = start_date_of_week
        weekly_menu.end_date = end_date_of_week
        
        res = self.client.create_weekly_menu(weekly_menu=weekly_menu)
        return get_response_model(data=attrs.asdict(res))

    @login_required
    @admin_requried()
    @validation_required(WeeklyMenuSchema())
    def put(self):
        weekly_menu: WeeklyMenu = g.parsed_request
        res = self.client.edit_weekly_menu(
            weekly_menu_id=weekly_menu.id, weekly_menu=weekly_menu)
        return get_response_model()
