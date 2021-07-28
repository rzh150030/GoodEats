from flask import Blueprint
from flask_login import login_required
from app.models import db, Category

category_routes = Blueprint("categories", __name__)

# route for getting all categories
@category_routes.route("/all")
@login_required
def all_categories():
    categories = Category.query.all()
    return 
