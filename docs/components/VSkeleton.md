# VSkeleton

A token-driven, Lynx-compatible loading placeholder. Renders a single `view`
sized by the `width`/`height` props, muted with the `neutral` token, and
rounded per the `rounded` prop.

## Example (JavaScript SFC)

```vue
<script>
import { VSkeleton, provideTheme } from '@vynx/ui';
import { violetLight } from '@vynx/themes';

export default {
  components: { VSkeleton },
  setup() {
    provideTheme(violetLight);
  }
};
</script>

<template>
  <VSkeleton width="200px" height="16px" />
  <VSkeleton width="48px" height="48px" rounded="full" />
</template>
```

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `width` | `string` | `'100%'` | CSS-style width string. |
| `height` | `string` | `'16px'` | CSS-style height string. |
| `rounded` | `'sm' \| 'md' \| 'lg' \| 'full'` | `'md'` | Maps to the matching `radius` token. |

## Events

None.

## Tokens

Background from `colors.neutral`, corner from `radius.<rounded>`, and a fixed
`0.6` opacity to read as an inert placeholder. No colours are hardcoded.
