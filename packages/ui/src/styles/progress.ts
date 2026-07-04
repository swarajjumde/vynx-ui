import type { Theme } from '@vynx/themes';
import type { Style } from './kit.js';

export type ProgressTone = 'primary' | 'success' | 'warning' | 'danger';

function progressTone(theme: Theme, tone: ProgressTone): string {
  switch (tone) {
    case 'success':
      return theme.colors.success;
    case 'warning':
      return theme.colors.warning;
    case 'danger':
      return theme.colors.danger;
    case 'primary':
    default:
      return theme.colors.primary;
  }
}

export interface ProgressStyleOptions {
  tone?: ProgressTone;
  value?: number;
}

export interface ProgressStyle {
  track: Style;
  fill: Style;
}

/** Token-driven, Lynx-compatible progress bar: a track `view` with a fill `view`. */
export function resolveProgressStyle(theme: Theme, options: ProgressStyleOptions = {}): ProgressStyle {
  const { tone = 'primary', value = 0 } = options;
  const clamped = Math.min(100, Math.max(0, value));

  const track: Style = {
    width: '100%',
    height: '8px',
    backgroundColor: theme.colors.neutral,
    borderRadius: theme.radius.full,
    overflow: 'hidden'
  };

  const fill: Style = {
    height: '100%',
    width: `${clamped}%`,
    backgroundColor: progressTone(theme, tone),
    borderRadius: theme.radius.full
  };

  return { track, fill };
}
