# VConfirmDialog

A token-driven, Lynx-compatible centered dialog composed with two `VButton`s
for cancel/confirm. Renders nothing while hidden. When `visible`, it renders a
`position: fixed` backdrop `view` (no DOM, no portal — see
[the overlay decision](../decisions/overlays.md)) with a centered panel
hosting an optional `title`, a `message`, and an actions row. Tapping the
backdrop behaves like Cancel.

## Example (JavaScript SFC)

```vue
<script>
import { VConfirmDialog, VButton, provideTheme } from '@vynx/ui';
import { ref } from 'vue-lynx';
import { violetDark } from '@vynx/themes';

export default {
  components: { VConfirmDialog, VButton },
  setup() {
    provideTheme(violetDark);
    const open = ref(false);
    const onConfirm = () => console.log('confirmed');
    const onCancel = () => console.log('cancelled');
    return { open, onConfirm, onCancel };
  }
};
</script>

<template>
  <view>
    <VButton label="Delete" tone="danger" @tap="open = true" />
    <VConfirmDialog
      v-model:visible="open"
      title="Delete item?"
      message="This action cannot be undone."
      confirm-label="Delete"
      tone="danger"
      @confirm="onConfirm"
      @cancel="onCancel"
      @close="open = false"
    />
  </view>
</template>
```

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `visible` | `boolean` | `false` | Show/hide; use with `v-model:visible`. |
| `title` | `string` | `''` | Optional heading rendered above the message. |
| `message` | `string` | `''` | Body copy. |
| `confirmLabel` | `string` | `'Confirm'` | Confirm button label. |
| `cancelLabel` | `string` | `'Cancel'` | Cancel button label. |
| `tone` | `'primary' \| 'danger'` | `'primary'` | Confirm button's token colour role. |

## Events

| Event | Payload | When |
| --- | --- | --- |
| `update:visible` | `boolean` | Backdrop, Cancel, or Confirm tapped (emits `false`); enables `v-model:visible`. |
| `confirm` | - | The confirm button is tapped. |
| `cancel` | - | The cancel button or backdrop is tapped. |
| `close` | - | Any of the above. |

## Tokens

The backdrop uses the `overlay` scrim token; the panel uses `surfaceElevated`,
`radius.lg`, `spacing.lg` padding and `shadow.lg`; the title uses `text`
typography tokens (`lg`/`semibold`); the message uses `colors.textMuted` and
`typography.fontSize.md`. The actions row lays the two `VButton`s out with
`spacing.sm` gap. No colours are hardcoded.
