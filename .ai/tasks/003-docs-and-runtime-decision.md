# Task 003: Docs Examples and Lynx Runtime Decision

## Goal

Add a JavaScript-first documentation/examples layer for the current Vynx UI components and record the runtime decision for the showcase honestly.

## Research Context from Codex

Official Lynx documentation currently recommends Rspeedy as the Lynx build tool and project scaffold (`npm create rspeedy@latest`). The official quick-start also names ReactLynx as the official React framework for Lynx. Codex did not find an official Vue Lynx runtime/scaffold in the Lynx quick-start docs.

Implication for this repository:

- Do not pretend `apps/showcase` is a full runnable Vue Lynx app yet.
- Do not install ReactLynx or convert the package to React.
- Keep `@vynx/ui` as the current Vue-oriented package shape for now.
- Document that the runnable Lynx host decision is pending until an official or deliberately selected Vue-compatible Lynx renderer/adapter exists.
- Document the likely future integration path: use official Lynx/Rspeedy tooling for host-app experiments, but keep Vynx UI package examples JavaScript-first and framework-contract focused until the Vue runtime decision is made.

## Required Work

1. Add docs/examples for existing components:
   - `VButton`
   - `VCard`
   - `VBadge`
   - `VFormField`
   - `VInputText`
   - `VTextarea`
   - `VCheckbox`
   - `VSwitch`

2. Keep docs JavaScript-first:
   - Ordinary Vue component usage examples in JavaScript SFC style.
   - Include props/defaults and emitted events beside each component example.
   - Include short token/theme usage examples.
   - Avoid TypeScript-only examples as the primary documentation.

3. Add a runtime decision document:
   - Explain that `apps/showcase` remains a temporary JavaScript consumer demo.
   - Record that official Lynx tooling to track is Rspeedy and Lynx Explorer.
   - Record that ReactLynx is official for React, but this repository is not switching to React in this slice.
   - Record the open decision: choose or build a Vue-compatible Lynx runtime/adapter before making `apps/showcase` truly runnable.
   - Include links to the official Lynx quick-start and homepage.

4. Update `apps/showcase/README.md` if useful so its status and next steps are clear.

5. Add lightweight tests/checks where practical:
   - Prefer a small docs integrity test or script only if it fits the existing repo style without adding new packages.
   - Do not add heavy docs tooling.

## Constraints

- Follow `AGENTS.md`, `CLAUDE.md`, `ARCHITECTURE.md`, and `docs/standards/`.
- Keep changes focused on documentation/examples/runtime decision.
- Do not scaffold a full runtime app unless an official Vue Lynx runtime already exists locally in the repo context.
- Do not add new dependencies unless absolutely necessary.
- Do not use browser-only APIs in package source.
- Do not copy PrimeVue or Sakai source/assets/branding/visual identity.
- Do not run `git push`.
- Do not run `npm publish`.
- Do not read secrets or `.env` files.

## Verification

Run:

```powershell
npm run build
npm test
node apps/showcase/src/tokens-usage.js
```

If docs checks/scripts are added, include them in `npm test` or document and run them explicitly.