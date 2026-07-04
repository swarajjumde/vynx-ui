import type { Theme } from '@vynx/themes';
import type { Style } from './kit.js';

export type IconSize = 'sm' | 'md' | 'lg';

export interface IconStyleOptions {
  size?: IconSize;
}

function box(size: IconSize): string {
  switch (size) {
    case 'sm':
      return '16px';
    case 'lg':
      return '24px';
    case 'md':
    default:
      return '20px';
  }
}

/**
 * Sizing for an image-based icon. Lynx has no font-icons, so VIcon renders an
 * `image` asset; colour is baked into the asset. `theme` is accepted for a
 * stable resolver signature and future tinting support.
 */
export function resolveIconStyle(_theme: Theme, options: IconStyleOptions = {}): { image: Style } {
  const { size = 'md' } = options;
  const d = box(size);
  return { image: { width: d, height: d } };
}
