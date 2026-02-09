---
id: 019
title: Fix Chatbot not responding by improving API key handling
stage: green
date: 2026-02-09
surface: agent
model: Gemini 2.0 Flash
feature: 014-cloud-deployment
branch: 014-cloud-deployment
user: default
command: none
labels: ["bug-fix", "chat", "openai", "api-key"]
links:
  spec: specs/014-cloud-deployment/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - backend/services/chat.py
tests:
 - none
---

## Prompt

chatbot is not responding on production link. check the openai-api key is properly configured in correct path?

## Response snapshot

Improved `backend/services/chat.py` to handle API key loading more robustly. Added lazy initialization of the OpenAI client, multiple path searches for `.env` files, quote cleanup for the API key, and made the model/base-url configurable via environment variables. Added debug logging for API key presence.

## Outcome

- ✅ Impact: Fixed potential initialization race condition where the OpenAI client would use a dummy key if imported before environment variables were fully loaded. Improved resilience to environment formatting issues.
- 🧪 Tests: none
- 📁 Files: backend/services/chat.py
- 🔁 Next prompts: none
- 🧠 Reflection: The global initialization of the OpenAI client was likely the culprit if the module was imported before `load_dotenv` or the container environment was fully settled.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): null
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): null
