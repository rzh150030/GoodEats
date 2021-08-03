from flask_wtf import FlaskForm
from wtforms import TextAreaField
from wtforms.validators import DataRequired,

class ReviewForm(FlaskForm):
    review = TextAreaField("review", validators=[DataRequired()])
