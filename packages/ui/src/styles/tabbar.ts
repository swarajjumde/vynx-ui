import type { Theme } from '@vynx/themes';
import type { Style } from './kit.js';

export interface TabBarItemStyleOptions {
  active?: boolean;
}

export interface TabBarItemStyle {
  item: Style;
  icon: Style;
  label: Style;
}

/** Row container for a bottom tab bar, rendered as a Lynx `view`. */
export function resolveTabBarStyle(theme: Theme): { container: Style } {
  const container: Style = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'stretch',
    backgroundColor: theme.colors.surface,
    borderTopWidth: '1px',
    borderTopStyle: 'solid',
    borderTopColor: theme.colors.border,
    paddingTop: theme.spacing.xs,
    paddingBottom: theme.spacing.xs
  };

  return { container };
}

/**
 * Token-driven style for one tab. Icons are image assets (not tintable on Lynx),
 * so the active state is carried by the label colour and weight.
 */
export function resolveTabBarItemStyle(theme: Theme, options: TabBarItemStyleOptions = {}): TabBarItemStyle {
  const { active = false } = options;

  const item: Style = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
    paddingTop: theme.spacing.xs,
    paddingBottom: theme.spacing.xs
  };

  const icon: Style = {
    width: '22px',
    height: '22px',
    marginBottom: '2px'
  };

  const label: Style = {
    color: active ? theme.colors.primary : theme.colors.textMuted,
    fontSize: theme.typography.fontSize.xs,
    fontWeight: active ? theme.typography.fontWeight.semibold : theme.typography.fontWeight.regular,
    fontFamily: theme.typography.fontFamily
  };

  return { item, icon, label };
}
