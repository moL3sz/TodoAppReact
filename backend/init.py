from flask import Flask
from flask_restful import Resource,Api
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS,cross_origin

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///todos.db"
api = Api(app)
db = SQLAlchemy(app)
cors = CORS(app, resources={r"/todos": {"origins": "*"}})
