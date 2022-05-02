
from typing import Any
from flask_restful import Resource
from marshmallow3_annotations.ext.attrs import AttrsSchema
from app.proxy.base_proxy import BaseProxy


class BaseAPI(Resource):
    """
    Base API for all other APIs in our menu planning service
    """

    def __init__(self, schema: AttrsSchema, client: BaseProxy) -> None:
        self.schema = schema
        self.client = client
