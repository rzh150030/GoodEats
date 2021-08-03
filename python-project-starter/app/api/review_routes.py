from flask import Blueprint
from app.models import Review
from flask_login import login_required

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
@review_routes.route("/<int:id>")
def recipe_reviews(id):
    reviews = Review.query.filter_by(recipe_id=f"{id}").all()
    return {"reviews": [review.to_dict() for review in reviews]}

# Create a review for a specific recipe
@review_routes.route("/create/<int:id>")
def create_review(id):
    review = Review()

# Update a review for a specific recipe


# Delete a reciew for a specific recipe
