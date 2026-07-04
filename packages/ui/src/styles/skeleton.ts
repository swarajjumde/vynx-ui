import type { Theme } from '@vynx/themes';
import type { Style } from './kit.js';

export type SkeletonRounded = 'sm' | 'md' | 'lg' | 'full';

function roundedRadius(theme: Theme, rounded: SkeletonRounded): string {
  switch (rounded) {
    case 'sm':
      return theme.radius.sm;
    case 'lg':
      return theme.radius.lg;
    case 'full':
      return theme.radius.full;
    case 'md':
    default:
      return theme.radius.md;
  }
}

export interface SkeletonStyleOptions {
  width?: string;
  height?: string;
  rounded?: SkeletonRounded;
}

/** Token-driven, Lynx-compatible loading placeholder: a single muted `view`. */
export function resolveSkeletonStyle(theme: Theme, options: SkeletonStyleOptions = {}): { container: Style } {
  const { width = '100%', height = '16px', rounded = 'md' } = options;

  const container: Style = {
    width,
    height,
    backgroundColor: theme.colors.neutral,
    borderRadius: roundedRadius(theme, rounded),
    opacity: 0.6
  };

  return { container };
}
