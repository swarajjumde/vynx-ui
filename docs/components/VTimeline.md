# VTimeline

A token-driven, Lynx-compatible vertical event timeline. Renders a column
`view` (no DOM) of event rows, each a marker `view` (dot + connector line)
beside a content `view` with `text` title/time/description. Display-only:
emits no events.

## Example (JavaScript SFC)

```vue
<script>
import { VTimeline, provideTheme } from '@vynx/ui';
import { violetDark } from '@vynx/themes';

export default {
  components: { VTimeline },
  setup() {
    provideTheme(violetDark);
    const items = [
      { title: 'Order placed', time: '09:00', description: 'We received your order.' },
      { title: 'Shipped', time: '14:30', description: 'Your package is on its way.' },
      { title: 'Delivered', time: '17:15' }
    ];
    return { items };
  }
};
</script>

<template>
  <VTimeline :items="items" />
</template>
```

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `items` | `{ title: string; time?: string; description?: string }[]` | `[]` | Events rendered top to bottom. |

## Events

VTimeline emits no events.

## Tokens

The dot uses `colors.primary`; the connector line uses `colors.border` (and is
`transparent` for the last item). Title uses `colors.text`, time and
description use `colors.textMuted`. Spacing and font sizes come from
`spacing`/`typography` tokens. No colours are hardcoded.
