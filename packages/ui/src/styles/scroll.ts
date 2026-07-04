import type { Theme } from '@vynx/themes';
import type { Style } from './kit.js';

export type ScrollViewPadding = 'none' | 'sm' | 'md' | 'lg';

function scrollPadding(theme: Theme, padding: ScrollViewPadding): string {
  switch (padding) {
    case 'sm':
      return theme.spacing.sm;
    case 'md':
      return theme.spacing.md;
    case 'lg':
      return theme.spacing.lg;
    case 'none':
    default:
      return theme.spacing.none;
  }
}

export interface ScrollViewStyleOptions {
  padding?: ScrollViewPadding;
}

/** Token-driven padding for a Lynx `scroll-view` element. */
export function resolveScrollViewStyle(theme: Theme, options: ScrollViewStyleOptions = {}): { container: Style } {
  const { padding = 'none' } = options;

  const container: Style = {
    padding: scrollPadding(theme, padding)
  };

  return { container };
}
