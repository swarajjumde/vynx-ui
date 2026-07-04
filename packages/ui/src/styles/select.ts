import type { Theme } from '@vynx/themes';
import type { Style } from './kit.js';

export interface SelectStyleOptions {
  invalid?: boolean;
  disabled?: boolean;
  placeholder?: boolean;
}

export interface SelectStyle {
  trigger: Style;
  triggerLabel: Style;
  icon: Style;
}

export interface SelectOptionStyleOptions {
  selected?: boolean;
}

export interface SelectOptionStyle {
  row: Style;
  label: Style;
  check: Style;
}

/** Token-driven, Lynx-compatible select trigger (opens a bottom-sheet picker). */
export function resolveSelectStyle(theme: Theme, options: SelectStyleOptions = {}): SelectStyle {
  const { invalid = false, disabled = false, placeholder = false } = options;

  const trigger: Style = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    paddingTop: theme.spacing.sm,
    paddingBottom: theme.spacing.sm,
    backgroundColor: theme.colors.surface,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: invalid ? theme.colors.danger : theme.colors.border,
    borderRadius: theme.radius.md,
    opacity: disabled ? 0.5 : 1
  };

  const triggerLabel: Style = {
    color: placeholder ? theme.colors.textMuted : theme.colors.text,
    fontSize: theme.typography.fontSize.md,
    fontFamily: theme.typography.fontFamily
  };

  const icon: Style = {
    color: theme.colors.textMuted,
    fontSize: theme.typography.fontSize.md
  };

  return { trigger, triggerLabel, icon };
}

/** Token-driven style for one row in the select's option picker. */
export function resolveSelectOptionStyle(theme: Theme, options: SelectOptionStyleOptions = {}): SelectOptionStyle {
  const { selected = false } = options;

  const row: Style = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing.md
  };

  const label: Style = {
    color: selected ? theme.colors.primary : theme.colors.text,
    fontSize: theme.typography.fontSize.md,
    fontFamily: theme.typography.fontFamily
  };

  const check: Style = {
    color: theme.colors.primary,
    fontSize: theme.typography.fontSize.md,
    opacity: selected ? 1 : 0
  };

  return { row, label, check };
}
