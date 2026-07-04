import { computed, defineComponent, h } from 'vue';
import { useTheme } from '../theme.js';
import { resolveListItemStyle } from '../styles/list.js';

/**
 * VListItem - a token-driven, Lynx-compatible tappable row.
 *
 * Renders a single Lynx `view` element (no DOM) hosting the default slot.
 * Emits `tap` on press unless `disabled`, which also dims the row via the
 * `opacity` token.
 */
export const VListItem = defineComponent({
  name: 'VListItem',
  props: {
    disabled: { type: Boolean, default: false }
  },
  emits: ['tap'],
  setup(props, { emit, slots }) {
    const theme = useTheme();
    const styles = computed(() => resolveListItemStyle(theme.value, { disabled: props.disabled }));

    const onTap = () => {
      if (props.disabled) return;
      emit('tap');
    };

    return () =>
      h(
        'view',
        { class: 'v-list-item', style: styles.value.container, bindtap: onTap, onTap },
        slots.default ? slots.default() : []
      );
  }
});
