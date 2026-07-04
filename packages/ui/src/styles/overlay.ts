import type { Theme } from '@vynx/themes';
import type { Style } from './kit.js';

export type OverlayPlacement = 'center' | 'bottom' | 'top' | 'left' | 'right';

export interface OverlayStyleOptions {
  placement?: OverlayPlacement;
  /** When false, the backdrop is transparent (non-blocking, e.g. toasts). */
  scrim?: boolean;
}

export interface OverlayStyle {
  backdrop: Style;
  panel: Style;
}

/**
 * Shared overlay geometry. On Lynx, `position: fixed` is treated as a direct
 * child of the root node, so a fixed backdrop escapes parent layout without a
 * portal (see docs/decisions/overlays.md). The backdrop's flex alignment places
 * the panel; the panel carries the surface treatment for the placement.
 */
export function resolveOverlayStyle(theme: Theme, options: OverlayStyleOptions = {}): OverlayStyle {
  const { placement = 'center', scrim = true } = options;
  const side = placement === 'left' || placement === 'right';

  const backdrop: Style = {
    position: 'fixed',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    zIndex: 0,
    display: 'flex',
    flexDirection: side ? 'row' : 'column',
    alignItems: placement === 'center' ? 'center' : 'stretch',
    justifyContent:
      placement === 'center'
        ? 'center'
        : placement === 'bottom' || placement === 'right'
          ? 'flex-end'
          : 'flex-start',
    backgroundColor: scrim ? theme.colors.overlay : 'transparent'
  };

  const panel: Style = {
    zIndex: 0,
    backgroundColor: theme.colors.surfaceElevated,
    padding: theme.spacing.lg,
    boxShadow: theme.shadow.lg
  };

  if (placement === 'center') {
    panel.borderRadius = theme.radius.lg;
    panel.marginLeft = theme.spacing.lg;
    panel.marginRight = theme.spacing.lg;
  } else if (placement === 'bottom') {
    panel.borderTopLeftRadius = theme.radius.lg;
    panel.borderTopRightRadius = theme.radius.lg;
  } else if (placement === 'top') {
    panel.borderBottomLeftRadius = theme.radius.lg;
    panel.borderBottomRightRadius = theme.radius.lg;
  } else {
    // left / right drawer
    panel.height = '100%';
    panel.width = '80%';
  }

  return { backdrop, panel };
}
