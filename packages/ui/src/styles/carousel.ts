import type { Theme } from '@vynx/themes';
import type { Style } from './kit.js';

export interface CarouselStyleOptions {
  slideWidth?: string;
}

/** Token-driven horizontal scroll container and slide sizing for a Lynx `scroll-view`. */
export function resolveCarouselStyle(theme: Theme, options: CarouselStyleOptions = {}): { container: Style; slide: Style } {
  const { slideWidth = '280px' } = options;

  const container: Style = {
    display: 'flex'
  };

  const slide: Style = {
    width: slideWidth,
    marginRight: theme.spacing.sm
  };

  return { container, slide };
}
