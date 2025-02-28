from flask import Flask, request, render_template, jsonify
from dotenv import load_dotenv
from flask_cors import CORS
import os
from io import BytesIO
import google.generativeai as genai
from PIL import Image
import base64
import traceback

load_dotenv()
API_KEY = os.getenv("GOOGLE_API_KEY")

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})
dialog_history = []

@app.route('/')
def home():
    return render_template("index1.html")

@app.route('/upload', methods=['POST'])
def upload_file():
    global dialog_history
    if 'image' not in request.files:
        return jsonify({"error": "No image found"}), 400

    image_file = request.files['image']
    if image_file.filename == '':
        return jsonify({"error": "Empty filename"}), 400

    additional_prompt = request.form['textPrompt']  # Get the text string
    print(additional_prompt)

    try:
        # Convert image to base64
        image = Image.open(image_file).convert("RGB")
        buffered = BytesIO()
        image.save(buffered, format="JPEG")  # Convert to JPEG
        image_data = base64.b64encode(buffered.getvalue()).decode("utf-8")

        # Send to Gemini API
        model = genai.GenerativeModel(model_name="gemini-1.5-pro")
        prompt = f"""Analyze the given image and extract any mathematical or physics equations present. 
                     Identify all symbols, numbers, and equations, solve them step by step, and provide a detailed explanation.
                     Format the answer in Markdown and please limit your answer within 100 words.
                     Additional Instructions: {additional_prompt}"""

        response = model.generate_content(
            [
                {"mime_type": "image/jpeg", "data": image_data},
                prompt,
            ]
        )

        # Check AI response
        if not response.text:
            return jsonify({"error": "AI returned empty content"}), 500

        dialog_history.append({"role": "assistant", "message": response.text})

        print(response.text)
        return jsonify({"response": response.text})


    except Exception as e:

        error_trace = traceback.format_exc()  # Get full error traceback

        print("Internal Server Error:\n", error_trace)  # Print detailed error log

        return jsonify({"error": "Internal Server Error", "details": str(e)}), 500  # Send error response

@app.route('/chat', methods=['POST'])
def chat():
    global dialog_history
    data = request.get_json()
    if not data or 'message' not in data:
        return jsonify({"error": "No message provided"}), 400

    user_message = data['message']
    dialog_history.append({"role": "user", "message": user_message})

    try:
        # Send chat history to Gemini AI
        model = genai.GenerativeModel(model_name="gemini-1.5-pro")
        chat_prompt = "\n".join([f"{msg['role']}: {msg['message']}" for msg in dialog_history])
        response = model.generate_content(chat_prompt)

        # Check AI response
        if not response.text:
            return jsonify({"error": "AI returned empty content"}), 500

        dialog_history.append({"role": "assistant", "message": response.text})
        print(response.text)
        return jsonify({"response": response.text})


    except Exception as e:

        error_trace = traceback.format_exc()  # Get full error traceback

        print("Internal Server Error:\n", error_trace)  # Print detailed error log

        return jsonify({"error": "Internal Server Error", "details": str(e)}), 500

@app.route('/clear_chat', methods=['POST'])
def clear_chat():
    global dialog_history
    dialog_history = []
    return jsonify({"message": "Chat history cleared successfully"})

if __name__ == '__main__':
    app.run(host="0.0.0.0",port=5002,debug=True )