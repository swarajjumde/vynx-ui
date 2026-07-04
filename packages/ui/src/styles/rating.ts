import type { Theme } from '@vynx/themes';
import type { Style } from './kit.js';

export interface RatingStyleOptions {
  disabled?: boolean;
}

export interface RatingStarStyleOptions {
  filled?: boolean;
}

/** Row container for a set of tappable rating stars. */
export function resolveRatingStyle(theme: Theme, options: RatingStyleOptions = {}): { container: Style } {
  const { disabled = false } = options;

  const container: Style = {
    display: 'flex',
    flexDirection: 'row',
    opacity: disabled ? 0.5 : 1
  };

  return { container };
}

/** Token-driven style for a single rating star. */
export function resolveRatingStarStyle(theme: Theme, options: RatingStarStyleOptions = {}): { star: Style } {
  const { filled = false } = options;

  const star: Style = {
    color: filled ? theme.colors.warning : theme.colors.textMuted,
    fontSize: theme.typography.fontSize.lg,
    fontFamily: theme.typography.fontFamily
  };

  return { star };
}
