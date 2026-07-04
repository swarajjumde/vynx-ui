# VStack

A token-driven, Lynx-compatible flex layout container. Renders a single Lynx
`view` element (no DOM) hosting the default slot as children. `direction`,
`align` and `justify` map to flexbox properties, while `gap` maps to spacing
tokens.

## Example (JavaScript SFC)

```vue
<script>
import { VStack, VText, provideTheme } from '@vynx/ui';
import { violetDark } from '@vynx/themes';

export default {
  components: { VStack, VText },
  setup() {
    provideTheme(violetDark);
    return {};
  }
};
</script>

<template>
  <VStack direction="row" gap="sm" align="center" justify="between">
    <VText value="Total" />
    <VText value="$42.00" weight="bold" />
  </VStack>
</template>
```

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `direction` | `'row' \| 'column'` | `'column'` | Flex direction. |
| `gap` | `'none' \| 'sm' \| 'md' \| 'lg'` | `'md'` | Space between children, from spacing tokens. |
| `align` | `'start' \| 'center' \| 'end' \| 'stretch'` | `'stretch'` | Cross-axis alignment. |
| `justify` | `'start' \| 'center' \| 'end' \| 'between'` | `'start'` | Main-axis alignment. |

## Events

VStack emits no events.

## Slots

| Slot | Purpose |
| --- | --- |
| default | Children laid out by the stack. |

## Tokens

`gap` comes from `theme.spacing` (`none`/`sm`/`md`/`lg`). Layout keywords
(`flex`, `flex-start`, `space-between`, etc.) are structural values, not
colours, so they're hardcoded per the authoring standard.
