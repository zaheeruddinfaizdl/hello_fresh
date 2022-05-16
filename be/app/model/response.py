from http import HTTPStatus
from typing import Dict

from flask import jsonify


def get_response_model(data: Dict = {}, ok: bool = True, status: int = HTTPStatus.OK, error: str = "", message: str = ""):
    res = jsonify(ok=ok, data=data,  error=error, message=message)
    res.status_code = status
    return res
