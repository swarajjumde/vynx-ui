# VToast

A token-driven, Lynx-compatible non-blocking message pill. Renders nothing
while hidden. When `visible`, it renders a `position: fixed`, transparent
backdrop `view` (no DOM, no portal — see
[the overlay decision](../decisions/overlays.md)) anchored to `position`
hosting a toast pill with the `message` text. Tapping the pill (or the
backdrop) closes the toast.

There is **no auto-dismiss timer** — the host application controls `visible`
(for example with its own `setTimeout` outside this component) since Lynx
component code must stay timer-free here.

## Example (JavaScript SFC)

```vue
<script>
import { VToast, VButton, provideTheme } from '@vynx/ui';
import { ref } from 'vue-lynx';
import { violetDark } from '@vynx/themes';

export default {
  components: { VToast, VButton },
  setup() {
    provideTheme(violetDark);
    const open = ref(false);
    const show = () => {
      open.value = true;
    };
    return { open, show };
  }
};
</script>

<template>
  <view>
    <VButton label="Show toast" @tap="show" />
    <VToast
      v-model:visible="open"
      message="Saved successfully"
      tone="success"
      position="bottom"
      @close="open = false"
    />
  </view>
</template>
```

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `visible` | `boolean` | `false` | Show/hide; use with `v-model:visible`. |
| `message` | `string` | `''` | Text shown in the pill. |
| `tone` | `'neutral' \| 'success' \| 'warning' \| 'danger'` | `'neutral'` | Token colour role. |
| `position` | `'top' \| 'bottom'` | `'bottom'` | Which edge the pill is anchored to. |

## Events

| Event | Payload | When |
| --- | --- | --- |
| `update:visible` | `boolean` | Backdrop or pill tapped (emits `false`); enables `v-model:visible`. |
| `close` | - | Backdrop or pill tapped. |

## Tokens

The backdrop is transparent (no scrim, non-blocking). The pill's background
comes from `colors[tone]` (`colors.neutral`/`success`/`warning`/`danger`) and
its label from the matching `on*` token; padding from `spacing.md`, corners
from `radius.md`, outer spacing from `spacing.lg`, elevation from
`shadow.lg`. No colours are hardcoded.
