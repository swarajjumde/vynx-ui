import { computed, defineComponent, h, ref, type PropType } from 'vue';
import { useTheme } from '../theme.js';
import { resolveSelectStyle, resolveSelectOptionStyle } from '../styles/select.js';
import { resolveOverlayStyle } from '../styles/overlay.js';

export interface SelectItem {
  label: string;
  value: string | number;
}

/**
 * VSelect - a token-driven, Lynx-compatible select, implemented as a trigger
 * that opens a bottom-sheet picker overlay (see docs/decisions/overlays.md).
 *
 * Renders a trigger `view` (no DOM) showing the selected option's label (or
 * `placeholder`) and a chevron `text`. Tapping the trigger opens a
 * `position: fixed` backdrop + panel listing one option row per item; tapping
 * an option emits `update:modelValue` + `change` and closes the picker.
 * Tapping the backdrop closes without selecting. Uses `modelValue` /
 * `update:modelValue` so JavaScript consumers can bind with `v-model`.
 */
export const VSelect = defineComponent({
  name: 'VSelect',
  props: {
    modelValue: { type: [String, Number] as PropType<string | number>, default: '' },
    options: { type: Array as PropType<SelectItem[]>, default: () => [] },
    placeholder: { type: String, default: 'Select' },
    invalid: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false }
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { emit }) {
    const theme = useTheme();
    const open = ref(false);

    const selectedOption = computed(() => props.options.find((option) => option.value === props.modelValue));

    const triggerStyles = computed(() =>
      resolveSelectStyle(theme.value, {
        invalid: props.invalid,
        disabled: props.disabled,
        placeholder: !selectedOption.value
      })
    );

    const overlayStyles = computed(() => resolveOverlayStyle(theme.value, { placement: 'bottom' }));

    const onOpen = () => {
      if (props.disabled) return;
      open.value = true;
    };

    const onClose = () => {
      open.value = false;
    };

    const onSelect = (value: string | number) => {
      emit('update:modelValue', value);
      emit('change', value);
      open.value = false;
    };

    return () => {
      const trigger = h(
        'view',
        { class: 'v-select__trigger', style: triggerStyles.value.trigger, bindtap: onOpen, onTap: onOpen },
        [
          h(
            'text',
            { class: 'v-select__trigger-label', style: triggerStyles.value.triggerLabel },
            selectedOption.value ? selectedOption.value.label : props.placeholder
          ),
          h('text', { class: 'v-select__icon', style: triggerStyles.value.icon }, '▾')
        ]
      );

      const rootChildren = [trigger];

      if (open.value) {
        const rows = props.options.map((option) => {
          const selected = option.value === props.modelValue;
          const optionStyles = resolveSelectOptionStyle(theme.value, { selected });
          const select = () => onSelect(option.value);
          return h(
            'view',
            { key: option.value, class: 'v-select__row', style: optionStyles.row, bindtap: select, onTap: select },
            [
              h('text', { class: 'v-select__row-label', style: optionStyles.label }, option.label),
              h('text', { class: 'v-select__row-check', style: optionStyles.check }, '✓')
            ]
          );
        });

        rootChildren.push(
          h(
            'view',
            { class: 'v-select__backdrop', style: overlayStyles.value.backdrop, bindtap: onClose, onTap: onClose },
            [h('view', { class: 'v-select__panel', style: overlayStyles.value.panel, catchtap: () => {} }, rows)]
          )
        );
      }

      return h('view', { class: 'v-select' }, rootChildren);
    };
  }
});
