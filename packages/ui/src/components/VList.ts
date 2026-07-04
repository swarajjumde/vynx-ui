import { computed, defineComponent, h } from 'vue';
import { useTheme } from '../theme.js';
import { resolveListStyle } from '../styles/list.js';

/**
 * VList - a token-driven, Lynx-compatible surface container that groups
 * `VListItem`s.
 *
 * Renders a single Lynx `view` element (no DOM) hosting the default slot.
 */
export const VList = defineComponent({
  name: 'VList',
  setup(_props, { slots }) {
    const theme = useTheme();
    const styles = computed(() => resolveListStyle(theme.value));

    return () => h('view', { class: 'v-list', style: styles.value.container }, slots.default ? slots.default() : []);
  }
});
