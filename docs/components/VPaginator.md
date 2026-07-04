# VPaginator

A token-driven, Lynx-compatible pager. Renders a row `view` (no DOM) with a Prev
`view` button, a "Page X of Y" `text`, and a Next `view` button. Binds with
`v-model` via `modelValue` / `update:modelValue` (the current 1-based page) and
also emits `change`. Prev/Next clamp to `[1, total]` and no-op at the bounds.

## Example (JavaScript SFC)

```vue
<script>
import { VPaginator, provideTheme } from '@vynx/ui';
import { ref } from 'vue-lynx';
import { violetDark } from '@vynx/themes';

export default {
  components: { VPaginator },
  setup() {
    provideTheme(violetDark);
    const page = ref(1);
    return { page };
  }
};
</script>

<template>
  <VPaginator v-model="page" :total="5" />
</template>
```

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `modelValue` | `number` | `1` | Current 1-based page; use with `v-model`. |
| `total` | `number` | `1` | Total number of pages. |

## Events

| Event | Payload | When |
| --- | --- | --- |
| `update:modelValue` | `number` | Page changes via Prev/Next (`v-model`). |
| `change` | `number` | Page changes via Prev/Next. |

## Tokens

Buttons sit on `surface` with a `border` outline and `primary` labels; the page
info uses `text`. Disabled bounds dim via opacity. No colours are hardcoded.
