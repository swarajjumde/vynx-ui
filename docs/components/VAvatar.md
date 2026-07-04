# VAvatar

A token-driven, Lynx-compatible avatar. Renders a Lynx `image` when `src` is
provided, otherwise a circular `view` with the `label` initials as `text` (no
DOM). Size maps to fixed dimensions and tone maps to colour tokens.

## Example (JavaScript SFC)

```vue
<script>
import { VAvatar, provideTheme } from '@vynx/ui';
import { violetDark } from '@vynx/themes';

export default {
  components: { VAvatar },
  setup() {
    provideTheme(violetDark);
    return {};
  }
};
</script>

<template>
  <VAvatar label="AL" size="lg" />
  <VAvatar label="NG" tone="neutral" />
  <VAvatar src="https://example.com/ada.png" size="md" />
</template>
```

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `label` | `string` | `''` | Initials shown when no `src` is provided. |
| `src` | `string` | `''` | Image URL; when set, renders a Lynx `image`. |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Avatar diameter and initials font size. |
| `tone` | `'primary' \| 'neutral'` | `'primary'` | Background and initials colour role. |

## Events

VAvatar emits no events.

## Tokens

Background and initials colours come from the theme's `primary`/`onPrimary` or
`neutral`/`onNeutral` roles; the circle uses `radius.full`. No colours are
hardcoded.
