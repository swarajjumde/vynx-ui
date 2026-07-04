import { defineComponent, h, type PropType } from 'vue';
import { useTheme } from '../theme.js';
import { resolveTabsStyle, resolveTabItemStyle } from '../styles/tabs.js';

export interface TabItem {
  label: string;
  value: string | number;
}

/**
 * VTabs - a token-driven, Lynx-compatible top tab switcher (underline style).
 *
 * Renders a row `view` of tab `view`s (no DOM), each containing a `text`
 * label. Uses `modelValue` / `update:modelValue` so JavaScript consumers can
 * bind with `v-model`, and also emits `change`. The active tab is carried by
 * an underline (`borderBottomColor`) plus the label colour/weight.
 */
export const VTabs = defineComponent({
  name: 'VTabs',
  props: {
    modelValue: { type: [String, Number] as PropType<string | number>, default: '' },
    items: { type: Array as PropType<TabItem[]>, default: () => [] }
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { emit }) {
    const theme = useTheme();

    const onSelect = (value: string | number) => {
      if (value === props.modelValue) return;
      emit('update:modelValue', value);
      emit('change', value);
    };

    return () => {
      const container = resolveTabsStyle(theme.value).container;
      return h(
        'view',
        { class: 'v-tabs', style: container },
        props.items.map((item) => {
          const active = item.value === props.modelValue;
          const styles = resolveTabItemStyle(theme.value, { active });
          const select = () => onSelect(item.value);
          return h(
            'view',
            { key: item.value, class: 'v-tabs__tab', style: styles.tab, bindtap: select, onTap: select },
            [h('text', { class: 'v-tabs__label', style: styles.label }, item.label)]
          );
        })
      );
    };
  }
});
