# Menu Planning Service - Design Document

Last updated: **Tue May 17, 2022**

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

### Database

We will use `NoSQL` (MongoDB) as our database

#### Why we are using a NoSQL database

Recipies are highly unstructured data type in nature. It is very uncommon to see the familiarity among the recipies. The steps to make a recipe are different, the nutriotions that a recipe contiains are different. There are a number of classes of recipies and the list of ingredients required to make one recipie are often different for every recipe. So considering these parameters, we have decided that our data is going to be highly unstructred and we need a NoSQL database to store the information. The NoSQL database we are using is `MongoDB`.

### Frontend

We are going to use React library to create our frontend. We will be using TypeScript which will help us to track syntax and typing errors beforehand. Along with React, we will use Webpack and babel for compiling our application.

### Deployment

We will use `docker` to ship our application. And we will use `AWS cloud` to host our application. `EC2` will be used to run our docker application. Since all the services are dockerized we will use `docker-compose` to run our multi-container application. Moreover, the load on our application at first is low, so we will use bare `EC2` to run our application. In future, to run our application at scale and have a self-healing infrastructure. We will migrate to `EKS (Elastic Kubernetes Service)`.

#### SSL

We will use `Let's encrypt` to acquire the SSL certificates for our domain. Right now, we are using self-signed certificates created from command line tool: `openssl`. So when our application is visited from public domain, the browser may complain and may not allow to proceed further.

[Flask]: <https://flask.palletsprojects.com/en/2.1.x/>
[weekly menu]: <https://www.hellofresh.com.au/plans/>
[recipies]: <https://www.hellofresh.com.au/recipes/>
[menu for this week]: <https://www.hellofresh.com.au/plans/>
[1]: <https://www.hellofresh.com.au/recipes/southeast-asian-chicken-coconut-soup-5fa9c26209c8db59115d3f4f>
[2]: <https://www.hellofresh.com.au/recipes/saucy-coconut-chicken-noodles-5f9b3c7198ecf4455b27d94d>
[3]: <https://www.hellofresh.com.au/recipes/dukkah-roasted-sweet-potato-5f9b43847aacaa50f037d858>
