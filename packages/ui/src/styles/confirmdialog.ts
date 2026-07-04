import type { Theme } from '@vynx/themes';
import type { Style } from './kit.js';

export interface ConfirmDialogStyle {
  message: Style;
  actions: Style;
}

/** Token-driven, Lynx-compatible confirm dialog body: message text + actions row. */
export function resolveConfirmDialogStyle(theme: Theme): ConfirmDialogStyle {
  const message: Style = {
    color: theme.colors.textMuted,
    fontSize: theme.typography.fontSize.md,
    fontFamily: theme.typography.fontFamily,
    marginTop: theme.spacing.sm,
    marginBottom: theme.spacing.lg
  };

  const actions: Style = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: theme.spacing.sm
  };

  return { message, actions };
}
