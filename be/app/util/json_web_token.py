
import jwt
import datetime
from flask import current_app as app
from app.exception import TokenExpiredException, TokenInvalidException

from app.model.user import User

JWT_SIGNINIG_ALGO = 'HS256'


def encode_auth_token(user: User) -> str:
    """
    Generates the Auth Token
    :return: string
    """
    try:
        payload = {
            'exp': datetime.datetime.utcnow() + datetime.timedelta(days=0, hours=15),
            'iat': datetime.datetime.utcnow(),
            'sub': user.email,

            'name': user.name,
            'email': user.email,
            'role': user.role
        }
        return jwt.encode(
            payload,
            app.config.get('SECRET_KEY'),
            algorithm=JWT_SIGNINIG_ALGO
        )
    except Exception as e:
        return e


def decode_auth_token(auth_token: str):
    """
    Decodes the auth token
    :param auth_token:
    :return: integer|string
    """
    try:
        payload = jwt.decode(auth_token, app.config.get(
            'SECRET_KEY'), algorithms=JWT_SIGNINIG_ALGO)
        return payload
    except jwt.ExpiredSignatureError as e:
        raise TokenExpiredException(e)
    except jwt.InvalidTokenError as e:
        raise TokenInvalidException(e)
