from app.models import db, Ingredient


def seed_ingredients():
    r1ingredients = [Ingredient(ingredient="chicken", recipe_id=1), Ingredient(ingredient="water", recipe_id=1),
    Ingredient(ingredient="1 tablespoon of salt", recipe_id=1)]
    r2ingredients = [Ingredient(ingredient="1 slice of cheese", recipe_id=2), Ingredient(ingredient="ground beef", recipe_id=2),
    Ingredient(ingredient="bread", recipe_id=2)]
    r3ingredients = [Ingredient(ingredient="ribs", recipe_id=3), Ingredient(ingredient="BBQ sauce", recipe_id=3)]
    r4ingredients = [Ingredient(ingredient="pizza dough", recipe_id=4), Ingredient(ingredient="tomato sauce", recipe_id=4),
    Ingredient(ingredient="cheese", recipe_id=4), Ingredient(ingredient="pepperoni", recipe_id=4)]

    for ing1 in r1ingredients:
        db.session.add(ing1)
    for ing2 in r2ingredients:
        db.session.add(ing2)
    for ing3 in r3ingredients:
        db.session.add(ing3)
    for ing4 in r4ingredients:
        db.session.add(ing4)

    db.session.commit()

def undo_ingredients():
    db.session.execute('TRUNCATE ingredients RESTART IDENTITY CASCADE;')
    db.session.commit()