---
id: 58
title: intensify-card-glow-effects
stage: green
date: 2026-01-13
surface: agent
model: gemini
feature: 001-fullstack-todo-app
branch: main
user: Sharing
command: fix styling
labels: ["frontend", "react", "ui-ux", "visual-polish", "glow"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - frontend/app/page.tsx
tests: []
---

## Prompt

The card glow effect needs to be stronger and more spread out ... Idle State: shadow-[0_0_60px_-15px_rgba(139,92,246,0.4)] ... Hover State: hover:shadow-[0_0_80px_-10px_rgba(139,92,246,0.6)] ... subtle inner glow ... bg-neutral-900/40 ... border-white/10 ... remove black background blocks ...

## Response snapshot

Intensified the "Purple Glow" effects on all landing page cards in `frontend/app/page.tsx`. Updated idle and hover shadow settings for wider spread and higher brightness. Added `inset shadow-white/5` for an inner glow effect and standardized card backgrounds to `bg-neutral-900/40` with thin `border-white/10` borders. Confirmed that solid section backgrounds are removed to keep the global grid visible.

## Outcome

- ✅ Impact: Deep, immersive visual style with high-quality glow effects.
- 🧪 Tests: Visual verification on landing page.
- 📁 Files: Updated page.tsx.
- 🔁 Next prompts: none
- 🧠 Reflection: Layering shadows (outer and inner) creates a much more premium look for dark-themed UI components.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): n/a
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): n/a
