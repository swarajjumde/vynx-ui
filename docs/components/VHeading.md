# VHeading

A token-driven, Lynx-compatible heading primitive. Renders a single Lynx
`text` element (no DOM). Content comes from the default slot or the `value`
prop; `level` maps to a typography scale (fontSize/fontWeight), while `tone`
and `align` map to colour and alignment tokens.

## Example (JavaScript SFC)

```vue
<script>
import { VHeading, provideTheme } from '@vynx/ui';
import { violetDark } from '@vynx/themes';

export default {
  components: { VHeading },
  setup() {
    provideTheme(violetDark);
    return {};
  }
};
</script>

<template>
  <VHeading value="Account settings" level="1" />
  <VHeading tone="muted" level="3">Preferences</VHeading>
  <VHeading value="Upgrade available" tone="primary" align="center" />
</template>
```

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `value` | `string` | `''` | Text when no default slot is provided. |
| `level` | `1 \| 2 \| 3` | `2` | Heading scale: maps to `fontSize`/`fontWeight` tokens. |
| `tone` | `'default' \| 'muted' \| 'primary'` | `'default'` | Text colour role. |
| `align` | `'left' \| 'center' \| 'right'` | `'left'` | Text alignment. |

## Events

VHeading emits no events.

## Slots

| Slot | Purpose |
| --- | --- |
| default | Heading content; overrides `value` when present. |

## Tokens

Colour comes from the theme's text roles (`text`/`textMuted`) or `primary`.
`level` selects `typography.fontSize` (`xl`/`lg`/`md`) and `typography.fontWeight`
(`bold`/`semibold`/`semibold`) for levels 1/2/3. Font family and the tight
`lineHeight` also come from `typography`. No colours are hardcoded.
