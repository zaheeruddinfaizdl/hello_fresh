#!/bin/bash

export PROXY_CLIENT=MONGO
export OAUTHLIB_INSECURE_TRANSPORT=True
export FLASK_ENV=development
export FLASK_APP=wsgi.py
export ADMIN_EMAIL=zaheerfazy@gmail.com
export DOMAIN=localhost:5000
export HTTP_SCHEME=http://
flask run