# Task 002: Form Foundation Components

## Goal

Implement the first form foundation components for the Vue Lynx UI package without expanding into a full form framework.

## Required Components

Add public exports from `@vynx/ui` for:

- `VFormField`
- `VInputText`
- `VTextarea`
- `VCheckbox`
- `VSwitch`

## Component Map

- `VFormField`: owns form field layout around label, control slot, optional help text, optional error text, and disabled/invalid visual state.
- `VInputText`: owns a single-line text value contract and emits value update/user intent events from Lynx-compatible input events.
- `VTextarea`: owns a multi-line text value contract and emits value update/user intent events from Lynx-compatible textarea events.
- `VCheckbox`: owns a boolean checked contract and emits checked update/user intent events from Lynx-compatible tap/change events.
- `VSwitch`: owns a boolean checked contract and emits checked update/user intent events from Lynx-compatible tap/change events.
- Shared form style helpers should centralize token-driven style resolution when useful.

## Requirements

- Follow `AGENTS.md`, `CLAUDE.md`, `ARCHITECTURE.md`, and docs under `docs/standards/`.
- Vue Lynx-compatible components only.
- Do not use browser-only APIs such as `window`, `document`, DOM selectors, `HTMLElement`, or browser input event classes.
- Internal TypeScript is allowed, but compiled package output must be usable by JavaScript consumers.
- Public docs/examples must be JavaScript-first.
- Use theme tokens rather than hardcoded component colours in component styles.
- Keep public APIs small and stable.
- Prefer `modelValue` / `update:modelValue` for text inputs and `checked` / `update:checked` for boolean controls so JavaScript consumers can use ordinary Vue event bindings.
- Include disabled and invalid/error states where applicable.
- Use Lynx-compatible element names and style objects; no browser DOM elements.
- Do not copy PrimeVue or Sakai code, assets, branding, or visual identity.
- Do not run `git push`.
- Do not run `npm publish`.

## JavaScript Consumer Example

Update or add examples under `apps/showcase` that import from built package exports and demonstrate all five form components from JavaScript. Keep wording honest: this app is currently a temporary JavaScript consumer demo, not a full runnable Vue Lynx showcase.

## Tests

Add targeted public behaviour tests for:

- exported component names and contracts
- style helper output using design tokens
- `VInputText` / `VTextarea` update event behaviour
- `VCheckbox` / `VSwitch` checked update behaviour
- disabled behaviour where user intent should not update state

Avoid broad snapshot tests as the primary assertion.

## Verification

Run:

```powershell
npm run build
npm test
node apps/showcase/src/tokens-usage.js
```

All must pass.