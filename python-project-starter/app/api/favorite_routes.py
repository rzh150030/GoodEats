from flask import Blueprint
from flask_login import login_required
from app.models import db, Recipe

favorite_routes = Blueprint('favorites', __name__)


# Favor a recipe
@favorite_routes.route("/favor/<int:id>", methods=["POST"])
# @login_required
def favor_recipe(id):
    recipe = Recipe.query.get(id)
    
