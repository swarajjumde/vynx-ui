import { computed, defineComponent, h, type PropType } from 'vue';
import { useTheme } from '../theme.js';
import { resolveInputStyle, type ControlSize } from '../styles.js';
import { readInputValue } from './event.js';

/**
 * VTextarea - a token-driven, Lynx-compatible multi-line text control.
 *
 * Renders a Lynx `textarea` element (no DOM). Uses `modelValue` /
 * `update:modelValue` so JavaScript consumers can bind with `v-model`, and also
 * emits `input` on user intent. Updates are suppressed while `disabled`.
 */
export const VTextarea = defineComponent({
  name: 'VTextarea',
  props: {
    modelValue: { type: String, default: '' },
    placeholder: { type: String, default: '' },
    rows: { type: Number, default: 3 },
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
    const visibleRows = computed(() => Math.max(1, Math.floor(props.rows)));
    const rowHeight = computed(() => {
      const fontSize = styles.value.container.fontSize;
      const lineHeight = Number(theme.value.typography.lineHeight.normal);

      if (typeof fontSize === 'string' && fontSize.endsWith('px') && Number.isFinite(lineHeight)) {
        return Number(fontSize.slice(0, -2)) * lineHeight;
      }

      return 24;
    });
    // Lynx's web `x-textarea` custom element is `display: contents`, and its
    // inner control inherits `width`/`height` from this element. A bare
    // `minHeight` therefore produces no box and leaves the field unclickable in
    // the web preview, so we set concrete inherited dimensions instead: full
    // width plus a `rows`-derived pixel height.
    const textareaStyle = computed(() => ({
      ...styles.value.container,
      lineHeight: theme.value.typography.lineHeight.normal,
      boxSizing: 'border-box',
      width: '100%',
      height: `${Math.ceil(visibleRows.value * rowHeight.value)}px`
    }));

    const onInput = (event: unknown) => {
      if (props.disabled) return;
      const value = readInputValue(event);
      emit('update:modelValue', value);
      emit('input', value);
    };

    return () =>
      h('textarea', {
        class: 'v-textarea',
        style: textareaStyle.value,
        value: props.modelValue,
        placeholder: props.placeholder,
        maxlines: visibleRows.value,
        disabled: props.disabled,
        bindinput: onInput,
        onInput
      });
  }
});
