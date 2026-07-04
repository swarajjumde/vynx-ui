import type { Theme } from '@vynx/themes';
import type { Style } from './kit.js';

export type DividerOrientation = 'horizontal' | 'vertical';
export type DividerSpacing = 'none' | 'sm' | 'md' | 'lg';

export interface DividerStyleOptions {
  orientation?: DividerOrientation;
  spacing?: DividerSpacing;
}

function gap(theme: Theme, spacing: DividerSpacing): string {
  switch (spacing) {
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

/** Token-driven hairline rule rendered as a Lynx `view`. */
export function resolveDividerStyle(theme: Theme, options: DividerStyleOptions = {}): { container: Style } {
  const { orientation = 'horizontal', spacing = 'md' } = options;
  const size = gap(theme, spacing);

  if (orientation === 'vertical') {
    const container: Style = {
      width: '1px',
      height: '100%',
      backgroundColor: theme.colors.border,
      marginLeft: size,
      marginRight: size
    };
    return { container };
  }

  const container: Style = {
    width: '100%',
    height: '1px',
    backgroundColor: theme.colors.border,
    marginTop: size,
    marginBottom: size
  };
  return { container };
}
