import { defineComponent, h, type PropType } from 'vue';
import { useTheme } from '../theme.js';
import { resolveTabBarStyle, resolveTabBarItemStyle } from '../styles/tabbar.js';

export interface TabBarItem {
  label: string;
  value: string | number;
  icon?: string;
}

/**
 * VTabBar - a token-driven, Lynx-compatible bottom tab bar.
 *
 * Renders a row `view` of tab `view`s (no DOM), each an optional `image` icon
 * above a `text` label. Uses `modelValue` / `update:modelValue` so JavaScript
 * consumers can bind with `v-model`, and also emits `change`. The active tab is
 * carried by the label colour/weight (Lynx image icons are not tintable).
 */
export const VTabBar = defineComponent({
  name: 'VTabBar',
  props: {
    modelValue: { type: [String, Number] as PropType<string | number>, default: '' },
    items: { type: Array as PropType<TabBarItem[]>, default: () => [] }
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
      const container = resolveTabBarStyle(theme.value).container;
      return h(
        'view',
        { class: 'v-tab-bar', style: container },
        props.items.map((item) => {
          const active = item.value === props.modelValue;
          const styles = resolveTabBarItemStyle(theme.value, { active });
          const select = () => onSelect(item.value);
          const children = [];
          if (item.icon) {
            children.push(h('image', { class: 'v-tab-bar__icon', style: styles.icon, src: item.icon, mode: 'aspectFit' }));
          }
          children.push(h('text', { class: 'v-tab-bar__label', style: styles.label }, item.label));
          return h('view', { key: item.value, class: 'v-tab-bar__item', style: styles.item, bindtap: select, onTap: select }, children);
        })
      );
    };
  }
});
