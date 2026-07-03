# Agent Operating Model

This repository uses a two-agent workflow while Vynx UI is bootstrapped.

## Roles

- Codex owns product decisions, architecture, research, task specifications, and review.
- Claude Code performs implementation from focused task files.
- Codex writes a task file under `.ai/tasks/` before invoking Claude.
- Codex reviews the resulting Git diff and independently verifies the work.

## Invocation Rules

- Claude may be invoked at most twice for one task.
- Codex must not duplicate implementation unless Claude fails or leaves the task incomplete.
- Do not scaffold broad framework surfaces without a task file.

## Safety

- No package publishing, Git push, remote repository creation, or destructive commands without explicit user approval.
- Never access secrets, `.env`, `.env.*`, credentials, browser data, or authentication storage.
- Keep changes scoped to the active task.
