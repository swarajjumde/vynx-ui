# VBottomSheet

A token-driven, Lynx-compatible bottom sheet. Renders nothing while hidden. When
`visible`, it renders a `position: fixed` backdrop `view` (no DOM, no portal —
see [the overlay decision](../decisions/overlays.md)) with a bottom-anchored
panel hosting the default slot. Tapping the backdrop closes the sheet; taps on
the panel are caught so they do not close it.

## Example (JavaScript SFC)

```vue
<script>
import { VBottomSheet, VButton, VText, provideTheme } from '@vynx/ui';
import { ref } from 'vue-lynx';
import { violetDark } from '@vynx/themes';

export default {
  components: { VBottomSheet, VButton, VText },
  setup() {
    provideTheme(violetDark);
    const open = ref(false);
    return { open };
  }
};
</script>

<template>
  <view>
    <VButton label="Open sheet" @tap="open = true" />
    <VBottomSheet v-model:visible="open" @close="open = false">
      <VText value="Sheet content" weight="semibold" />
    </VBottomSheet>
  </view>
</template>
```

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `visible` | `boolean` | `false` | Show/hide; use with `v-model:visible`. |

## Events

| Event | Payload | When |
| --- | --- | --- |
| `update:visible` | `boolean` | Backdrop tapped (emits `false`); enables `v-model:visible`. |
| `close` | - | Backdrop tapped. |

## Slots

| Slot | Purpose |
| --- | --- |
| default | Sheet body content. |

## Tokens

The backdrop uses the `overlay` scrim token; the panel uses `surfaceElevated`,
`radius.lg` (top corners), `spacing.lg` padding and `shadow.lg`. No colours are
hardcoded.
