import { computed, defineComponent, h, type PropType } from 'vue';
import { useTheme } from '../theme.js';
import { resolveToggleButtonStyle } from '../styles/togglebutton.js';
import type { ControlSize } from '../styles/kit.js';

/**
 * VToggleButton - a token-driven, Lynx-compatible pressed on/off button.
 *
 * Renders `view` + `text` Lynx elements (no DOM). Uses `modelValue` /
 * `update:modelValue` so JavaScript consumers can bind with `v-model`, and
 * also emits `change`. Taps are ignored while `disabled`.
 */
export const VToggleButton = defineComponent({
  name: 'VToggleButton',
  props: {
    modelValue: { type: Boolean, default: false },
    label: { type: String, default: '' },
    size: { type: String as PropType<ControlSize>, default: 'md' },
    disabled: { type: Boolean, default: false }
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { emit, slots }) {
    const theme = useTheme();
    const styles = computed(() =>
      resolveToggleButtonStyle(theme.value, { pressed: props.modelValue, size: props.size, disabled: props.disabled })
    );

    const onTap = () => {
      if (props.disabled) return;
      const next = !props.modelValue;
      emit('update:modelValue', next);
      emit('change', next);
    };

    return () =>
      h(
        'view',
        { class: 'v-toggle-button', style: styles.value.container, bindtap: onTap, onTap },
        [
          h(
            'text',
            { class: 'v-toggle-button__label', style: styles.value.label },
            slots.default ? slots.default() : props.label
          )
        ]
      );
  }
});
