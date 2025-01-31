from flask import Flask
from flask_bootstrap import Bootstrap
from flask_moment import Moment
from config import config
from firebase_admin import credentials, firestore, initialize_app
from google.auth import default

# Initialize Firestore DB



db = firestore.Client(project="collabothon23fra-1265")
todo_ref = db.collection('todos')

bootstrap = Bootstrap()


def create_app(config_name):
    app = Flask(__name__)
    app.config.from_object(config[config_name])
    config[config_name].init_app(app)

    bootstrap.init_app(app)

    from .main import main as main_blueprint
    app.register_blueprint(main_blueprint)

    return app