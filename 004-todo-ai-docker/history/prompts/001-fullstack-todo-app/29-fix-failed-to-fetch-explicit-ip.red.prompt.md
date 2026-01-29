---
id: "29"
title: "Fix Failed to Fetch by Using Explicit Backend IP"
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
  - networking
  - cors
  - localhost
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files_yaml: |
  - frontend/lib/constants.ts
tests_yaml: |
  - manual verification with curl
prompt_text: |
  while signing in getting Failed to fetch
response_text: |
  Investigated the "Failed to fetch" error. The backend is running and reachable via `127.0.0.1:8000`. Suspected an issue with `localhost` name resolution (IPv4 vs IPv6) in the browser/Node environment. Updated `frontend/lib/constants.ts` to use `http://127.0.0.1:8000` explicitly instead of `localhost`. Rebuilt the frontend.
outcome: |
  Frontend now points to `http://127.0.0.1:8000`, which should resolve the connection issue.
---
