import type { Theme } from '@vynx/themes';

/**
 * Shared style kit: the primitives every component resolver builds on.
 *
 * Component-specific resolvers live in sibling files (one per component) and
 * import from here. This keeps `styles.ts` a thin public barrel and lets many
 * components be authored in parallel without editing a single shared file.
 */

export type ControlSize = 'sm' | 'md' | 'lg';

/** A Lynx-compatible inline style object (no DOM / CSSOM types). */
export type Style = Record<string, string | number>;

export interface CompoundStyle {
  container: Style;
  label: Style;
}

export interface TonePair {
  base: string;
  hover: string;
  on: string;
}

/** Padding + font size for a control size, sourced from spacing/typography tokens. */
export function sizing(theme: Theme, size: ControlSize): { padding: string; fontSize: string } {
  switch (size) {
    case 'sm':
      return { padding: `${theme.spacing.xs} ${theme.spacing.sm}`, fontSize: theme.typography.fontSize.sm };
    case 'lg':
      return { padding: `${theme.spacing.md} ${theme.spacing.lg}`, fontSize: theme.typography.fontSize.lg };
    case 'md':
    default:
      return { padding: `${theme.spacing.sm} ${theme.spacing.md}`, fontSize: theme.typography.fontSize.md };
  }
}
