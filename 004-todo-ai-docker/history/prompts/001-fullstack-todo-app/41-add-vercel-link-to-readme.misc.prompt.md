---
id: 41
title: add-vercel-link-to-readme
stage: misc
date: 2026-01-09
surface: agent
model: gemini-2.0-flash-exp
feature: 001-fullstack-todo-app
branch: main
user: user
command: update-readme
labels: ["documentation", "readme", "vercel"]
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

also add this vercel link in readme.md "https://todo-web-app-ochre.vercel.app/"

## Response snapshot

Updated `README.md` with a Vercel badge and a "Live Demo" link.

## Outcome

- ✅ Impact: Provided a direct link to the deployed application in documentation.
- 🧪 Tests: null
- 📁 Files: Modified `README.md`.
- 🔁 Next prompts: null
- 🧠 Reflection: User provided the deployment URL; integrated it as a badge and a list item for visibility.

## Evaluation notes (flywheel)

- Failure modes observed: null
- Graders run and results (PASS/FAIL): null
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): null
