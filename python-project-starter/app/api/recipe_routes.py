from flask import Blueprint, request
from flask_login import login_required, current_user
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
@recipe_routes.route("/user/:id")
def user_recipes():
    
