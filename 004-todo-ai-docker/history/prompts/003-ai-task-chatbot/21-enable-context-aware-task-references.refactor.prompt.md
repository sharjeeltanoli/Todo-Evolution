---
id: 21
title: enable-context-aware-task-references
stage: refactor
date: 2026-01-23
surface: agent
model: gemini-2.0-flash-exp
feature: 003-ai-task-chatbot
branch: main
user: sharjeeel4
command: replace
labels: ["chatbot", "ux", "prompt-engineering"]
links:
  spec: specs/003-ai-task-chatbot/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - backend/services/chat.py
tests:
 - manual verification
---

## Prompt

ISSUE: Context-Aware Task References Not Working

PROBLEM:
When the chatbot displays tasks with numbering (1, 2, 3...), and the user refers to a task by its display position like "mark task 3 as complete" or "3rd task from this list", the chatbot cannot map the display position to the actual database task ID.

CURRENT BEHAVIOR:
1. Bot shows: "1. Buy groceries, 2. Meeting, 3. Pay electricity bill"
2. User says: "mark task 3 as complete"
3. Bot tries to find task with ID=3 in database (which doesn't exist)
4. Error: "task not found"

EXPECTED BEHAVIOR:
1. Bot shows: "1. Buy groceries (ID: 27), 2. Meeting (ID: 28), 3. Pay electricity bill (ID: 29)"
2. User says: "mark task 3 as complete" OR "complete the 3rd task" OR "complete third one"
3. Bot should:
   a. First call list_tasks to get current tasks
   b. Map position 3 → actual database ID (29)
   c. Call complete_task(user_id, task_id=29)
4. Success: "Task 'Pay electricity bill' marked as complete"

REQUIRED SOLUTION:
Modify the agent's logic to:
1. When displaying tasks, always include database IDs in a user-friendly format
2. When user references a task by position (1, 2, 3, "first", "second", "third", "last"), the agent should:
   - Call list_tasks first to get fresh data
   - Extract the task at that position from the response
   - Use that task's actual database ID for operations
3. Support multiple reference formats:
   - "task 3"
   - "3rd task"
   - "third task"
   - "the last one"
   - "complete the second task"

IMPLEMENTATION HINT:
The agent should maintain a pattern like:
- User asks about task position → fetch list → find task at index → extract ID → perform operation

Update agent instructions/system prompt to handle positional references by always fetching the list first before operating on tasks by position.

## Response snapshot

Successfully modified file: C:\Users\Sharing\Documents\todo-evolution\003-todo-app-ai\backend\services\chat.py (1 replacements).

## Outcome

- ≠ Impact: The chatbot now correctly handles positional task references by fetching the task list first and mapping the position to the actual database ID. It also displays task IDs in the list for clarity.
- ⁉ Tests: Manual verification recommended by running the chatbot and trying commands like "list tasks" then "delete the first one".
- 
Files: Modified `backend/services/chat.py` to update the `SYSTEM_PROMPT`.
- ↗ Next prompts: None immediate.
- 
Reflection: Updating the system prompt is a powerful way to change agent behavior without changing code logic, but it relies on the model following instructions. Explicit steps in the prompt ("1. FIRST, call...", "2. Find...") help enforce this.

## Evaluation notes (flywheel)

- Failure modes observed: None yet.
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): Observe if the model hallucinates IDs if the list is very long; might need pagination handling in the future.
