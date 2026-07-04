import { computed, defineComponent, h, type PropType } from 'vue';
import { useTheme } from '../theme.js';
import { resolveRadioGroupStyle, resolveRadioOptionStyle } from '../styles/radio.js';

export interface RadioOption {
  label: string;
  value: string | number;
}

/**
 * VRadioGroup - a token-driven, Lynx-compatible single-select control.
 *
 * Renders a column of `view` rows (no DOM), each a circle `view` with an inner
 * dot plus a `text` label. Uses `modelValue` / `update:modelValue` so JavaScript
 * consumers bind with `v-model`, and also emits `change`. Selection is
 * suppressed while `disabled`.
 */
export const VRadioGroup = defineComponent({
  name: 'VRadioGroup',
  props: {
    modelValue: { type: [String, Number] as PropType<string | number>, default: '' },
    options: { type: Array as PropType<RadioOption[]>, default: () => [] },
    disabled: { type: Boolean, default: false }
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { emit }) {
    const theme = useTheme();
    const groupStyle = computed(() => resolveRadioGroupStyle(theme.value, { disabled: props.disabled }));

    const onSelect = (value: string | number) => {
      if (props.disabled || value === props.modelValue) return;
      emit('update:modelValue', value);
      emit('change', value);
    };

    return () =>
      h(
        'view',
        { class: 'v-radio-group', style: groupStyle.value.container },
        props.options.map((option) => {
          const selected = option.value === props.modelValue;
          const styles = resolveRadioOptionStyle(theme.value, { selected, disabled: props.disabled });
          const select = () => onSelect(option.value);
          return h(
            'view',
            { key: option.value, class: 'v-radio', style: styles.row, bindtap: select, onTap: select },
            [
              h('view', { class: 'v-radio__control', style: styles.control }, [
                h('view', { class: 'v-radio__indicator', style: styles.indicator })
              ]),
              h('text', { class: 'v-radio__label', style: styles.label }, option.label)
            ]
          );
        })
      );
  }
});
