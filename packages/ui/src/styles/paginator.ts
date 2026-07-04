import type { Theme } from '@vynx/themes';
import type { Style } from './kit.js';

export interface PaginatorButtonStyleOptions {
  disabled?: boolean;
}

export interface PaginatorButtonStyle {
  button: Style;
  label: Style;
}

/** Row container + page info for a paginator, rendered as Lynx views. */
export function resolvePaginatorStyle(theme: Theme): { container: Style; info: Style } {
  const container: Style = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  };

  const info: Style = {
    color: theme.colors.text,
    fontSize: theme.typography.fontSize.sm,
    fontFamily: theme.typography.fontFamily
  };

  return { container, info };
}

/** Token-driven prev/next control; dims and (in the component) disables at bounds. */
export function resolvePaginatorButtonStyle(theme: Theme, options: PaginatorButtonStyleOptions = {}): PaginatorButtonStyle {
  const { disabled = false } = options;

  const button: Style = {
    paddingTop: theme.spacing.xs,
    paddingBottom: theme.spacing.xs,
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: theme.colors.border,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.surface,
    opacity: disabled ? 0.5 : 1
  };

  const label: Style = {
    color: theme.colors.primary,
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.semibold,
    fontFamily: theme.typography.fontFamily
  };

  return { button, label };
}
