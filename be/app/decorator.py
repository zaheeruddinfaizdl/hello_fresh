from flask import request, g
from functools import wraps
from marshmallow import ValidationError, Schema

from app.http_errors import un_authorized, bad_request
from app.login import current_user
from app.roles import ADMIN_ROLE_NAME


def validation_required(schema: Schema):
    def decorator(next):
        @wraps(next)
        def decorated_function(*args, **kwargs):
            try:
                request_data = request.json
                parsed_request = schema.load(data=request_data)
                g.parsed_request = parsed_request

            except ValidationError as err:
                return bad_request(err.args)
            return next(*args, **kwargs)
        return decorated_function
    return decorator



def admin_requried():
    def decorator(next):
        @wraps(next)
        def decorated_function(*args, **kwargs):
            if current_user.role != ADMIN_ROLE_NAME:
                return un_authorized("You are not authorized to perform this action")
            return next(*args, **kwargs)
        return decorated_function
    return decorator
