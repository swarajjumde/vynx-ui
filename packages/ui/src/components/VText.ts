import { computed, defineComponent, h, type PropType } from 'vue';
import { useTheme } from '../theme.js';
import {
  resolveTextStyle,
  type TextAlign,
  type TextSize,
  type TextTone,
  type TextWeight
} from '../styles/text.js';

/**
 * VText - a token-driven, Lynx-compatible typography primitive.
 *
 * Renders a single Lynx `text` element (no DOM). Content comes from the default
 * slot or the `value` prop. Size, tone, weight and alignment map to typography
 * and colour tokens.
 */
export const VText = defineComponent({
  name: 'VText',
  props: {
    value: { type: String, default: '' },
    size: { type: String as PropType<TextSize>, default: 'md' },
    tone: { type: String as PropType<TextTone>, default: 'default' },
    weight: { type: String as PropType<TextWeight>, default: 'regular' },
    align: { type: String as PropType<TextAlign>, default: 'left' }
  },
  setup(props, { slots }) {
    const theme = useTheme();
    const styles = computed(() =>
      resolveTextStyle(theme.value, {
        size: props.size,
        tone: props.tone,
        weight: props.weight,
        align: props.align
      })
    );

    return () =>
      h(
        'text',
        { class: 'v-text', style: styles.value.text },
        slots.default ? slots.default() : props.value
      );
  }
});
