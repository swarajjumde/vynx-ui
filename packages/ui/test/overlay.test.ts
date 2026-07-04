import { describe, expect, it } from 'vitest';
import { createApp } from 'vue';
import { violetLight } from '@vynx/themes';
import { resolveOverlayStyle, VBottomSheet, VDialog } from '../src/index';

function render(component: any, props: Record<string, unknown>, slots: Record<string, unknown> = {}) {
  const emitted: Array<[string, ...unknown[]]> = [];
  const emit = (event: string, ...args: unknown[]) => emitted.push([event, ...args]);
  const app = createApp({});
  const vnode = app.runWithContext(() =>
    component.setup(props, { emit, slots, attrs: {}, expose: () => {} })()
  );
  return { vnode, emitted };
}

describe('resolveOverlayStyle', () => {
  it('always uses a fixed backdrop and the overlay scrim token', () => {
    const s = resolveOverlayStyle(violetLight, { placement: 'center' });
    expect(s.backdrop.position).toBe('fixed');
    expect(s.backdrop.backgroundColor).toBe(violetLight.colors.overlay);
    expect(s.panel.backgroundColor).toBe(violetLight.colors.surfaceElevated);
  });

  it('places the panel by flex alignment per placement', () => {
    expect(resolveOverlayStyle(violetLight, { placement: 'center' }).backdrop.justifyContent).toBe('center');
    expect(resolveOverlayStyle(violetLight, { placement: 'bottom' }).backdrop.justifyContent).toBe('flex-end');
    expect(resolveOverlayStyle(violetLight, { placement: 'top' }).backdrop.justifyContent).toBe('flex-start');
    expect(resolveOverlayStyle(violetLight, { placement: 'left' }).backdrop.flexDirection).toBe('row');
    expect(resolveOverlayStyle(violetLight, { placement: 'right' }).backdrop.justifyContent).toBe('flex-end');
  });

  it('drops the scrim colour when scrim is false', () => {
    expect(resolveOverlayStyle(violetLight, { scrim: false }).backdrop.backgroundColor).toBe('transparent');
  });
});

describe('VBottomSheet', () => {
  it('renders nothing while hidden', () => {
    const { vnode } = render(VBottomSheet, { visible: false });
    expect(vnode).toBeNull();
  });

  it('renders a fixed backdrop + panel when visible and closes on backdrop tap', () => {
    const { vnode, emitted } = render(VBottomSheet, { visible: true }, { default: () => 'body' });
    expect(vnode.type).toBe('view');
    expect(vnode.props.style.position).toBe('fixed');
    const panel = vnode.children[0];
    expect(typeof panel.props.catchtap).toBe('function');

    vnode.props.bindtap();
    expect(emitted).toContainEqual(['update:visible', false]);
    expect(emitted).toContainEqual(['close']);
  });
});

describe('VDialog', () => {
  it('renders nothing while hidden', () => {
    expect(render(VDialog, { visible: false }).vnode).toBeNull();
  });

  it('renders a centered dialog with a title and closes on backdrop tap', () => {
    const { vnode, emitted } = render(VDialog, { visible: true, title: 'Confirm' }, { default: () => 'body' });
    expect(vnode.props.style.justifyContent).toBe('center');
    const panel = vnode.children[0];
    expect(panel.children[0].children).toBe('Confirm');

    vnode.props.bindtap();
    expect(emitted).toContainEqual(['update:visible', false]);
    expect(emitted).toContainEqual(['close']);
  });
});
