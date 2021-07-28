from flask import Blueprint, request
from flask_login import login_required, current_user
from flask_migrate import current
from app.forms import RecipeForm
from app.models import db, Recipe, Ingredient, Direction, ingredient

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

# Create a new recipe with ingredients and steps
@recipe_routes.route("/create", methods=["POST"])
@login_required
def create_recipe():
    form = RecipeForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        newRecipe = Recipe(name=form.data["name"], category_id=form.data["category"], user_id=current_user.id)
        db.session.add(newRecipe)

        for ingred in form.data["ingredients"]:
            newIngred = Ingredient(ingredient=ingred["ingredient"], recipe_id=newRecipe.id)
            newRecipe.ingredients.append(newIngred)
            db.session.add(newIngred)
        for direct in form.data["directions"]:
            newDirect = Direction(direction=direct["step"], recipe_id=newRecipe.id)
            db.session.add(newDirect)

        db.session.commit()
        return {"recipe": newRecipe.id}

    return {"errors": validation_errors_to_error_messages(form.errors)}
