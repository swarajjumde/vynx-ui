import { computed, defineComponent, h } from 'vue';
import { useTheme } from '../theme.js';
import { resolveAppBarStyle } from '../styles/appbar.js';

/**
 * VAppBar - a token-driven, Lynx-compatible top app bar.
 *
 * Renders a row `view` (no DOM) with three sections: a leading `view`, a
 * centered `view` (the default slot, or a `text` title when no default slot is
 * given), and a trailing `view`. Purely presentational - it emits no events.
 */
export const VAppBar = defineComponent({
  name: 'VAppBar',
  props: {
    title: { type: String, default: '' }
  },
  setup(props, { slots }) {
    const theme = useTheme();
    const styles = computed(() => resolveAppBarStyle(theme.value));

    return () => {
      const leading = h(
        'view',
        { class: 'v-app-bar__leading' },
        slots.leading ? slots.leading() : []
      );

      const center = h(
        'view',
        { class: 'v-app-bar__center' },
        slots.default ? slots.default() : [h('text', { class: 'v-app-bar__title', style: styles.value.title }, props.title)]
      );

      const trailing = h(
        'view',
        { class: 'v-app-bar__trailing' },
        slots.trailing ? slots.trailing() : []
      );

      return h('view', { class: 'v-app-bar', style: styles.value.container }, [leading, center, trailing]);
    };
  }
});
