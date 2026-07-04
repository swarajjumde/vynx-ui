import { computed, defineComponent, h, type PropType } from 'vue';
import { useTheme } from '../theme.js';
import { resolveOverlayStyle } from '../styles/overlay.js';
import { resolveTextStyle } from '../styles/text.js';
import { resolveConfirmDialogStyle } from '../styles/confirmdialog.js';
import { VButton } from './VButton.js';

/**
 * VConfirmDialog - a token-driven, Lynx-compatible centered confirm/cancel dialog.
 *
 * Renders nothing while hidden. When `visible`, renders a `position: fixed`
 * backdrop `view` (no DOM, no portal) with a centered panel `view` hosting an
 * optional `title` (`text`), a `message` (`text`) and an actions row of two
 * `VButton`s (cancel / confirm). Tapping the backdrop behaves like cancel.
 * Uses `visible` / `update:visible` for `v-model:visible`.
 */
export const VConfirmDialog = defineComponent({
  name: 'VConfirmDialog',
  props: {
    visible: { type: Boolean, default: false },
    title: { type: String, default: '' },
    message: { type: String, default: '' },
    confirmLabel: { type: String, default: 'Confirm' },
    cancelLabel: { type: String, default: 'Cancel' },
    tone: { type: String as PropType<'primary' | 'danger'>, default: 'primary' }
  },
  emits: ['update:visible', 'confirm', 'cancel', 'close'],
  setup(props, { emit }) {
    const theme = useTheme();
    const styles = computed(() => resolveOverlayStyle(theme.value, { placement: 'center' }));
    const titleStyle = computed(() => resolveTextStyle(theme.value, { size: 'lg', weight: 'semibold' }));
    const bodyStyle = computed(() => resolveConfirmDialogStyle(theme.value));

    const onCancel = () => {
      emit('cancel');
      emit('update:visible', false);
      emit('close');
    };

    const onConfirm = () => {
      emit('confirm');
      emit('update:visible', false);
      emit('close');
    };

    return () => {
      if (!props.visible) return null;

      const panelChildren = [];
      if (props.title) {
        panelChildren.push(h('text', { class: 'v-confirm-dialog__title', style: titleStyle.value.text }, props.title));
      }
      panelChildren.push(h('text', { class: 'v-confirm-dialog__message', style: bodyStyle.value.message }, props.message));
      panelChildren.push(
        h('view', { class: 'v-confirm-dialog__actions', style: bodyStyle.value.actions }, [
          h(VButton, { label: props.cancelLabel, variant: 'ghost', tone: 'neutral', onTap: onCancel }),
          h(VButton, { label: props.confirmLabel, tone: props.tone, onTap: onConfirm })
        ])
      );

      return h(
        'view',
        { class: 'v-confirm-dialog', style: styles.value.backdrop, bindtap: onCancel, onTap: onCancel },
        [h('view', { class: 'v-confirm-dialog__panel', style: styles.value.panel, catchtap: () => {} }, panelChildren)]
      );
    };
  }
});
