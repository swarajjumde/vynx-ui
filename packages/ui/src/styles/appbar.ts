import type { Theme } from '@vynx/themes';
import type { Style } from './kit.js';

export interface AppBarStyle {
  container: Style;
  title: Style;
}

/** Token-driven, Lynx-compatible top app bar row. */
export function resolveAppBarStyle(theme: Theme): AppBarStyle {
  const container: Style = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.surface,
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    paddingTop: theme.spacing.sm,
    paddingBottom: theme.spacing.sm,
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: theme.colors.border
  };

  const title: Style = {
    color: theme.colors.text,
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.semibold,
    fontFamily: theme.typography.fontFamily
  };

  return { container, title };
}
