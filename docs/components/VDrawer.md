# VDrawer

A token-driven, Lynx-compatible side panel. Renders nothing while hidden. When
`visible`, it renders a `position: fixed` backdrop `view` (no DOM, no portal —
see [the overlay decision](../decisions/overlays.md)) with a full-height panel
anchored to `side` hosting the default slot. Tapping the backdrop closes the
drawer; taps on the panel are caught so they do not close it.

## Example (JavaScript SFC)

```vue
<script>
import { VDrawer, VButton, VText, provideTheme } from '@vynx/ui';
import { ref } from 'vue-lynx';
import { violetDark } from '@vynx/themes';

export default {
  components: { VDrawer, VButton, VText },
  setup() {
    provideTheme(violetDark);
    const open = ref(false);
    return { open };
  }
};
</script>

<template>
  <view>
    <VButton label="Open menu" @tap="open = true" />
    <VDrawer v-model:visible="open" side="left" @close="open = false">
      <VText value="Menu" weight="semibold" />
    </VDrawer>
  </view>
</template>
```

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `visible` | `boolean` | `false` | Show/hide; use with `v-model:visible`. |
| `side` | `'left' \| 'right'` | `'left'` | Which edge the panel slides in from. |

## Events

| Event | Payload | When |
| --- | --- | --- |
| `update:visible` | `boolean` | Backdrop tapped (emits `false`); enables `v-model:visible`. |
| `close` | - | Backdrop tapped. |

## Slots

| Slot | Purpose |
| --- | --- |
| default | Drawer body content. |

## Tokens

The backdrop uses the `overlay` scrim token; the full-height panel uses
`surfaceElevated`, `spacing.lg` padding and `shadow.lg` (from the shared
`resolveOverlayStyle` resolver). No colours are hardcoded.
