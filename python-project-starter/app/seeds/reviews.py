import re
from app.models import db, Review

def seed_reviews():
    review1 = Review(review="Delicious", recipe_id=1, user_id=4)
    review2 = Review(review="It's alright", recipe_id=1, user_id=2)
    review3 = Review(review="Salty", recipe_id=1, user_id=3)
    review4 = Review(review="mmm, cheeseburgers", recipe_id=2, user_id=3)
    review5 = Review(review="Could use some more instructions", recipe_id=5, user_id=1)
    review6 = Review(review="It really is that easy", recipe_id=5, user_id=2)

    db.session.add(review1)
    db.session.add(review2)
    db.session.add(review3)
    db.session.add(review4)
    db.session.add(review5)
    db.session.add(review6)

    db.session.commit()

def undo_reviews():
    db.session.execute('TRUNCATE reviews RESTART IDENTITY CASCADE;')
    db.session.commit()
