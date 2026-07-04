import type { Theme } from '@vynx/themes';
import type { Style } from './kit.js';

export type ActionSheetItemTone = 'default' | 'danger';

export interface ActionSheetItemStyleOptions {
  tone?: ActionSheetItemTone;
}

export interface ActionSheetItemStyle {
  row: Style;
  label: Style;
}

/** Token-driven, Lynx-compatible action sheet row (tappable action in a bottom sheet). */
export function resolveActionSheetItemStyle(
  theme: Theme,
  options: ActionSheetItemStyleOptions = {}
): ActionSheetItemStyle {
  const { tone = 'default' } = options;

  const row: Style = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.md
  };

  const label: Style = {
    color: tone === 'danger' ? theme.colors.danger : theme.colors.text,
    fontSize: theme.typography.fontSize.md,
    fontFamily: theme.typography.fontFamily,
    fontWeight: theme.typography.fontWeight.medium
  };

  return { row, label };
}
