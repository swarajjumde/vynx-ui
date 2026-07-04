import type { Theme } from '@vynx/themes';
import type { Style } from './kit.js';

export interface CardStyleOptions {
  elevated?: boolean;
}

export function resolveCardStyle(theme: Theme, options: CardStyleOptions = {}): { container: Style } {
  const { elevated = false } = options;

  const container: Style = {
    backgroundColor: elevated ? theme.colors.surfaceElevated : theme.colors.surface,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: theme.colors.border,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.lg,
    boxShadow: elevated ? theme.shadow.md : theme.shadow.sm
  };

  return { container };
}
