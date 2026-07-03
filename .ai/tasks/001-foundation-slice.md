# Task 001: Foundation Slice

Do not execute this task until Codex explicitly invokes it.

## Goal

Create the first minimal foundation for the Vue Lynx UI framework without scaffolding the full product.

## Required Structure

- Configure npm workspaces.
- Add `apps/showcase` as a JavaScript Vue Lynx application.
- Add `packages/ui`.
- Add `packages/themes`.
- Framework internals may use TypeScript, but packages must compile to JavaScript output usable by JavaScript consumers.

## Required Features

- Base design tokens for colour, spacing, radius, typography, and shadow.
- Light and dark mode token outputs.
- One original violet theme.
- Initial components: `VButton`, `VCard`, and `VBadge`.
- A JavaScript consumer example that imports and uses the package output.

## Standards

- Follow `CLAUDE.md`, `ARCHITECTURE.md`, and `docs/standards/`.
- Vue Lynx components must use Lynx-compatible elements and APIs.
- Do not use browser-only APIs such as `window`, `document`, DOM selectors, or `HTMLElement`.
- Use design tokens instead of hardcoded component colours.
- Documentation examples must be JavaScript-first.
- Add targeted tests for public behaviour and token output.
- Verify package builds.

## Non-Goals

- Do not publish packages.
- Do not create a remote repository or push Git branches.
- Do not copy PrimeVue/Sakai code, assets, branding, or visual identity.
- Do not build the full framework, documentation site, or admin starter.
