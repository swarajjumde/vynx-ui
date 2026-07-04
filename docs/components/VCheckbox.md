# VCheckbox

A token-driven, Lynx-compatible boolean control. Renders `view` + `text` Lynx
elements (no DOM) and toggles on tap. Binds with `v-model:checked` from
JavaScript, and also emits `change`. Taps are ignored while `disabled`.

## Example (JavaScript SFC)

```vue
<script>
import { VCheckbox, provideTheme } from '@vynx/ui';
import { ref } from 'vue-lynx';
import { violetDark } from '@vynx/themes';

export default {
  components: { VCheckbox },
  setup() {
    provideTheme(violetDark);
    const subscribe = ref(false);
    const onChange = (value) => console.log('subscribe:', value);
    return { subscribe, onChange };
  }
};
</script>

<template>
  <VCheckbox v-model:checked="subscribe" label="Subscribe to updates" @change="onChange" />
</template>
```

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `checked` | `boolean` | `false` | Bound state (`v-model:checked`). |
| `label` | `string` | `''` | Text beside the box; default slot overrides it. |
| `disabled` | `boolean` | `false` | Dims the control and blocks toggling. |
| `invalid` | `boolean` | `false` | Uses the danger border colour when unchecked. |

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

Box background from `primary` (checked) or `surface`, border from `border`
(`primary` when checked, `danger` when `invalid`), mark from `onPrimary`, and
label from `text`. No colours are hardcoded.
