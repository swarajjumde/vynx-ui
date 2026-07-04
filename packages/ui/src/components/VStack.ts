import { computed, defineComponent, h, type PropType } from 'vue';
import { useTheme } from '../theme.js';
import { resolveStackStyle, type StackAlign, type StackDirection, type StackGap, type StackJustify } from '../styles/stack.js';

/**
 * VStack - a token-driven, Lynx-compatible flex layout container.
 *
 * Renders a single Lynx `view` element (no DOM) hosting the default slot as
 * children. `direction`, `gap`, `align` and `justify` map to flexbox layout
 * properties, with `gap` sourced from spacing tokens.
 */
export const VStack = defineComponent({
  name: 'VStack',
  props: {
    direction: { type: String as PropType<StackDirection>, default: 'column' },
    gap: { type: String as PropType<StackGap>, default: 'md' },
    align: { type: String as PropType<StackAlign>, default: 'stretch' },
    justify: { type: String as PropType<StackJustify>, default: 'start' }
  },
  setup(props, { slots }) {
    const theme = useTheme();
    const styles = computed(() =>
      resolveStackStyle(theme.value, {
        direction: props.direction,
        gap: props.gap,
        align: props.align,
        justify: props.justify
      })
    );

    return () => h('view', { class: 'v-stack', style: styles.value.container }, slots.default ? slots.default() : []);
  }
});
