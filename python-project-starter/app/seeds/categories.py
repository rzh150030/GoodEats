from app.models import db, Category


def seed_categories():
    ainu = Category(name="Ainu")
    

    db.session.add(ainu)

    db.session.commit()


def undo_categories():
    db.session.execute('TRUNCATE categories RESTART IDENTITY CASCADE;')
    db.session.commit()
