import type { Theme } from '@vynx/themes';
import type { Style } from './kit.js';

export type HeadingLevel = 1 | 2 | 3;
export type HeadingTone = 'default' | 'muted' | 'primary';
export type HeadingAlign = 'left' | 'center' | 'right';

function headingColor(theme: Theme, tone: HeadingTone): string {
  switch (tone) {
    case 'muted':
      return theme.colors.textMuted;
    case 'primary':
      return theme.colors.primary;
    case 'default':
    default:
      return theme.colors.text;
  }
}

function headingScale(theme: Theme, level: HeadingLevel): { fontSize: string; fontWeight: string } {
  switch (level) {
    case 1:
      return { fontSize: theme.typography.fontSize.xl, fontWeight: theme.typography.fontWeight.bold };
    case 3:
      return { fontSize: theme.typography.fontSize.md, fontWeight: theme.typography.fontWeight.semibold };
    case 2:
    default:
      return { fontSize: theme.typography.fontSize.lg, fontWeight: theme.typography.fontWeight.semibold };
  }
}

export interface HeadingStyleOptions {
  level?: HeadingLevel;
  tone?: HeadingTone;
  align?: HeadingAlign;
}

/** Token-driven heading typography for a Lynx `text` element. */
export function resolveHeadingStyle(theme: Theme, options: HeadingStyleOptions = {}): { text: Style } {
  const { level = 2, tone = 'default', align = 'left' } = options;
  const { fontSize, fontWeight } = headingScale(theme, level);

  const text: Style = {
    color: headingColor(theme, tone),
    fontSize,
    fontWeight,
    fontFamily: theme.typography.fontFamily,
    lineHeight: theme.typography.lineHeight.tight,
    textAlign: align
  };

  return { text };
}
