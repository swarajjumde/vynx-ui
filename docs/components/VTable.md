# VTable

A token-driven, Lynx-compatible constrained data table. Renders a column
`view` (no DOM) with a header row `view` of `text` labels and one body row
`view` per data row, each cell a `text` showing `row[column.key]`.
Display-only: emits no events.

## Example (JavaScript SFC)

```vue
<script>
import { VTable, provideTheme } from '@vynx/ui';
import { violetDark } from '@vynx/themes';

export default {
  components: { VTable },
  setup() {
    provideTheme(violetDark);
    const columns = [
      { key: 'name', label: 'Name' },
      { key: 'role', label: 'Role' }
    ];
    const rows = [
      { name: 'Ada Lovelace', role: 'Engineer' },
      { name: 'Grace Hopper', role: 'Admiral' }
    ];
    return { columns, rows };
  }
};
</script>

<template>
  <VTable :columns="columns" :rows="rows" />
</template>
```

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `columns` | `{ key: string; label: string }[]` | `[]` | Column definitions, in display order. |
| `rows` | `Record<string, unknown>[]` | `[]` | Data rows; cells read `row[column.key]`. |

## Events

VTable emits no events.

## Tokens

The header row uses `colors.neutral` with `colors.textMuted` labels; body
cells use `colors.text`. Borders and radius come from `colors.border` and
`radius.md`. No colours are hardcoded.
