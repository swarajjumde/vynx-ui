import type { Theme } from '@vynx/themes';
import { sizing, type ControlSize, type Style } from './kit.js';

export type ToggleVariant = 'checkbox' | 'switch';

export interface FormFieldStyle {
  container: Style;
  label: Style;
  help: Style;
  error: Style;
}

export interface InputStyle {
  container: Style;
}

export interface ToggleStyle {
  container: Style;
  control: Style;
  indicator: Style;
  label: Style;
}

export interface FormFieldStyleOptions {
  invalid?: boolean;
  disabled?: boolean;
}

export interface InputStyleOptions {
  size?: ControlSize;
  invalid?: boolean;
  disabled?: boolean;
}

export interface ToggleStyleOptions {
  variant?: ToggleVariant;
  checked?: boolean;
  invalid?: boolean;
  disabled?: boolean;
}

/** Layout + text tokens for a labelled form field with help and error slots. */
export function resolveFormFieldStyle(theme: Theme, options: FormFieldStyleOptions = {}): FormFieldStyle {
  const { invalid = false, disabled = false } = options;

  const container: Style = {
    display: 'flex',
    flexDirection: 'column',
    opacity: disabled ? 0.5 : 1
  };

  const label: Style = {
    color: invalid ? theme.colors.danger : theme.colors.text,
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.medium,
    fontFamily: theme.typography.fontFamily,
    marginBottom: theme.spacing.xs
  };

  const help: Style = {
    color: theme.colors.textMuted,
    fontSize: theme.typography.fontSize.xs,
    fontFamily: theme.typography.fontFamily,
    marginTop: theme.spacing.xs
  };

  const error: Style = {
    color: theme.colors.danger,
    fontSize: theme.typography.fontSize.xs,
    fontFamily: theme.typography.fontFamily,
    marginTop: theme.spacing.xs
  };

  return { container, label, help, error };
}

/** Token-driven style for single-line and multi-line text controls. */
export function resolveInputStyle(theme: Theme, options: InputStyleOptions = {}): InputStyle {
  const { size = 'md', invalid = false, disabled = false } = options;
  const { padding, fontSize } = sizing(theme, size);

  const container: Style = {
    padding,
    fontSize,
    fontFamily: theme.typography.fontFamily,
    color: theme.colors.text,
    backgroundColor: theme.colors.surface,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: invalid ? theme.colors.danger : theme.colors.border,
    borderRadius: theme.radius.md,
    opacity: disabled ? 0.5 : 1
  };

  return { container };
}

/** Token-driven style for boolean toggle controls (checkbox and switch). */
export function resolveToggleStyle(theme: Theme, options: ToggleStyleOptions = {}): ToggleStyle {
  const { variant = 'checkbox', checked = false, invalid = false, disabled = false } = options;

  const container: Style = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    opacity: disabled ? 0.5 : 1
  };

  const label: Style = {
    color: theme.colors.text,
    fontSize: theme.typography.fontSize.md,
    fontFamily: theme.typography.fontFamily,
    marginLeft: theme.spacing.sm
  };

  const borderColor = invalid ? theme.colors.danger : checked ? theme.colors.primary : theme.colors.border;

  if (variant === 'switch') {
    const control: Style = {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: checked ? 'flex-end' : 'flex-start',
      width: '40px',
      height: '22px',
      padding: '2px',
      borderRadius: theme.radius.full,
      backgroundColor: checked ? theme.colors.primary : theme.colors.neutral
    };

    const indicator: Style = {
      width: '18px',
      height: '18px',
      borderRadius: theme.radius.full,
      backgroundColor: theme.colors.surface
    };

    return { container, control, indicator, label };
  }

  const control: Style = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '20px',
    height: '20px',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor,
    borderRadius: theme.radius.sm,
    backgroundColor: checked ? theme.colors.primary : theme.colors.surface
  };

  const indicator: Style = {
    color: theme.colors.onPrimary,
    fontSize: theme.typography.fontSize.xs,
    fontWeight: theme.typography.fontWeight.bold,
    fontFamily: theme.typography.fontFamily,
    opacity: checked ? 1 : 0
  };

  return { container, control, indicator, label };
}
