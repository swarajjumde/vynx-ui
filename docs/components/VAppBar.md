# VAppBar

A token-driven, Lynx-compatible top app bar. Renders a row `view` (no DOM)
split into three sections: a leading `view`, a centered `view`, and a trailing
`view`. The center shows a `text` title by default, or the default slot's
content when provided. Purely presentational - it emits no events.

## Example (JavaScript SFC)

```vue
<script>
import { VAppBar, VButton, provideTheme } from '@vynx/ui';
import { violetDark } from '@vynx/themes';

export default {
  components: { VAppBar, VButton },
  setup() {
    provideTheme(violetDark);
    const onMenu = () => console.log('Menu tapped');
    return { onMenu };
  }
};
</script>

<template>
  <VAppBar title="Inbox">
    <template #leading>
      <VButton label="☰" variant="ghost" @tap="onMenu" />
    </template>
    <template #trailing>
      <VButton label="+" variant="ghost" />
    </template>
  </VAppBar>
</template>
```

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `title` | `string` | `''` | Text shown in the center when no default slot is provided. |

## Events

This component emits no events.

## Slots

| Slot | Purpose |
| --- | --- |
| `leading` | Content before the title (e.g. a menu/back button). |
| `trailing` | Content after the title (e.g. actions). |
| default | Center content; overrides `title` when present. |

## Tokens

The bar sits on `surface` with a `border` bottom rule and `spacing.md`/
`spacing.sm` padding. The title uses `colors.text`, `typography.fontSize.lg`
and a `semibold` weight. No colours are hardcoded.
