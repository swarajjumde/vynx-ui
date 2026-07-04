import type { Theme } from '@vynx/themes';
import { sizing, type CompoundStyle, type ControlSize, type Style, type TonePair } from './kit.js';

export type ButtonVariant = 'solid' | 'outline' | 'ghost';
export type ButtonTone = 'primary' | 'neutral' | 'danger';

function buttonTone(theme: Theme, tone: ButtonTone): TonePair {
  switch (tone) {
    case 'neutral':
      return { base: theme.colors.neutral, hover: theme.colors.neutralHover, on: theme.colors.onNeutral };
    case 'danger':
      return { base: theme.colors.danger, hover: theme.colors.dangerHover, on: theme.colors.onDanger };
    case 'primary':
    default:
      return { base: theme.colors.primary, hover: theme.colors.primaryHover, on: theme.colors.onPrimary };
  }
}

export interface ButtonStyleOptions {
  variant?: ButtonVariant;
  tone?: ButtonTone;
  size?: ControlSize;
  disabled?: boolean;
}

export function resolveButtonStyle(theme: Theme, options: ButtonStyleOptions = {}): CompoundStyle {
  const { variant = 'solid', tone = 'primary', size = 'md', disabled = false } = options;
  const colors = buttonTone(theme, tone);
  const { padding, fontSize } = sizing(theme, size);

  const container: Style = {
    padding,
    borderRadius: theme.radius.md,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'transparent',
    backgroundColor: 'transparent',
    opacity: disabled ? 0.5 : 1
  };

  let labelColor = colors.base;
  if (variant === 'solid') {
    container.backgroundColor = colors.base;
    container.borderColor = colors.base;
    labelColor = colors.on;
  } else if (variant === 'outline') {
    container.borderColor = colors.base;
  }

  const label: Style = {
    color: labelColor,
    fontSize,
    fontWeight: theme.typography.fontWeight.semibold,
    fontFamily: theme.typography.fontFamily
  };

  return { container, label };
}
