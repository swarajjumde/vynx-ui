import type { Theme } from '@vynx/themes';
import type { ControlSize, Style } from './kit.js';

export type AvatarTone = 'primary' | 'neutral';

export interface AvatarStyleOptions {
  size?: ControlSize;
  tone?: AvatarTone;
}

function dimension(size: ControlSize): { box: string; font: string } {
  switch (size) {
    case 'sm':
      return { box: '32px', font: '13px' };
    case 'lg':
      return { box: '56px', font: '20px' };
    case 'md':
    default:
      return { box: '40px', font: '16px' };
  }
}

function avatarTone(theme: Theme, tone: AvatarTone): { base: string; on: string } {
  return tone === 'neutral'
    ? { base: theme.colors.neutral, on: theme.colors.onNeutral }
    : { base: theme.colors.primary, on: theme.colors.onPrimary };
}

export interface AvatarStyle {
  container: Style;
  label: Style;
  image: Style;
}

/** Token-driven circular avatar (initials `view`+`text`, or an `image`). */
export function resolveAvatarStyle(theme: Theme, options: AvatarStyleOptions = {}): AvatarStyle {
  const { size = 'md', tone = 'primary' } = options;
  const { box, font } = dimension(size);
  const colors = avatarTone(theme, tone);

  const container: Style = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: box,
    height: box,
    borderRadius: theme.radius.full,
    backgroundColor: colors.base,
    overflow: 'hidden'
  };

  const label: Style = {
    color: colors.on,
    fontSize: font,
    fontWeight: theme.typography.fontWeight.semibold,
    fontFamily: theme.typography.fontFamily
  };

  const image: Style = {
    width: box,
    height: box,
    borderRadius: theme.radius.full
  };

  return { container, label, image };
}
