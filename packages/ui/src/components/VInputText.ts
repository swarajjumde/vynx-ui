import { computed, defineComponent, h, type PropType } from 'vue';
import { useTheme } from '../theme.js';
import { resolveInputStyle, type ControlSize } from '../styles.js';
import { readInputValue } from './event.js';

/**
 * VInputText - a token-driven, Lynx-compatible single-line text control.
 *
 * Renders a Lynx `input` element (no DOM). Uses `modelValue` /
 * `update:modelValue` so JavaScript consumers can bind with `v-model`, and also
 * emits `input` on user intent. Updates are suppressed while `disabled`.
 */
export const VInputText = defineComponent({
  name: 'VInputText',
  props: {
    modelValue: { type: String, default: '' },
    placeholder: { type: String, default: '' },
    size: { type: String as PropType<ControlSize>, default: 'md' },
    disabled: { type: Boolean, default: false },
    invalid: { type: Boolean, default: false }
  },
  emits: ['update:modelValue', 'input'],
  setup(props, { emit }) {
    const theme = useTheme();
    const styles = computed(() =>
      resolveInputStyle(theme.value, { size: props.size, invalid: props.invalid, disabled: props.disabled })
    );

    const onInput = (event: unknown) => {
      if (props.disabled) return;
      const value = readInputValue(event);
      emit('update:modelValue', value);
      emit('input', value);
    };

    return () =>
      h('input', {
        class: 'v-input-text',
        style: styles.value.container,
        value: props.modelValue,
        placeholder: props.placeholder,
        disabled: props.disabled,
        bindinput: onInput
      });
  }
});
