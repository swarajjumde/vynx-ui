# VInputText

A token-driven, Lynx-compatible single-line text control. Renders a Lynx `input`
element (no DOM). Binds with `v-model` from JavaScript, and also emits `input`
on user intent. Updates are suppressed while `disabled`.

## Example (JavaScript SFC)

```vue
<script>
import { VInputText, provideTheme } from '@vynx/ui';
import { ref } from 'vue-lynx';
import { violetDark } from '@vynx/themes';

export default {
  components: { VInputText },
  setup() {
    provideTheme(violetDark);
    const name = ref('');
    const onInput = (value) => console.log('typed:', value);
    return { name, onInput };
  }
};
</script>

<template>
  <VInputText v-model="name" placeholder="Ada Lovelace" @input="onInput" />
</template>
```

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `modelValue` | `string` | `''` | Bound value (`v-model`). |
| `placeholder` | `string` | `''` | Placeholder text. |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Padding + font size. |
| `disabled` | `boolean` | `false` | Dims the control and blocks updates. |
| `invalid` | `boolean` | `false` | Uses the danger border colour. |

## Events

| Event | Payload | When |
| --- | --- | --- |
| `update:modelValue` | `string` | Value changed (enables `v-model`). |
| `input` | `string` | User typed while not `disabled`. |

## Tokens

Text/background/border from `text`, `surface`, and `border` (border becomes
`danger` when `invalid`), sizing from `spacing`/`typography`, corner from
`radius.md`. No colours are hardcoded.
