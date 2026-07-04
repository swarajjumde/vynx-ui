import { palette, radius, shadow, spacing, typography } from './primitives.js';
import type { Theme, ThemeColors } from './types.js';

const shared = { spacing, radius, typography, shadow };

const status = {
  light: {
    success: palette.status.success,
    onSuccess: palette.white,
    warning: palette.status.warning,
    onWarning: '#1a1205',
    danger: palette.status.danger,
    dangerHover: palette.status.dangerHover,
    onDanger: palette.white,
    info: palette.status.info,
    onInfo: palette.white
  },
  dark: {
    success: palette.status.successDark,
    onSuccess: '#05120c',
    warning: palette.status.warningDark,
    onWarning: '#1a1205',
    danger: palette.status.dangerDark,
    dangerHover: palette.status.dangerDarkHover,
    onDanger: '#200606',
    info: palette.status.infoDark,
    onInfo: '#04101f'
  }
} satisfies Record<'light' | 'dark', Pick<ThemeColors,
  'success' | 'onSuccess' | 'warning' | 'onWarning' | 'danger' | 'dangerHover' | 'onDanger' | 'info' | 'onInfo'>>;

/** Neutral light theme. */
export const lightTheme: Theme = {
  name: 'light',
  scheme: 'light',
  colors: {
    background: palette.neutral[50],
    surface: palette.white,
    surfaceElevated: palette.white,
    border: palette.neutral[200],
    text: palette.neutral[900],
    textMuted: palette.neutral[500],
    textInverse: palette.white,
    primary: palette.violet[500],
    primaryHover: palette.violet[600],
    primaryActive: palette.violet[700],
    onPrimary: palette.white,
    neutral: palette.neutral[100],
    neutralHover: palette.neutral[200],
    onNeutral: palette.neutral[900],
    overlay: palette.scrim.light,
    ...status.light
  },
  ...shared
};

/** Neutral dark theme. */
export const darkTheme: Theme = {
  name: 'dark',
  scheme: 'dark',
  colors: {
    background: palette.neutral[900],
    surface: palette.neutral[800],
    surfaceElevated: '#2f3540',
    border: palette.neutral[700],
    text: palette.neutral[50],
    textMuted: palette.neutral[400],
    textInverse: palette.neutral[900],
    primary: palette.violet[400],
    primaryHover: palette.violet[300],
    primaryActive: palette.violet[200],
    onPrimary: palette.white,
    neutral: palette.neutral[700],
    neutralHover: palette.neutral[600],
    onNeutral: palette.neutral[50],
    overlay: palette.scrim.dark,
    ...status.dark
  },
  ...shared
};

/** Original Vynx violet brand theme — light variant. */
export const violetLight: Theme = {
  name: 'violet-light',
  scheme: 'light',
  colors: {
    background: palette.violet[50],
    surface: palette.white,
    surfaceElevated: palette.white,
    border: palette.violet[200],
    text: palette.violet[900],
    textMuted: '#6a5b8a',
    textInverse: palette.white,
    primary: palette.violet[600],
    primaryHover: palette.violet[700],
    primaryActive: palette.violet[800],
    onPrimary: palette.white,
    neutral: palette.violet[100],
    neutralHover: palette.violet[200],
    onNeutral: palette.violet[900],
    overlay: palette.scrim.light,
    ...status.light
  },
  ...shared
};

/** Original Vynx violet brand theme — dark variant. */
export const violetDark: Theme = {
  name: 'violet-dark',
  scheme: 'dark',
  colors: {
    background: '#241245',
    surface: '#2c1856',
    surfaceElevated: '#38206b',
    border: '#4a2e8a',
    text: palette.violet[50],
    textMuted: '#b9a9e6',
    textInverse: '#1a0b33',
    primary: palette.violet[400],
    primaryHover: palette.violet[300],
    primaryActive: palette.violet[200],
    onPrimary: '#1a0b33',
    neutral: '#3a2470',
    neutralHover: '#472c88',
    onNeutral: palette.violet[50],
    overlay: palette.scrim.dark,
    ...status.dark
  },
  ...shared
};

/** Registry of all shipped themes. */
export const themes = {
  light: lightTheme,
  dark: darkTheme,
  violet: {
    light: violetLight,
    dark: violetDark
  }
} as const;
