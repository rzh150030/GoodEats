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
            "category_id": self.category_id,
            "user_id": self.user_id,
            "User": self.user.to_dict()
        }

    def to_dict_with_details(self):
        return {
            "id": self.id,
            "name": self.name,
            "ingredients": [ingred.to_dict() for ingred in self.ingredients],
            "directions": [direct.to_dict() for direct in self.directions],
            "category_id": self.category_id,
            "user_id": self.user_id,
            "User": self.user.to_dict(),
            "category_name": self.category.name
        }

    def to_dict_ingreds(self):
        return {ingred.id: ingred.to_dict() for ingred in self.ingredients}

    def to_dict_directs(self):
        return {direct.id: direct.to_dict() for direct in self.directions}
