import { computed, defineComponent, h, type PropType } from 'vue';
import { useTheme } from '../theme.js';
import { resolveInputNumberStyle } from '../styles/inputnumber.js';
import type { ControlSize } from '../styles/kit.js';

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

/**
 * VInputNumber - a token-driven, Lynx-compatible numeric stepper.
 *
 * Renders a row `view` of `view` (decrement) + `text` (value) + `view`
 * (increment) Lynx elements (no DOM). Uses `modelValue` / `update:modelValue`
 * so JavaScript consumers can bind with `v-model`, and also emits `change`.
 * Steps clamp to `[min, max]` and are ignored while `disabled`.
 */
export const VInputNumber = defineComponent({
  name: 'VInputNumber',
  props: {
    modelValue: { type: Number, default: 0 },
    step: { type: Number, default: 1 },
    min: { type: Number, default: Number.NEGATIVE_INFINITY },
    max: { type: Number, default: Number.POSITIVE_INFINITY },
    size: { type: String as PropType<ControlSize>, default: 'md' },
    invalid: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false }
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { emit }) {
    const theme = useTheme();
    const styles = computed(() =>
      resolveInputNumberStyle(theme.value, { size: props.size, invalid: props.invalid, disabled: props.disabled })
    );

    const step = (delta: number) => {
      if (props.disabled) return;
      const next = clamp(props.modelValue + delta, props.min, props.max);
      if (next === props.modelValue) return;
      emit('update:modelValue', next);
      emit('change', next);
    };

    const onDecrement = () => step(-props.step);
    const onIncrement = () => step(props.step);

    return () =>
      h(
        'view',
        { class: 'v-input-number', style: styles.value.container },
        [
          h(
            'view',
            {
              class: 'v-input-number__button v-input-number__button--decrement',
              style: styles.value.button,
              bindtap: onDecrement,
              onTap: onDecrement
            },
            [h('text', { class: 'v-input-number__button-label', style: styles.value.buttonLabel }, '−')]
          ),
          h('text', { class: 'v-input-number__value', style: styles.value.value }, String(props.modelValue)),
          h(
            'view',
            {
              class: 'v-input-number__button v-input-number__button--increment',
              style: styles.value.button,
              bindtap: onIncrement,
              onTap: onIncrement
            },
            [h('text', { class: 'v-input-number__button-label', style: styles.value.buttonLabel }, '+')]
          )
        ]
      );
  }
});
