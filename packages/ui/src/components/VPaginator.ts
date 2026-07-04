import { computed, defineComponent, h } from 'vue';
import { useTheme } from '../theme.js';
import { resolvePaginatorStyle, resolvePaginatorButtonStyle } from '../styles/paginator.js';

/**
 * VPaginator - a token-driven, Lynx-compatible pager.
 *
 * Renders a row `view` (no DOM) of a Prev `view` button, a "Page X of Y" `text`,
 * and a Next `view` button. Uses `modelValue` / `update:modelValue` (the current
 * 1-based page) so JavaScript consumers can bind with `v-model`, and also emits
 * `change`. Prev/Next clamp to `[1, total]` and no-op at the bounds.
 */
export const VPaginator = defineComponent({
  name: 'VPaginator',
  props: {
    modelValue: { type: Number, default: 1 },
    total: { type: Number, default: 1 }
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { emit }) {
    const theme = useTheme();
    const atStart = computed(() => props.modelValue <= 1);
    const atEnd = computed(() => props.modelValue >= props.total);

    const go = (page: number) => {
      const next = Math.min(props.total, Math.max(1, page));
      if (next === props.modelValue) return;
      emit('update:modelValue', next);
      emit('change', next);
    };

    return () => {
      const base = resolvePaginatorStyle(theme.value);
      const prev = resolvePaginatorButtonStyle(theme.value, { disabled: atStart.value });
      const next = resolvePaginatorButtonStyle(theme.value, { disabled: atEnd.value });
      const onPrev = () => { if (!atStart.value) go(props.modelValue - 1); };
      const onNext = () => { if (!atEnd.value) go(props.modelValue + 1); };

      return h('view', { class: 'v-paginator', style: base.container }, [
        h('view', { class: 'v-paginator__prev', style: prev.button, bindtap: onPrev, onTap: onPrev }, [
          h('text', { style: prev.label }, 'Prev')
        ]),
        h('text', { class: 'v-paginator__info', style: base.info }, `Page ${props.modelValue} of ${props.total}`),
        h('view', { class: 'v-paginator__next', style: next.button, bindtap: onNext, onTap: onNext }, [
          h('text', { style: next.label }, 'Next')
        ])
      ]);
    };
  }
});
