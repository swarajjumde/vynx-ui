# VText

A token-driven, Lynx-compatible typography primitive. Renders a single Lynx
`text` element (no DOM). Content comes from the default slot or the `value` prop;
size, tone, weight and alignment map to typography and colour tokens.

## Example (JavaScript SFC)

```vue
<script>
import { VText, provideTheme } from '@vynx/ui';
import { violetDark } from '@vynx/themes';

export default {
  components: { VText },
  setup() {
    provideTheme(violetDark);
    return {};
  }
};
</script>

<template>
  <VText value="Vynx UI" size="xl" weight="bold" />
  <VText tone="muted" size="sm">A Vue Lynx component framework</VText>
  <VText value="Saved" tone="success" weight="medium" />
</template>
```

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `value` | `string` | `''` | Text when no default slot is provided. |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Font size token. |
| `tone` | `'default' \| 'muted' \| 'inverse' \| 'primary' \| 'success' \| 'warning' \| 'danger'` | `'default'` | Text colour role. |
| `weight` | `'regular' \| 'medium' \| 'semibold' \| 'bold'` | `'regular'` | Font weight token. |
| `align` | `'left' \| 'center' \| 'right'` | `'left'` | Text alignment. |

## Events

VText emits no events.

## Slots

| Slot | Purpose |
| --- | --- |
| default | Text content; overrides `value` when present. |

## Tokens

Colour comes from the theme's text roles (`text` / `textMuted` / `textInverse`)
or a status role (`primary`/`success`/`warning`/`danger`). Size and weight come
from `typography.fontSize` and `typography.fontWeight`. No colours are hardcoded.
