# VDivider

A token-driven, Lynx-compatible separator. Renders a single Lynx `view` hairline
(no DOM). Orientation switches between a full-width horizontal rule and a
full-height vertical rule; spacing maps to spacing tokens and the line colour
comes from the `border` token.

## Example (JavaScript SFC)

```vue
<script>
import { VDivider, VText, provideTheme } from '@vynx/ui';
import { violetDark } from '@vynx/themes';

export default {
  components: { VDivider, VText },
  setup() {
    provideTheme(violetDark);
    return {};
  }
};
</script>

<template>
  <view>
    <VText value="Account" weight="semibold" />
    <VDivider />
    <VText value="Preferences" weight="semibold" />
    <VDivider spacing="lg" />
  </view>
</template>
```

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Rule direction. |
| `spacing` | `'none' \| 'sm' \| 'md' \| 'lg'` | `'md'` | Margin around the rule, from spacing tokens. |

## Events

VDivider emits no events.

## Tokens

The line colour is the theme's `border` token; the gap around it comes from
`spacing`. No colours are hardcoded.
