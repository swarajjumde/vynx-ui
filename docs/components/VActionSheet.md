# VActionSheet

A token-driven, Lynx-compatible bottom sheet of tappable actions. Renders
nothing while hidden. When `visible`, it renders a `position: fixed` backdrop
`view` (no DOM, no portal — see [the overlay decision](../decisions/overlays.md))
with a bottom-anchored panel listing one row per action. Tapping an action
emits `select` with its value and closes the sheet; tapping the backdrop
closes it without selecting.

## Example (JavaScript SFC)

```vue
<script>
import { VActionSheet, VButton, provideTheme } from '@vynx/ui';
import { ref } from 'vue-lynx';
import { violetDark } from '@vynx/themes';

export default {
  components: { VActionSheet, VButton },
  setup() {
    provideTheme(violetDark);
    const open = ref(false);
    const actions = [
      { label: 'Share', value: 'share' },
      { label: 'Rename', value: 'rename' },
      { label: 'Delete', value: 'delete', tone: 'danger' }
    ];
    const onSelect = (value) => console.log('selected', value);
    return { open, actions, onSelect };
  }
};
</script>

<template>
  <view>
    <VButton label="Open actions" @tap="open = true" />
    <VActionSheet
      v-model:visible="open"
      :actions="actions"
      @select="onSelect"
      @close="open = false"
    />
  </view>
</template>
```

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `visible` | `boolean` | `false` | Show/hide; use with `v-model:visible`. |
| `actions` | `Array<{ label: string; value: string \| number; tone?: 'default' \| 'danger' }>` | `[]` | Rows rendered top-to-bottom in the panel. |

## Events

| Event | Payload | When |
| --- | --- | --- |
| `update:visible` | `boolean` | Backdrop or an action tapped (emits `false`); enables `v-model:visible`. |
| `select` | `string \| number` | An action row is tapped; the tapped action's `value`. |
| `close` | - | Backdrop or an action tapped. |

## Tokens

The backdrop uses the `overlay` scrim token; the panel uses `surfaceElevated`,
`radius.lg` (top corners), `spacing.lg` padding and `shadow.lg`. Each row's
label colour comes from `colors.text` (or `colors.danger` for the `danger`
tone) and `typography` for size/weight/family. No colours are hardcoded.
