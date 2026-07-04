import type { Theme } from '@vynx/themes';
import type { Style } from './kit.js';

export interface ListItemStyleOptions {
  disabled?: boolean;
}

/** Token-driven tappable row container for a Lynx `view` element. */
export function resolveListItemStyle(theme: Theme, options: ListItemStyleOptions = {}): { container: Style } {
  const { disabled = false } = options;

  const container: Style = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.md,
    backgroundColor: theme.colors.surface,
    opacity: disabled ? 0.5 : 1
  };

  return { container };
}

/** Token-driven surface container that groups `VListItem`s, a Lynx `view`. */
export function resolveListStyle(theme: Theme): { container: Style } {
  const container: Style = {
    backgroundColor: theme.colors.surface,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: theme.colors.border,
    borderRadius: theme.radius.lg,
    overflow: 'hidden'
  };

  return { container };
}
