# Task 006: Fix Showcase Textarea Preview Editing

## Problem

In the running Vue Lynx showcase web preview:

`http://192.168.56.1:3000/__web_preview?casename=main.web.bundle`

The Bio `VTextarea` appears, but the user cannot type into it. This must be fixed for the live showcase preview, not only package tests.

## Context

Follow `AGENTS.md`, `CLAUDE.md`, `ARCHITECTURE.md`, and `docs/standards/*`.

Important constraints:

- Vue Lynx-compatible components/APIs only.
- No browser DOM APIs: no `window`, `document`, selectors, `HTMLElement`, or browser event assumptions in library components.
- Internal TypeScript is allowed.
- JavaScript consumer compatibility is mandatory.
- Public docs/examples must remain JavaScript-first.
- Use theme tokens, not hardcoded component colours.
- Do not copy PrimeVue/Sakai source, assets, branding, or visual identity.
- Do not run `git push`, `npm publish`, or create tags/remotes.
- Do not access secrets or `.env` files.

## Findings from Codex

- Lynx textarea type supports `bindinput`, `placeholder`, `maxlength`, `maxlines`, `readonly`, `disabled`.
- `@lynx-js/web-elements` CSS for `x-textarea` uses `display: contents`; its internal textarea inherits width/height from the custom element:
  - `x-textarea::part(textarea), x-textarea::part(form) { width: inherit; height: inherit; ... }`
- Current VTextarea has a `rows` public prop but Lynx does not have a native `rows` prop.
- A previous local attempt added `onInput`, `maxlines`, and `minHeight`, but the live preview still cannot be typed into. Review and correct that code instead of assuming it is sufficient.
- The fix likely needs concrete Lynx-compatible layout sizing for the text area root/inner inherited dimensions, while preserving token styling and no-DOM constraints.

## Required Work

1. Inspect `packages/ui/src/components/VTextarea.ts`, `VInputText.ts`, styles, tests, and showcase usage.
2. Fix `VTextarea` so the Bio textarea in the web preview is actually editable/clickable and can receive typed text.
3. Keep `rows` as the public JavaScript-friendly API, but translate it to Lynx-compatible props/styles.
4. Preserve `v-model` behavior with `update:modelValue` and `input` events.
5. Add/update targeted tests for public behavior and the layout props/styles that make the textarea editable in preview.
6. Keep changes focused. Do not rewrite the showcase or unrelated components unless necessary.

## Verification to run

Run:

- `npm run build`
- `npm test`
- `npm run build:showcase`
- `node apps/showcase/src/tokens-usage.js`

If you can perform an automated preview check without adding dependencies, do so. Otherwise document exactly what manual preview check remains.

## Expected Result

The showcase Bio textarea should be usable in the web preview. The user should be able to click/tap it and type text.
