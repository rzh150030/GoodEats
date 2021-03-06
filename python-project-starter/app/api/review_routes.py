from flask import Blueprint, request
from app.models import db, Review, Recipe
from app.forms import ReviewForm
from flask_login import login_required, current_user

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
    return {"reviews": {review.id:review.to_dict() for review in reviews}}

# Create a review for a specific recipe only if user hasn't already reviewed
@review_routes.route("/create/<int:id>", methods=["POST"])
@login_required
def create_review(id):
    form = ReviewForm()
    recipe_reviews = Recipe.query.get(id).reviews
    form['csrf_token'].data = request.cookies['csrf_token']

    for review in recipe_reviews:
        if review.user_id == current_user.id:
            return {"errors": ["You have already reviewed this recipe."]}, 400

    if form.validate_on_submit():
        new_review = Review(review=form.data["review"], recipe_id=id, user_id=current_user.id)
        db.session.add(new_review)
        db.session.commit()
        return new_review.to_dict()

    return {"errors": validation_errors_to_error_messages(form.errors)}, 400

# Update a specific review
@review_routes.route("/update/<int:id>", methods=["PUT"])
@login_required
def update_review(id):
    form = ReviewForm()
    review = Review.query.get(id)
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        review.review = form.data["review"]
        db.session.add(review)
        db.session.commit()
        return review.to_dict()

    return {"errors": validation_errors_to_error_messages(form.errors)}, 400

# Delete a specific review
@review_routes.route("/delete/<int:id>", methods=["DELETE"])
@login_required
def delete_review(id):
    review = Review.query.get(id)
    if int(review.user_id) == current_user.id:
        db.session.delete(review)
        db.session.commit()
        return {"message": "deleted"}

    return {"errors": ["Unauthorized"]}, 401
