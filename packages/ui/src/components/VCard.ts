import { computed, defineComponent, h } from 'vue';
import { useTheme } from '../theme.js';
import { resolveCardStyle } from '../styles.js';

/**
 * VCard — a token-driven, Lynx-compatible surface container.
 *
 * Renders a `view` and hosts arbitrary content via the default slot. The
 * `elevated` prop switches to the elevated surface token and a stronger shadow.
 */
export const VCard = defineComponent({
  name: 'VCard',
  props: {
    elevated: { type: Boolean, default: false }
  },
  setup(props, { slots }) {
    const theme = useTheme();
    const styles = computed(() => resolveCardStyle(theme.value, { elevated: props.elevated }));

    return () => h('view', { class: 'v-card', style: styles.value.container }, slots.default ? slots.default() : []);
  }
});
