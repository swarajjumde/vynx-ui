import { computed, defineComponent, h, type PropType } from 'vue';
import { useTheme } from '../theme.js';
import { resolveSelectButtonOptionStyle, resolveSelectButtonStyle } from '../styles/selectbutton.js';

export interface SelectOption {
  label: string;
  value: string | number;
}

/**
 * VSelectButton - a token-driven, Lynx-compatible segmented single-select control.
 *
 * Renders a row `view` of segment `view`s (no DOM), each containing a `text`
 * label. Uses `modelValue` / `update:modelValue` so JavaScript consumers can
 * bind with `v-model`, and also emits `change`. Selection is suppressed while
 * `disabled`.
 */
export const VSelectButton = defineComponent({
  name: 'VSelectButton',
  props: {
    modelValue: { type: [String, Number] as PropType<string | number>, default: '' },
    options: { type: Array as PropType<SelectOption[]>, default: () => [] },
    disabled: { type: Boolean, default: false }
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { emit }) {
    const theme = useTheme();
    const containerStyle = computed(() => resolveSelectButtonStyle(theme.value, { disabled: props.disabled }));

    const onSelect = (value: string | number) => {
      if (props.disabled || value === props.modelValue) return;
      emit('update:modelValue', value);
      emit('change', value);
    };

    return () =>
      h(
        'view',
        { class: 'v-select-button', style: containerStyle.value.container },
        props.options.map((option) => {
          const selected = option.value === props.modelValue;
          const styles = resolveSelectButtonOptionStyle(theme.value, { selected });
          const select = () => onSelect(option.value);
          return h(
            'view',
            {
              key: option.value,
              class: 'v-select-button__segment',
              style: styles.segment,
              bindtap: select,
              onTap: select
            },
            [h('text', { class: 'v-select-button__label', style: styles.label }, option.label)]
          );
        })
      );
  }
});
