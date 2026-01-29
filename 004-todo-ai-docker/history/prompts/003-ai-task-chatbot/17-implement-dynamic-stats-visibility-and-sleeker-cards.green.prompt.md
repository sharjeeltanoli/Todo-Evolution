---
id: 17
title: Implement Dynamic Stats Visibility and Sleeker Cards
stage: green
date: 2026-01-21
surface: agent
model: gemini-2.0-flash-exp
feature: 003-ai-task-chatbot
branch: 003-ai-task-chatbot
user: User
command: replace
labels: ["ui", "ux", "transition", "layout"]
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

Please implement the following frontend updates to improve the user experience on the Tasks page:

1. Dynamic Visibility (Conditional Rendering):

Create a state to track if the "Create New Task" form is active.

When "+ Add New Task" is clicked: The top Statistics Cards (Total Tasks, Pending, Completed) should be hidden (removed from view). This will allow the "Create New Task" card to move up and be fully visible without scrolling.

When "Create Task" or "Cancel" is clicked: The Statistics Cards should reappear at the top.

2. Reduce Stats Cards Height:

The height of the three Statistics Cards (Total, Pending, Completed) is currently too large. Please reduce their vertical padding or set a more compact height (e.g., reduce the py- classes in Tailwind) to make them look sleeker.

3. Smooth Transition:

(Optional) Add a simple fade-in/out or slide transition when the cards appear or disappear to make the UI feel smooth.

## Response snapshot

Implemented dynamic visibility and sleeker statistics cards on the `/tasks` page:
1.  **Conditional Visibility**: Wrapped the Statistics Bar in a transition container that toggles `max-height` and `opacity` based on the `showCreateForm` state.
2.  **Sleeker Design**: Reduced card padding from `p-4` to `px-4 py-3`, icon container from `w-10 h-10` to `w-8 h-8`, and text size from `text-2xl` to `text-xl`.
3.  **Smooth Transitions**: Added `transition-all duration-500 ease-in-out` with `overflow-hidden` to provide a smooth slide-and-fade effect when the form opens/closes.

## Outcome

- ✅ Impact: Improved task creation UX by reducing layout clutter and adding smooth transitions.
- 🧪 Tests: Visual verification of transition and layout shift.
- 📁 Files: Modified `frontend/app/tasks/page.tsx`.
- 🔁 Next prompts: None.
- 🧠 Reflection: Used `max-height` transition technique for smooth layout adjustments.

## Evaluation notes (flywheel)

- Failure modes observed: None.
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): N/A
