import os

from app import create_app
# from app.proxy.mongo.model import Recipie

app = create_app(os.environ.get('CONFIG_NAME', 'default'))
app.run()
