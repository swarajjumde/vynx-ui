import { describe, expect, it } from 'vitest';
import { createApp } from 'vue';
import { violetLight } from '@vynx/themes';
import {
  resolveHeadingStyle,
  resolveListItemStyle,
  resolveListStyle,
  resolveScrollViewStyle,
  resolveStackStyle,
  VHeading,
  VList,
  VListItem,
  VScrollView,
  VStack
} from '../src/index';

/**
 * DOM-free render: drive a component's `setup` directly and inspect the
 * returned vnode + emitted events. `runWithContext` gives `useTheme`'s
 * `inject()` a valid app context.
 */
function render(component: any, props: Record<string, unknown>, slots: Record<string, unknown> = {}) {
  const emitted: Array<[string, ...unknown[]]> = [];
  const emit = (event: string, ...args: unknown[]) => emitted.push([event, ...args]);
  const app = createApp({});
  const vnode = app.runWithContext(() =>
    component.setup(props, { emit, slots, attrs: {}, expose: () => {} })()
  );
  return { vnode, emitted };
}

describe('layout style helpers', () => {
  it('resolveHeadingStyle maps level to typography tokens and tone to colour', () => {
    const base = resolveHeadingStyle(violetLight);
    expect(base.text.color).toBe(violetLight.colors.text);
    expect(base.text.fontSize).toBe(violetLight.typography.fontSize.lg);
    expect(base.text.fontWeight).toBe(violetLight.typography.fontWeight.semibold);

    const level1 = resolveHeadingStyle(violetLight, { level: 1 });
    expect(level1.text.fontSize).toBe(violetLight.typography.fontSize.xl);
    expect(level1.text.fontWeight).toBe(violetLight.typography.fontWeight.bold);

    const level3 = resolveHeadingStyle(violetLight, { level: 3 });
    expect(level3.text.fontSize).toBe(violetLight.typography.fontSize.md);
    expect(level3.text.fontWeight).toBe(violetLight.typography.fontWeight.semibold);

    expect(resolveHeadingStyle(violetLight, { tone: 'muted' }).text.color).toBe(violetLight.colors.textMuted);
    expect(resolveHeadingStyle(violetLight, { tone: 'primary' }).text.color).toBe(violetLight.colors.primary);
    expect(resolveHeadingStyle(violetLight, { align: 'center' }).text.textAlign).toBe('center');
  });

  it('resolveStackStyle maps gap to spacing tokens and align/justify to flex keywords', () => {
    const base = resolveStackStyle(violetLight);
    expect(base.container.display).toBe('flex');
    expect(base.container.flexDirection).toBe('column');
    expect(base.container.gap).toBe(violetLight.spacing.md);
    expect(base.container.alignItems).toBe('stretch');
    expect(base.container.justifyContent).toBe('flex-start');

    expect(resolveStackStyle(violetLight, { gap: 'none' }).container.gap).toBe(violetLight.spacing.none);
    expect(resolveStackStyle(violetLight, { gap: 'lg' }).container.gap).toBe(violetLight.spacing.lg);
    expect(resolveStackStyle(violetLight, { direction: 'row' }).container.flexDirection).toBe('row');
    expect(resolveStackStyle(violetLight, { align: 'center' }).container.alignItems).toBe('center');
    expect(resolveStackStyle(violetLight, { align: 'end' }).container.alignItems).toBe('flex-end');
    expect(resolveStackStyle(violetLight, { justify: 'between' }).container.justifyContent).toBe('space-between');
    expect(resolveStackStyle(violetLight, { justify: 'center' }).container.justifyContent).toBe('center');
  });

  it('resolveScrollViewStyle maps padding to spacing tokens', () => {
    expect(resolveScrollViewStyle(violetLight).container.padding).toBe(violetLight.spacing.none);
    expect(resolveScrollViewStyle(violetLight, { padding: 'sm' }).container.padding).toBe(violetLight.spacing.sm);
    expect(resolveScrollViewStyle(violetLight, { padding: 'md' }).container.padding).toBe(violetLight.spacing.md);
    expect(resolveScrollViewStyle(violetLight, { padding: 'lg' }).container.padding).toBe(violetLight.spacing.lg);
  });

  it('resolveListItemStyle uses the surface token and dims when disabled', () => {
    const base = resolveListItemStyle(violetLight);
    expect(base.container.backgroundColor).toBe(violetLight.colors.surface);
    expect(base.container.padding).toBe(violetLight.spacing.md);
    expect(base.container.opacity).toBe(1);

    expect(resolveListItemStyle(violetLight, { disabled: true }).container.opacity).toBe(0.5);
  });

  it('resolveListStyle uses surface/border tokens and the lg radius', () => {
    const style = resolveListStyle(violetLight);
    expect(style.container.backgroundColor).toBe(violetLight.colors.surface);
    expect(style.container.borderColor).toBe(violetLight.colors.border);
    expect(style.container.borderRadius).toBe(violetLight.radius.lg);
  });
});

describe('layout component contracts', () => {
  it('exposes stable public names', () => {
    expect(VHeading.name).toBe('VHeading');
    expect(VStack.name).toBe('VStack');
    expect(VScrollView.name).toBe('VScrollView');
    expect(VListItem.name).toBe('VListItem');
    expect(VList.name).toBe('VList');
    expect(VListItem.emits).toContain('tap');
  });

  it('VHeading renders a Lynx text element, preferring the slot over the value prop', () => {
    const fromValue = render(VHeading, { value: 'Title' }).vnode;
    expect(fromValue.type).toBe('text');
    expect(fromValue.children).toBe('Title');

    const fromSlot = render(VHeading, { value: 'ignored' }, { default: () => 'Slotted' }).vnode;
    expect(fromSlot.children).toBe('Slotted');
  });

  it('VStack renders a Lynx view hosting children', () => {
    const { vnode } = render(VStack, {}, { default: () => ['child'] });
    expect(vnode.type).toBe('view');
    expect(vnode.props.style.display).toBe('flex');
    expect(vnode.children).toEqual(['child']);
  });

  it('VScrollView renders a Lynx scroll-view with the right scroll-orientation', () => {
    // The DOM-free harness calls setup() directly and so bypasses Vue's prop
    // defaulting; pass direction explicitly (the 'vertical' default is declared
    // on the prop and documented).
    const vertical = render(VScrollView, { direction: 'vertical' }).vnode;
    expect(vertical.type).toBe('scroll-view');
    expect(vertical.props['scroll-orientation']).toBe('vertical');

    const horizontal = render(VScrollView, { direction: 'horizontal' }).vnode;
    expect(horizontal.props['scroll-orientation']).toBe('horizontal');
  });

  it('VList renders a Lynx view hosting children', () => {
    const { vnode } = render(VList, {}, { default: () => ['item'] });
    expect(vnode.type).toBe('view');
    expect(vnode.props.style.backgroundColor).toBe(violetLight.colors.surface);
  });
});

describe('VListItem tap behaviour', () => {
  it('emits tap when enabled, binding both bindtap and onTap to the same handler', () => {
    const { vnode, emitted } = render(VListItem, {}, { default: () => ['row'] });
    expect(vnode.type).toBe('view');
    expect(vnode.props.bindtap).toBe(vnode.props.onTap);

    vnode.props.bindtap();
    expect(emitted).toContainEqual(['tap']);
  });

  it('does not emit tap while disabled, and dims the row', () => {
    const { vnode, emitted } = render(VListItem, { disabled: true });
    vnode.props.bindtap();
    expect(emitted).toHaveLength(0);
    expect(vnode.props.style.opacity).toBe(0.5);
  });
});
