
from threading import Lock
from flask import current_app as app
from werkzeug.utils import import_string

from app.proxy.base_proxy import BaseProxy

_proxy_client = None
_proxy_client_lock = Lock()


def get_proxy_client() -> BaseProxy:
    """
    Provides a singleton proxy client based on the config
    """
    global _proxy_client
    if _proxy_client != None:
        return _proxy_client

    with _proxy_client_lock:
        client = import_string(app.config.get('PROXY_CLIENT'))
        _proxy_client = client()

        return _proxy_client
