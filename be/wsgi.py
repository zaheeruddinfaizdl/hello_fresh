import os

from app import create_app
# from app.proxy.mongo.model import Recipie
from app.proxy.mongo.mongo_startup import MongoStartup

app = create_app(os.environ.get('CONFIG_NAME', 'default'))

with app.app_context():
    mongo_startup = MongoStartup()
    mongo_startup.run_startup()


@app.cli.command()
def test():
    import unittest
    tests = unittest.TestLoader().discover('tests')
    unittest.TextTestRunner(verbosity=2).run(tests)


@app.cli.command()
def create_jwt():
    from app.util.json_web_token import encode_auth_token
    from app.model.user import User
    u = User(name="test", email="test@user.com", role="admin")

    jwt = encode_auth_token(u)
    print(jwt)


if __name__ == "__main__":
    app.run(host='0.0.0.0')
