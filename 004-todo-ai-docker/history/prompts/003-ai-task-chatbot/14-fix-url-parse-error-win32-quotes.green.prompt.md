---
id: 14
title: fix-url-parse-error-win32-quotes
stage: green
date: 2026-01-21
surface: agent
model: gemini-2.0-flash-exp
feature: 003-ai-task-chatbot
branch: main
user: Sharing
command: replace
labels: ["fix", "frontend", "fetch", "windows", "url-parse"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - frontend/lib/api.ts
tests:
 - manual verification requested
---

## Prompt

getting this error when opening chat in frontend:  |   const cleanEndpoint = endpoint.replace(/^\//, '');
  25 |   
> 26 |   const response = await fetch(`${baseUrl}/${cleanEndpoint}`, {
     |                          ^
  27 |     ...options,
  28 |     headers,
  29 |   })

## Response snapshot

The error `TypeError: Failed to parse URL` at the fetch call suggests the URL string is malformed. On Windows, environment variables can sometimes include surrounding quotes (e.g., `"http://localhost:8000"`) which breaks URL parsing when interpolated. I updated `frontend/lib/api.ts` to robustly clean `baseUrl` by stripping surrounding quotes and trailing slashes before use.

## Outcome

- ✅ Impact: Prevents runtime crashes due to malformed backend URLs from environment variables.
- 🧪 Tests: Manual verification by user.
- 📁 Files: Modified frontend/lib/api.ts.
- 🔁 Next prompts: Verify fix.
- 🧠 Reflection: Environment variable handling on Windows requires extra care for quotes.

## Evaluation notes (flywheel)

- Failure modes observed: Fetch URL parsing error.
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): N/A
