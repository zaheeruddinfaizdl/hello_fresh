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

    MONGO_URI = "mongodb://localhost:27017/menu_service"

    @staticmethod
    def init_app(app: Flask):
        pass


class DevelopmentConfig(Config):
    FLASK_ENV = "development"
    pass


class TestConfig(Config):
    TESTING = True
    pass


class ProdConfig(Config):
    pass


config = {
    "development": DevelopmentConfig,
    "testing": TestConfig,
    "production": ProdConfig,
    "default": DevelopmentConfig
}
