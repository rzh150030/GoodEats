from flask import Blueprint
from app.models import Review

review_routes = Blueprint("reviews", __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

# Get all reviews for a specific recipe
@review_routes.route("/recipe/<int:id>")
def recipe_reviews(id):
    reviews = Review.query.filter_by(recipe_id=f"{id}").all()
