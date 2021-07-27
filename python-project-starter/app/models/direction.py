from flask.scaffold import F
from .db import db


class Direction(db.Model):
    __tablename__ = "directions"

    id = db.Column(db.Integer, primary_key=True)
    step = db.Column(db.String(5000), nullable=False)
    recipe_id = db.Column(db.Integer, db.ForeignKey('recipes.id', ondelete="CASCADE"), nullable=False)
