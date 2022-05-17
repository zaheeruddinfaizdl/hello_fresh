#!/bin/bash

export PROXY_CLIENT=MONGO
export OAUTHLIB_INSECURE_TRANSPORT=True
export FLASK_ENV=development
export FLASK_APP=wsgi.py
export ADMIN_EMAIL=zaheerfazy@gmail.com
gunicorn -w 4 --timeout 0 --bind :5000 wsgi:app