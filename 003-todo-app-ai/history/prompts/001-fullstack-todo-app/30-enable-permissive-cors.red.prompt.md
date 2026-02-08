---
id: "30"
title: "Enable Permissive CORS to Fix Fetch Error"
stage: red
date: "2026-01-08"
surface: agent
model: gemini-2.0-flash-exp
feature: 001-fullstack-todo-app
branch: main
user: user
command: replace
labels:
  - bugfix
  - cors
  - backend
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files_yaml: |
  - backend/main.py
tests_yaml: |
  - manual verification
prompt_text: |
  still getting same error.
response_text: |
  Updated backend `main.py` to allow all CORS origins (`*`). This is a broad fix to eliminate CORS as the cause of the "Failed to fetch" error during development. Restarted the backend server to apply the changes.
outcome: |
  Backend now accepts requests from any origin, which should resolve the connection refusal if it was CORS-related.
---
