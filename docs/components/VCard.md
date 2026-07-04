# VCard

A token-driven, Lynx-compatible surface container. Renders a `view` and hosts
arbitrary content via the default slot. The `elevated` prop switches to the
elevated surface token and a stronger shadow.

## Example (JavaScript SFC)

```vue
<script>
import { VCard, VBadge, provideTheme } from '@vynx/ui';
import { violetLight } from '@vynx/themes';

export default {
  components: { VCard, VBadge },
  setup() {
    provideTheme(violetLight);
  }
};
</script>

<template>
  <VCard elevated>
    <VBadge tone="primary" label="New" />
    <text>Card content goes here</text>
  </VCard>
</template>
```

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `elevated` | `boolean` | `false` | Uses `surfaceElevated` + `shadow.md` instead of `surface` + `shadow.sm`. |

## Events

None.

## Slots

| Slot | Purpose |
| --- | --- |
| default | Card body content. |

## Tokens

Background from `surface` / `surfaceElevated`, border from `border`, corner from
`radius.lg`, padding from `spacing.lg`, and shadow from `shadow.sm` / `shadow.md`.
No colours are hardcoded.
