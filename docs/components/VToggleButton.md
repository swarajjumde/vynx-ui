# VToggleButton

A token-driven, Lynx-compatible pressed on/off button. Renders `view` + `text`
Lynx elements (no DOM). Binds with `v-model` from JavaScript, and also emits
`change`. Taps are suppressed while `disabled`.

## Example (JavaScript SFC)

```vue
<script>
import { VToggleButton, provideTheme } from '@vynx/ui';
import { ref } from 'vue-lynx';
import { violetDark } from '@vynx/themes';

export default {
  components: { VToggleButton },
  setup() {
    provideTheme(violetDark);
    const bold = ref(false);
    const onChange = (value) => console.log('bold:', value);
    return { bold, onChange };
  }
};
</script>

<template>
  <VToggleButton v-model="bold" label="Bold" @change="onChange" />
</template>
```

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `modelValue` | `boolean` | `false` | Pressed state (`v-model`). |
| `label` | `string` | `''` | Text when no default slot is provided. |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Padding + font size. |
| `disabled` | `boolean` | `false` | Dims the button and blocks toggling. |

## Events

| Event | Payload | When |
| --- | --- | --- |
| `update:modelValue` | `boolean` | Pressed state changed (`v-model`). |
| `change` | `boolean` | Pressed state changed. |

## Slots

| Slot | Purpose |
| --- | --- |
| default | Button content; overrides `label` when present. |

## Tokens

Pressed state uses `primary` for background/border and `onPrimary` for the
label; unpressed uses a `border`-coloured outline and `text` label colour.
Corner is `radius.md`, sizing from `spacing`/`typography`. No colours are
hardcoded.
