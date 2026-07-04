# Component Authoring Standard

Every Vynx UI component — whether written by a person or an agent — follows this
exact recipe. It exists so components are consistent, token-driven, Lynx-safe,
and independently buildable. Use `VButton` (display) and `VInputText` (input) as
canonical templates.

## The five files of a component

For a component named `V<Name>`:

1. **`packages/ui/src/styles/<name>.ts`** — the pure style resolver.
2. **`packages/ui/src/components/V<Name>.ts`** — the render module.
3. **`packages/ui/src/index.ts`** — add its export (append only).
4. **`docs/components/V<Name>.md`** — the JavaScript-first doc.
5. **`packages/ui/test/<name>.test.ts`** — the tests (or extend an existing group).

The only files shared with other components are `index.ts` and `styles.ts`
(both are barrels you append to). Everything else is yours alone.

## 1. Style resolver (`styles/<name>.ts`)

- Export a pure function `resolve<Name>Style(theme: Theme, options: <Name>StyleOptions = {})`.
- Import shared primitives from `./kit.js` (`Style`, `CompoundStyle`,
  `ControlSize`, `sizing`).
- **Every** colour/spacing/radius/font value comes from `theme.colors`,
  `theme.spacing`, `theme.radius`, `theme.typography`, or `theme.shadow`.
  Hardcoded structural values (e.g. `borderWidth: '1px'`, a fixed control
  `width`) are allowed; hardcoded **colours are not**.
- Return `Record<string, string | number>` style objects — no DOM/CSSOM types.
- Export any public option/style types this component adds.

## 2. Render module (`components/V<Name>.ts`)

- `defineComponent({ name: 'V<Name>', props, emits, setup })`.
- JSDoc naming which Lynx elements it renders.
- In `setup`: `const theme = useTheme();` then
  `const styles = computed(() => resolve<Name>Style(theme.value, { ...props }));`.
- Render with `h('view' | 'text' | 'input' | 'textarea' | 'scroll-view' | 'image', props, children)`.
  **Never** DOM elements (`div`, `span`) or DOM/browser APIs.
- Events:
  - Two-way value: `modelValue` + `update:modelValue` (booleans: `checked` +
    `update:checked`), plus an intent event (`input` / `change` / `tap`).
  - Bind **both** the Lynx handler and the Vue handler to the same function:
    `{ bindinput: onInput, onInput }` or `{ bindtap: onTap }`.
  - Read input text with `readInputValue(event)` from `./event.js` — never touch
    `event.target`.
  - No-op every mutation while `disabled`.
- Small, stable props: prefer `variant` / `tone` / `size` / `disabled` /
  `invalid` over style escape hatches. Default every prop.

## 3. Barrel (`index.ts`)

Append `export { V<Name> } from './components/V<Name>.js';` and export any new
public style types. Do not reorder or remove existing exports.

## 4. Doc (`docs/components/V<Name>.md`)

Mirror `docs/components/VButton.md`:

- Short intro naming the Lynx elements it renders.
- `## Example (JavaScript SFC)` — a `vue` SFC with a `<script>` (no `lang="ts"`)
  using `@vynx/ui` + `provideTheme`, imports from `vue-lynx` where Vue APIs are
  needed.
- `## Props`, `## Events`, `## Slots` (if any), `## Tokens` tables.

The docs gate (`scripts/check-docs.mjs`) auto-discovers your component and
requires: the component name, a `## Props` section, an `## Events` section, a
`js`/`vue` code fence, and **no** `lang="ts"`.

## 5. Tests (`packages/ui/test/`)

Use the DOM-free `render()` helper pattern from `test/form.test.ts` (drives
`setup(...)` directly and inspects the returned vnode + emitted events). Cover:

- **Resolver:** asserts specific token roles are used (e.g. checked → primary),
  and that state flags (`invalid`, `disabled`) change the right values.
- **Contract:** stable `name`, presence of key props and `emits`.
- **Behaviour:** an event maps to the expected `emit`s.
- **Disabled:** no emits while `disabled`.

## Done means green

Run before finishing — all must pass:

```
npm run build
npm test
```

Never hand back red tests, an undocumented public API, DOM usage, or a hardcoded
colour.
