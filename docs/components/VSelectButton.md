# VSelectButton

A token-driven, Lynx-compatible segmented single-select control. Renders a row
`view` of segment `view`s (no DOM), each with a `text` label. Binds with
`v-model` from JavaScript, and also emits `change`. Selection is suppressed
while `disabled`.

## Example (JavaScript SFC)

```vue
<script>
import { VSelectButton, provideTheme } from '@vynx/ui';
import { ref } from 'vue-lynx';
import { violetDark } from '@vynx/themes';

export default {
  components: { VSelectButton },
  setup() {
    provideTheme(violetDark);
    const view = ref('list');
    const options = [
      { label: 'List', value: 'list' },
      { label: 'Grid', value: 'grid' }
    ];
    return { view, options };
  }
};
</script>

<template>
  <VSelectButton v-model="view" :options="options" />
</template>
```

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `modelValue` | `string \| number` | `''` | Selected option value; use with `v-model`. |
| `options` | `Array<{ label: string; value: string \| number }>` | `[]` | Segments to render. |
| `disabled` | `boolean` | `false` | Dims the group and blocks selection. |

## Events

| Event | Payload | When |
| --- | --- | --- |
| `update:modelValue` | `string \| number` | A new segment is selected (`v-model`). |
| `change` | `string \| number` | A new segment is selected. |

## Tokens

The selected segment uses `primary` for its background and `onPrimary` for its
label; unselected segments are transparent with `text` label colour. The group
outline uses `border`, corner is `radius.md`. No colours are hardcoded.
