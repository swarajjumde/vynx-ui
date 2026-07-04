import type { Theme } from '@vynx/themes';
import type { Style } from './kit.js';

export type StackDirection = 'row' | 'column';
export type StackGap = 'none' | 'sm' | 'md' | 'lg';
export type StackAlign = 'start' | 'center' | 'end' | 'stretch';
export type StackJustify = 'start' | 'center' | 'end' | 'between';

function stackGap(theme: Theme, gap: StackGap): string {
  switch (gap) {
    case 'none':
      return theme.spacing.none;
    case 'sm':
      return theme.spacing.sm;
    case 'lg':
      return theme.spacing.lg;
    case 'md':
    default:
      return theme.spacing.md;
  }
}

function alignItems(align: StackAlign): string {
  switch (align) {
    case 'start':
      return 'flex-start';
    case 'end':
      return 'flex-end';
    case 'center':
      return 'center';
    case 'stretch':
    default:
      return 'stretch';
  }
}

function justifyContent(justify: StackJustify): string {
  switch (justify) {
    case 'center':
      return 'center';
    case 'end':
      return 'flex-end';
    case 'between':
      return 'space-between';
    case 'start':
    default:
      return 'flex-start';
  }
}

export interface StackStyleOptions {
  direction?: StackDirection;
  gap?: StackGap;
  align?: StackAlign;
  justify?: StackJustify;
}

/** Token-driven flex layout container for a Lynx `view` element. */
export function resolveStackStyle(theme: Theme, options: StackStyleOptions = {}): { container: Style } {
  const { direction = 'column', gap = 'md', align = 'stretch', justify = 'start' } = options;

  const container: Style = {
    display: 'flex',
    flexDirection: direction,
    gap: stackGap(theme, gap),
    alignItems: alignItems(align),
    justifyContent: justifyContent(justify)
  };

  return { container };
}
