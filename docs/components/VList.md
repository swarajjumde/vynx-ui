# VList

A token-driven, Lynx-compatible surface container that groups `VListItem`s.
Renders a single Lynx `view` element (no DOM) hosting the default slot.

## Example (JavaScript SFC)

```vue
<script>
import { VList, VListItem, VText, provideTheme } from '@vynx/ui';
import { violetDark } from '@vynx/themes';

export default {
  components: { VList, VListItem, VText },
  setup() {
    provideTheme(violetDark);
    return {};
  }
};
</script>

<template>
  <VList>
    <VListItem>
      <VText value="Profile" />
    </VListItem>
    <VListItem>
      <VText value="Billing" />
    </VListItem>
  </VList>
</template>
```

## Props

VList takes no props.

## Events

VList emits no events.

## Slots

| Slot | Purpose |
| --- | --- |
| default | `VListItem`s (or any content) grouped by the surface. |

## Tokens

Background from `theme.colors.surface`, border colour from `theme.colors.border`,
and corner radius from `theme.radius.lg`. No colours are hardcoded.
