# VAccordion

A token-driven, Lynx-compatible single collapsible section. Renders a `view`
container (no DOM) with a header `view` (a `text` label and a `text` chevron)
and, while `open`, a content `view` hosting the default slot. Binds with
`v-model:open` via `open` / `update:open` and also emits `toggle`. Tapping the
header toggles the section.

## Example (JavaScript SFC)

```vue
<script>
import { VAccordion, VText, provideTheme } from '@vynx/ui';
import { ref } from 'vue-lynx';
import { violetDark } from '@vynx/themes';

export default {
  components: { VAccordion, VText },
  setup() {
    provideTheme(violetDark);
    const open = ref(false);
    return { open };
  }
};
</script>

<template>
  <VAccordion label="Shipping details" v-model:open="open">
    <VText value="Delivered in 3-5 business days." />
  </VAccordion>
</template>
```

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `label` | `string` | `''` | Header text. |
| `open` | `boolean` | `false` | Whether the content is shown; use with `v-model:open`. |

## Events

| Event | Payload | When |
| --- | --- | --- |
| `update:open` | `boolean` | Header tapped (enables `v-model:open`). |
| `toggle` | `boolean` | Header tapped. |

## Slots

| Slot | Purpose |
| --- | --- |
| default | Content shown only while `open`. |

## Tokens

The container sits on `surface` with a `border` and `radius.md`. The header
uses `spacing.md` padding; the label uses `colors.text` (semibold); the
chevron icon uses `colors.textMuted`. No colours are hardcoded.
