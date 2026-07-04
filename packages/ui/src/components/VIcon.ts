import { computed, defineComponent, h, type PropType } from 'vue';
import { useTheme } from '../theme.js';
import { resolveIconStyle, type IconSize } from '../styles/icon.js';

/**
 * VIcon - a token-sized, Lynx-compatible icon.
 *
 * Lynx has no font-icons, so VIcon renders a Lynx `image` from `src` (no DOM).
 * Consumers supply their own icon assets/URIs; colour is baked into the asset.
 * Size maps to fixed square dimensions.
 */
export const VIcon = defineComponent({
  name: 'VIcon',
  props: {
    src: { type: String, default: '' },
    size: { type: String as PropType<IconSize>, default: 'md' }
  },
  setup(props) {
    const theme = useTheme();
    const styles = computed(() => resolveIconStyle(theme.value, { size: props.size }));

    return () =>
      h('image', {
        class: 'v-icon',
        style: styles.value.image,
        src: props.src,
        mode: 'aspectFit'
      });
  }
});
