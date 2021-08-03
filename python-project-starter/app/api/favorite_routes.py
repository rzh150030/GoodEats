from flask import Blueprint
from flask_login import login_required, current_user
from app.models import db, Recipe, User

favorite_routes = Blueprint('favorites', __name__)


# Get all user's favorite recipes
@favorite_routes.route("/<int:id>")
@login_required
def all_user_favorites(id):
    user = User.query.get(id)
    return user.to_dict_with_favors()

# Favor a recipe
@favorite_routes.route("/favor/<int:id>", methods=["POST"])
@login_required
def favor_recipe(id):
    user = User.query.get(current_user.id)
    recipe = Recipe.query.get(id)
    if user not in recipe.userfavs and recipe.user_id != user.id:
        recipe.userfavs.append(user)
        db.session.add(recipe)
        db.session.commit()
        return user.to_dict_with_favors()

    return {"errors": ["Something went wrong, please try again later."]}

# Unfavor a recipe
@favorite_routes.route("/unfavor/<int:id>", methods=["DELETE"])
@login_required
def unfavor_recipe(id):
    user = User.query.get(current_user.id)
    recipe = Recipe.query.get(id)
    if user in recipe.userfavs and recipe.user_id != user.id:
        recipe.userfavs.remove(user)
        db.session.add(recipe)
        db.session.commit()
        return user.to_dict_with_favors()

    return {"errors": ["Something went wrong, please try again later."]}
