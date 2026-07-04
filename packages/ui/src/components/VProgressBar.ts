import { computed, defineComponent, h, type PropType } from 'vue';
import { useTheme } from '../theme.js';
import { resolveProgressStyle, type ProgressTone } from '../styles/progress.js';

/**
 * VProgressBar - a token-driven, Lynx-compatible progress indicator.
 *
 * Renders a track `view` containing a fill `view`. The `value` prop (0..100)
 * is clamped by the resolver; colour is driven by the `tone` token role.
 */
export const VProgressBar = defineComponent({
  name: 'VProgressBar',
  props: {
    value: { type: Number, default: 0 },
    tone: { type: String as PropType<ProgressTone>, default: 'primary' }
  },
  setup(props) {
    const theme = useTheme();
    const styles = computed(() => resolveProgressStyle(theme.value, { value: props.value, tone: props.tone }));

    return () =>
      h('view', { class: 'v-progress-bar', style: styles.value.track }, [
        h('view', { class: 'v-progress-bar__fill', style: styles.value.fill })
      ]);
  }
});
