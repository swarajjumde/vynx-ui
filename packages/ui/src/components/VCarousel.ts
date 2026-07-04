import { computed, defineComponent, h, type PropType } from 'vue';
import { useTheme } from '../theme.js';
import { resolveCarouselStyle } from '../styles/carousel.js';

/**
 * VCarousel - a token-driven, Lynx-compatible horizontal paged carousel.
 *
 * Renders a Lynx `scroll-view` (no DOM) with `scroll-orientation: horizontal`,
 * hosting one slide `view` per item, each populated via the scoped `slide`
 * slot (`{ item, index }`). Display-only: emits no events.
 */
export const VCarousel = defineComponent({
  name: 'VCarousel',
  props: {
    items: { type: Array as PropType<unknown[]>, default: () => [] },
    slideWidth: { type: String, default: '280px' }
  },
  setup(props, { slots }) {
    const theme = useTheme();
    const styles = computed(() => resolveCarouselStyle(theme.value, { slideWidth: props.slideWidth }));

    return () =>
      h(
        'scroll-view',
        {
          class: 'v-carousel',
          style: styles.value.container,
          'scroll-orientation': 'horizontal'
        },
        props.items.map((item, index) => {
          const slideChildren = slots.slide ? slots.slide({ item, index }) : [h('text', {}, String(item))];
          return h('view', { key: index, class: 'v-carousel__slide', style: styles.value.slide }, slideChildren);
        })
      );
  }
});
