import { computed, defineComponent, h, type PropType } from 'vue';
import { useTheme } from '../theme.js';
import { resolveAvatarStyle, type AvatarTone } from '../styles/avatar.js';
import type { ControlSize } from '../styles/kit.js';

/**
 * VAvatar - a token-driven, Lynx-compatible avatar.
 *
 * Renders a Lynx `image` when `src` is provided, otherwise a circular `view`
 * with the `label` initials as `text` (no DOM). Size maps to fixed dimensions;
 * tone maps to colour tokens.
 */
export const VAvatar = defineComponent({
  name: 'VAvatar',
  props: {
    label: { type: String, default: '' },
    src: { type: String, default: '' },
    size: { type: String as PropType<ControlSize>, default: 'md' },
    tone: { type: String as PropType<AvatarTone>, default: 'primary' }
  },
  setup(props) {
    const theme = useTheme();
    const styles = computed(() => resolveAvatarStyle(theme.value, { size: props.size, tone: props.tone }));

    return () => {
      if (props.src) {
        return h('image', {
          class: 'v-avatar v-avatar--image',
          style: styles.value.image,
          src: props.src,
          mode: 'aspectFill'
        });
      }
      return h('view', { class: 'v-avatar', style: styles.value.container }, [
        h('text', { class: 'v-avatar__label', style: styles.value.label }, props.label)
      ]);
    };
  }
});
