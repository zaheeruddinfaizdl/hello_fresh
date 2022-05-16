from http import HTTPStatus

from app.model.response import get_response_model


def un_authorized(message: str = ''):
    response = get_response_model(
        status=HTTPStatus.UNAUTHORIZED, error="unauthorized", message=message, data={})
    return response


def bad_request(message: str = ''):
    response = get_response_model(
        status=HTTPStatus.BAD_REQUEST, error="bad_request", message=message, data={})
    return response


def not_found(message: str = ''):
    response = get_response_model(
        status=HTTPStatus.NOT_FOUND, error="not_found", message=message, data={})
    return response
