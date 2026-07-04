import type { Theme } from '@vynx/themes';
import type { Style } from './kit.js';

/** Token-driven surface container for a list rendered via a scoped slot, a Lynx `view`. */
export function resolveDataViewStyle(theme: Theme): { container: Style } {
  const container: Style = {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.sm
  };

  return { container };
}
