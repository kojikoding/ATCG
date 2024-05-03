from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from pymongo import MongoClient
import openai
import os
from dotenv import load_dotenv

app = Flask(__name__)
CORS(app)  # Enables CORS for all routes and domains

bcrypt = Bcrypt(app)

# Load environment variables
load_dotenv()

# MongoDB setup
mongo_uri = "mongodb://localhost:27017/myDatabase"
client = MongoClient(mongo_uri)
db = client.get_database("testCaseGeneratorDB")
users_collection = db.get_collection("users")

# OpenAI API key setup
openai.api_key = os.getenv("OPENAI_API_KEY")


@app.route('/chat', methods=['POST'])
def chat():
    # Retrieve the user's code input from the request.
    user_code = request.json.get('message')

    # Define the task for the AI model more explicitly.
    prompt = f"Given the following Python function, write comprehensive unit test cases using the unittest framework:\n\n{user_code}"

    try:
        # Call OpenAI API with the updated prompt.
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "system", "content": prompt}],
            max_tokens=250  # Increased token limit for potentially complex test cases
        )
        # Extract the reply containing test cases.
        test_cases = response['choices'][0]['message']['content']
        return jsonify({"reply": test_cases}), 200
    except Exception as e:
        app.logger.error('Failed to generate test cases: %s', str(e))
        return jsonify({"error": "Server error occurred"}), 500


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
    app.run(host='0.0.0.0', port=5000, debug=True)
