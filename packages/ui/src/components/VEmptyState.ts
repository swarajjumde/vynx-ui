import { computed, defineComponent, h } from 'vue';
import { useTheme } from '../theme.js';
import { resolveEmptyStateStyle } from '../styles/emptystate.js';

/**
 * VEmptyState - a token-driven, Lynx-compatible empty/placeholder state.
 *
 * Renders a centered column `view` (no DOM) with an optional `image` icon, a
 * `title` and `message` as `text`, and a default slot for an action (e.g. a
 * button). Icons are image assets/URIs.
 */
export const VEmptyState = defineComponent({
  name: 'VEmptyState',
  props: {
    title: { type: String, default: '' },
    message: { type: String, default: '' },
    icon: { type: String, default: '' }
  },
  setup(props, { slots }) {
    const theme = useTheme();
    const styles = computed(() => resolveEmptyStateStyle(theme.value));

    return () => {
      const children = [];
      if (props.icon) {
        children.push(h('image', { class: 'v-empty-state__icon', style: styles.value.icon, src: props.icon, mode: 'aspectFit' }));
      }
      if (props.title) {
        children.push(h('text', { class: 'v-empty-state__title', style: styles.value.title }, props.title));
      }
      if (props.message) {
        children.push(h('text', { class: 'v-empty-state__message', style: styles.value.message }, props.message));
      }
      if (slots.default) children.push(...slots.default());

      return h('view', { class: 'v-empty-state', style: styles.value.container }, children);
    };
  }
});
