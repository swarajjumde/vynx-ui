import type { RadiusTokens, ShadowTokens, SpacingTokens, TypographyTokens } from './types.js';

/**
 * Base design tokens (primitives).
 *
 * These are the only place raw colour values are allowed to live; components
 * and themes always reference semantic roles derived from these scales.
 * The violet ramp is an original Vynx palette, not copied from another product.
 */
export const palette = {
  white: '#ffffff',
  black: '#0b0d11',
  violet: {
    50: '#f4f1fe',
    100: '#e7e0fd',
    200: '#cfc0fb',
    300: '#b199f6',
    400: '#916cef',
    500: '#7a4de6',
    600: '#6836cf',
    700: '#5629a8',
    800: '#442186',
    900: '#351c66'
  },
  neutral: {
    50: '#f7f7fa',
    100: '#eef0f4',
    200: '#dfe2ea',
    300: '#c4c9d4',
    400: '#9aa1b1',
    500: '#6f7688',
    600: '#515868',
    700: '#3b414e',
    800: '#262b34',
    900: '#171a20'
  },
  status: {
    success: '#1f9d6b',
    successDark: '#35b982',
    warning: '#d98a17',
    warningDark: '#e6a338',
    danger: '#dd4b4b',
    dangerHover: '#c53b3b',
    dangerDark: '#e56a6a',
    dangerDarkHover: '#ef8080',
    info: '#3b7fd4',
    infoDark: '#5b95e0'
  },
  // Semi-transparent backdrop scrims for overlays (the only non-hex colours).
  scrim: {
    light: 'rgba(23,26,32,0.45)',
    dark: 'rgba(0,0,0,0.6)'
  }
} as const;

export const spacing: SpacingTokens = {
  none: '0px',
  xs: '4px',
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '24px',
  '2xl': '32px'
};

export const radius: RadiusTokens = {
  none: '0px',
  sm: '4px',
  md: '8px',
  lg: '12px',
  xl: '16px',
  full: '9999px'
};

export const typography: TypographyTokens = {
  fontFamily: 'System, -apple-system, "Segoe UI", Roboto, sans-serif',
  fontSize: { xs: '12px', sm: '14px', md: '16px', lg: '18px', xl: '22px' },
  fontWeight: { regular: '400', medium: '500', semibold: '600', bold: '700' },
  lineHeight: { tight: '1.2', normal: '1.5' }
};

export const shadow: ShadowTokens = {
  none: 'none',
  sm: '0px 1px 2px rgba(15,18,32,0.08)',
  md: '0px 4px 12px rgba(15,18,32,0.12)',
  lg: '0px 12px 28px rgba(15,18,32,0.18)'
};
