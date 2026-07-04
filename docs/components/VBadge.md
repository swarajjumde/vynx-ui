# VBadge

A token-driven, Lynx-compatible status label. Renders `view` + `text` Lynx
elements. Content comes from the default slot or the `label` prop; colour is
driven by the `tone` token role.

## Example (JavaScript SFC)

```vue
<script>
import { VBadge, provideTheme } from '@vynx/ui';
import { violetLight } from '@vynx/themes';

export default {
  components: { VBadge },
  setup() {
    provideTheme(violetLight);
  }
};
</script>

<template>
  <VBadge tone="primary" label="New" />
  <VBadge tone="success">Active</VBadge>
  <VBadge tone="danger" label="Error" />
</template>
```

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `label` | `string` | `''` | Text when no default slot is provided. |
| `tone` | `'primary' \| 'neutral' \| 'success' \| 'warning' \| 'danger'` | `'primary'` | Token colour role. |

## Events

None.

## Slots

| Slot | Purpose |
| --- | --- |
| default | Badge content; overrides `label` when present. |

## Tokens

Background from the `tone` role, text from its paired `on*` colour, corner from
`radius.full`, padding from `spacing`, and font from `typography`. No colours are
hardcoded.
