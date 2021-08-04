from flask import Blueprint, request
from flask_login import login_required, current_user
from app.forms import RecipeForm
from app.models import db, Recipe, Ingredient, Direction

recipe_routes = Blueprint("recipes", __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

# Get all current user's recipes
@recipe_routes.route("/user/<int:id>")
@login_required
def user_recipes(id):
    if id == current_user.id:
        recipes = Recipe.query.filter_by(user_id=f"{id}").all()
        return {"recipes": [recipe.to_dict() for recipe in recipes]}
    return {"errors": ["Unauthorized"]}, 401

# Get a specific recipe and its ingredients and directions
@recipe_routes.route("/<int:id>")
def recipe(id):
    recipe = Recipe.query.get(id)

    return recipe.to_dict_with_details()

# Get all recipes in database
# Note: to limit how many to return chop off a portion of the array
@recipe_routes.route("/all")
def all_recipes():
    recipes = Recipe.query.all()
    return {"recipes": [recipe.to_dict() for recipe in recipes]}

# Create a new recipe with ingredients and steps
@recipe_routes.route("/create", methods=["POST"])
@login_required
def create_recipe():
    form = RecipeForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    data = request.json

    # check if ingredients or directions list has empty values
    errors = validate_ingreds_directs(data["ingredients"], data["directions"])
    if errors:
        return errors

    if form.validate_on_submit():
        newRecipe = Recipe(name=form.data["name"], category_id=form.data["category"], user_id=current_user.id)
        db.session.add(newRecipe)

        for ingred in data["ingredients"]:
            newIngred = Ingredient(ingredient=ingred["ingredient"], recipe_id=newRecipe.id)
            newRecipe.ingredients.append(newIngred)
            db.session.add(newIngred)
        for direct in data["directions"]:
            newDirect = Direction(step=direct["step"], recipe_id=newRecipe.id)
            newRecipe.directions.append(newDirect)
            db.session.add(newDirect)

        db.session.commit()
        return newRecipe.to_dict()

    return {"errors": validation_errors_to_error_messages(form.errors)}, 400

# Edit recipe information
# ingredient and direction table data is handled as follows:
# - data from front end contains mixture of items with ids of 0s and numbers
#  - item with id of 0 is new information that needs to be created
#  - item with an id number other than 0 is edited
# - front end data is compared with backend data
# - delete items in data from backend after being found and updated
# - remaining data fetched from backend is deleted from database
@recipe_routes.route("/edit/<int:id>", methods=["PATCH"])
@login_required
def edit_recipe(id):
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

        # check if ingredients or directions list has empty values
        """ for ingred in data["ingredients"]:
            missing_ingred= []
            if not ingred["ingredient"]:
                missing_ingred.append(ingred) """

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

    return {"errors": validation_errors_to_error_messages(form.errors)}, 400

# delete recipe
@recipe_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_recipe(id):
    recipe = Recipe.query.get(id)
    if int(recipe.user_id) == current_user.id:
        db.session.delete(recipe)
        db.session.commit()
        return {"message": "deleted"}

    return {"errors": ["Unauthorized"]}, 401

# validate ingredients and directions data
def validate_ingreds_directs(ingredients, directions):
    for ingred in ingredients:
        if not ingred["ingredient"] or ingred["ingredient"].isspace():
            return {"errors": ["Please fill in missing ingredient fields"]}, 400
    for direct in directions:
        if not direct["step"] or direct["step"].isspace():
            return {"errors": ["Please fill in missing direction fields"]}, 400
    return None
