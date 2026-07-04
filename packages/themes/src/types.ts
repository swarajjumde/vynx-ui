export type ColorScheme = 'light' | 'dark';

export interface ThemeColors {
  background: string;
  surface: string;
  surfaceElevated: string;
  border: string;
  text: string;
  textMuted: string;
  textInverse: string;
  primary: string;
  primaryHover: string;
  primaryActive: string;
  onPrimary: string;
  neutral: string;
  neutralHover: string;
  onNeutral: string;
  success: string;
  onSuccess: string;
  warning: string;
  onWarning: string;
  danger: string;
  dangerHover: string;
  onDanger: string;
  info: string;
  onInfo: string;
}

export interface SpacingTokens {
  none: string;
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
}

export interface RadiusTokens {
  none: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  full: string;
}

export interface TypographyTokens {
  fontFamily: string;
  fontSize: { xs: string; sm: string; md: string; lg: string; xl: string };
  fontWeight: { regular: string; medium: string; semibold: string; bold: string };
  lineHeight: { tight: string; normal: string };
}

export interface ShadowTokens {
  none: string;
  sm: string;
  md: string;
  lg: string;
}

export interface Theme {
  name: string;
  scheme: ColorScheme;
  colors: ThemeColors;
  spacing: SpacingTokens;
  radius: RadiusTokens;
  typography: TypographyTokens;
  shadow: ShadowTokens;
}
