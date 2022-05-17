# Backend

Last updated: **Sat May 17, 2022**

## Author

Zaheer ud Din Faiz

## Run Application

### Run from source

>NOTE: Before running the application, we recommend you to to start the Mongodb server on port `27017`. If you wan to run from docker. Check out the `docker-compose.yml` file. You can run this file by commenting out `app` part and run only `Mongodb`
Follow the steps to run the application from source.

1. > `>> python3 -m venv venv (Create virtual env)`
2. >`>> source venv/bin/activate`
3. > `(venv)>> pip3 install -r requirements.txt`
4. > `>> ./init_dev.sh (See init_dev.sh file to see how the application is configured before running)`

### Run from docker

Go to root directory of the projecer and run application from `docker-compose.yml` file.

> docker compose up --build

### Configuration

There are some important env variable that are required by menu planning service to run properly.

#### ADMIN EMAIL

There are two main actors in our menu planning service. `Admin` and `Default User`. The application identifies the user as admin if the `email` of the user is provided as part of env variable. `ADMIN_EMAIL`. Please configure this env variable before running the application to perform `create/update/delete` actions.
`

#### Google OAuth variables

> `GOOGLE_CLIENT_ID` (Google Client Id obtained from Google developer console)
> 
> `GOOGLE_CLIENT_SECRET` (Google Client Sercret obtained from Google developer console)
