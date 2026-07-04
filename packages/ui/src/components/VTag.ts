import { computed, defineComponent, h, type PropType } from 'vue';
import { useTheme } from '../theme.js';
import { resolveTagStyle, type TagTone, type TagVariant } from '../styles/tag.js';

/**
 * VTag - a token-driven, Lynx-compatible label with a solid/outline variant.
 *
 * Renders `view` + `text` Lynx elements. Content comes from the default slot
 * or the `label` prop; colour is driven by the `tone` token role and the
 * `variant` prop switches between a filled and an outlined treatment.
 */
export const VTag = defineComponent({
  name: 'VTag',
  props: {
    label: { type: String, default: '' },
    tone: { type: String as PropType<TagTone>, default: 'primary' },
    variant: { type: String as PropType<TagVariant>, default: 'solid' }
  },
  setup(props, { slots }) {
    const theme = useTheme();
    const styles = computed(() => resolveTagStyle(theme.value, { tone: props.tone, variant: props.variant }));

    return () =>
      h(
        'view',
        { class: 'v-tag', style: styles.value.container },
        [h('text', { class: 'v-tag__label', style: styles.value.label }, slots.default ? slots.default() : props.label)]
      );
  }
});
