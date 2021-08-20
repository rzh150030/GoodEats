# GoodEats

*Developed by Richard Huang*

[Live Link](https://good-eats-capstone-project.herokuapp.com/)

### Table of Contents
- [Overview](https://github.com/rzh150030/GoodEats#overview)
- [Application Architecture & Technologies](https://github.com/rzh150030/GoodEats#application-architecture-&-technologies)
- [Frontend Technologies](https://github.com/rzh150030/GoodEats#frontend-technologies)
- [Backend Technologies](https://github.com/rzh150030/GoodEats#backend-technologies)
- [Current Features](https://github.com/rzh150030/GoodEats#current-features)
- [Future Developments](https://github.com/rzh150030/GoodEats#future-developments)

## Overview
GoodEats is a fullstack React Flask-SQLAlchemy app that allows users to create, edit, review and favor recipes from all over the world.
Users can see all the recipes that are made on the website and go to them in order to see what ingredients are needed and what steps are needed to make a delicious meal. 
Users can also make their own recipes and have them displayed for everyone else to see. When creating a recipe, users can add as many steps and ingredients as they want; the form will dynamically adjust to accommodate all the information they provide. Editing a recipe is just as easy since the form will contain all the information they've already posted allowing them to make minor adjustments if needed as well as accepting new information such as more ingredients or extra directions. If the user decides to cancel any changes they've made on the edit page, they can cancel the form and go back to the recipe page without any of the changes made showing up. Should the user decide they don't like the recipe they made they can always delete the recipe.

Users can also favor other people's recipes and see them on their own profile page to be able to easily find them again in the future. If they no longer favor the recipe the option of unfavoring is always available. Users can also leave a review on any recipes other than their own. To decrease the odds of spam, users can only review each recipe once. This project utilizes Flask-SQLAlchemy, PostgreSQL and Alembic to handle backend operations. For the frontend, React along with Redux is used to make RESTful data requests to the backend.

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
PostgreSQL was used for database storage of information since it allows storage of many types of different data and constraints. It works well with Flask-SQLAlchemy to create a database that can store the required information and relationships
### WTForms
WTForms allows for validation of form inputs when dealing with data on the backend. It validates the name and category of the form data sent by the frontend. Unfortunately, it could not handle data for ingredients and directions so it was not used for validating those data. Instead a custom validation method was used to validate ingredient and directions data.
### Alembic
Used to migrate and seed the database. Alembic's ability to notice changes and create new versions of a migration helps simplify the process of updating tables in the database. Compared with sequelize, you would need to unseed and unmigrate a table before remigrating it to make changes on tables in the database. Seeding in alembic required creation of a custom seed command unlike with Sequelize.

## Current Features
### Create, Update, Delete Recipes
Logged in users are able to create recipes by entering the ingredients and direction for each recipe. Ingredients and directions are stored separately in their own tables to ensure proper ordering and keeping each items separate. Developed custom logic and validators in recipe backend to handle creating, editing, and deleting ingredients and directions.

`def edit_recipe(id):
    form = RecipeForm()
    recipe = Recipe.query.get(id)

    # data from backend
    table_ingredients = recipe.to_dict_ingreds()
    table_directions = recipe.to_dict_directs()

    form["csrf_token"].data = request.cookies["csrf_token"]
    data = request.json

    # check if ingredients or directions list has empty values
    errors = validate_ingreds_directs(data["ingredients"], data["directions"])
    if errors:
        return errors

    if form.validate_on_submit():
        recipe.name = form.data["name"]
        recipe.category_id = form.data["category"]

        # update ingredients table
        for ingred in data["ingredients"]:
            if int(ingred["id"]) == 0:
                ingredient = Ingredient(ingredient=ingred["ingredient"], recipe_id=recipe.id)
                recipe.ingredients.append(ingredient)
                db.session.add(ingredient)
            elif table_ingredients[int(ingred["id"])]:
                ingredient_from_table = Ingredient.query.get(int(ingred["id"]))
                ingredient_from_table.ingredient = ingred["ingredient"]
                del table_ingredients[int(ingred["id"])]

        # update directions table
        for direct in data["directions"]:
            if int(direct["id"]) == 0:
                direction = Direction(step=direct["step"], recipe_id=recipe.id)
                recipe.directions.append(direction)
                db.session.add(direction)
            elif table_directions[int(direct["id"])]:
                direction_from_table = Direction.query.get(int(direct["id"]))
                direction_from_table.step = direct["step"]
                del table_directions[int(direct["id"])]

        # delete remaining data from backend
        for key in table_ingredients.keys():
            ingredient = Ingredient.query.get(key)
            db.session.delete(ingredient)
        for key in table_directions.keys():
            direction = Direction.query.get(key)
            db.session.delete(direction)

        db.session.commit()
        return recipe.to_dict_with_details()

    return {"errors": validation_errors_to_error_messages(form.errors)}, 400`
### Favoriting recipes
Logged in users are allowed to favor recipes they do not own and have quick access to them in their profile page.
### Reviewing a recipe
Logged in users are able to leave their thoughts on a recipe in a review. Users can edit or delete the reviews they've made on recipes but can only submit one review per recipe in an effort to prevent spam.

## Future Developments
There will be other features that would be included in the future. Potential features to be implemented later include rating, search by categories and searching. Some upcoming challenge with the features is being able to create a search functionality on the frontend as well as styling the components properly.
