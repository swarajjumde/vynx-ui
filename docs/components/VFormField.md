# VFormField

Token-driven layout around a labelled control. Hosts the control via the default
slot and renders an optional `label`, `help` text, and `error` text. The
`invalid` and `disabled` props drive the visual state; `error` text is shown
only when the field is `invalid`, otherwise `help` text is shown.

## Example (JavaScript SFC)

```vue
<script>
import { VFormField, VInputText, provideTheme } from '@vynx/ui';
import { ref } from 'vue-lynx';
import { violetDark } from '@vynx/themes';

export default {
  components: { VFormField, VInputText },
  setup() {
    provideTheme(violetDark);
    const name = ref('');
    return { name };
  }
};
</script>

<template>
  <VFormField label="Name" help="Your display name">
    <VInputText v-model="name" placeholder="Ada Lovelace" />
  </VFormField>

  <VFormField label="Name" error="Name is required" :invalid="name.length === 0">
    <VInputText v-model="name" :invalid="name.length === 0" />
  </VFormField>
</template>
```

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `label` | `string` | `''` | Field label; omitted when empty. |
| `help` | `string` | `''` | Hint shown when not `invalid`. |
| `error` | `string` | `''` | Message shown when `invalid` is `true`. |
| `invalid` | `boolean` | `false` | Switches to the danger colour and shows `error`. |
| `disabled` | `boolean` | `false` | Dims the field. |

## Events

None. `VFormField` is a layout wrapper - bind events on the control inside its
default slot (for example `v-model` on `VInputText`).

## Slots

| Slot | Purpose |
| --- | --- |
| default | The control being labelled. |

## Tokens

Label colour from `text` (or `danger` when `invalid`), help from `textMuted`,
error from `danger`, and spacing/typography from theme tokens. No colours are
hardcoded.
