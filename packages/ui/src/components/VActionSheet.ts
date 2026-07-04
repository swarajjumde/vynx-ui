import { computed, defineComponent, h, type PropType } from 'vue';
import { useTheme } from '../theme.js';
import { resolveOverlayStyle } from '../styles/overlay.js';
import { resolveActionSheetItemStyle, type ActionSheetItemTone } from '../styles/actionsheet.js';

export interface ActionSheetAction {
  label: string;
  value: string | number;
  tone?: ActionSheetItemTone;
}

/**
 * VActionSheet - a token-driven, Lynx-compatible bottom sheet of tappable actions.
 *
 * Renders nothing while hidden. When `visible`, renders a `position: fixed`
 * backdrop `view` (no DOM, no portal) with a bottom-anchored panel `view`
 * listing one row `view` + `text` label per action. Tapping an action emits
 * `select` with its value then closes; tapping the backdrop closes without
 * selecting. Uses `visible` / `update:visible` for `v-model:visible`.
 */
export const VActionSheet = defineComponent({
  name: 'VActionSheet',
  props: {
    visible: { type: Boolean, default: false },
    actions: { type: Array as PropType<ActionSheetAction[]>, default: () => [] }
  },
  emits: ['update:visible', 'select', 'close'],
  setup(props, { emit }) {
    const theme = useTheme();
    const styles = computed(() => resolveOverlayStyle(theme.value, { placement: 'bottom' }));

    const onClose = () => {
      emit('update:visible', false);
      emit('close');
    };

    const onSelect = (value: string | number) => {
      emit('select', value);
      emit('update:visible', false);
      emit('close');
    };

    return () => {
      if (!props.visible) return null;

      const rows = props.actions.map((action) => {
        const itemStyle = resolveActionSheetItemStyle(theme.value, { tone: action.tone });
        const onTap = () => onSelect(action.value);
        return h(
          'view',
          { key: action.value, class: 'v-action-sheet__row', style: itemStyle.row, bindtap: onTap, onTap },
          [h('text', { class: 'v-action-sheet__label', style: itemStyle.label }, action.label)]
        );
      });

      return h('view', { class: 'v-action-sheet', style: styles.value.backdrop, bindtap: onClose, onTap: onClose }, [
        h('view', { class: 'v-action-sheet__panel', style: styles.value.panel, catchtap: () => {} }, rows)
      ]);
    };
  }
});
