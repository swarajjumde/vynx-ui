# VTabs

A token-driven, Lynx-compatible top tab switcher (underline style). Renders a
row `view` of tab `view`s (no DOM), each containing a `text` label. Binds with
`v-model` via `modelValue` / `update:modelValue` and also emits `change`. The
active tab is carried by an underline plus the label colour/weight.

## Example (JavaScript SFC)

```vue
<script>
import { VTabs, provideTheme } from '@vynx/ui';
import { ref } from 'vue-lynx';
import { violetDark } from '@vynx/themes';

export default {
  components: { VTabs },
  setup() {
    provideTheme(violetDark);
    const tab = ref('all');
    const items = [
      { label: 'All', value: 'all' },
      { label: 'Unread', value: 'unread' },
      { label: 'Archived', value: 'archived' }
    ];
    return { tab, items };
  }
};
</script>

<template>
  <VTabs v-model="tab" :items="items" />
</template>
```

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `modelValue` | `string \| number` | `''` | Active tab value; use with `v-model`. |
| `items` | `Array<{ label: string; value: string \| number }>` | `[]` | Tabs to render. |

## Events

| Event | Payload | When |
| --- | --- | --- |
| `update:modelValue` | `string \| number` | A different tab is tapped (`v-model`). |
| `change` | `string \| number` | A different tab is tapped. |

## Tokens

The container has a `border` bottom rule. The active tab's underline uses
`colors.primary` (2px), inactive tabs use a transparent underline. The active
label uses `colors.text` (semibold), inactive labels use `colors.textMuted`.
Label size is `typography.fontSize.md`. No colours are hardcoded.
