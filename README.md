CS 3704 Project:

This project incorporates the ChatGPT API as well as a HTML, CSS + JavaScript frontend to accurately create Python & Java program test cases based on the user criteria given.


Team Members:
Srikaran Bachu - srikaranbachu@vt.edu
Bhargava Elavarthi - bhargava@vt.edu
Tim Son - tims03@vt.edu
Patrick Hardy - patrickhardy@vt.edu


## Prerequisites
Ensure you have the following installed:
- Python 3.8 or higher
- Node.js (LTS version)
- MongoDB on default port (27017)
- An OpenAI API key

## Setup Instructions

### Backend Setup
1. Clone the repository and navigate to the backend directory:
   git clone <repository-url>
   cd <repository-name>/backend

2. Install required Python packages:
   pip install flask flask-cors pymongo openai python-dotenv flask-bcrypt

3. Create a .env file and add your OpenAI API key:
   echo "OPENAI_API_KEY=your_openai_api_key_here" > .env

4. Start the Flask server:
   python app.py

### Frontend Setup
1. Navigate to the frontend directory from the project root:
   cd ../frontend

2. Install Node.js dependencies:
   npm install

3. Start the React development server:
   npm start
   This command will open http://localhost:3000 in your web browser.