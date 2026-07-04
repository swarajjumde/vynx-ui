import { computed, defineComponent, h, type VNode } from 'vue';
import { useTheme } from '../theme.js';
import { resolveToggleStyle } from '../styles.js';

/**
 * VSwitch - a token-driven, Lynx-compatible boolean control.
 *
 * Renders `view` + `text` Lynx elements (no DOM) as a track and thumb, toggling
 * on tap. Uses `checked` / `update:checked` so JavaScript consumers can bind
 * with `v-model:checked`, and also emits `change`. Taps are ignored while
 * `disabled`.
 */
export const VSwitch = defineComponent({
  name: 'VSwitch',
  props: {
    checked: { type: Boolean, default: false },
    label: { type: String, default: '' },
    disabled: { type: Boolean, default: false },
    invalid: { type: Boolean, default: false }
  },
  emits: ['update:checked', 'change'],
  setup(props, { emit, slots }) {
    const theme = useTheme();
    const styles = computed(() =>
      resolveToggleStyle(theme.value, {
        variant: 'switch',
        checked: props.checked,
        invalid: props.invalid,
        disabled: props.disabled
      })
    );

    const onTap = () => {
      if (props.disabled) return;
      const next = !props.checked;
      emit('update:checked', next);
      emit('change', next);
    };

    return () => {
      const children: VNode[] = [
        h('view', { class: 'v-switch__track', style: styles.value.control }, [
          h('view', { class: 'v-switch__thumb', style: styles.value.indicator })
        ])
      ];

      if (slots.default || props.label) {
        children.push(
          h(
            'text',
            { class: 'v-switch__label', style: styles.value.label },
            slots.default ? slots.default() : props.label
          )
        );
      }

      return h('view', { class: 'v-switch', style: styles.value.container, bindtap: onTap }, children);
    };
  }
});
