import { computed, defineComponent, h, type PropType } from 'vue';
import { useTheme } from '../theme.js';
import { resolveBadgeStyle, type BadgeTone } from '../styles.js';

/**
 * VBadge — a token-driven, Lynx-compatible status label.
 *
 * Renders `view` + `text` Lynx elements. Content comes from the default slot
 * or the `label` prop; colour is driven by the `tone` token role.
 */
export const VBadge = defineComponent({
  name: 'VBadge',
  props: {
    label: { type: String, default: '' },
    tone: { type: String as PropType<BadgeTone>, default: 'primary' }
  },
  setup(props, { slots }) {
    const theme = useTheme();
    const styles = computed(() => resolveBadgeStyle(theme.value, { tone: props.tone }));

    return () =>
      h(
        'view',
        { class: 'v-badge', style: styles.value.container },
        [h('text', { class: 'v-badge__label', style: styles.value.label }, slots.default ? slots.default() : props.label)]
      );
  }
});
