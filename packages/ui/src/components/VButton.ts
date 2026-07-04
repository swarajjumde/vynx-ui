import { computed, defineComponent, h, type PropType } from 'vue';
import { useTheme } from '../theme.js';
import { resolveButtonStyle, type ButtonTone, type ButtonVariant, type ControlSize } from '../styles.js';

/**
 * VButton — a token-driven, Lynx-compatible button.
 *
 * Renders `view` + `text` Lynx elements (no DOM). Emits `tap` on press unless
 * disabled. Content comes from the default slot or the `label` prop.
 */
export const VButton = defineComponent({
  name: 'VButton',
  props: {
    label: { type: String, default: '' },
    variant: { type: String as PropType<ButtonVariant>, default: 'solid' },
    tone: { type: String as PropType<ButtonTone>, default: 'primary' },
    size: { type: String as PropType<ControlSize>, default: 'md' },
    disabled: { type: Boolean, default: false }
  },
  emits: ['tap'],
  setup(props, { emit, slots }) {
    const theme = useTheme();
    const styles = computed(() =>
      resolveButtonStyle(theme.value, {
        variant: props.variant,
        tone: props.tone,
        size: props.size,
        disabled: props.disabled
      })
    );

    const onTap = () => {
      if (!props.disabled) emit('tap');
    };

    return () =>
      h(
        'view',
        { class: 'v-button', style: styles.value.container, bindtap: onTap },
        [h('text', { class: 'v-button__label', style: styles.value.label }, slots.default ? slots.default() : props.label)]
      );
  }
});
