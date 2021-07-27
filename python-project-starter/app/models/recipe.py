from .db import db
from .favorite import favorites

class Recipe(db.Model):
    __tablename__ = "recipes"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey('categories.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

    category = db.relationship("Category", back_populates="recipes")
    ingredients = db.relationship("Ingredient", cascade="all, delete", passive_deletes=True, back_populates="recipe")
    directions = db.relationship("Direction", cascade="all, delete", passive_deletes=True, back_populates="recipe")
    ratings = db.relationship("Rating", cascade="all, delete", passive_deletes=True, back_populates="recipe")
    reviews = db.relationship("Review", cascade="all, delete", passive_deletes=True, back_populates="recipe")
    user = db.relationship("User", back_populates="recipes")
    userfavs = db.relationship("User", secondary=favorites, back_populates="recipefavs")

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "category_id": self.name,
            "user_id": self.user_id
        }
