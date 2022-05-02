from http import HTTPStatus
from flask import jsonify


def un_authorized(message: str = ''):
    response = jsonify({"error": "bad request", "message": message})
    response.status_code = HTTPStatus.BAD_REQUEST
    return response
