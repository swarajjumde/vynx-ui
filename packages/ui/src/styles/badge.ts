import type { Theme } from '@vynx/themes';
import type { CompoundStyle, Style } from './kit.js';

export type BadgeTone = 'primary' | 'neutral' | 'success' | 'warning' | 'danger';

function badgeTone(theme: Theme, tone: BadgeTone): { base: string; on: string } {
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
