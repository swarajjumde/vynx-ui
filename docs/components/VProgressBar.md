# VProgressBar

A token-driven, Lynx-compatible progress indicator. Renders a track `view`
containing a fill `view` — no DOM. The `value` prop (0..100) is clamped by the
style resolver; colour is driven by the `tone` token role.

## Example (JavaScript SFC)

```vue
<script>
import { VProgressBar, provideTheme } from '@vynx/ui';
import { violetLight } from '@vynx/themes';

export default {
  components: { VProgressBar },
  setup() {
    provideTheme(violetLight);
  }
};
</script>

<template>
  <VProgressBar :value="42" />
  <VProgressBar :value="90" tone="success" />
  <VProgressBar :value="15" tone="danger" />
</template>
```

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `value` | `number` | `0` | Progress percentage. Clamped to the `0..100` range. |
| `tone` | `'primary' \| 'success' \| 'warning' \| 'danger'` | `'primary'` | Token colour role for the fill. |

## Events

None.

## Tokens

Track background from `colors.neutral`, fill background from the `tone` role,
corner from `radius.full` on both track and fill, and a fixed `8px` track
height. No colours are hardcoded.
