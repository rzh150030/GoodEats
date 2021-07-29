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
    return {"errors": ["Unauthorized"]}

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
        return {"id": newRecipe.id, "name": newRecipe.name, "user": newRecipe.user.username}

    return {"errors": validation_errors_to_error_messages(form.errors)}

# Edit recipe information
# ingredient and direction table data is handled as follows:
# - data from front end contains mixture of ids with 0 and numbers
#  - data with id of 0 is new information that needs to be created
#  - data with a number other 0 is edited
# -
@recipe_routes.route("/edit/<int:id>", methods=["PATCH"])
@login_required
def edit_recipe(id):
    form = RecipeForm()
    recipe = Recipe.query.get(id)
    table_ingredients = recipe.to_dict_ingreds()
    table_directions = recipe.to_dict_directs()
    form["csrf_token"].data = request.cookies["csrf_token"]
    data = request.json

    if form.validate_on_submit():
        recipe["name"] = form.data["name"]
        recipe["category_id"] = form.data["category"]

        for ingred in data["ingredients"]:
            if int(data["id"]) == 0:
                ingredient = Ingredient(ingredient=ingred["ingredient"], recipe_id=recipe.id)
                recipe.ingredients.append(ingredient)
                db.session.add(ingredient)
            
