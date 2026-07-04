import { computed, defineComponent, h } from 'vue';
import { useTheme } from '../theme.js';
import { resolveOverlayStyle } from '../styles/overlay.js';
import { resolveTextStyle } from '../styles/text.js';

/**
 * VDialog - a token-driven, Lynx-compatible centered modal dialog.
 *
 * Renders nothing while hidden. When `visible`, renders a `position: fixed`
 * backdrop `view` (no DOM, no portal) with a centered panel `view` hosting an
 * optional `title` (`text`) plus the default slot. Tapping the backdrop emits a
 * close intent; taps on the panel are caught. Uses `visible` / `update:visible`.
 */
export const VDialog = defineComponent({
  name: 'VDialog',
  props: {
    visible: { type: Boolean, default: false },
    title: { type: String, default: '' }
  },
  emits: ['update:visible', 'close'],
  setup(props, { emit, slots }) {
    const theme = useTheme();
    const styles = computed(() => resolveOverlayStyle(theme.value, { placement: 'center' }));
    const titleStyle = computed(() => resolveTextStyle(theme.value, { size: 'lg', weight: 'semibold' }));

    const onClose = () => {
      emit('update:visible', false);
      emit('close');
    };

    return () => {
      if (!props.visible) return null;
      const panelChildren = [];
      if (props.title) {
        panelChildren.push(h('text', { class: 'v-dialog__title', style: titleStyle.value.text }, props.title));
      }
      if (slots.default) panelChildren.push(...slots.default());

      return h('view', { class: 'v-dialog', style: styles.value.backdrop, bindtap: onClose, onTap: onClose }, [
        h('view', { class: 'v-dialog__panel', style: styles.value.panel, catchtap: () => {} }, panelChildren)
      ]);
    };
  }
});
