import { computed, defineComponent, h, type PropType } from 'vue';
import { useTheme } from '../theme.js';
import { resolveDataViewStyle } from '../styles/dataview.js';

/**
 * VDataView - a token-driven, Lynx-compatible list renderer.
 *
 * Renders a column `view` (no DOM) hosting one wrapper `view` per item, each
 * populated via the scoped `item` slot (`{ item, index }`). When `items` is
 * empty and an `empty` slot is provided, that slot is rendered instead.
 * Display-only: emits no events.
 */
export const VDataView = defineComponent({
  name: 'VDataView',
  props: {
    items: { type: Array as PropType<unknown[]>, default: () => [] }
  },
  setup(props, { slots }) {
    const theme = useTheme();
    const styles = computed(() => resolveDataViewStyle(theme.value));

    return () => {
      const children = [];

      if (props.items.length === 0 && slots.empty) {
        children.push(...slots.empty());
      } else {
        props.items.forEach((item, index) => {
          const itemChildren = slots.item ? slots.item({ item, index }) : [h('text', {}, String(item))];
          children.push(h('view', { key: index, class: 'v-data-view__item' }, itemChildren));
        });
      }

      return h('view', { class: 'v-data-view', style: styles.value.container }, children);
    };
  }
});
