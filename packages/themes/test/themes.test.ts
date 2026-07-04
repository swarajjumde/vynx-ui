import { describe, expect, it } from 'vitest';
import {
  darkTheme,
  lightTheme,
  palette,
  radius,
  spacing,
  themes,
  typography,
  violetDark,
  violetLight
} from '../src/index';
import type { Theme, ThemeColors } from '../src/index';

const colorRoles: (keyof ThemeColors)[] = [
  'background', 'surface', 'surfaceElevated', 'border', 'text', 'textMuted', 'textInverse',
  'primary', 'primaryHover', 'primaryActive', 'onPrimary',
  'neutral', 'neutralHover', 'onNeutral',
  'success', 'onSuccess', 'warning', 'onWarning', 'danger', 'dangerHover', 'onDanger', 'info', 'onInfo'
];

const allThemes: Theme[] = [lightTheme, darkTheme, violetLight, violetDark];

describe('base tokens', () => {
  it('exposes spacing, radius and typography scales', () => {
    expect(spacing.md).toBe('12px');
    expect(radius.full).toBe('9999px');
    expect(typography.fontWeight.semibold).toBe('600');
  });

  it('keeps raw colours in the palette primitive', () => {
    expect(palette.violet[500]).toMatch(/^#[0-9a-f]{6}$/i);
  });
});

describe('theme outputs', () => {
  it('defines every semantic colour role for every theme', () => {
    for (const theme of allThemes) {
      for (const role of colorRoles) {
        expect(theme.colors[role], `${theme.name}.${role}`).toMatch(/^#[0-9a-f]{3,8}$/i);
      }
    }
  });

  it('provides distinct light and dark outputs', () => {
    expect(lightTheme.scheme).toBe('light');
    expect(darkTheme.scheme).toBe('dark');
    expect(lightTheme.colors.background).not.toBe(darkTheme.colors.background);
  });

  it('ships an original violet brand theme with light and dark variants', () => {
    expect(themes.violet.light).toBe(violetLight);
    expect(themes.violet.dark).toBe(violetDark);
    expect(violetLight.colors.primary).toBe(palette.violet[600]);
    expect(violetDark.colors.primary).toBe(palette.violet[400]);
    expect(violetLight.scheme).toBe('light');
    expect(violetDark.scheme).toBe('dark');
  });
});
