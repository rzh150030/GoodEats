# GoodEats

*By Richard Huang*

### Table of Contents
- Overview
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

## Redux
Redux and react-redux library was used to manage application states as well as make fetch requests to the backend. 

Information on all the recipes and categories in the database is fetched on first app load and stored in the Redux store. This allows quick access to categories on the create and edit page as well as displaying all recipe on the front page.

Redux stores and sets information ```currentRecipe``` in order to allow other components such as the edit page to have the necessary data to display. It makes passing information between multiple different components easier that prop threading.

Redux store also allows for better organization of needed information. Recipe related information is kept in the recipe store while favorites related information is kept in the favorite store. 
