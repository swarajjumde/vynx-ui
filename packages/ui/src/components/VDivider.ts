import { computed, defineComponent, h, type PropType } from 'vue';
import { useTheme } from '../theme.js';
import { resolveDividerStyle, type DividerOrientation, type DividerSpacing } from '../styles/divider.js';

/**
 * VDivider - a token-driven, Lynx-compatible separator.
 *
 * Renders a single Lynx `view` hairline (no DOM). Orientation switches between a
 * full-width horizontal rule and a full-height vertical rule; spacing maps to
 * spacing tokens. The line colour comes from the `border` token.
 */
export const VDivider = defineComponent({
  name: 'VDivider',
  props: {
    orientation: { type: String as PropType<DividerOrientation>, default: 'horizontal' },
    spacing: { type: String as PropType<DividerSpacing>, default: 'md' }
  },
  setup(props) {
    const theme = useTheme();
    const styles = computed(() =>
      resolveDividerStyle(theme.value, { orientation: props.orientation, spacing: props.spacing })
    );

    return () => h('view', { class: 'v-divider', style: styles.value.container });
  }
});
