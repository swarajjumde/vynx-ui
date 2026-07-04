# VEmptyState

A token-driven, Lynx-compatible empty/placeholder state. Renders a centered
column `view` (no DOM) with an optional `image` icon, a `title` and `message` as
`text`, and a default slot for an action (e.g. a button). Icons are image
assets/URIs.

## Example (JavaScript SFC)

```vue
<script>
import { VEmptyState, VButton, provideTheme } from '@vynx/ui';
import { violetDark } from '@vynx/themes';

export default {
  components: { VEmptyState, VButton },
  setup() {
    provideTheme(violetDark);
    return {};
  }
};
</script>

<template>
  <VEmptyState title="No results" message="Try a different search.">
    <VButton label="Clear filters" variant="outline" tone="neutral" />
  </VEmptyState>
</template>
```

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `title` | `string` | `''` | Heading; omitted when empty. |
| `message` | `string` | `''` | Supporting line; omitted when empty. |
| `icon` | `string` | `''` | Optional image asset/URI shown above the title. |

## Events

VEmptyState emits no events.

## Slots

| Slot | Purpose |
| --- | --- |
| default | Optional action content (e.g. a button) below the message. |

## Tokens

The title uses `text`, the message uses `textMuted`, spacing/padding come from
`spacing` tokens. No colours are hardcoded.
