---
id: 23
title: update-vercel-url-readme
stage: misc
date: 2026-01-23
surface: agent
model: gemini-2.0-flash-thinking-exp
feature: 003-ai-task-chatbot
branch: 003-ai-task-chatbot
user: user
command: replace the vercel link
labels: [documentation, vercel, readme]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - README.md
tests:
 - none
---

## Prompt

"https://todo-web-app-ochre.vercel.app/" is old vercel link, replace it with "https://todo-evolution-sigma.vercel.app/". update it on readme and also in allowed origins if necessory

## Response snapshot

Updated README.md with the new Vercel URL. Verified backend/main.py already contains the correct allowed origin.

## Outcome

- ✅ Impact: Updated documentation with correct live demo URL.
- 🧪 Tests: Manual verification of file content.
- 📁 Files: README.md updated.
- 🔁 Next prompts: None
- 🧠 Reflection: Quick documentation fix. backend/main.py was already up to date which suggests previous work handled the backend config but missed the README.

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): None
- Next experiment (smallest change to try): None
