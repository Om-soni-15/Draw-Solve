from flask import Flask, request, render_template, jsonify
from dotenv import load_dotenv
from flask_cors import CORS
import os
from io import BytesIO
import google.generativeai as genai
from PIL import Image
import base64

load_dotenv()
API_KEY = os.getenv("GOOGLE_API_KEY")

app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return render_template("index1.html")

@app.route('/upload', methods=['POST'])
def upload_file():
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
                     Format the answer in Markdown.
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

        print(response.text)
        return jsonify({"response": response.text})

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.run(host="0.0.0.0",port=6269,debug=True)