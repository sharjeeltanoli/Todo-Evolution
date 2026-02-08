---
id: 39
title: create-project-readme
stage: misc
date: 2026-01-09
surface: agent
model: gemini-2.0-flash-exp
feature: 001-fullstack-todo-app
branch: main
user: user
command: create-readme
labels: ["documentation", "readme"]
links:
  spec: specs/001-fullstack-todo-app/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - README.md
tests:
 - null
---

## Prompt

Create a professional, high-quality README.md for my GitHub repository based on the project details provided below.

Project Context:

Project Name: [Insert Name]

Core Purpose: [One sentence on what it does and why it exists]

Tech Stack: [e.g., Python 3.10, FastAPI, PostgreSQL, Docker, React]

Key Features: [List 3-5 main features]

Technical Details:

Prerequisites: [e.g., Node.js v18+, Python 3.9+]

Installation Steps: [List the commands to get it running locally]

Usage: [Briefly describe how to run or interact with the app]

Environment Variables: [List any necessary .env keys, e.g., API_KEY, DB_URL]

Style Requirements:

Use a clean, modern Markdown structure with clear headings.

Include placeholders for a project logo and screenshots.

Add a "Contributing" section and a "License" section (default to MIT).

Use emojis sparingly to make it visually engaging but professional.

Create a "Table of Contents" for easy navigation.

Format: Output the response as raw Markdown code.

## Response snapshot

Created README.md with project details.

## Outcome

- ✅ Impact: Added project documentation.
- 🧪 Tests: No tests run for documentation.
- 📁 Files: Created README.md.
- 🔁 Next prompts: null
- 🧠 Reflection: Extracted details from spec and quickstart to create comprehensive README.

## Evaluation notes (flywheel)

- Failure modes observed: null
- Graders run and results (PASS/FAIL): null
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): null
