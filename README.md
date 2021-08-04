# GoodEats

*By Richard Huang*

### Table of Contents
- Overview
- Application Architecture & Technologies

## Overview
GoodEats is a fullstack React Flask-SQLAlchemy app that allows users to create, edit, and favor recipes from all over the world.
Users can see all the recipes that are made on the website and go to them in order to see what ingredients are needed and what steps are needed to make a delicious meal. 
Users can also make their own recipes and have them displayed for everyone else to see. Users can also favor other people's recipes and see them on their own profile page to be able to easily find them again in the future. This project utilizes Flask-SQLAlchemy, PostgreSQL and Alembic to handle backend operations. For the frontend, React along with Redux is used to make RESTful data requests to the backend.

## Application Architecture
As stated above, GoodEats is fullstack React Flask-SQLAlchemy application. The logic for handling most of the data is done in the backend. The frontend utilizes data returned from the backend in order to determine which parts of the user interface should be shown. The frontend also handles data input from the user and packages the data properly before sending to the backend so that the backend logic can properly determine which data should be updated, deleted, or created. The technologies used include React, Redux, Flask-SQLAlchemy, Alembic, WTForms and Python core. 
