import { computed, defineComponent, h, type PropType } from 'vue';
import { useTheme } from '../theme.js';
import { resolveSkeletonStyle, type SkeletonRounded } from '../styles/skeleton.js';

/**
 * VSkeleton - a token-driven, Lynx-compatible loading placeholder.
 *
 * Renders a single `view` sized by the `width`/`height` props, muted with the
 * `neutral` token, and rounded per the `rounded` prop.
 */
export const VSkeleton = defineComponent({
  name: 'VSkeleton',
  props: {
    width: { type: String, default: '100%' },
    height: { type: String, default: '16px' },
    rounded: { type: String as PropType<SkeletonRounded>, default: 'md' }
  },
  setup(props) {
    const theme = useTheme();
    const styles = computed(() =>
      resolveSkeletonStyle(theme.value, { width: props.width, height: props.height, rounded: props.rounded })
    );

    return () => h('view', { class: 'v-skeleton', style: styles.value.container });
  }
});
