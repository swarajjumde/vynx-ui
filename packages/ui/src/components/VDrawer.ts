import { computed, defineComponent, h, type PropType } from 'vue';
import { useTheme } from '../theme.js';
import { resolveOverlayStyle, type OverlayPlacement } from '../styles/overlay.js';

/**
 * VDrawer - a token-driven, Lynx-compatible side panel.
 *
 * Renders nothing while hidden. When `visible`, renders a `position: fixed`
 * backdrop `view` (no DOM, no portal) with a full-height panel `view` anchored
 * to `side` ('left' | 'right') hosting the default slot. Tapping the backdrop
 * emits a close intent; taps on the panel are caught. Uses `visible` /
 * `update:visible` for `v-model:visible`.
 */
export const VDrawer = defineComponent({
  name: 'VDrawer',
  props: {
    visible: { type: Boolean, default: false },
    side: { type: String as PropType<'left' | 'right'>, default: 'left' }
  },
  emits: ['update:visible', 'close'],
  setup(props, { emit, slots }) {
    const theme = useTheme();
    const styles = computed(() =>
      resolveOverlayStyle(theme.value, { placement: props.side as OverlayPlacement })
    );

    const onClose = () => {
      emit('update:visible', false);
      emit('close');
    };

    return () => {
      if (!props.visible) return null;
      return h('view', { class: 'v-drawer', style: styles.value.backdrop, bindtap: onClose, onTap: onClose }, [
        h(
          'view',
          { class: 'v-drawer__panel', style: styles.value.panel, catchtap: () => {} },
          slots.default ? slots.default() : []
        )
      ]);
    };
  }
});
