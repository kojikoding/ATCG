from flask import Flask, request, jsonify
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from pymongo import MongoClient
import openai
import os

# Flask setup
app = Flask(__name__)
CORS(app)  # Enable CORS for all domains on all routes
bcrypt = Bcrypt(app)

# MongoDB setup
# Update this URI to match your MongoDB setup
mongo_uri = "mongodb://localhost:27017/myDatabase"
client = MongoClient(mongo_uri)
db = client.get_database("testCaseGeneratorDB")
users_collection = db.get_collection("users")

# OpenAI setup
openai.api_key = os.getenv("OPENAI_API_KEY")


@app.route('/chat', methods=['POST'])
def chat():
    user_message = request.json.get('message')
    messages = [
        {"role": "system", "content": "You are an intelligent software engineering assistant."},
        {"role": "user", "content": user_message}
    ]
    try:
        openai.api_key = "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"
        response = openai.Completion.create(
            engine="davinci-codex", prompt=user_message, max_tokens=150
        )
        chat_reply = response.choices[0].text.strip()
        return jsonify({"reply": chat_reply}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/register', methods=['POST'])
def register():
    username = request.json.get('username')
    password = request.json.get('password')
    if users_collection.find_one({"username": username}):
        return jsonify({"error": "Username already exists"}), 409
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    users_collection.insert_one(
        {"username": username, "password": hashed_password})
    return jsonify({"message": "User created successfully"}), 201


@app.route('/login', methods=['POST'])
def login():
    username = request.json.get('username')
    password = request.json.get('password')
    user = users_collection.find_one({"username": username})
    if user and bcrypt.check_password_hash(user['password'], password):
        return jsonify({"message": "Login successful"}), 200
    else:
        return jsonify({"error": "Invalid credentials"}), 401


if __name__ == '__main__':
    app.run(debug=True)  # Set debug=False for production
