# VScrollView

A token-driven, Lynx-compatible scrollable container. Renders a single Lynx
`scroll-view` element (no DOM) hosting the default slot. `direction` maps to
the Lynx `scroll-orientation` attribute; `padding` maps to spacing tokens.

## Example (JavaScript SFC)

```vue
<script>
import { VScrollView, VText, provideTheme } from '@vynx/ui';
import { violetDark } from '@vynx/themes';

export default {
  components: { VScrollView, VText },
  setup() {
    provideTheme(violetDark);
    return {};
  }
};
</script>

<template>
  <VScrollView direction="vertical" padding="md">
    <VText value="Item one" />
    <VText value="Item two" />
    <VText value="Item three" />
  </VScrollView>
</template>
```

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `direction` | `'vertical' \| 'horizontal'` | `'vertical'` | Sets the Lynx `scroll-orientation` attribute. |
| `padding` | `'none' \| 'sm' \| 'md' \| 'lg'` | `'none'` | Inner padding, from spacing tokens. |

## Events

VScrollView emits no events.

## Slots

| Slot | Purpose |
| --- | --- |
| default | Scrollable content. |

## Tokens

`padding` comes from `theme.spacing` (`none`/`sm`/`md`/`lg`). No colours are
hardcoded.
