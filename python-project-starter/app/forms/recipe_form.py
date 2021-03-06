from flask.app import Flask
from wtforms.form import Form
from app.models import ingredient
from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, FieldList, IntegerField, FormField
from wtforms.validators import DataRequired


# class IngredientForm(FlaskForm):
#     id = IntegerField("id", validators=[DataRequired()])
#     ingredient = StringField("ingredient", validators=[DataRequired()])

# class DirectionForm(FlaskForm):
#     id = IntegerField("id", validators=[DataRequired()])
#     direction = StringField("direction", validators=[DataRequired()])

class RecipeForm(FlaskForm):
    name = StringField("Name", validators=[DataRequired()])
    category = SelectField("Category", choices=[(1, "Ainu"), (2, "Albanian"), (3, "Argentine"), (4, "American"), (5, "Anglo-Indian"),
    (6, "Arab"), (7, "Balochi"), (8, "Bangladeshi"), (9, "Bengali"), (10, "British"), (11, "Brazilian"), (12, "Belarusian"),
    (13, "Cantonese"), (14, "Caribbean"), (15, "Chinese"), (16, "Czech"), (17, "Ethiopian"), (18, "French"), (19, "Filipino"),
    (20, "Finnish"), (21, "German"), (22, "Greek"), (23, "Icelandic"), (24, "Indian"), (25, "Irish"), (26, "Italian"), (27, "Japanese"),
    (28, "Jewish"), (29, "Korean"), (30, "Kurdish"), (31, "Laotian"), (32, "Malaysian"), (33, "Mexican"), (34, "Norwegian"),
    (35, "Polish"), (36, "Pakistani"), (37, "Persian"), (38, "Portuguese"), (39, "Romanian"), (40, "Russian"), (41, "Swedish"),
    (42, "Taiwanese"), (43, "Texan"), (44, "Turkish"), (45, "Thai"), (46, "Vietnamese"), (47, "Zambian")])
    # ingredients = FieldList(FormField(IngredientForm), min_entries=1)
    # directions = FieldList(FormField(DirectionForm), min_entries=1)
    # ingredients = FieldList(StringField("ingredient", validators=[DataRequired()]), min_entries=1)
    # directions = FieldList(StringField("direction", validators=[DataRequired()]), min_entries=1)
