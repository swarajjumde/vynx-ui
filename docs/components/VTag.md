# VTag

A token-driven, Lynx-compatible label. Renders `view` + `text` Lynx elements.
Content comes from the default slot or the `label` prop; colour is driven by
the `tone` token role, and the `variant` prop switches between a filled
(`solid`) and an outlined (`outline`) treatment.

## Example (JavaScript SFC)

```vue
<script>
import { VTag, provideTheme } from '@vynx/ui';
import { violetLight } from '@vynx/themes';

export default {
  components: { VTag },
  setup() {
    provideTheme(violetLight);
  }
};
</script>

<template>
  <VTag tone="primary" label="New" />
  <VTag tone="success" variant="outline">Active</VTag>
  <VTag tone="danger" label="Error" />
</template>
```

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `label` | `string` | `''` | Text when no default slot is provided. |
| `tone` | `'primary' \| 'neutral' \| 'success' \| 'warning' \| 'danger'` | `'primary'` | Token colour role. |
| `variant` | `'solid' \| 'outline'` | `'solid'` | `solid` fills the background with the tone colour; `outline` uses a transparent background with a tone-coloured border and text. |

## Events

None.

## Slots

| Slot | Purpose |
| --- | --- |
| default | Tag content; overrides `label` when present. |

## Tokens

`solid` background from the `tone` role with text from its paired `on*`
colour; `outline` uses a transparent background with a `1px` border and text
in the `tone` colour. Corner from `radius.full`, padding from `spacing`, and
font from `typography`. No colours are hardcoded.
