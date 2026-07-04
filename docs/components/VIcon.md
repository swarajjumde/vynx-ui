# VIcon

A token-sized, Lynx-compatible icon. Lynx has no font-icons, so VIcon renders a
Lynx `image` from `src` (no DOM). Consumers supply their own icon assets/URIs;
colour is baked into the asset. Size maps to fixed square dimensions.

## Example (JavaScript SFC)

```vue
<script>
import { VIcon, provideTheme } from '@vynx/ui';
import { violetDark } from '@vynx/themes';

export default {
  components: { VIcon },
  setup() {
    provideTheme(violetDark);
    return {};
  }
};
</script>

<template>
  <VIcon src="https://example.com/icons/home.png" size="md" />
  <VIcon src="https://example.com/icons/bell.png" size="lg" />
</template>
```

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `src` | `string` | `''` | Icon image asset/URI. |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Square dimensions: 16 / 20 / 24 px. |

## Events

VIcon emits no events.

## Tokens

VIcon sizing is fixed (icons are pixel assets, not token colours); the resolver
accepts the theme for a stable signature and future tinting support. Colour comes
from the supplied asset, not a theme token.
