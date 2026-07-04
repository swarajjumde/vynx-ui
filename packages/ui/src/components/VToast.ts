import { computed, defineComponent, h, type PropType } from 'vue';
import { useTheme } from '../theme.js';
import { resolveOverlayStyle } from '../styles/overlay.js';
import { resolveToastStyle, type ToastTone } from '../styles/toast.js';

/**
 * VToast - a token-driven, Lynx-compatible non-blocking message pill.
 *
 * Renders nothing while hidden. When `visible`, renders a `position: fixed`,
 * transparent (non-blocking) backdrop `view` (no DOM, no portal) anchored to
 * `position` ('top' | 'bottom') hosting a toast pill `view` + `text` message.
 * Tapping the pill emits a close intent. There is no auto-dismiss timer — the
 * caller controls `visible` (e.g. with a `setTimeout` in host code). Uses
 * `visible` / `update:visible` for `v-model:visible`.
 */
export const VToast = defineComponent({
  name: 'VToast',
  props: {
    visible: { type: Boolean, default: false },
    message: { type: String, default: '' },
    tone: { type: String as PropType<ToastTone>, default: 'neutral' },
    position: { type: String as PropType<'top' | 'bottom'>, default: 'bottom' }
  },
  emits: ['update:visible', 'close'],
  setup(props, { emit }) {
    const theme = useTheme();
    const styles = computed(() =>
      resolveOverlayStyle(theme.value, { placement: props.position, scrim: false })
    );
    const toastStyle = computed(() => resolveToastStyle(theme.value, { tone: props.tone }));

    const onClose = () => {
      emit('update:visible', false);
      emit('close');
    };

    return () => {
      if (!props.visible) return null;
      return h(
        'view',
        { class: 'v-toast', style: styles.value.backdrop, bindtap: onClose, onTap: onClose },
        [
          h(
            'view',
            { class: 'v-toast__pill', style: toastStyle.value.container, catchtap: onClose },
            [h('text', { class: 'v-toast__label', style: toastStyle.value.label }, props.message)]
          )
        ]
      );
    };
  }
});
