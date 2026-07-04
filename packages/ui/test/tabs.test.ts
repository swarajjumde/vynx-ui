import { describe, expect, it } from 'vitest';
import { createApp } from 'vue';
import { violetLight } from '@vynx/themes';
import { resolveTabItemStyle, resolveTabsStyle, VTabs } from '../src/index';

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
  { label: 'All', value: 'all' },
  { label: 'Unread', value: 'unread' }
];

describe('tabs style helpers', () => {
  it('resolveTabsStyle uses the border token', () => {
    expect(resolveTabsStyle(violetLight).container.borderBottomColor).toBe(violetLight.colors.border);
  });

  it('resolveTabItemStyle carries the active state on the underline and label', () => {
    const active = resolveTabItemStyle(violetLight, { active: true });
    expect(active.tab.borderBottomColor).toBe(violetLight.colors.primary);
    expect(active.label.color).toBe(violetLight.colors.text);
    expect(active.label.fontWeight).toBe(violetLight.typography.fontWeight.semibold);

    const inactive = resolveTabItemStyle(violetLight, { active: false });
    expect(inactive.tab.borderBottomColor).toBe('transparent');
    expect(inactive.label.color).toBe(violetLight.colors.textMuted);
  });
});

describe('VTabs', () => {
  it('exposes a stable name, props and events', () => {
    expect(VTabs.name).toBe('VTabs');
    expect(VTabs.emits).toContain('update:modelValue');
    expect(VTabs.emits).toContain('change');
    expect((VTabs.props as Record<string, unknown>).items).toBeDefined();
  });

  it('renders one tab per item', () => {
    const { vnode } = render(VTabs, { modelValue: 'all', items });
    expect(vnode.children).toHaveLength(2);
    expect(vnode.children[0].children[0].type).toBe('text');
  });

  it('selects a non-active tab on tap', () => {
    const { vnode, emitted } = render(VTabs, { modelValue: 'all', items });
    vnode.children[1].props.bindtap();
    expect(emitted).toContainEqual(['update:modelValue', 'unread']);
    expect(emitted).toContainEqual(['change', 'unread']);
  });

  it('does not re-emit when tapping the already-active tab', () => {
    const { vnode, emitted } = render(VTabs, { modelValue: 'all', items });
    vnode.children[0].props.bindtap();
    expect(emitted).toHaveLength(0);
  });
});
