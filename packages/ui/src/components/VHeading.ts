import { computed, defineComponent, h, type PropType } from 'vue';
import { useTheme } from '../theme.js';
import { resolveHeadingStyle, type HeadingAlign, type HeadingLevel, type HeadingTone } from '../styles/heading.js';

/**
 * VHeading - a token-driven, Lynx-compatible heading primitive.
 *
 * Renders a single Lynx `text` element (no DOM). Content comes from the
 * default slot or the `value` prop. `level` maps to a typography scale
 * (fontSize/fontWeight); `tone` and `align` map to colour and alignment.
 */
export const VHeading = defineComponent({
  name: 'VHeading',
  props: {
    value: { type: String, default: '' },
    level: { type: Number as PropType<HeadingLevel>, default: 2 },
    tone: { type: String as PropType<HeadingTone>, default: 'default' },
    align: { type: String as PropType<HeadingAlign>, default: 'left' }
  },
  setup(props, { slots }) {
    const theme = useTheme();
    const styles = computed(() =>
      resolveHeadingStyle(theme.value, {
        level: props.level,
        tone: props.tone,
        align: props.align
      })
    );

    return () =>
      h(
        'text',
        { class: 'v-heading', style: styles.value.text },
        slots.default ? slots.default() : props.value
      );
  }
});
