import { describe, expect, it } from 'vitest';
import { createApp } from 'vue';
import { violetLight } from '@vynx/themes';
import { resolveConfirmDialogStyle, VConfirmDialog, VButton } from '../src/index';

function render(component: any, props: Record<string, unknown>, slots: Record<string, unknown> = {}) {
  const emitted: Array<[string, ...unknown[]]> = [];
  const emit = (event: string, ...args: unknown[]) => emitted.push([event, ...args]);
  const app = createApp({});
  const vnode = app.runWithContext(() =>
    component.setup(props, { emit, slots, attrs: {}, expose: () => {} })()
  );
  return { vnode, emitted };
}

describe('resolveConfirmDialogStyle', () => {
  it('uses the textMuted token for the message and a flex-end actions row', () => {
    const s = resolveConfirmDialogStyle(violetLight);
    expect(s.message.color).toBe(violetLight.colors.textMuted);
    expect(s.actions.justifyContent).toBe('flex-end');
  });
});

describe('VConfirmDialog', () => {
  it('renders nothing while hidden', () => {
    expect(render(VConfirmDialog, { visible: false }).vnode).toBeNull();
  });

  it('renders a centered dialog with title, message and two buttons; backdrop tap cancels', () => {
    const { vnode, emitted } = render(VConfirmDialog, {
      visible: true,
      title: 'Delete item?',
      message: 'This cannot be undone.'
    });
    expect(vnode.props.style.justifyContent).toBe('center');
    const panel = vnode.children[0];
    expect(panel.children[0].children).toBe('Delete item?');
    expect(panel.children[1].children).toBe('This cannot be undone.');

    const actionsRow = panel.children[2];
    expect(actionsRow.children).toHaveLength(2);
    expect(actionsRow.children[0].type).toBe(VButton);
    expect(actionsRow.children[1].type).toBe(VButton);

    vnode.props.bindtap();
    expect(emitted).toContainEqual(['cancel']);
    expect(emitted).toContainEqual(['update:visible', false]);
    expect(emitted).toContainEqual(['close']);
  });

  it('confirm button tap emits confirm then closes', () => {
    const { vnode, emitted } = render(VConfirmDialog, { visible: true, message: 'Sure?', tone: 'danger' });
    const panel = vnode.children[0];
    const actionsRow = panel.children[1];
    const confirmButton = actionsRow.children[1];

    expect(confirmButton.props.tone).toBe('danger');
    confirmButton.props.onTap();
    expect(emitted).toContainEqual(['confirm']);
    expect(emitted).toContainEqual(['update:visible', false]);
    expect(emitted).toContainEqual(['close']);
  });

  it('cancel button tap emits cancel then closes', () => {
    const { vnode, emitted } = render(VConfirmDialog, { visible: true, message: 'Sure?' });
    const panel = vnode.children[0];
    const actionsRow = panel.children[1];
    const cancelButton = actionsRow.children[0];

    cancelButton.props.onTap();
    expect(emitted).toContainEqual(['cancel']);
    expect(emitted).toContainEqual(['update:visible', false]);
    expect(emitted).toContainEqual(['close']);
  });
});
