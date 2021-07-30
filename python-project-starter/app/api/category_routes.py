from flask import Blueprint
from flask_login import login_required
from app.models import db, Category

category_routes = Blueprint("categories", __name__)

# Route for getting all categories
@category_routes.route("/all")
def all_categories():
    categories = Category.query.all()
    return {"categories": [cat.to_dict() for cat in categories]}
