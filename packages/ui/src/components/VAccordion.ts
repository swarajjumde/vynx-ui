import { computed, defineComponent, h } from 'vue';
import { useTheme } from '../theme.js';
import { resolveAccordionStyle } from '../styles/accordion.js';

/**
 * VAccordion - a token-driven, Lynx-compatible single collapsible section.
 *
 * Renders a `view` container (no DOM) with a header `view` (a `text` label and
 * a `text` chevron glyph) and, while `open`, a content `view` hosting the
 * default slot. Uses `open` / `update:open` so JavaScript consumers can bind
 * with `v-model:open`, and also emits `toggle`. Tapping the header toggles.
 */
export const VAccordion = defineComponent({
  name: 'VAccordion',
  props: {
    label: { type: String, default: '' },
    open: { type: Boolean, default: false }
  },
  emits: ['update:open', 'toggle'],
  setup(props, { emit, slots }) {
    const theme = useTheme();
    const styles = computed(() => resolveAccordionStyle(theme.value, { open: props.open }));

    const onToggle = () => {
      const next = !props.open;
      emit('update:open', next);
      emit('toggle', next);
    };

    return () => {
      const children = [
        h(
          'view',
          { class: 'v-accordion__header', style: styles.value.header, bindtap: onToggle, onTap: onToggle },
          [
            h('text', { class: 'v-accordion__label', style: styles.value.label }, props.label),
            h('text', { class: 'v-accordion__icon', style: styles.value.icon }, props.open ? '▾' : '▸')
          ]
        )
      ];

      if (props.open) {
        children.push(
          h(
            'view',
            { class: 'v-accordion__content', style: styles.value.content },
            slots.default ? slots.default() : []
          )
        );
      }

      return h('view', { class: 'v-accordion', style: styles.value.container }, children);
    };
  }
});
