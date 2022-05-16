import json
from re import U
from typing import Dict
import requests
from flask import current_app as app, redirect, request
from oauthlib.oauth2 import WebApplicationClient

from app.api import BaseAPI
from app.http_errors import bad_request
from app.exception import ResourceAlreadyExistsException
from app.util.oauth import get_google_provider_cfg
from app.util.json_web_token import encode_auth_token
from app.model.response import get_response_model

from app.model.user import User
from app.proxy import get_proxy_client
from app.roles import ADMIN_ROLE_NAME, DEFAULT_ROLE_NAME


class GoogleOAuth(BaseAPI):
    def __init__(self) -> None:
        self.client = get_proxy_client()

    def get(self):
        client = WebApplicationClient(app.config.get("GOOGLE_CLIENT_ID"))
        google_provider_cfg = get_google_provider_cfg()
        google_auth_endpoint = google_provider_cfg["authorization_endpoint"]
        google_redirect_url = f"{request.base_url}/callback"
        request_uri = client.prepare_request_uri(
            uri=google_auth_endpoint, redirect_uri=google_redirect_url, scope=app.config.get('GOOGLE_OAUTH_SCOPE'))
        return redirect(request_uri)


class GoogleOAuthCallback(BaseAPI):
    def __init__(self) -> None:
        self.client = get_proxy_client()

    def get(self):

        user_info_response_json = self._run_back_channel_oauth_flow()
        if user_info_response_json["email_verified"] == False:
            return bad_request(message="Email not verified")
        role = DEFAULT_ROLE_NAME
        if user_info_response_json['email'] == app.config.get('ADMIN_EMAIL'):
            role = ADMIN_ROLE_NAME
        user = User(
            name=user_info_response_json['name'], email=user_info_response_json['email'], role=role)
        try:
            self.client.add_user(user=user)
        except ResourceAlreadyExistsException:
            # Ignore already exists exception
            pass

        jwt = encode_auth_token(user)
        return redirect(f'/?jwt={jwt}')

    def _run_back_channel_oauth_flow(self) -> Dict:
        code = request.args.get("code")

        GOOGLE_CLIENT_ID = app.config.get('GOOGLE_CLIENT_ID')
        GOOGLE_CLIENT_SECRET = app.config.get('GOOGLE_CLIENT_SECRET')
        client = WebApplicationClient(GOOGLE_CLIENT_ID)
        # Find out what URL to hit to get tokens that allow you to ask for
        # things on behalf of a user
        google_provider_cfg = get_google_provider_cfg()
        token_endpoint = google_provider_cfg["token_endpoint"]

        redirect_url = request.base_url
        # if not redirect_url.lower().startswith('https://'):
        #     redirect_url = redirect_url.replace('http://','https://')

        authorization_response = request.url
        if not authorization_response.lower().startswith('https://'):
            authorization_response = authorization_response.replace(
                'http://', 'https://')

        # Prepare and send a request to get tokens! Yay tokens!
        token_url, headers, body = client.prepare_token_request(
            token_endpoint,
            authorization_response=authorization_response,
            redirect_url=redirect_url,
            code=code
        )
        token_response = requests.post(
            token_url,
            headers=headers,
            data=body,
            auth=(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET),
        )

        # Parse the tokens!
        client.parse_request_body_response(json.dumps(token_response.json()))

        userinfo_endpoint = google_provider_cfg["userinfo_endpoint"]
        uri, headers, body = client.add_token(userinfo_endpoint)
        userinfo_response = requests.get(uri, headers=headers, data=body)

        # Make sure their email is verified.
        userinfo_response_json = userinfo_response.json()

        return userinfo_response_json
