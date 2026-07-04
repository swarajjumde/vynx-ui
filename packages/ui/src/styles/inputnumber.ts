import type { Theme } from '@vynx/themes';
import { sizing, type ControlSize, type Style } from './kit.js';

export interface InputNumberStyleOptions {
  size?: ControlSize;
  invalid?: boolean;
  disabled?: boolean;
}

export interface InputNumberStyle {
  container: Style;
  button: Style;
  buttonLabel: Style;
  value: Style;
}

/** Token-driven style for a stepper (decrement / value / increment) control. */
export function resolveInputNumberStyle(theme: Theme, options: InputNumberStyleOptions = {}): InputNumberStyle {
  const { size = 'md', invalid = false, disabled = false } = options;
  const { fontSize } = sizing(theme, size);

  const container: Style = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: invalid ? theme.colors.danger : theme.colors.border,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.surface,
    overflow: 'hidden',
    opacity: disabled ? 0.5 : 1
  };

  const button: Style = {
    paddingTop: theme.spacing.sm,
    paddingBottom: theme.spacing.sm,
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md
  };

  const buttonLabel: Style = {
    color: theme.colors.primary,
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.semibold,
    fontFamily: theme.typography.fontFamily
  };

  const value: Style = {
    color: theme.colors.text,
    fontSize,
    fontFamily: theme.typography.fontFamily,
    textAlign: 'center',
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md
  };

  return { container, button, buttonLabel, value };
}
