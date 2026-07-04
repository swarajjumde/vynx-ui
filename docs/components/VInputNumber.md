# VInputNumber

A token-driven, Lynx-compatible numeric stepper. Renders a row `view`
containing a decrement `view`, a `text` value, and an increment `view` (no
DOM). Binds with `v-model` from JavaScript, and also emits `change`. Steps
clamp to `[min, max]` and are suppressed while `disabled`.

## Example (JavaScript SFC)

```vue
<script>
import { VInputNumber, provideTheme } from '@vynx/ui';
import { ref } from 'vue-lynx';
import { violetDark } from '@vynx/themes';

export default {
  components: { VInputNumber },
  setup() {
    provideTheme(violetDark);
    const quantity = ref(1);
    const onChange = (value) => console.log('quantity:', value);
    return { quantity, onChange };
  }
};
</script>

<template>
  <VInputNumber v-model="quantity" :min="0" :max="10" @change="onChange" />
</template>
```

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `modelValue` | `number` | `0` | Current value (`v-model`). |
| `step` | `number` | `1` | Amount added/removed per tap. |
| `min` | `number` | `-Infinity` | Lower clamp bound. |
| `max` | `number` | `Infinity` | Upper clamp bound. |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Value font size. |
| `invalid` | `boolean` | `false` | Uses the danger border colour. |
| `disabled` | `boolean` | `false` | Dims the control and blocks stepping. |

## Events

| Event | Payload | When |
| --- | --- | --- |
| `update:modelValue` | `number` | Value changed after clamping (`v-model`). |
| `change` | `number` | Value changed after clamping. |

## Tokens

Border uses `border` (or `danger` when `invalid`), background is `surface`,
step button labels use `primary`, value text uses `text`. Corner is
`radius.md`, sizing from `spacing`/`typography`. No colours are hardcoded.
