from typing import TypedDict
import requests
from flask import current_app

import logging
LOGGER = logging.getLogger()


class GoogleProviderCfgType(TypedDict):
    authorization_endpoint: str


def get_google_provider_cfg() -> GoogleProviderCfgType:
    try:
        res = requests.get(current_app.config.get(
            'GOOGLE_OAUTH_DISCOVERY_URL'))
        return res.json()

    except Exception as e:
        LOGGER.exception('Exception while getting Google config', e)
        raise e
