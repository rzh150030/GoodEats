from logging import log
from flask import Blueprint
from flask_login import login_required
from app.models import db, Recipe

favorite_routes = Blueprint('favorites', __name__)


# Get all user's favorite recipes
@favorite_routes.route("/all/<int:id>")
# @login_required
def all_user_favorites(id):
    

# Favor a recipe
@favorite_routes.route("/favor/<int:id>", methods=["POST"])
# @login_required
def favor_recipe(id):
    recipe = Recipe.query.get(id)
    if recipe.userfavs:
        return {"message": "yes"}

    return {"message": "in route, not pass condition"}
