# Menu Planning Service - Design Document

Last updated: **Sat Apr 30, 2022**

## Author

Zaheer ud Din Faiz

## Overview

This document describes the solution design for **Menu Planning Service**. The service allows users to to manage weekly menu and associated recipies.

## Context

- A [weekly menu] contains a set of [recipies]. Each week different set of recipies are selected. See example [menu for this week].
- A [recipe] contains ingredients, step-by-step instructions, nutirtional information, classification, and other metadata. See examples recipes here [1], [2], [3].
- A customer can review weekly menu as well as recipe by assigning ratings and/or adding comments.

## Proposed Solution

The service will be created as a web application with client server architecture. The end user will be able to visit the service by entering the URL of the web app in their browser. And interact with the web app in the manner described in [Context](#context). Each **CRUD** operation by the end user on the weekly menus or receipes will be authentiacted in the backend. We will use `Google OAuth` to authenticate the user.

### Block Diagram

![Menu Planning Service Block Diagram](assets/img/Block%20Diagram.png)

[View Diagram](https://drive.google.com/file/d/1Oz7QjW38iEYpgBt-vrGtf3aP7NoCHy_J/view?usp=sharing)

### Backend Solution

#### Tech

We will use following tech in the backend:

- Python3
- [Flask] as our web framework
- Flask-PyMongo as ORM
- MongoDB as a database
- Pytest for unit testing

### Backend Design Diagram

The backend will comprise of a single web service that will expose itself on specified endpoints.

![Menu Planning Service Backend Design Diagram](/assets/img/Backend%20Design.png)

[Flask]: <https://flask.palletsprojects.com/en/2.1.x/>
[weekly menu]: <https://www.hellofresh.com.au/plans/>
[recipies]: <https://www.hellofresh.com.au/recipes/>
[menu for this week]: <https://www.hellofresh.com.au/plans/>
[1]: <https://www.hellofresh.com.au/recipes/southeast-asian-chicken-coconut-soup-5fa9c26209c8db59115d3f4f>
[2]: <https://www.hellofresh.com.au/recipes/saucy-coconut-chicken-noodles-5f9b3c7198ecf4455b27d94d>
[3]: <https://www.hellofresh.com.au/recipes/dukkah-roasted-sweet-potato-5f9b43847aacaa50f037d858>
