import { computed, defineComponent, h } from 'vue';
import { useTheme } from '../theme.js';
import { resolveOverlayStyle } from '../styles/overlay.js';

/**
 * VBottomSheet - a token-driven, Lynx-compatible bottom sheet.
 *
 * Renders nothing while hidden. When `visible`, renders a `position: fixed`
 * backdrop `view` (no DOM, no portal) with a bottom-anchored panel `view`
 * hosting the default slot. Tapping the backdrop emits a close intent; taps on
 * the panel are caught (`catchtap`) so they do not close the sheet. Uses
 * `visible` / `update:visible` for `v-model:visible`.
 */
export const VBottomSheet = defineComponent({
  name: 'VBottomSheet',
  props: {
    visible: { type: Boolean, default: false }
  },
  emits: ['update:visible', 'close'],
  setup(props, { emit, slots }) {
    const theme = useTheme();
    const styles = computed(() => resolveOverlayStyle(theme.value, { placement: 'bottom' }));

    const onClose = () => {
      emit('update:visible', false);
      emit('close');
    };

    return () => {
      if (!props.visible) return null;
      return h('view', { class: 'v-bottom-sheet', style: styles.value.backdrop, bindtap: onClose, onTap: onClose }, [
        h(
          'view',
          { class: 'v-bottom-sheet__panel', style: styles.value.panel, catchtap: () => {} },
          slots.default ? slots.default() : []
        )
      ]);
    };
  }
});
