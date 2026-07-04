import { describe, expect, it } from 'vitest';
import { createApp } from 'vue';
import { violetLight } from '@vynx/themes';
import { resolveAccordionStyle, VAccordion } from '../src/index';

function render(component: any, props: Record<string, unknown>, slots: Record<string, unknown> = {}) {
  const emitted: Array<[string, ...unknown[]]> = [];
  const emit = (event: string, ...args: unknown[]) => emitted.push([event, ...args]);
  const app = createApp({});
  const vnode = app.runWithContext(() =>
    component.setup(props, { emit, slots, attrs: {}, expose: () => {} })()
  );
  return { vnode, emitted };
}

describe('resolveAccordionStyle', () => {
  it('uses the surface token for the container', () => {
    const open = resolveAccordionStyle(violetLight, { open: true });
    expect(open.container.backgroundColor).toBe(violetLight.colors.surface);
    const closed = resolveAccordionStyle(violetLight, { open: false });
    expect(closed.container.backgroundColor).toBe(violetLight.colors.surface);
  });
});

describe('VAccordion', () => {
  it('exposes a stable name, props and events', () => {
    expect(VAccordion.name).toBe('VAccordion');
    expect(VAccordion.emits).toContain('update:open');
    expect(VAccordion.emits).toContain('toggle');
    expect((VAccordion.props as Record<string, unknown>).label).toBeDefined();
  });

  it('does not render a content view while closed', () => {
    const { vnode } = render(VAccordion, { label: 'Details', open: false }, { default: () => 'body' });
    expect(vnode.children).toHaveLength(1);
  });

  it('renders the content view when open', () => {
    const { vnode } = render(VAccordion, { label: 'Details', open: true }, { default: () => 'body' });
    expect(vnode.children).toHaveLength(2);
    expect(vnode.children[1].children).toBe('body');
  });

  it('shows the closed/open chevron glyph', () => {
    const closed = render(VAccordion, { label: 'Details', open: false });
    expect(closed.vnode.children[0].children[1].children).toBe('▸');
    const open = render(VAccordion, { label: 'Details', open: true });
    expect(open.vnode.children[0].children[1].children).toBe('▾');
  });

  it('emits update:open and toggle with the flipped state on header tap', () => {
    const { vnode, emitted } = render(VAccordion, { label: 'Details', open: false });
    vnode.children[0].props.bindtap();
    expect(emitted).toContainEqual(['update:open', true]);
    expect(emitted).toContainEqual(['toggle', true]);
  });
});
