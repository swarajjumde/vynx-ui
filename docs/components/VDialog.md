# VDialog

A token-driven, Lynx-compatible centered modal dialog. Renders nothing while
hidden. When `visible`, it renders a `position: fixed` backdrop `view` (no DOM,
no portal — see [the overlay decision](../decisions/overlays.md)) with a centered
panel hosting an optional `title` plus the default slot. Tapping the backdrop
closes the dialog; taps on the panel are caught.

## Example (JavaScript SFC)

```vue
<script>
import { VDialog, VButton, VText, provideTheme } from '@vynx/ui';
import { ref } from 'vue-lynx';
import { violetDark } from '@vynx/themes';

export default {
  components: { VDialog, VButton, VText },
  setup() {
    provideTheme(violetDark);
    const open = ref(false);
    return { open };
  }
};
</script>

<template>
  <view>
    <VButton label="Delete" tone="danger" @tap="open = true" />
    <VDialog v-model:visible="open" title="Delete item?" @close="open = false">
      <VText tone="muted">This action cannot be undone.</VText>
    </VDialog>
  </view>
</template>
```

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `visible` | `boolean` | `false` | Show/hide; use with `v-model:visible`. |
| `title` | `string` | `''` | Optional heading rendered above the slot. |

## Events

| Event | Payload | When |
| --- | --- | --- |
| `update:visible` | `boolean` | Backdrop tapped (emits `false`); enables `v-model:visible`. |
| `close` | - | Backdrop tapped. |

## Slots

| Slot | Purpose |
| --- | --- |
| default | Dialog body content, below the title. |

## Tokens

The backdrop uses the `overlay` scrim token; the panel uses `surfaceElevated`,
`radius.lg`, `spacing.lg` padding and `shadow.lg`; the title uses typography
tokens. No colours are hardcoded.
