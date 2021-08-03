from flask import Blueprint, request
from app.models import Review, Recipe
from app.forms import ReviewForm
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
    reviews = Recipe.query.get(id).reviews
    return {"reviews": [review.to_dict() for review in reviews]}

# Create a review for a specific recipe
@review_routes.route("/create/<int:id>")
@login_required
def create_review(id):
    form = ReviewForm()
    recipe = Recipe.query.get(id)
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        review = Review(review=form.data["review"], recipe_id=form.data["recipe_id"], user_id=form.data["user_id"])


# Update a review for a specific recipe


# Delete a reciew for a specific recipe
