import { computed, defineComponent, h, type VNode } from 'vue';
import { useTheme } from '../theme.js';
import { resolveFormFieldStyle } from '../styles.js';

/**
 * VFormField - token-driven layout around a labelled control.
 *
 * Hosts the control via the default slot and renders an optional `label`,
 * `help` text, and `error` text. The `invalid` and `disabled` props drive the
 * visual state; `error` text is shown when the field is `invalid`.
 */
export const VFormField = defineComponent({
  name: 'VFormField',
  props: {
    label: { type: String, default: '' },
    help: { type: String, default: '' },
    error: { type: String, default: '' },
    invalid: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false }
  },
  setup(props, { slots }) {
    const theme = useTheme();
    const styles = computed(() =>
      resolveFormFieldStyle(theme.value, { invalid: props.invalid, disabled: props.disabled })
    );

    return () => {
      const children: VNode[] = [];

      if (props.label) {
        children.push(h('text', { class: 'v-form-field__label', style: styles.value.label }, props.label));
      }

      children.push(
        h('view', { class: 'v-form-field__control' }, slots.default ? slots.default() : [])
      );

      if (props.invalid && props.error) {
        children.push(h('text', { class: 'v-form-field__error', style: styles.value.error }, props.error));
      } else if (props.help) {
        children.push(h('text', { class: 'v-form-field__help', style: styles.value.help }, props.help));
      }

      return h('view', { class: 'v-form-field', style: styles.value.container }, children);
    };
  }
});
