<!--
    Sync Impact Report

    - Version change: 0.0.0 -> 1.0.0
    - Change Type: MAJOR
    - Summary: Complete rewrite of the constitution. Replaced a principle-based template with a rule-based document for AI-driven development.
    - Templates requiring updates:
        - [ ] .specify/templates/plan-template.md
        - [ ] .specify/templates/spec-template.md
        - [ ] .specify/templates/tasks-template.md
        - [ ] .gemini/commands/sp.adr.toml
        - [ ] .gemini/commands/sp.analyze.toml
        - [ ] .gemini/commands/sp.checklist.toml
        - [ ] .gemini/commands/sp.clarify.toml
        - [ ] .gemini/commands/sp.constitution.toml
        - [ ] .gemini/commands/sp.git.commit_pr.toml
        - [ ] .gemini/commands/sp.implement.toml
        - [ ] .gemini/commands/sp.phr.toml
        - [ ] .gemini/commands/sp.plan.toml
        - [ ] .gemini/commands/sp.reverse-engineer.toml
        - [ ] .gemini/commands/sp.specify.toml
        - [ ] .gemini/commands/sp.tasks.toml
        - [ ] .gemini/commands/sp.taskstoissues.toml
        - [ ] README.md
    - Follow-up TODOs:
        - TODO(RATIFICATION_DATE): Set the initial ratification date.
-->
# AI Development Constitution

## 1. Purpose
This document defines the mandatory rules of engagement for AI-assisted development in this repository. The AI MUST follow these rules strictly.

## 2. Absolute Non-Initiation Rule
The AI MUST NOT:
- Start implementing features automatically
- Generate source code unless explicitly instructed
- Modify files unless a command clearly says so

The AI may ONLY act when given an explicit directive such as:
- "Generate a plan for @specs/features/..."
- "Implement @specs/features/..."
- "Refactor according to updated spec..."

## 3. Spec-Driven Development (Mandatory)
All development MUST follow this order:
1. Specification (Markdown in /specs/features/)
2. Planning (generate plan, no code)
3. Task breakdown (optional, no code)
4. Implementation (only when commanded)
5. Testing & iteration via spec updates

If a specification is missing or unclear:
- The AI MUST ask for clarification
- The AI MUST NOT guess or implement

## 4. No Manual Coding Assumption
The AI must assume:
- The human will NOT write or edit source code
- All logic must come from specifications
- Specs are the single source of truth

## 5. Storage Rules (Phase 1)
- All data must remain in-memory
- No databases
- No file persistence
- No external services

## 6. Technology Constraints
- **Language**: Python 3.12.7+
- **Package Manager**: UV
- **Environment**: WSL 2 (Ubuntu 22.04) for Windows users
- **Interface**: Console / CLI only

## 7. Code Quality Standards
The AI must generate code that:
- Follows PEP 8 style guidelines
- Uses type hints for all function parameters and returns
- Uses dataclasses for data structures
- Keeps functions focused and under 20 lines
- Includes docstrings for all public functions and classes
- Has meaningful variable and function names

## 8. Error Handling Policy
The AI must ensure:
- Graceful failure (never crash)
- Clear, user-friendly CLI error messages
- Validation of all user inputs
- All validation rules come from specifications
- Handle edge cases: empty inputs, invalid IDs, out-of-range values

## 9. File Organization
- **`/src`** → AI-generated code only
- **`/specs/features/`** → Human-written feature specifications
- **`/specs_history/`** → Versioned specs (append-only archive)
- **`CONSTITUTION.md`** → This file (project rules)
- **`GEMINI.md`** → AI-specific instructions
- **`README.md`** → Setup and usage documentation

## 10. Implementation Requirements
When implementing, the AI must:
- Read CONSTITUTION.md first
- Read the complete specification file
- Check existing code to avoid duplication
- Generate complete, runnable Python files
- Follow exact requirements in specs
- Add appropriate error handling
- Include validation for all inputs

## 11. What AI Should NOT Do
- Add features not mentioned in specifications
- Skip input validation
- Use databases or file storage (Phase 1)
- Leave TODO comments in generated code
- Make assumptions about unclear requirements
- Implement before specifications exist

## 12. Enforcement & Conflict Resolution
If any rule conflicts with a user instruction:
- This constitution OVERRIDES that instruction
- The AI must explain the conflict instead of acting
- The AI should suggest updating the specification

## 13. Final Authority
**No code may exist without a corresponding specification.**

All features must have a spec file in `/specs/features/` before implementation begins.

## 14. Iteration Process
When code doesn't work correctly:
1. ❌ DO NOT edit code directly
2. ✅ Update the specification with clearer requirements
3. ✅ Re-run implementation command
4. ✅ Archive old spec in `/specs_history/` with version number

## 15. Version Control
- Commit specifications separately from code
- Use meaningful commit messages
- Archive old specs before major changes
- Format: `specs_history/task-crud-v1.md`, `task-crud-v2.md`, etc.

**Version**: 1.0.0 | **Ratified**: TODO(RATIFICATION_DATE) | **Last Amended**: 2025-12-31