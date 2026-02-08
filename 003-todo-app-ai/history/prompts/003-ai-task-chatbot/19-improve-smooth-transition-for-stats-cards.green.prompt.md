---
id: 19
title: Improve Smooth Transition for Statistics Cards
stage: green
date: 2026-01-21
surface: agent
model: gemini-2.0-flash-exp
feature: 003-ai-task-chatbot
branch: 003-ai-task-chatbot
user: User
command: replace
labels: ["ui", "transition", "animation", "ux"]
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

Task: Add Smooth Transitions for Statistics Cards Visibility

Please update the /tasks page to make the Statistics Cards hide and show smoothly using CSS transitions instead of an abrupt jump:

1. Replace Conditional Rendering with CSS Classes:

Instead of completely removing the cards from the DOM (which breaks transitions), use Tailwind classes to toggle their visibility.

Use a combination of opacity-0 and opacity-100.

Use max-h-0 and max-h-[500px] (or similar) to smoothly slide the cards up and down.

Add overflow-hidden to the container so the content doesn't "leak" while collapsing.

2. Add Transition Durations:

Apply transition-all duration-500 ease-in-out to the cards' container.

This will ensure that when "Add New Task" is clicked, the cards fade out and slide up smoothly at the same time, rather than the border disappearing first.

3. Fix Top Spacing (Final Polish):

While adjusting the transition, please ensure the main container's padding-top is reduced to the minimum so the heading "Your Tasks" stays near the navbar.

4. Constraints:

Do not change the logic of the "Create Task" form.

Ensure the "Cancel" button properly triggers the "show" transition for the cards.

## Response snapshot

Updated the transition logic for the Statistics Cards on the `/tasks` page:
1.  **Enhanced Transition Classes**: Added `scale-95` / `scale-100` to the transition set to add a subtle zoom effect during the fade/slide, making the disappearance feel even smoother.
2.  **Confirmed Visibility Logic**: Verified that `max-h-0` and `opacity-0` are correctly applied when `showCreateForm` is true, ensuring the element remains in the DOM but is visually hidden and takes up no space.
3.  **Top Spacing**: Re-confirmed `pt-4` is applied to the main container.

## Outcome

- ✅ Impact: Statistics cards now transition smoothly (fade, slide, and scale) instead of jumping abruptly.
- 🧪 Tests: Visual verification of the animation.
- 📁 Files: Modified `frontend/app/tasks/page.tsx`.
- 🔁 Next prompts: None.
- 🧠 Reflection: Adding `scale` transform improves the perception of the element "moving away" or "coming forward".

## Evaluation notes (flywheel)

- Failure modes observed: None.
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): N/A
