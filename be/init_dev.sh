#!/bin/bash

export PROXY_CLIENT=MONGO
export OAUTHLIB_INSECURE_TRANSPORT=True
export FLASK_ENV=development
export FLASK_APP=wsgi.py
export ADMIN_EMAIL=zaheerfazy@gmail.com
export HOST_NAME=localhost
export HTTP_SCHEME=http://
gunicorn -w 1 --timeout 0 --bind :5000 wsgi:app