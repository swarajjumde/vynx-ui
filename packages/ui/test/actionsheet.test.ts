import { describe, expect, it } from 'vitest';
import { createApp } from 'vue';
import { violetLight } from '@vynx/themes';
import { resolveActionSheetItemStyle, VActionSheet } from '../src/index';

function render(component: any, props: Record<string, unknown>, slots: Record<string, unknown> = {}) {
  const emitted: Array<[string, ...unknown[]]> = [];
  const emit = (event: string, ...args: unknown[]) => emitted.push([event, ...args]);
  const app = createApp({});
  const vnode = app.runWithContext(() =>
    component.setup(props, { emit, slots, attrs: {}, expose: () => {} })()
  );
  return { vnode, emitted };
}

describe('resolveActionSheetItemStyle', () => {
  it('uses the danger token for the danger tone and the text token otherwise', () => {
    expect(resolveActionSheetItemStyle(violetLight, { tone: 'danger' }).label.color).toBe(violetLight.colors.danger);
    expect(resolveActionSheetItemStyle(violetLight).label.color).toBe(violetLight.colors.text);
    expect(resolveActionSheetItemStyle(violetLight).row.justifyContent).toBe('center');
  });
});

describe('VActionSheet', () => {
  it('renders nothing while hidden', () => {
    const { vnode } = render(VActionSheet, { visible: false, actions: [] });
    expect(vnode).toBeNull();
  });

  it('renders a fixed bottom backdrop + panel and closes on backdrop tap without selecting', () => {
    const actions = [
      { label: 'Share', value: 'share' },
      { label: 'Delete', value: 'delete', tone: 'danger' as const }
    ];
    const { vnode, emitted } = render(VActionSheet, { visible: true, actions });
    expect(vnode.type).toBe('view');
    expect(vnode.props.style.position).toBe('fixed');
    expect(vnode.props.style.justifyContent).toBe('flex-end');

    const panel = vnode.children[0];
    expect(typeof panel.props.catchtap).toBe('function');
    expect(panel.children).toHaveLength(2);

    vnode.props.bindtap();
    expect(emitted).toContainEqual(['update:visible', false]);
    expect(emitted).toContainEqual(['close']);
    expect(emitted.some(([event]) => event === 'select')).toBe(false);
  });

  it('emits select with the tapped action value, then closes', () => {
    const actions = [
      { label: 'Share', value: 'share' },
      { label: 'Delete', value: 'delete', tone: 'danger' as const }
    ];
    const { vnode, emitted } = render(VActionSheet, { visible: true, actions });
    const panel = vnode.children[0];
    const deleteRow = panel.children[1];

    deleteRow.props.bindtap();
    expect(emitted).toContainEqual(['select', 'delete']);
    expect(emitted).toContainEqual(['update:visible', false]);
    expect(emitted).toContainEqual(['close']);
  });
});
