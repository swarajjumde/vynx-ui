import type { Theme } from '@vynx/themes';
import type { Style } from './kit.js';

export interface SelectButtonStyleOptions {
  disabled?: boolean;
}

export interface SelectButtonOptionStyleOptions {
  selected?: boolean;
}

export interface SelectButtonOptionStyle {
  segment: Style;
  label: Style;
}

/** Row container for a segmented single-select control. */
export function resolveSelectButtonStyle(theme: Theme, options: SelectButtonStyleOptions = {}): { container: Style } {
  const { disabled = false } = options;

  const container: Style = {
    display: 'flex',
    flexDirection: 'row',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: theme.colors.border,
    borderRadius: theme.radius.md,
    overflow: 'hidden',
    opacity: disabled ? 0.5 : 1
  };

  return { container };
}

/** Token-driven style for a single segment of a select-button group. */
export function resolveSelectButtonOptionStyle(
  theme: Theme,
  options: SelectButtonOptionStyleOptions = {}
): SelectButtonOptionStyle {
  const { selected = false } = options;

  const segment: Style = {
    paddingTop: theme.spacing.sm,
    paddingBottom: theme.spacing.sm,
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    backgroundColor: selected ? theme.colors.primary : 'transparent'
  };

  const label: Style = {
    color: selected ? theme.colors.onPrimary : theme.colors.text,
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.semibold,
    fontFamily: theme.typography.fontFamily
  };

  return { segment, label };
}
