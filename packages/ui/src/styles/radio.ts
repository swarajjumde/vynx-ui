import type { Theme } from '@vynx/themes';
import type { Style } from './kit.js';

export interface RadioGroupStyleOptions {
  disabled?: boolean;
}

export interface RadioOptionStyleOptions {
  selected?: boolean;
  disabled?: boolean;
}

export interface RadioOptionStyle {
  row: Style;
  control: Style;
  indicator: Style;
  label: Style;
}

/** Column container for a set of radio options. */
export function resolveRadioGroupStyle(theme: Theme, options: RadioGroupStyleOptions = {}): { container: Style } {
  const { disabled = false } = options;

  const container: Style = {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.sm,
    opacity: disabled ? 0.5 : 1
  };

  return { container };
}

/** Token-driven style for a single radio option (circle + inner dot + label). */
export function resolveRadioOptionStyle(theme: Theme, options: RadioOptionStyleOptions = {}): RadioOptionStyle {
  const { selected = false } = options;

  const row: Style = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: theme.spacing.xs,
    paddingBottom: theme.spacing.xs
  };

  const control: Style = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '20px',
    height: '20px',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: selected ? theme.colors.primary : theme.colors.border,
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.surface
  };

  const indicator: Style = {
    width: '10px',
    height: '10px',
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.primary,
    opacity: selected ? 1 : 0
  };

  const label: Style = {
    color: theme.colors.text,
    fontSize: theme.typography.fontSize.md,
    fontFamily: theme.typography.fontFamily,
    marginLeft: theme.spacing.sm
  };

  return { row, control, indicator, label };
}
