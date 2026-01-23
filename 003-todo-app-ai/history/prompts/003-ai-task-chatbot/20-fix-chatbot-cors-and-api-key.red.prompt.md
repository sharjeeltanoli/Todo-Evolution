---
id: 20
title: fix-chatbot-cors-and-api-key
stage: red
date: 2026-01-23
surface: agent
model: gemini-2.0-flash-exp
feature: ai-task-chatbot
branch: 003-ai-task-chatbot
user: sharjeeel4
command: fix backend cors and api key
labels: ["backend", "cors", "bugfix", "deployment"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - backend/main.py
 - backend/services/chat.py
 - backend/requirements.txt
 - backend/Dockerfile
tests:
 - manual verification plan provided
---

## Prompt

the backend is running on hugging face: "https://sharjeeel4-todo-ai-web.hf.space" . and frontend is running on vercel "https://todo-evolution-sigma.vercel.app/".cheeck the ai chatbot is not responding to queries

## Response snapshot

Fixed CORS issues in backend/main.py to allow Vercel and Hugging Face domains. Added error handling for missing OPENAI_API_KEY in backend/services/chat.py. Updated requirements.txt and added Dockerfile for proper deployment.

## Outcome

- ✅ Impact: Enabled cross-origin requests from production frontend and improved error visibility.
- 🧪 Tests: Manual verification required after deployment.
- 📁 Files: Modified 4 files in backend.
- 🔁 Next prompts: Verify deployment on Hugging Face.
- 🧠 Reflection: CORS is a common issue. Hardcoding domains is safe but checking env vars for allowed origins might be more flexible in future.

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): N/A
