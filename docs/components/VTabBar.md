# VTabBar

A token-driven, Lynx-compatible bottom tab bar. Renders a row `view` of tab
`view`s (no DOM), each an optional `image` icon above a `text` label. Binds with
`v-model` via `modelValue` / `update:modelValue` and also emits `change`. The
active tab is carried by the label colour and weight (Lynx `image` icons are not
tintable, so colour lives on the label).

## Example (JavaScript SFC)

```vue
<script>
import { VTabBar, provideTheme } from '@vynx/ui';
import { ref } from 'vue-lynx';
import { violetDark } from '@vynx/themes';

export default {
  components: { VTabBar },
  setup() {
    provideTheme(violetDark);
    const tab = ref('home');
    const items = [
      { label: 'Home', value: 'home' },
      { label: 'Search', value: 'search' },
      { label: 'Profile', value: 'profile' }
    ];
    return { tab, items };
  }
};
</script>

<template>
  <VTabBar v-model="tab" :items="items" />
</template>
```

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `modelValue` | `string \| number` | `''` | Active tab value; use with `v-model`. |
| `items` | `Array<{ label: string; value: string \| number; icon?: string }>` | `[]` | Tabs to render; `icon` is an image asset/URI. |

## Events

| Event | Payload | When |
| --- | --- | --- |
| `update:modelValue` | `string \| number` | A different tab is tapped (`v-model`). |
| `change` | `string \| number` | A different tab is tapped. |

## Tokens

The bar sits on `surface` with a `border` top rule; the active label uses
`primary` (semibold), inactive labels use `textMuted`. Label size is
`typography.fontSize.xs`. No colours are hardcoded.
