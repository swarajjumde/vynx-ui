import type { Theme } from '@vynx/themes';
import { sizing, type ControlSize, type Style } from './kit.js';

export interface SearchInputStyleOptions {
  size?: ControlSize;
  disabled?: boolean;
}

export interface SearchInputStyle {
  container: Style;
  input: Style;
  clear: Style;
}

/** Token-driven style for a text input with a clear affordance. */
export function resolveSearchInputStyle(theme: Theme, options: SearchInputStyleOptions = {}): SearchInputStyle {
  const { size = 'md', disabled = false } = options;
  const { fontSize } = sizing(theme, size);

  const container: Style = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: theme.colors.border,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.surface,
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    opacity: disabled ? 0.5 : 1
  };

  const input: Style = {
    color: theme.colors.text,
    fontSize,
    fontFamily: theme.typography.fontFamily,
    flexGrow: 1,
    paddingTop: theme.spacing.sm,
    paddingBottom: theme.spacing.sm
  };

  const clear: Style = {
    color: theme.colors.textMuted,
    fontSize: theme.typography.fontSize.md,
    paddingLeft: theme.spacing.sm
  };

  return { container, input, clear };
}
