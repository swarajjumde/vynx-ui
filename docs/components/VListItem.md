# VListItem

A token-driven, Lynx-compatible tappable row. Renders a single Lynx `view`
element (no DOM) hosting the default slot, and emits `tap` on press unless
`disabled`, which also dims the row.

## Example (JavaScript SFC)

```vue
<script>
import { VListItem, VText, provideTheme } from '@vynx/ui';
import { violetDark } from '@vynx/themes';

export default {
  components: { VListItem, VText },
  setup() {
    provideTheme(violetDark);
    const onOpen = () => console.log('row tapped');
    return { onOpen };
  }
};
</script>

<template>
  <VListItem @tap="onOpen">
    <VText value="Notifications" />
  </VListItem>
  <VListItem disabled>
    <VText value="Unavailable" tone="muted" />
  </VListItem>
</template>
```

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `disabled` | `boolean` | `false` | Dims the row (`opacity`) and blocks `tap`. |

## Events

| Event | Payload | When |
| --- | --- | --- |
| `tap` | - | User presses the row while not `disabled`. |

## Slots

| Slot | Purpose |
| --- | --- |
| default | Row content. |

## Tokens

Background comes from `theme.colors.surface`; padding from `theme.spacing.md`.
`disabled` sets `opacity` to `0.5` (a structural value, not a colour). No
colours are hardcoded.
