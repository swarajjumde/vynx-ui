import type { Theme } from '@vynx/themes';
import type { Style } from './kit.js';

export interface EmptyStateStyle {
  container: Style;
  icon: Style;
  title: Style;
  message: Style;
}

/** Token-driven centered empty/placeholder state, rendered as Lynx views. */
export function resolveEmptyStateStyle(theme: Theme): EmptyStateStyle {
  const container: Style = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.xl,
    gap: theme.spacing.sm
  };

  const icon: Style = {
    width: '40px',
    height: '40px',
    marginBottom: theme.spacing.sm
  };

  const title: Style = {
    color: theme.colors.text,
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.semibold,
    fontFamily: theme.typography.fontFamily,
    textAlign: 'center'
  };

  const message: Style = {
    color: theme.colors.textMuted,
    fontSize: theme.typography.fontSize.sm,
    fontFamily: theme.typography.fontFamily,
    textAlign: 'center'
  };

  return { container, icon, title, message };
}
