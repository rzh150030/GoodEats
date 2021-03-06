from .db import db


class Direction(db.Model):
    __tablename__ = "directions"

    id = db.Column(db.Integer, primary_key=True)
    step = db.Column(db.String(5000), nullable=False)
    recipe_id = db.Column(db.Integer, db.ForeignKey('recipes.id', ondelete="CASCADE"), nullable=False)

    recipe = db.relationship("Recipe", back_populates="directions")

    def to_dict(self):
        return {
            "id": self.id,
            "step": self.step,
            "recipe_id": self.recipe_id
        }
