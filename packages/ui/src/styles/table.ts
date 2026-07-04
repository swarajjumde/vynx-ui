import type { Theme } from '@vynx/themes';
import type { Style } from './kit.js';

export interface TableStyle {
  container: Style;
  headerRow: Style;
  headerCell: Style;
  row: Style;
  cell: Style;
}

/** Token-driven constrained table (header + rows), a Lynx `view` tree. */
export function resolveTableStyle(theme: Theme): TableStyle {
  const container: Style = {
    display: 'flex',
    flexDirection: 'column',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: theme.colors.border,
    borderRadius: theme.radius.md,
    overflow: 'hidden'
  };

  const headerRow: Style = {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: theme.colors.neutral,
    paddingTop: theme.spacing.sm,
    paddingBottom: theme.spacing.sm,
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md
  };

  const headerCell: Style = {
    flexGrow: 1,
    color: theme.colors.textMuted,
    fontSize: theme.typography.fontSize.xs,
    fontWeight: theme.typography.fontWeight.semibold,
    fontFamily: theme.typography.fontFamily
  };

  const row: Style = {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: theme.spacing.sm,
    paddingBottom: theme.spacing.sm,
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    borderTopWidth: '1px',
    borderTopStyle: 'solid',
    borderTopColor: theme.colors.border
  };

  const cell: Style = {
    flexGrow: 1,
    color: theme.colors.text,
    fontSize: theme.typography.fontSize.sm,
    fontFamily: theme.typography.fontFamily
  };

  return { container, headerRow, headerCell, row, cell };
}
