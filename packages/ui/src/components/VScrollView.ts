import { computed, defineComponent, h, type PropType } from 'vue';
import { useTheme } from '../theme.js';
import { resolveScrollViewStyle, type ScrollViewPadding } from '../styles/scroll.js';

export type ScrollViewDirection = 'vertical' | 'horizontal';

/**
 * VScrollView - a token-driven, Lynx-compatible scrollable container.
 *
 * Renders a single Lynx `scroll-view` element (no DOM) hosting the default
 * slot. `direction` maps to the Lynx `scroll-orientation` attribute; `padding`
 * maps to spacing tokens.
 */
export const VScrollView = defineComponent({
  name: 'VScrollView',
  props: {
    direction: { type: String as PropType<ScrollViewDirection>, default: 'vertical' },
    padding: { type: String as PropType<ScrollViewPadding>, default: 'none' }
  },
  setup(props, { slots }) {
    const theme = useTheme();
    const styles = computed(() => resolveScrollViewStyle(theme.value, { padding: props.padding }));

    return () =>
      h(
        'scroll-view',
        {
          class: 'v-scroll-view',
          style: styles.value.container,
          'scroll-orientation': props.direction
        },
        slots.default ? slots.default() : []
      );
  }
});
