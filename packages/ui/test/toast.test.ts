import { describe, expect, it } from 'vitest';
import { createApp } from 'vue';
import { violetLight } from '@vynx/themes';
import { resolveToastStyle, VToast } from '../src/index';

function render(component: any, props: Record<string, unknown>, slots: Record<string, unknown> = {}) {
  const emitted: Array<[string, ...unknown[]]> = [];
  const emit = (event: string, ...args: unknown[]) => emitted.push([event, ...args]);
  const app = createApp({});
  const vnode = app.runWithContext(() =>
    component.setup(props, { emit, slots, attrs: {}, expose: () => {} })()
  );
  return { vnode, emitted };
}

describe('resolveToastStyle', () => {
  it('maps the success tone to the success token and its on-token label', () => {
    const success = resolveToastStyle(violetLight, { tone: 'success' });
    expect(success.container.backgroundColor).toBe(violetLight.colors.success);
    expect(success.label.color).toBe(violetLight.colors.onSuccess);
  });

  it('defaults to the neutral tone', () => {
    const neutral = resolveToastStyle(violetLight);
    expect(neutral.container.backgroundColor).toBe(violetLight.colors.neutral);
    expect(neutral.label.color).toBe(violetLight.colors.onNeutral);
  });
});

describe('VToast', () => {
  it('renders nothing while hidden', () => {
    const { vnode } = render(VToast, { visible: false, message: 'Saved' });
    expect(vnode).toBeNull();
  });

  it('renders a fixed, transparent (non-blocking) backdrop and closes on backdrop tap', () => {
    const { vnode, emitted } = render(VToast, { visible: true, message: 'Saved', tone: 'success', position: 'bottom' });
    expect(vnode.type).toBe('view');
    expect(vnode.props.style.position).toBe('fixed');
    expect(vnode.props.style.backgroundColor).toBe('transparent');

    const pill = vnode.children[0];
    expect(typeof pill.props.catchtap).toBe('function');
    expect(pill.props.style.backgroundColor).toBe(violetLight.colors.success);
    expect(pill.children[0].children).toBe('Saved');

    vnode.props.bindtap();
    expect(emitted).toContainEqual(['update:visible', false]);
    expect(emitted).toContainEqual(['close']);
  });

  it('closes when the pill itself is tapped', () => {
    const { vnode, emitted } = render(VToast, { visible: true, message: 'Saved' });
    const pill = vnode.children[0];
    pill.props.catchtap();
    expect(emitted).toContainEqual(['update:visible', false]);
    expect(emitted).toContainEqual(['close']);
  });
});
