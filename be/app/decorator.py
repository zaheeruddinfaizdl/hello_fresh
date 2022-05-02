from flask import request, g
from functools import wraps
from marshmallow import ValidationError, Schema

from app.errors import un_authorized


def validate_request(schema: Schema):
    def decorator(next):
        @wraps(next)
        def decorated_function(*args, **kwargs):
            try:
                request_data = request.json
                parsed_request = schema.load(data=request.json)
                g.parsed_request = parsed_request

            except ValidationError as err:
                return un_authorized(err.args)
            return next(*args, **kwargs)
        return decorated_function
    return decorator


def admin_requried():
    pass
