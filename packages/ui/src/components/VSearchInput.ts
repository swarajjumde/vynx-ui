import { computed, defineComponent, h, type PropType } from 'vue';
import { useTheme } from '../theme.js';
import { resolveSearchInputStyle } from '../styles/search.js';
import type { ControlSize } from '../styles/kit.js';
import { readInputValue } from './event.js';

/**
 * VSearchInput - a token-driven, Lynx-compatible text input with a clear affordance.
 *
 * Renders a row `view` containing an `input` and, when there is a value, a
 * `text` clear control (no DOM). Uses `modelValue` / `update:modelValue` so
 * JavaScript consumers can bind with `v-model`, and also emits `input` /
 * `clear`. Mutations are ignored while `disabled`.
 */
export const VSearchInput = defineComponent({
  name: 'VSearchInput',
  props: {
    modelValue: { type: String, default: '' },
    placeholder: { type: String, default: '' },
    size: { type: String as PropType<ControlSize>, default: 'md' },
    disabled: { type: Boolean, default: false }
  },
  emits: ['update:modelValue', 'input', 'clear'],
  setup(props, { emit }) {
    const theme = useTheme();
    const styles = computed(() =>
      resolveSearchInputStyle(theme.value, { size: props.size, disabled: props.disabled })
    );

    const onInput = (event: unknown) => {
      if (props.disabled) return;
      const value = readInputValue(event);
      emit('update:modelValue', value);
      emit('input', value);
    };

    const onClear = () => {
      if (props.disabled) return;
      emit('update:modelValue', '');
      emit('clear');
    };

    return () => {
      const children = [
        h('input', {
          class: 'v-search-input__input',
          style: styles.value.input,
          value: props.modelValue,
          placeholder: props.placeholder,
          disabled: props.disabled,
          bindinput: onInput,
          onInput
        })
      ];

      if (props.modelValue) {
        children.push(
          h('text', { class: 'v-search-input__clear', style: styles.value.clear, bindtap: onClear, onTap: onClear }, '×')
        );
      }

      return h('view', { class: 'v-search-input', style: styles.value.container }, children);
    };
  }
});
