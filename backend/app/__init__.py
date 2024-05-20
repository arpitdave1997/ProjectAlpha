import os
from flask import Flask
from flask_cors import CORS
from app.main import main as main_blueprint
from dotenv import load_dotenv

def create_app():
    load_dotenv()
    
    app = Flask(__name__)

    CORS(app)

    app.config['PORT'] = int(os.getenv('PORT'))
    app.config['DEBUG'] = True if os.getenv('ENVIRONMENT') == "DEV" else False

    app.register_blueprint(main_blueprint)

    return app
