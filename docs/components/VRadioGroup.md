# VRadioGroup

A token-driven, Lynx-compatible single-select control. Renders a column of Lynx
`view` rows (no DOM), each a circular control with an inner dot plus a `text`
label. Binds with `v-model` via `modelValue` / `update:modelValue` and also emits
`change`. Selection is suppressed while `disabled`.

## Example (JavaScript SFC)

```vue
<script>
import { VRadioGroup, VFormField, provideTheme } from '@vynx/ui';
import { ref } from 'vue-lynx';
import { violetDark } from '@vynx/themes';

export default {
  components: { VRadioGroup, VFormField },
  setup() {
    provideTheme(violetDark);
    const plan = ref('pro');
    const options = [
      { label: 'Starter', value: 'starter' },
      { label: 'Pro', value: 'pro' },
      { label: 'Team', value: 'team' }
    ];
    return { plan, options };
  }
};
</script>

<template>
  <VFormField label="Plan">
    <VRadioGroup v-model="plan" :options="options" />
  </VFormField>
</template>
```

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `modelValue` | `string \| number` | `''` | Selected option value; use with `v-model`. |
| `options` | `Array<{ label: string; value: string \| number }>` | `[]` | Options to render. |
| `disabled` | `boolean` | `false` | Dims the group and blocks selection. |

## Events

| Event | Payload | When |
| --- | --- | --- |
| `update:modelValue` | `string \| number` | A new option is selected (`v-model`). |
| `change` | `string \| number` | A new option is selected. |

## Tokens

The selected control uses the `primary` token for its border and inner dot; the
unselected border uses `border`. Label colour is `text`, controls sit on
`surface`, and the circle uses `radius.full`. No colours are hardcoded.
