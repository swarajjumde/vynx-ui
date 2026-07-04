import { computed, defineComponent, h } from 'vue';
import { useTheme } from '../theme.js';
import { resolveRatingStarStyle, resolveRatingStyle } from '../styles/rating.js';

/**
 * VRating - a token-driven, Lynx-compatible row of tappable rating stars.
 *
 * Renders a row `view` of `text` glyphs (no DOM). Uses `modelValue` /
 * `update:modelValue` so JavaScript consumers can bind with `v-model`, and
 * also emits `change`. Taps are ignored while `disabled`.
 */
export const VRating = defineComponent({
  name: 'VRating',
  props: {
    modelValue: { type: Number, default: 0 },
    max: { type: Number, default: 5 },
    disabled: { type: Boolean, default: false }
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { emit }) {
    const theme = useTheme();
    const containerStyle = computed(() => resolveRatingStyle(theme.value, { disabled: props.disabled }));

    const onSelect = (value: number) => {
      if (props.disabled) return;
      emit('update:modelValue', value);
      emit('change', value);
    };

    return () => {
      const stars = [];
      for (let i = 1; i <= props.max; i += 1) {
        const filled = i <= props.modelValue;
        const styles = resolveRatingStarStyle(theme.value, { filled });
        const select = () => onSelect(i);
        stars.push(
          h(
            'text',
            { key: i, class: 'v-rating__star', style: styles.star, bindtap: select, onTap: select },
            filled ? '★' : '☆'
          )
        );
      }
      return h('view', { class: 'v-rating', style: containerStyle.value.container }, stars);
    };
  }
});
