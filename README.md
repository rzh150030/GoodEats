# GoodEats

*By Richard Huang*

### Table of Contents
- [Overview](https://github.com/rzh150030/GoodEats#Overview)
- Application Architecture & Technologies
- Frontend Technologies
- Backend Technologies
- Other Information

## Overview
GoodEats is a fullstack React Flask-SQLAlchemy app that allows users to create, edit, and favor recipes from all over the world.
Users can see all the recipes that are made on the website and go to them in order to see what ingredients are needed and what steps are needed to make a delicious meal. 
Users can also make their own recipes and have them displayed for everyone else to see. Users can also favor other people's recipes and see them on their own profile page to be able to easily find them again in the future. This project utilizes Flask-SQLAlchemy, PostgreSQL and Alembic to handle backend operations. For the frontend, React along with Redux is used to make RESTful data requests to the backend.

## Application Architecture & Technologies
As stated above, GoodEats is fullstack React Flask-SQLAlchemy application. The logic for handling most of the data is done in the backend. The frontend utilizes data returned from the backend in order to determine which parts of the user interface should be shown. The frontend also handles data input from the user and packages the data properly before sending to the backend so that the backend logic can properly determine which data should be updated, deleted, or created. The technologies used include React, Redux, Flask-SQLAlchemy, Alembic, WTForms and Python core. 
![](https://github.com/rzh150030/GoodEats/blob/main/images/UML-diagram-data-flow.png)

## Frontend Technologies
### React
GoodEats is a React application that uses some of the core React library such as useState and props. The majority of technologies used is from the Redux library. Without Redux, passing data around each React component would be more tedious. The ability to break down htmls into components with React however makes organization a lot cleaner and easier to manage compared to other technologies such as Pug.

### Redux
Redux and react-redux library was used to manage application states as well as make fetch requests to the backend. 

Information on all the recipes and categories in the database is fetched on first app load and stored in the Redux store. This allows quick access to categories on the create and edit page as well as displaying all recipe on the front page.

Redux stores and sets information ```currentRecipe``` in order to allow other components such as the edit page to have the necessary data to display. It makes passing information between multiple different components easier that prop threading. The information stored in ```currentRecipe``` is also used to determine which buttons to show on a recipe detail page.

Redux store also allows for better organization of needed information. Recipe related information is kept in the recipe store while favorites related information is kept in the favorite store. 

## Backend Technologies
### Flask-SQLAlchemy
The use of Flask-SQLAlchemy helped simplify creating associations and tables that would have been required with the application. Using a few model files and setting the right table column variables as well as relationship variables I could have the all the setup necessary for my database to work. Compared to something like Sequelize which would require some preliminary set up before being able to establish relationships as well as being very specific with syntax, Flask-SQLAlchemy was easier to use.
### PostgreSQL
Use of PostgreSQL was at the behest of App Academy.
### WTForms
WTForms allows for validation of form inputs when dealing with data on the backend. It validates the name and category of the form data sent by the frontend. Unfortunately, it could not handle data for ingredients and directions so it was not used for validating those data. Instead a custom validation method was used to validate ingredient and directions data.
### Alembic
Used to migrate and seed the database. Alembic's ability to notice changes and create new versions of a migration helps simplify the process of updating tables in the database. Compared with sequelize, you would need to unseed and unmigrate a table before remigrating it to make changes on tables in the database. Seeding in alembic required creation of a custom seed command unlike with Sequelize.

## Other Information
There will be other features that would be included in the future. Being able to review a recipe is currently being worked on. Other features to be implemented later include rating, search by categories and searching. Some upcoming challenge with the features is being able to create a search functionality on the frontend as well as styling the components properly.
