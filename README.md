AI-Powered Math & Physics Solver
An interactive AI-powered web application that allows users to draw mathematical and physics equations on a canvas, upload the image, and get step-by-step solutions using Google Gemini AI. Users can also chat with AI to clear their doubts.

🚀 Features
✅ Canvas-Based Input – Users can draw equations instead of typing.
✅ AI-Powered Solutions – Gemini AI extracts, solves, and explains equations.
✅ Interactive Chat – Ask follow-up questions and clarify doubts.
✅ Fast & Responsive UI – Built with React & Tailwind CSS for a smooth experience.
✅ Flask Backend – Manages requests, processes images, and integrates with AI.

🛠 Tech Stack
Frontend:
Framework: React
CSS Framework: Tailwind CSS – Utility-first framework for a responsive UI
React Hooks: useContext, useEffect, useState
Backend:
Framework: Flask – Lightweight Python web framework
Libraries:
Flask-CORS – Enables cross-origin requests
PIL (Pillow) – Handles image processing
dotenv – Manages API keys securely
Base64 & BytesIO – Encodes images for AI processing
AI Integration: Google Gemini AI API
📌 How It Works
1️⃣ The user draws equations on the canvas.
2️⃣ The drawn image is uploaded and sent to the Flask backend.
3️⃣ The backend processes the image and sends it to Gemini AI.
4️⃣ The AI solves the equations step by step and returns an explanation.
5️⃣ Users can chat with AI to ask further questions.

🎯 Setup Instructions
1️⃣ Clone the Repository
bash
Copy
Edit
git clone https://github.com/Om-soni-15/Draw-Solve.git

2️⃣ Install Frontend Dependencies

`cd draw-and-solve`
`npm install`
`npm start`

3️⃣ Install Backend Dependencies
`cd backend`
`pip install -r requirements.txt`
`python app.py`

🌟 Future Enhancements
✅ Real-time Collaboration – Allow multiple users to solve together.
✅ Multi-Language Support – Translate solutions into different languages.
✅ Voice-Based Input – Solve equations using voice commands.

🤝 Contributing
We welcome contributions! Fork the repo, make your changes, and submit a pull request.

📩 Have suggestions? Feel free to raise an issue!

