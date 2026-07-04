# VSwitch

A token-driven, Lynx-compatible boolean control. Renders `view` + `text` Lynx
elements (no DOM) as a track and thumb, toggling on tap. Binds with
`v-model:checked` from JavaScript, and also emits `change`. Taps are ignored
while `disabled`.

## Example (JavaScript SFC)

```vue
<script>
import { VSwitch, provideTheme } from '@vynx/ui';
import { ref } from 'vue';
import { violetDark } from '@vynx/themes';

export default {
  components: { VSwitch },
  setup() {
    provideTheme(violetDark);
    const notifications = ref(true);
    const onChange = (value) => console.log('notifications:', value);
    return { notifications, onChange };
  }
};
</script>

<template>
  <VSwitch v-model:checked="notifications" label="Enable notifications" @change="onChange" />
</template>
```

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `checked` | `boolean` | `false` | Bound state (`v-model:checked`). |
| `label` | `string` | `''` | Text beside the track; default slot overrides it. |
| `disabled` | `boolean` | `false` | Dims the control and blocks toggling. |
| `invalid` | `boolean` | `false` | Reserved danger state (shares toggle style options). |

## Events

| Event | Payload | When |
| --- | --- | --- |
| `update:checked` | `boolean` | State toggled (enables `v-model:checked`). |
| `change` | `boolean` | User taps while not `disabled`. |

## Slots

| Slot | Purpose |
| --- | --- |
| default | Label content; overrides `label` when present. |

## Tokens

Track background from `primary` (checked) or `neutral`, thumb from `surface`,
corner from `radius.full`, and label from `text`. No colours are hardcoded.
