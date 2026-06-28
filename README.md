✨ Features
1. Task Simplifier
Enter any task — big or small — and the AI breaks it into clear, actionable steps.

Example:

Code
Input: "Clean my room"
Output:
- Pick up clothes
- Throw away trash
- Organize desk
- Make bed
2. Brain Dump Organizer
Write whatever is on your mind, and the AI organizes it into structured categories:

Tasks

Reminders

Emotional Load

Decisions

Next Steps

This helps turn messy thoughts into a clear plan.

🛠️ Tech Stack
FastAPI — backend API

Ollama — local AI model (Mistral or Phi-3)

Python — core logic

Frontend — simple UI for input and results

Everything runs locally, so it’s private and fast.

📡 API Endpoints
POST /simplify-task
Breaks a task into steps.

Request:

json
{
  "task": "Clean my room"
}
Response:

json
{
  "steps": ["Pick up clothes", "Throw away trash", "Organize desk", "Make bed"]
}
POST /brain-dump
Organizes a brain dump into structured categories.

Request:

json
{
  "text": "I have homework, chores, and I'm stressed about my schedule."
}
Response:

json
{
  "tasks": [...],
  "reminders": [...],
  "emotional_load": "...",
  "decisions": [...],
  "next_steps": [...]
}
🚀 How It Works
The frontend sends your text to the FastAPI backend.

FastAPI sends the prompt to Ollama’s local AI model.

The model returns structured JSON.

The backend extracts the first valid JSON block.

The frontend displays the organized results.

📂 Project Structure
Code
backend/
  ├── main.py
  ├── ai.py
  └── models.py
frontend/
  ├── index.html
  ├── styles.css
  └── script.js
README.md
🎯 Future Improvements
Save tasks and reminders

Daily planner

Calendar integration

Better JSON formatting

More accurate AI prompts
