import { describe, expect, it } from 'vitest';
import { createApp } from 'vue';
import { violetLight } from '@vynx/themes';
import { resolveTabBarItemStyle, VTabBar } from '../src/index';

function render(component: any, props: Record<string, unknown>) {
  const emitted: Array<[string, ...unknown[]]> = [];
  const emit = (event: string, ...args: unknown[]) => emitted.push([event, ...args]);
  const app = createApp({});
  const vnode = app.runWithContext(() =>
    component.setup(props, { emit, slots: {}, attrs: {}, expose: () => {} })()
  );
  return { vnode, emitted };
}

const items = [
  { label: 'Home', value: 'home' },
  { label: 'Search', value: 'search', icon: 'https://example.com/search.png' }
];

describe('VTabBar', () => {
  it('resolveTabBarItemStyle carries the active state on the label', () => {
    const active = resolveTabBarItemStyle(violetLight, { active: true });
    expect(active.label.color).toBe(violetLight.colors.primary);
    expect(active.label.fontWeight).toBe(violetLight.typography.fontWeight.semibold);

    const inactive = resolveTabBarItemStyle(violetLight, { active: false });
    expect(inactive.label.color).toBe(violetLight.colors.textMuted);
  });

  it('exposes a stable name, props and events', () => {
    expect(VTabBar.name).toBe('VTabBar');
    expect(VTabBar.emits).toContain('update:modelValue');
    expect(VTabBar.emits).toContain('change');
    expect((VTabBar.props as Record<string, unknown>).items).toBeDefined();
  });

  it('renders one tab per item, an image only when icon is set, and selects on tap', () => {
    const { vnode, emitted } = render(VTabBar, { modelValue: 'home', items });
    expect(vnode.children).toHaveLength(2);
    // First item (no icon) renders only a text label.
    expect(vnode.children[0].children).toHaveLength(1);
    expect(vnode.children[0].children[0].type).toBe('text');
    // Second item (with icon) renders an image + a text label.
    expect(vnode.children[1].children[0].type).toBe('image');
    expect(vnode.children[1].children[0].props.src).toBe('https://example.com/search.png');

    vnode.children[1].props.bindtap();
    expect(emitted).toContainEqual(['update:modelValue', 'search']);
    expect(emitted).toContainEqual(['change', 'search']);
  });

  it('does not re-emit when tapping the already-active tab', () => {
    const { vnode, emitted } = render(VTabBar, { modelValue: 'home', items });
    vnode.children[0].props.bindtap();
    expect(emitted).toHaveLength(0);
  });
});
