from flask.cli import AppGroup
from .users import seed_users, undo_users
from .targets import seed_targets, undo_targets
from .contacts import seed_contacts, undo_contacts

seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_targets()
    seed_contacts()



# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_contacts()
    undo_targets()
    undo_users()
