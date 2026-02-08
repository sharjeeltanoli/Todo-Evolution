---
id: 46
title: add-task-filtering-to-dashboard
stage: green
date: 2026-01-13
surface: agent
model: gemini
feature: 001-fullstack-todo-app
branch: main
user: Sharing
command: add feature
labels: ["frontend", "react", "filtering", "ui-ux"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - frontend/app/tasks/page.tsx
tests: []
---

## Prompt

in taskpage of frontend, I want to make the 'Total Tasks', 'Pending', and 'Completed' stat cards clickable filters. ... Create a state (e.g., filter) that defaults to 'all'. ... Add a visual indicator ...

## Response snapshot

Implemented task filtering in `frontend/app/tasks/page.tsx`. Added `filter` state, updated statistic cards to be clickable with active visual indicators (borders/shadows), and filtered the task list before rendering.

## Outcome

- ✅ Impact: Users can now filter tasks by status by clicking the stat cards.
- 🧪 Tests: Manual verification on the tasks page.
- 📁 Files: Updated tasks/page.tsx.
- 🔁 Next prompts: none
- 🧠 Reflection: Simple state-based filtering provides a quick and intuitive UX improvement.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): n/a
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): n/a
