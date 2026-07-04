import type { Theme } from '@vynx/themes';
import type { Style } from './kit.js';

export type ToastTone = 'neutral' | 'success' | 'warning' | 'danger';

export interface ToastStyleOptions {
  tone?: ToastTone;
}

export interface ToastStyle {
  container: Style;
  label: Style;
}

function toastColors(theme: Theme, tone: ToastTone): { base: string; on: string } {
  switch (tone) {
    case 'success':
      return { base: theme.colors.success, on: theme.colors.onSuccess };
    case 'warning':
      return { base: theme.colors.warning, on: theme.colors.onWarning };
    case 'danger':
      return { base: theme.colors.danger, on: theme.colors.onDanger };
    case 'neutral':
    default:
      return { base: theme.colors.neutral, on: theme.colors.onNeutral };
  }
}

/** Token-driven, Lynx-compatible toast pill (non-blocking message). */
export function resolveToastStyle(theme: Theme, options: ToastStyleOptions = {}): ToastStyle {
  const { tone = 'neutral' } = options;
  const colors = toastColors(theme, tone);

  const container: Style = {
    backgroundColor: colors.base,
    padding: theme.spacing.md,
    borderRadius: theme.radius.md,
    marginLeft: theme.spacing.lg,
    marginRight: theme.spacing.lg,
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
    boxShadow: theme.shadow.lg
  };

  const label: Style = {
    color: colors.on,
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.medium,
    fontFamily: theme.typography.fontFamily
  };

  return { container, label };
}
