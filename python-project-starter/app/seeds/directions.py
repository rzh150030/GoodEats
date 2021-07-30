from app.models import db, Direction


def seed_directions():
    r1directions = [Direction(step="Boil some water", recipe_id=1), Direction(step="Add chicken", recipe_id=1),
    Direction(step="???", recipe_id=1), Direction(step="Profit", recipe_id=1)]
    r2directions = [Direction(step="Cook burger", recipe_id=2), Direction(step="Add cheese", recipe_id=2),
    Direction(step="???", recipe_id=2), Direction(step="Profit", recipe_id=2)]
    r3directions = [Direction(step="Barbecue ribs", recipe_id=3), Direction(step="Add barbecue sauce", recipe_id=3),
    Direction(step="???", recipe_id=3), Direction(step="Profit", recipe_id=3)]
    r4directions = [Direction(step="Make pizza", recipe_id=4), Direction(step="Bake pizza", recipe_id=4),
    Direction(step="???", recipe_id=4), Direction(step="Eat", recipe_id=4)]

    for dir1 in r1directions:
        db.session.add(dir1)
    for dir2 in r2directions:
        db.session.add(dir2)
    for dir3 in r3directions:
        db.session.add(dir3)
    for dir4 in r4directions:
        db.session.add(dir4)

    db.session.commit()

def undo_directions():
    db.session.execute('TRUNCATE directions RESTART IDENTITY CASCADE;')
    db.session.commit()
