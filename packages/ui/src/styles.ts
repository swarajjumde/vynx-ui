import type { Theme } from '@vynx/themes';

export type ButtonVariant = 'solid' | 'outline' | 'ghost';
export type ButtonTone = 'primary' | 'neutral' | 'danger';
export type ControlSize = 'sm' | 'md' | 'lg';
export type BadgeTone = 'primary' | 'neutral' | 'success' | 'warning' | 'danger';

/** A Lynx-compatible inline style object (no DOM / CSSOM types). */
export type Style = Record<string, string | number>;

export interface CompoundStyle {
  container: Style;
  label: Style;
}

interface TonePair {
  base: string;
  hover: string;
  on: string;
}

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

function badgeTone(theme: Theme, tone: BadgeTone): Pick<TonePair, 'base' | 'on'> {
  switch (tone) {
    case 'neutral':
      return { base: theme.colors.neutral, on: theme.colors.onNeutral };
    case 'success':
      return { base: theme.colors.success, on: theme.colors.onSuccess };
    case 'warning':
      return { base: theme.colors.warning, on: theme.colors.onWarning };
    case 'danger':
      return { base: theme.colors.danger, on: theme.colors.onDanger };
    case 'primary':
    default:
      return { base: theme.colors.primary, on: theme.colors.onPrimary };
  }
}

function sizing(theme: Theme, size: ControlSize): { padding: string; fontSize: string } {
  switch (size) {
    case 'sm':
      return { padding: `${theme.spacing.xs} ${theme.spacing.sm}`, fontSize: theme.typography.fontSize.sm };
    case 'lg':
      return { padding: `${theme.spacing.md} ${theme.spacing.lg}`, fontSize: theme.typography.fontSize.lg };
    case 'md':
    default:
      return { padding: `${theme.spacing.sm} ${theme.spacing.md}`, fontSize: theme.typography.fontSize.md };
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

export interface BadgeStyleOptions {
  tone?: BadgeTone;
}

export function resolveBadgeStyle(theme: Theme, options: BadgeStyleOptions = {}): CompoundStyle {
  const { tone = 'primary' } = options;
  const colors = badgeTone(theme, tone);

  const container: Style = {
    backgroundColor: colors.base,
    paddingLeft: theme.spacing.sm,
    paddingRight: theme.spacing.sm,
    paddingTop: theme.spacing.xs,
    paddingBottom: theme.spacing.xs,
    borderRadius: theme.radius.full
  };

  const label: Style = {
    color: colors.on,
    fontSize: theme.typography.fontSize.xs,
    fontWeight: theme.typography.fontWeight.medium,
    fontFamily: theme.typography.fontFamily
  };

  return { container, label };
}

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

export interface CardStyleOptions {
  elevated?: boolean;
}

export function resolveCardStyle(theme: Theme, options: CardStyleOptions = {}): { container: Style } {
  const { elevated = false } = options;

  const container: Style = {
    backgroundColor: elevated ? theme.colors.surfaceElevated : theme.colors.surface,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: theme.colors.border,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.lg,
    boxShadow: elevated ? theme.shadow.md : theme.shadow.sm
  };

  return { container };
}
