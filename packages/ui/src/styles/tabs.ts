import type { Theme } from '@vynx/themes';
import type { Style } from './kit.js';

export interface TabsStyle {
  container: Style;
}

export interface TabItemStyleOptions {
  active?: boolean;
}

export interface TabItemStyle {
  tab: Style;
  label: Style;
}

/** Row container for a top tab switcher, rendered as a Lynx `view`. */
export function resolveTabsStyle(theme: Theme): TabsStyle {
  const container: Style = {
    display: 'flex',
    flexDirection: 'row',
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: theme.colors.border
  };

  return { container };
}

/** Token-driven style for one underline-style tab. */
export function resolveTabItemStyle(theme: Theme, options: TabItemStyleOptions = {}): TabItemStyle {
  const { active = false } = options;

  const tab: Style = {
    display: 'flex',
    paddingTop: theme.spacing.sm,
    paddingBottom: theme.spacing.sm,
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    borderBottomWidth: '2px',
    borderBottomStyle: 'solid',
    borderBottomColor: active ? theme.colors.primary : 'transparent'
  };

  const label: Style = {
    color: active ? theme.colors.text : theme.colors.textMuted,
    fontSize: theme.typography.fontSize.md,
    fontWeight: active ? theme.typography.fontWeight.semibold : theme.typography.fontWeight.regular,
    fontFamily: theme.typography.fontFamily
  };

  return { tab, label };
}
