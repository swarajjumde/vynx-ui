import type { Theme } from '@vynx/themes';
import type { CompoundStyle, Style } from './kit.js';

export type TagTone = 'primary' | 'neutral' | 'success' | 'warning' | 'danger';
export type TagVariant = 'solid' | 'outline';

function tagTone(theme: Theme, tone: TagTone): { base: string; on: string } {
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

export interface TagStyleOptions {
  tone?: TagTone;
  variant?: TagVariant;
}

/** Token-driven, Lynx-compatible tag: a badge-like label with a solid/outline variant. */
export function resolveTagStyle(theme: Theme, options: TagStyleOptions = {}): CompoundStyle {
  const { tone = 'primary', variant = 'solid' } = options;
  const colors = tagTone(theme, tone);

  const container: Style =
    variant === 'outline'
      ? {
          backgroundColor: 'transparent',
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: colors.base,
          paddingLeft: theme.spacing.sm,
          paddingRight: theme.spacing.sm,
          paddingTop: theme.spacing.xs,
          paddingBottom: theme.spacing.xs,
          borderRadius: theme.radius.full
        }
      : {
          backgroundColor: colors.base,
          paddingLeft: theme.spacing.sm,
          paddingRight: theme.spacing.sm,
          paddingTop: theme.spacing.xs,
          paddingBottom: theme.spacing.xs,
          borderRadius: theme.radius.full
        };

  const label: Style = {
    color: variant === 'outline' ? colors.base : colors.on,
    fontSize: theme.typography.fontSize.xs,
    fontWeight: theme.typography.fontWeight.medium,
    fontFamily: theme.typography.fontFamily
  };

  return { container, label };
}
