import { describe, expect, it } from 'vitest';
import { createApp } from 'vue';
import { violetLight } from '@vynx/themes';
import { resolveEmptyStateStyle, resolvePaginatorButtonStyle, VEmptyState, VPaginator } from '../src/index';

function render(component: any, props: Record<string, unknown>, slots: Record<string, unknown> = {}) {
  const emitted: Array<[string, ...unknown[]]> = [];
  const emit = (event: string, ...args: unknown[]) => emitted.push([event, ...args]);
  const app = createApp({});
  const vnode = app.runWithContext(() =>
    component.setup(props, { emit, slots, attrs: {}, expose: () => {} })()
  );
  return { vnode, emitted };
}

describe('VEmptyState', () => {
  it('resolveEmptyStateStyle uses text and textMuted tokens', () => {
    const s = resolveEmptyStateStyle(violetLight);
    expect(s.title.color).toBe(violetLight.colors.text);
    expect(s.message.color).toBe(violetLight.colors.textMuted);
  });

  it('renders only the parts provided, plus slot actions', () => {
    const { vnode } = render(VEmptyState, { title: 'Empty' }, { default: () => ['action'] });
    expect(vnode.type).toBe('view');
    // title text + slot action, no icon/message
    expect(vnode.children).toHaveLength(2);
    expect(vnode.children[0].type).toBe('text');
    expect(vnode.children[0].children).toBe('Empty');

    const withIcon = render(VEmptyState, { title: 'Empty', message: 'None', icon: 'https://x/i.png' });
    expect(withIcon.vnode.children[0].type).toBe('image');
    expect(withIcon.vnode.children).toHaveLength(3);
  });
});

describe('VPaginator', () => {
  it('resolvePaginatorButtonStyle dims when disabled', () => {
    expect(resolvePaginatorButtonStyle(violetLight, { disabled: true }).button.opacity).toBe(0.5);
    expect(resolvePaginatorButtonStyle(violetLight).button.opacity).toBe(1);
    expect(resolvePaginatorButtonStyle(violetLight).label.color).toBe(violetLight.colors.primary);
  });

  it('shows the current page and steps within bounds', () => {
    const { vnode, emitted } = render(VPaginator, { modelValue: 2, total: 5 });
    expect(vnode.children[1].children).toBe('Page 2 of 5');

    vnode.children[2].props.bindtap(); // next
    expect(emitted).toContainEqual(['update:modelValue', 3]);
    expect(emitted).toContainEqual(['change', 3]);
  });

  it('no-ops Prev at the first page and Next at the last page', () => {
    const first = render(VPaginator, { modelValue: 1, total: 3 });
    first.vnode.children[0].props.bindtap(); // prev
    expect(first.emitted).toHaveLength(0);

    const last = render(VPaginator, { modelValue: 3, total: 3 });
    last.vnode.children[2].props.bindtap(); // next
    expect(last.emitted).toHaveLength(0);
  });
});
