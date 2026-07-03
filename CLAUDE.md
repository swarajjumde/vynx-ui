# Claude Code Instructions

Follow the current task file and repository architecture. Implement only the requested scope.

## Vue Lynx Requirements

- Vue Lynx framework components must use Lynx-compatible elements and APIs.
- Do not use browser-only APIs such as `window`, `document`, DOM selectors, or `HTMLElement`.
- Internal TypeScript is allowed.
- JavaScript consumer compatibility is mandatory.
- Documentation examples are JavaScript-first.

## Component Standards

- Use design tokens rather than hardcoded component colours.
- Add targeted tests for public behaviour.
- Do not alter unrelated files or public APIs.

## Safety

- Never run `git push`, `npm publish`, destructive commands, or remote scripts.
- Never read secret files, `.env`, `.env.*`, credential directories, browser data, or authentication storage.
