"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/users', methods=['GET'])
def get_users():
    results = list(map(lambda user: user.serialize(), User.query.all()))

    return jsonify(results), 200

@api.route('/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    results = User.query.filter_by(id=user_id).first()

    return jsonify(results.serialize()), 200

@api.route('/users', methods=['POST'])
def create_user():
    request_body = request.get_json(force=True)
    new_user = User(email=request_body["email"], password=request_body["password"], is_active=True)
    db.session.add(new_user)
    db.session.commit()
    response_body = {
        'msg': 'Your user has been added.'
    }

    return jsonify(response_body), 201