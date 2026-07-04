# VTextarea

A token-driven, Lynx-compatible multi-line text control. Renders a Lynx
`textarea` element (no DOM). Binds with `v-model` from JavaScript, and also
emits `input` on user intent. Updates are suppressed while `disabled`.

## Example (JavaScript SFC)

```vue
<script>
import { VTextarea, provideTheme } from '@vynx/ui';
import { ref } from 'vue';
import { violetDark } from '@vynx/themes';

export default {
  components: { VTextarea },
  setup() {
    provideTheme(violetDark);
    const bio = ref('');
    return { bio };
  }
};
</script>

<template>
  <VTextarea v-model="bio" placeholder="Tell us about yourself" :rows="4" />
</template>
```

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `modelValue` | `string` | `''` | Bound value (`v-model`). |
| `placeholder` | `string` | `''` | Placeholder text. |
| `rows` | `number` | `3` | Visible text rows. |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Padding + font size. |
| `disabled` | `boolean` | `false` | Dims the control and blocks updates. |
| `invalid` | `boolean` | `false` | Uses the danger border colour. |

## Events

| Event | Payload | When |
| --- | --- | --- |
| `update:modelValue` | `string` | Value changed (enables `v-model`). |
| `input` | `string` | User typed while not `disabled`. |

## Tokens

Shares the input token style with [VInputText](./VInputText.md): `text`,
`surface`, `border` (or `danger` when `invalid`), `spacing`/`typography`, and
`radius.md`. No colours are hardcoded.
