import type { Theme } from '@vynx/themes';
import { sizing, type ControlSize, type Style } from './kit.js';

export interface ToggleButtonStyleOptions {
  pressed?: boolean;
  size?: ControlSize;
  disabled?: boolean;
}

export interface ToggleButtonStyle {
  container: Style;
  label: Style;
}

/** Token-driven style for a pressable on/off button. */
export function resolveToggleButtonStyle(theme: Theme, options: ToggleButtonStyleOptions = {}): ToggleButtonStyle {
  const { pressed = false, size = 'md', disabled = false } = options;
  const { padding, fontSize } = sizing(theme, size);

  const container: Style = {
    padding,
    borderRadius: theme.radius.md,
    opacity: disabled ? 0.5 : 1
  };

  if (pressed) {
    container.backgroundColor = theme.colors.primary;
    container.borderColor = theme.colors.primary;
  } else {
    container.backgroundColor = 'transparent';
    container.borderWidth = '1px';
    container.borderStyle = 'solid';
    container.borderColor = theme.colors.border;
  }

  const label: Style = {
    color: pressed ? theme.colors.onPrimary : theme.colors.text,
    fontSize,
    fontWeight: theme.typography.fontWeight.semibold,
    fontFamily: theme.typography.fontFamily
  };

  return { container, label };
}
