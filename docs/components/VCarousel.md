# VCarousel

A token-driven, Lynx-compatible horizontal paged carousel. Renders a Lynx
`scroll-view` (no DOM) with `scroll-orientation: horizontal`, hosting one
slide `view` per item, each populated via the scoped `slide` slot
(`{ item, index }`). Display-only: emits no events.

## Example (JavaScript SFC)

```vue
<script>
import { VCarousel, VText, provideTheme } from '@vynx/ui';
import { violetDark } from '@vynx/themes';

export default {
  components: { VCarousel, VText },
  setup() {
    provideTheme(violetDark);
    const items = [{ label: 'Slide one' }, { label: 'Slide two' }, { label: 'Slide three' }];
    return { items };
  }
};
</script>

<template>
  <VCarousel :items="items" slide-width="240px">
    <template #slide="{ item }">
      <VText :value="item.label" />
    </template>
  </VCarousel>
</template>
```

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `items` | `unknown[]` | `[]` | Items rendered via the scoped `slide` slot. |
| `slideWidth` | `string` | `'280px'` | Fixed width applied to each slide. |

## Events

VCarousel emits no events.

## Slots

| Slot | Purpose |
| --- | --- |
| `slide` | Scoped `{ item, index }`; renders one slide's content. |

## Tokens

Slide spacing between slides comes from `spacing.sm`. No colours are
hardcoded.
