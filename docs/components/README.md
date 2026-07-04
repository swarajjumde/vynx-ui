# Vynx UI Components (JavaScript-first)

These docs describe the current `@vynx/ui` foundation components as ordinary Vue
components used from **JavaScript** - no TypeScript is required to consume them.
Every example is a plain JavaScript Single-File Component (SFC): `<script>` with
no `lang="ts"`, and no browser/DOM APIs (Vynx UI targets Vue Lynx, not the DOM).

> Status: `@vynx/ui` ships compiled JavaScript + type declarations. The examples
> below run against ordinary Vue 3 component contracts. Whether `apps/showcase`
> becomes a *truly runnable* Lynx host is an open decision - see
> [../decisions/lynx-runtime.md](../decisions/lynx-runtime.md).

## Components

| Component | Purpose | Emits |
| --- | --- | --- |
| [VButton](./VButton.md) | Token-driven press target | `tap` |
| [VCard](./VCard.md) | Surface container | - |
| [VBadge](./VBadge.md) | Status label | - |
| [VFormField](./VFormField.md) | Labelled field layout (label / help / error) | - |
| [VInputText](./VInputText.md) | Single-line text control | `update:modelValue`, `input` |
| [VTextarea](./VTextarea.md) | Multi-line text control | `update:modelValue`, `input` |
| [VCheckbox](./VCheckbox.md) | Boolean control (check) | `update:checked`, `change` |
| [VSwitch](./VSwitch.md) | Boolean control (switch) | `update:checked`, `change` |

## Binding conventions

- Text controls use `v-model` (`modelValue` / `update:modelValue`).
- Boolean controls use `v-model:checked` (`checked` / `update:checked`).

## Theme and tokens (JavaScript)

Components read colours, spacing, radius, and typography from the active theme -
never hardcoded values. Provide a theme once near the root with `provideTheme`;
descendants pick it up automatically. When no ancestor provides a theme, the
violet **light** brand theme is used as the default.

```js
// theme-usage.js - plain JavaScript, no TypeScript required.
import { provideTheme } from '@vynx/ui';
import { violetDark } from '@vynx/themes';

export default {
  setup() {
    // Apply the original Vynx violet brand theme (dark variant) to descendants.
    provideTheme(violetDark);
  }
};
```

Shipped themes from `@vynx/themes`: `lightTheme`, `darkTheme`, `violetLight`,
`violetDark`, plus the `themes` registry (`themes.violet.dark`, ...). Each theme
exposes `colors`, `spacing`, `radius`, `typography`, and `shadow` tokens.

You can also resolve a component's token-driven style directly from JavaScript
without rendering - useful for tooling, tests, or previews:

```js
import { resolveButtonStyle } from '@vynx/ui';
import { violetLight } from '@vynx/themes';

const primary = resolveButtonStyle(violetLight, { variant: 'solid', tone: 'primary', size: 'md' });
console.log(primary.container.backgroundColor); // violet brand primary token
console.log(primary.label.color);              // onPrimary token
```

A runnable version of that pattern lives at
[`../../apps/showcase/src/tokens-usage.js`](../../apps/showcase/src/tokens-usage.js)
(`node apps/showcase/src/tokens-usage.js`).
