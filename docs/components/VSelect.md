# VSelect

A token-driven, Lynx-compatible select, implemented as a trigger that opens a
bottom-sheet picker overlay (see [the overlay decision](../decisions/overlays.md)).
Renders a trigger `view` (no DOM) showing the selected option's label (or
`placeholder`) and a chevron `text`. Tapping the trigger opens a
`position: fixed` backdrop + panel listing one option row per item; tapping an
option selects it and closes the picker, tapping the backdrop closes without
selecting.

## Example (JavaScript SFC)

```vue
<script>
import { VSelect, provideTheme } from '@vynx/ui';
import { ref } from 'vue-lynx';
import { violetDark } from '@vynx/themes';

export default {
  components: { VSelect },
  setup() {
    provideTheme(violetDark);
    const country = ref('');
    const options = [
      { label: 'United States', value: 'us' },
      { label: 'United Kingdom', value: 'uk' },
      { label: 'India', value: 'in' }
    ];
    return { country, options };
  }
};
</script>

<template>
  <VSelect v-model="country" :options="options" placeholder="Select a country" />
</template>
```

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `modelValue` | `string \| number` | `''` | Selected value; use with `v-model`. |
| `options` | `Array<{ label: string; value: string \| number }>` | `[]` | Options shown in the picker. |
| `placeholder` | `string` | `'Select'` | Shown in the trigger when no option is selected. |
| `invalid` | `boolean` | `false` | Marks the trigger border with the danger token. |
| `disabled` | `boolean` | `false` | Dims the trigger and blocks opening the picker. |

## Events

| Event | Payload | When |
| --- | --- | --- |
| `update:modelValue` | `string \| number` | An option is tapped (`v-model`). |
| `change` | `string \| number` | An option is tapped. |

## Tokens

The trigger sits on `surface` with a `border` (or `danger` when `invalid`) and
`radius.md`; disabled halves opacity. The selected option's label and check
glyph use `colors.primary`; unselected labels use `colors.text`. The picker
overlay uses the shared `overlay` scrim and `surfaceElevated` panel tokens. No
colours are hardcoded.
