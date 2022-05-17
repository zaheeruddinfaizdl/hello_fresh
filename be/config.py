import os

from flask import Flask

PROXY_CLIENTS = {
    "MONGO": "app.proxy.mongo.mongo_proxy.MongoProxy",
    "POSTGRES": "app.proxy.postgres.postgres_proxy.PostgresProxy"
}


class Config:

    # if PROXY_CLIENT not provided, fallback to Mongo
    proxy_client_name = os.environ.get('PROXY_CLIENT', 'MONGO')
    PROXY_CLIENT = PROXY_CLIENTS[proxy_client_name]
    GOOGLE_OAUTH_SCOPE = ['openid', 'email', 'profile']
    GOOGLE_CLIENT_ID = os.environ.get(
        "GOOGLE_CLIENT_ID", "936047108871-6d002qaneoo6u529hes73rp7coliu3km.apps.googleusercontent.com")
    GOOGLE_CLIENT_SECRET = os.environ.get(
        "GOOGLE_CLIENT_SECRET", "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")
    SECRET_KEY = 'secret_key'

    GOOGLE_OAUTH_DISCOVERY_URL = os.environ.get(
        "GOOGLE_OAUTH_DISCOVERY_URL", "https://accounts.google.com/.well-known/openid-configuration")
    ADMIN_EMAIL = os.environ.get('ADMIN_EMAIL')
    MONGO_URI = os.environ.get(
        "MONGO_URI", "mongodb://localhost:27017/menu_service")
    DOMAIN = os.environ.get("DOMAIN", "localhost:5000")
    HTTP_SCHEME = os.environ.get("HTTP_SCHEME", "https://")

    @staticmethod
    def init_app(app: Flask):
        pass


class DevelopmentConfig(Config):
    FLASK_ENV = "development"
    OAUTHLIB_INSECURE_TRANSPORT = True
    pass


class TestConfig(Config):
    TESTING = True
    MONGO_URI = os.environ.get(
        "TEST_MONGO_URI", "mongodb://localhost:27017/test_menu_service")

    pass


class ProdConfig(Config):
    pass


config = {
    "development": DevelopmentConfig,
    "testing": TestConfig,
    "production": ProdConfig,
    "default": DevelopmentConfig
}
