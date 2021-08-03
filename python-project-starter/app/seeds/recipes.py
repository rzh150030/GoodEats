from app.models import db, Recipe


def seed_recipes():
    recipe1 = Recipe(name="Chicken Soup", category_id=4, user_id=1)
    recipe2 = Recipe(name="Cheeseburger", category_id=4, user_id=1)
    recipe3 = Recipe(name="Ribs", category_id=43, user_id=2)
    recipe4 = Recipe(name="Pizza", category_id=26, user_id=1)

    db.session.add(recipe1)
    db.session.add(recipe2)
    db.session.add(recipe3)
    db.session.add(recipe4)

    db.session.commit()

def undo_recipes():
    db.session.execute('TRUNCATE recipes RESTART IDENTITY CASCADE;')
    db.session.commit()
