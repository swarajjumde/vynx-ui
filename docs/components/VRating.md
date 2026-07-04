# VRating

A token-driven, Lynx-compatible row of tappable rating stars. Renders a row
`view` of `text` glyphs (no DOM). Binds with `v-model` from JavaScript, and
also emits `change`. Taps are suppressed while `disabled`.

## Example (JavaScript SFC)

```vue
<script>
import { VRating, provideTheme } from '@vynx/ui';
import { ref } from 'vue-lynx';
import { violetDark } from '@vynx/themes';

export default {
  components: { VRating },
  setup() {
    provideTheme(violetDark);
    const score = ref(3);
    const onChange = (value) => console.log('score:', value);
    return { score, onChange };
  }
};
</script>

<template>
  <VRating v-model="score" :max="5" @change="onChange" />
</template>
```

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `modelValue` | `number` | `0` | Current rating (`v-model`). |
| `max` | `number` | `5` | Number of stars to render. |
| `disabled` | `boolean` | `false` | Dims the row and blocks selection. |

## Events

| Event | Payload | When |
| --- | --- | --- |
| `update:modelValue` | `number` | A star is tapped, setting the rating (`v-model`). |
| `change` | `number` | A star is tapped, setting the rating. |

## Tokens

Filled stars use the `warning` token; unfilled stars use `textMuted`. Font
size comes from `typography.fontSize.lg`. No colours are hardcoded.
