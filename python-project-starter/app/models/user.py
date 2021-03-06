from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from .favorite import favorites


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)

    recipes = db.relationship("Recipe", back_populates="user")
    ratings = db.relationship("Rating", back_populates="user")
    reviews = db.relationship("Review", back_populates="user")
    recipefavs = db.relationship("Recipe", secondary=favorites, back_populates="userfavs")

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email
        }

    def to_dict_with_favors(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'favorites': [recipe.to_dict() for recipe in self.recipefavs]
        }
