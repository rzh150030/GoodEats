from logging import log
from flask import Blueprint
from flask_login import login_required, current_user
from app.models import db, Recipe, User

favorite_routes = Blueprint('favorites', __name__)


# Get all user's favorite recipes
@favorite_routes.route("/<int:id>")
# @login_required
def all_user_favorites(id):
    user = User.query.get(id)
    return user.to_dict_with_favors()

# Favor a recipe
@favorite_routes.route("/favor/<int:id>", methods=["POST"])
# @login_required
def favor_recipe(id):
    recipe = Recipe.query.get(id)
    if recipe.userfavs:
        return {"message": "yes"}

    return {"message": "in route, not pass condition"}
