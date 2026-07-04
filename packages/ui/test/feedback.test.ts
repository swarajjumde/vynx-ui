import { describe, expect, it } from 'vitest';
import { createApp } from 'vue';
import { violetLight } from '@vynx/themes';
import {
  resolveProgressStyle,
  resolveSkeletonStyle,
  resolveTagStyle,
  VProgressBar,
  VSkeleton,
  VTag
} from '../src/index';

/**
 * DOM-free render: drive a component's `setup` directly and inspect the returned
 * vnode. `runWithContext` gives `useTheme`'s `inject()` a valid app context.
 */
function render(component: any, props: Record<string, unknown>, slots: Record<string, unknown> = {}) {
  const app = createApp({});
  const vnode = app.runWithContext(() => component.setup(props, { emit: () => {}, slots, attrs: {}, expose: () => {} })());
  return vnode;
}

describe('feedback style helpers', () => {
  it('resolveTagStyle maps tone to background/on tokens for the solid variant', () => {
    const primary = resolveTagStyle(violetLight);
    expect(primary.container.backgroundColor).toBe(violetLight.colors.primary);
    expect(primary.label.color).toBe(violetLight.colors.onPrimary);
    expect(primary.container.borderRadius).toBe(violetLight.radius.full);

    const success = resolveTagStyle(violetLight, { tone: 'success' });
    expect(success.container.backgroundColor).toBe(violetLight.colors.success);
    expect(success.label.color).toBe(violetLight.colors.onSuccess);
  });

  it('resolveTagStyle switches to a transparent, tone-bordered treatment for outline', () => {
    const outline = resolveTagStyle(violetLight, { tone: 'danger', variant: 'outline' });
    expect(outline.container.backgroundColor).toBe('transparent');
    expect(outline.container.borderWidth).toBe('1px');
    expect(outline.container.borderColor).toBe(violetLight.colors.danger);
    expect(outline.label.color).toBe(violetLight.colors.danger);
  });

  it('resolveProgressStyle clamps value into 0..100 and maps tone to the fill colour', () => {
    const base = resolveProgressStyle(violetLight, { value: 42 });
    expect(base.track.backgroundColor).toBe(violetLight.colors.neutral);
    expect(base.track.borderRadius).toBe(violetLight.radius.full);
    expect(base.fill.width).toBe('42%');
    expect(base.fill.backgroundColor).toBe(violetLight.colors.primary);

    const over = resolveProgressStyle(violetLight, { value: 150 });
    expect(over.fill.width).toBe('100%');

    const under = resolveProgressStyle(violetLight, { value: -10 });
    expect(under.fill.width).toBe('0%');

    const success = resolveProgressStyle(violetLight, { value: 50, tone: 'success' });
    expect(success.fill.backgroundColor).toBe(violetLight.colors.success);
  });

  it('resolveSkeletonStyle maps rounded to radius tokens and uses the neutral colour', () => {
    const base = resolveSkeletonStyle(violetLight);
    expect(base.container.backgroundColor).toBe(violetLight.colors.neutral);
    expect(base.container.borderRadius).toBe(violetLight.radius.md);
    expect(base.container.width).toBe('100%');
    expect(base.container.height).toBe('16px');
    expect(base.container.opacity).toBe(0.6);

    const full = resolveSkeletonStyle(violetLight, { rounded: 'full', width: '48px', height: '48px' });
    expect(full.container.borderRadius).toBe(violetLight.radius.full);
    expect(full.container.width).toBe('48px');
    expect(full.container.height).toBe('48px');

    const sm = resolveSkeletonStyle(violetLight, { rounded: 'sm' });
    expect(sm.container.borderRadius).toBe(violetLight.radius.sm);

    const lg = resolveSkeletonStyle(violetLight, { rounded: 'lg' });
    expect(lg.container.borderRadius).toBe(violetLight.radius.lg);
  });
});

describe('feedback component contracts', () => {
  it('exposes stable public names', () => {
    expect(VTag.name).toBe('VTag');
    expect(VProgressBar.name).toBe('VProgressBar');
    expect(VSkeleton.name).toBe('VSkeleton');
  });

  it('VTag renders a Lynx view + text, preferring the slot over the label prop', () => {
    const fromLabel = render(VTag, { label: 'Hello' });
    expect(fromLabel.type).toBe('view');
    expect(fromLabel.children[0].type).toBe('text');
    expect(fromLabel.children[0].children).toBe('Hello');

    const fromSlot = render(VTag, { label: 'ignored' }, { default: () => 'Slotted' });
    expect(fromSlot.children[0].children).toBe('Slotted');
  });

  it('VProgressBar renders a track view containing a fill view sized from value', () => {
    const vnode = render(VProgressBar, { value: 30 });
    expect(vnode.type).toBe('view');
    expect(vnode.props.style.height).toBe('8px');
    expect(vnode.children[0].type).toBe('view');
    expect(vnode.children[0].props.style.width).toBe('30%');

    const clampedHigh = render(VProgressBar, { value: 150 });
    expect(clampedHigh.children[0].props.style.width).toBe('100%');

    const clampedLow = render(VProgressBar, { value: -10 });
    expect(clampedLow.children[0].props.style.width).toBe('0%');
  });

  it('VSkeleton renders a single Lynx view sized by width/height props', () => {
    const vnode = render(VSkeleton, { width: '200px', height: '20px' });
    expect(vnode.type).toBe('view');
    expect(vnode.props.style.width).toBe('200px');
    expect(vnode.props.style.height).toBe('20px');
  });
});
