# Vynx UI — Component Builder Brief (paste to a builder agent)

You build one or more Vynx UI components for a **Vue Lynx** UI framework
("PrimeVue for mobile"). Follow the repo's authoring standard exactly and hand
back a green tree.

## Read first
- `docs/standards/component-authoring.md` — the exact recipe (authoritative).
- `docs/plan/README.md` — where this fits.
- Templates to copy the style of: `packages/ui/src/components/VButton.ts`
  (display), `packages/ui/src/components/VInputText.ts` (input),
  `packages/ui/src/styles/button.ts`, `docs/components/VButton.md`,
  `packages/ui/test/form.test.ts`.

## Hard rules
- **Lynx only.** Render `view` / `text` / `input` / `textarea` / `scroll-view` /
  `image` via `h(...)`. Never `div`/`span`, `window`, `document`, DOM selectors,
  `HTMLElement`, or CSSOM/browser event types. Read input via `readInputValue`.
- **Token-driven.** No hardcoded colours; pull from `theme.colors/spacing/radius/
  typography/shadow` in a `resolve*Style` function under `src/styles/<name>.ts`.
- **JS-first API.** Consumable from plain JS with `v-model`. Docs examples are JS
  SFCs with no `lang="ts"`.
- **Self-contained.** Each component = `styles/<name>.ts` + `components/V<Name>.ts`
  + doc + test, plus append-only edits to `src/index.ts`. Do not modify unrelated
  components or reorder existing barrel exports.

## Per component, produce all five
1. `packages/ui/src/styles/<name>.ts` — pure `resolve<Name>Style(theme, options)`.
2. `packages/ui/src/components/V<Name>.ts` — `defineComponent` render module.
3. Append export to `packages/ui/src/index.ts`.
4. `docs/components/V<Name>.md` — intro + JS SFC example + Props/Events/Slots/Tokens.
5. Tests in `packages/ui/test/` using the DOM-free `render()` helper: resolver
   token assertions + contract (name/props/emits) + behaviour + disabled no-op.

## Definition of done
Run and ensure both pass, then report exactly what you added:
```
npm run build
npm test
```

## Safety
No `git push`, no `npm publish`, no destructive/remote commands. Never read
`.env*`, secrets, or credentials. No copied source/assets/branding from any
product.
