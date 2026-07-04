import { describe, expect, it } from 'vitest';
import { createApp } from 'vue';
import { VDrawer } from '../src/index';

function render(component: any, props: Record<string, unknown>, slots: Record<string, unknown> = {}) {
  const emitted: Array<[string, ...unknown[]]> = [];
  const emit = (event: string, ...args: unknown[]) => emitted.push([event, ...args]);
  const app = createApp({});
  const vnode = app.runWithContext(() =>
    component.setup(props, { emit, slots, attrs: {}, expose: () => {} })()
  );
  return { vnode, emitted };
}

describe('VDrawer', () => {
  it('renders nothing while hidden', () => {
    const { vnode } = render(VDrawer, { visible: false, side: 'left' });
    expect(vnode).toBeNull();
  });

  it('renders a fixed backdrop anchored to the left by default and closes on backdrop tap', () => {
    const { vnode, emitted } = render(VDrawer, { visible: true, side: 'left' }, { default: () => 'menu' });
    expect(vnode.type).toBe('view');
    expect(vnode.props.style.position).toBe('fixed');
    expect(vnode.props.style.justifyContent).toBe('flex-start');
    expect(vnode.props.style.flexDirection).toBe('row');

    const panel = vnode.children[0];
    expect(typeof panel.props.catchtap).toBe('function');
    expect(panel.props.style.height).toBe('100%');

    vnode.props.bindtap();
    expect(emitted).toContainEqual(['update:visible', false]);
    expect(emitted).toContainEqual(['close']);
  });

  it('anchors to the right when side is right', () => {
    const { vnode } = render(VDrawer, { visible: true, side: 'right' });
    expect(vnode.props.style.justifyContent).toBe('flex-end');
  });
});
