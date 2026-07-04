import { computed, defineComponent, h, type PropType } from 'vue';
import { useTheme } from '../theme.js';
import { resolveTableStyle } from '../styles/table.js';

export interface TableColumn {
  key: string;
  label: string;
}

/**
 * VTable - a token-driven, Lynx-compatible constrained data table.
 *
 * Renders a column `view` (no DOM) with a header row `view` of `text` labels
 * and one body row `view` per data row, each cell a `text` showing
 * `row[column.key]`. Display-only: emits no events.
 */
export const VTable = defineComponent({
  name: 'VTable',
  props: {
    columns: { type: Array as PropType<TableColumn[]>, default: () => [] },
    rows: { type: Array as PropType<Record<string, unknown>[]>, default: () => [] }
  },
  setup(props) {
    const theme = useTheme();
    const styles = computed(() => resolveTableStyle(theme.value));

    return () => {
      const headerRow = h(
        'view',
        { class: 'v-table__header-row', style: styles.value.headerRow },
        props.columns.map((column) =>
          h('text', { key: column.key, class: 'v-table__header-cell', style: styles.value.headerCell }, column.label)
        )
      );

      const bodyRows = props.rows.map((row, index) =>
        h(
          'view',
          { key: index, class: 'v-table__row', style: styles.value.row },
          props.columns.map((column) =>
            h(
              'text',
              { key: column.key, class: 'v-table__cell', style: styles.value.cell },
              String(row[column.key] ?? '')
            )
          )
        )
      );

      return h('view', { class: 'v-table', style: styles.value.container }, [headerRow, ...bodyRows]);
    };
  }
});
