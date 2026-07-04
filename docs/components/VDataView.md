# VDataView

A token-driven, Lynx-compatible list renderer. Renders a column `view` (no DOM)
hosting one wrapper `view` per item, each populated via the scoped `item` slot
(`{ item, index }`). When `items` is empty and an `empty` slot is provided,
that slot is rendered instead. Display-only: emits no events.

## Example (JavaScript SFC)

```vue
<script>
import { VDataView, VText, VEmptyState, provideTheme } from '@vynx/ui';
import { violetDark } from '@vynx/themes';

export default {
  components: { VDataView, VText, VEmptyState },
  setup() {
    provideTheme(violetDark);
    const items = [{ name: 'Ada' }, { name: 'Grace' }, { name: 'Linus' }];
    return { items };
  }
};
</script>

<template>
  <VDataView :items="items">
    <template #item="{ item }">
      <VText :value="item.name" />
    </template>
    <template #empty>
      <VEmptyState title="No results" />
    </template>
  </VDataView>
</template>
```

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `items` | `unknown[]` | `[]` | Items rendered via the scoped `item` slot. |

## Events

VDataView emits no events.

## Slots

| Slot | Purpose |
| --- | --- |
| `item` | Scoped `{ item, index }`; renders one item's content. |
| `empty` | Shown instead of the list when `items` is empty. |

## Tokens

The container's vertical gap comes from `spacing.sm`. No colours are
hardcoded.
