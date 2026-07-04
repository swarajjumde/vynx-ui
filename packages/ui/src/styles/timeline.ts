import type { Theme } from '@vynx/themes';
import type { Style } from './kit.js';

export interface TimelineItemStyleOptions {
  last?: boolean;
}

export interface TimelineItemStyle {
  row: Style;
  marker: Style;
  dot: Style;
  line: Style;
  content: Style;
  title: Style;
  time: Style;
  description: Style;
}

/** Token-driven column container for a vertical timeline, a Lynx `view`. */
export function resolveTimelineStyle(theme: Theme): { container: Style } {
  const container: Style = {
    display: 'flex',
    flexDirection: 'column'
  };

  return { container };
}

/** Token-driven style for one timeline event row, connector, and content. */
export function resolveTimelineItemStyle(theme: Theme, options: TimelineItemStyleOptions = {}): TimelineItemStyle {
  const { last = false } = options;

  const row: Style = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'stretch'
  };

  const marker: Style = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '24px',
    marginRight: theme.spacing.sm
  };

  const dot: Style = {
    width: '10px',
    height: '10px',
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.primary
  };

  const line: Style = {
    width: '2px',
    flexGrow: 1,
    backgroundColor: last ? 'transparent' : theme.colors.border,
    marginTop: '2px'
  };

  const content: Style = {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    paddingBottom: theme.spacing.md
  };

  const title: Style = {
    color: theme.colors.text,
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.semibold,
    fontFamily: theme.typography.fontFamily
  };

  const time: Style = {
    color: theme.colors.textMuted,
    fontSize: theme.typography.fontSize.xs,
    fontFamily: theme.typography.fontFamily
  };

  const description: Style = {
    color: theme.colors.textMuted,
    fontSize: theme.typography.fontSize.sm,
    fontFamily: theme.typography.fontFamily
  };

  return { row, marker, dot, line, content, title, time, description };
}
