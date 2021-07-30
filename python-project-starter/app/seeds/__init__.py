from flask.cli import AppGroup
from .users import seed_users, undo_users
from .categories import seed_categories, undo_categories
from .recipes import seed_recipes, undo_recipes
from .ingredients import seed_ingredients, undo_ingredients
from .directions import seed_directions, undo_directions

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_categories()
    seed_recipes()
    seed_ingredients()
    seed_directions()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_categories()
    undo_recipes()
    undo_ingredients()
    undo_directions()
    # Add other undo functions here
