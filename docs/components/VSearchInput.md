# VSearchInput

A token-driven, Lynx-compatible text input with a clear affordance. Renders a
row `view` containing a Lynx `input` and, once there is a value, a `text`
clear control (no DOM). Binds with `v-model` from JavaScript, and also emits
`input` / `clear`. Mutations are suppressed while `disabled`.

## Example (JavaScript SFC)

```vue
<script>
import { VSearchInput, provideTheme } from '@vynx/ui';
import { ref } from 'vue-lynx';
import { violetDark } from '@vynx/themes';

export default {
  components: { VSearchInput },
  setup() {
    provideTheme(violetDark);
    const query = ref('');
    const onClear = () => console.log('cleared');
    return { query, onClear };
  }
};
</script>

<template>
  <VSearchInput v-model="query" placeholder="Search" @clear="onClear" />
</template>
```

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `modelValue` | `string` | `''` | Bound value (`v-model`). |
| `placeholder` | `string` | `''` | Placeholder text. |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Input font size. |
| `disabled` | `boolean` | `false` | Dims the control and blocks updates. |

## Events

| Event | Payload | When |
| --- | --- | --- |
| `update:modelValue` | `string` | Value changed (typing or clearing). |
| `input` | `string` | User typed while not `disabled`. |
| `clear` | - | The clear control was tapped while not `disabled`. |

## Tokens

Background is `surface`, border uses `border`, text is `text`, and the clear
glyph uses `textMuted`. Corner is `radius.md`, sizing from
`spacing`/`typography`. No colours are hardcoded.
