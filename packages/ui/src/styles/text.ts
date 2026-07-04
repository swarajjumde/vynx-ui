import type { Theme } from '@vynx/themes';
import type { Style } from './kit.js';

export type TextSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type TextTone = 'default' | 'muted' | 'inverse' | 'primary' | 'success' | 'warning' | 'danger';
export type TextWeight = 'regular' | 'medium' | 'semibold' | 'bold';
export type TextAlign = 'left' | 'center' | 'right';

function textColor(theme: Theme, tone: TextTone): string {
  switch (tone) {
    case 'muted':
      return theme.colors.textMuted;
    case 'inverse':
      return theme.colors.textInverse;
    case 'primary':
      return theme.colors.primary;
    case 'success':
      return theme.colors.success;
    case 'warning':
      return theme.colors.warning;
    case 'danger':
      return theme.colors.danger;
    case 'default':
    default:
      return theme.colors.text;
  }
}

export interface TextStyleOptions {
  size?: TextSize;
  tone?: TextTone;
  weight?: TextWeight;
  align?: TextAlign;
}

/** Token-driven typography for a Lynx `text` element. */
export function resolveTextStyle(theme: Theme, options: TextStyleOptions = {}): { text: Style } {
  const { size = 'md', tone = 'default', weight = 'regular', align = 'left' } = options;

  const text: Style = {
    color: textColor(theme, tone),
    fontSize: theme.typography.fontSize[size],
    fontWeight: theme.typography.fontWeight[weight],
    fontFamily: theme.typography.fontFamily,
    lineHeight: theme.typography.lineHeight.normal,
    textAlign: align
  };

  return { text };
}
