from click.decorators import password_option
from app.models import db, Category


def seed_categories():
    ainu = Category(name="Ainu")
    albanian = Category(name="Albanian")
    argentine = Category(name="Argentine")
    american = Category(name="American")
    anglo_indian = Category(name="Anglo-Indian")
    arab = Category(name="Arab")
    balochi = Category(name="Balochi")
    bangladeshi = Category(name="Bangladeshi")
    bengali = Category(name="Bengali")
    british = Category(name="British")
    brazilian = Category(name="Brazilian")
    belarusian =  Category(name="Belarusian")
    cantonese = Category(name="Cantonese")
    caribbean = Category(name="Caribbean")
    chinese = Category(name="Chinese")
    czech = Category(name="Czech")
    ethiopian = Category(name="Ethiopian")
    french = Category(name="French")
    filipino = Category(name="Filipino")
    finnish = Category(name="Finnish")
    german = Category(name="German")
    greek = Category(name="Greek")
    iceland = Category(name="Icelandic")
    indian = Category(name="Indian")
    irish = Category(name="Irish")
    italian = Category(name="Italian")
    japan = Category(name="Japanese")
    jewish = Category(name="Jewish")
    korean = Category(name="Korean")
    kurdish = Category(name="Kurdish")
    laotian = Category(name="Laotian")
    malaysian = Category(name="Malaysian")
    mexican = Category(name="Mexican")
    norwegian = Category(name="Norwegian")
    polish = Category(name="Polish")
    pakistani = Category(name="Pakistani")
    persian = Category(name="Persian")
    portugal = Category(name="Portuguese")
    romanian = Category(name="Romanian")
    russian = Category(name="Russian")
    swedish = Category(name="Swedish")
    taiwan = Category(name="Taiwanese")
    texan = Category(name="Texan")
    turkish = Category(name="Turkish")
    thai = Category(name="Thai")
    vietnam = Category(name="Vietnamese")
    zambian = Category(name="Zambian")
    cuisines = [ainu, albanian, argentine, american, anglo_indian, arab, balochi, bangladeshi, bengali, british, brazilian, belarusian,
    cantonese, caribbean, chinese, czech, ethiopian, french, filipino, finnish, german, greek, iceland, indian, irish, italian,
    japan, jewish, korean, kurdish, laotian, malaysian, mexican, norwegian, polish, pakistani, persian, portugal, romanian, russian,
    swedish, taiwan, texan, turkish, thai, vietnam, zambian]

    for food in cuisines:
        db.session.add(food)

    db.session.commit()


def undo_categories():
    db.session.execute('TRUNCATE categories RESTART IDENTITY CASCADE;')
    db.session.commit()
