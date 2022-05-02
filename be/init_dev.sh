#!/bin/bash

export PROXY_CLIENT=MONGO
export FLASK_ENV=development
export FLASK_APP=wsgi.py
flask run