import type { Theme } from '@vynx/themes';
import type { Style } from './kit.js';

export interface AccordionStyleOptions {
  open?: boolean;
}

export interface AccordionStyle {
  container: Style;
  header: Style;
  label: Style;
  icon: Style;
  content: Style;
}

/** Token-driven, Lynx-compatible single collapsible section. */
export function resolveAccordionStyle(theme: Theme, _options: AccordionStyleOptions = {}): AccordionStyle {
  // `_options.open` does not currently change the container/header/label
  // styling, but is accepted so callers can pass the full option shape and
  // future variants (e.g. an open-state border colour) can be added without a
  // signature change.
  const container: Style = {
    backgroundColor: theme.colors.surface,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: theme.colors.border,
    borderRadius: theme.radius.md,
    overflow: 'hidden'
  };

  const header: Style = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing.md
  };

  const label: Style = {
    color: theme.colors.text,
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.semibold,
    fontFamily: theme.typography.fontFamily
  };

  const icon: Style = {
    color: theme.colors.textMuted,
    fontSize: theme.typography.fontSize.md
  };

  const content: Style = {
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    paddingBottom: theme.spacing.md
  };

  return { container, header, label, icon, content };
}
