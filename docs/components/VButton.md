# VButton

A token-driven, Lynx-compatible press target. Renders `view` + `text` Lynx
elements (no DOM). Content comes from the default slot or the `label` prop, and
it emits `tap` on press unless `disabled`.

## Example (JavaScript SFC)

```vue
<script>
import { VButton, provideTheme } from '@vynx/ui';
import { violetDark } from '@vynx/themes';

export default {
  components: { VButton },
  setup() {
    provideTheme(violetDark);
    const onGetStarted = () => console.log('Get started tapped');
    return { onGetStarted };
  }
};
</script>

<template>
  <VButton label="Get started" tone="primary" @tap="onGetStarted" />
  <VButton variant="outline" tone="neutral" size="sm">Cancel</VButton>
  <VButton label="Delete" variant="solid" tone="danger" disabled />
</template>
```

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `label` | `string` | `''` | Text when no default slot is provided. |
| `variant` | `'solid' \| 'outline' \| 'ghost'` | `'solid'` | Visual style. |
| `tone` | `'primary' \| 'neutral' \| 'danger'` | `'primary'` | Token colour role. |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Padding + font size. |
| `disabled` | `boolean` | `false` | Dims the button and blocks `tap`. |

## Events

| Event | Payload | When |
| --- | --- | --- |
| `tap` | - | User presses the button while not `disabled`. |

## Slots

| Slot | Purpose |
| --- | --- |
| default | Button content; overrides `label` when present. |

## Tokens

Colours come from the theme's `tone` role (`primary`/`neutral`/`danger` + their
`on*` text colours), padding/font size from `spacing` and `typography`, and the
corner from `radius.md`. No colours are hardcoded.
