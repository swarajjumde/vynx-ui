import { describe, expect, it } from 'vitest';
import { createApp } from 'vue';
import { violetLight } from '@vynx/themes';
import {
  resolveAvatarStyle,
  resolveDividerStyle,
  resolveTextStyle,
  VAvatar,
  VDivider,
  VText
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

describe('display style helpers', () => {
  it('resolveTextStyle maps tone and weight to colour/typography tokens', () => {
    const base = resolveTextStyle(violetLight);
    expect(base.text.color).toBe(violetLight.colors.text);
    expect(base.text.fontSize).toBe(violetLight.typography.fontSize.md);
    expect(base.text.fontWeight).toBe(violetLight.typography.fontWeight.regular);

    const muted = resolveTextStyle(violetLight, { tone: 'muted', size: 'lg', weight: 'bold', align: 'center' });
    expect(muted.text.color).toBe(violetLight.colors.textMuted);
    expect(muted.text.fontSize).toBe(violetLight.typography.fontSize.lg);
    expect(muted.text.fontWeight).toBe(violetLight.typography.fontWeight.bold);
    expect(muted.text.textAlign).toBe('center');

    expect(resolveTextStyle(violetLight, { tone: 'primary' }).text.color).toBe(violetLight.colors.primary);
    expect(resolveTextStyle(violetLight, { tone: 'danger' }).text.color).toBe(violetLight.colors.danger);
  });

  it('resolveDividerStyle uses the border token and orientation-specific sizing', () => {
    const horizontal = resolveDividerStyle(violetLight);
    expect(horizontal.container.backgroundColor).toBe(violetLight.colors.border);
    expect(horizontal.container.width).toBe('100%');
    expect(horizontal.container.height).toBe('1px');
    expect(horizontal.container.marginTop).toBe(violetLight.spacing.md);

    const vertical = resolveDividerStyle(violetLight, { orientation: 'vertical', spacing: 'lg' });
    expect(vertical.container.width).toBe('1px');
    expect(vertical.container.height).toBe('100%');
    expect(vertical.container.marginLeft).toBe(violetLight.spacing.lg);
  });

  it('resolveAvatarStyle maps tone to background/on tokens and size to dimensions', () => {
    const primary = resolveAvatarStyle(violetLight, { size: 'lg' });
    expect(primary.container.backgroundColor).toBe(violetLight.colors.primary);
    expect(primary.label.color).toBe(violetLight.colors.onPrimary);
    expect(primary.container.width).toBe('56px');
    expect(primary.container.borderRadius).toBe(violetLight.radius.full);

    const neutral = resolveAvatarStyle(violetLight, { tone: 'neutral' });
    expect(neutral.container.backgroundColor).toBe(violetLight.colors.neutral);
    expect(neutral.label.color).toBe(violetLight.colors.onNeutral);
  });
});

describe('display component contracts', () => {
  it('exposes stable public names', () => {
    expect(VText.name).toBe('VText');
    expect(VDivider.name).toBe('VDivider');
    expect(VAvatar.name).toBe('VAvatar');
  });

  it('VText renders a Lynx text element, preferring the slot over the value prop', () => {
    const fromValue = render(VText, { value: 'Hello' });
    expect(fromValue.type).toBe('text');
    expect(fromValue.children).toBe('Hello');

    const fromSlot = render(VText, { value: 'ignored' }, { default: () => 'Slotted' });
    expect(fromSlot.children).toBe('Slotted');
  });

  it('VDivider renders a Lynx view hairline', () => {
    const vnode = render(VDivider, {});
    expect(vnode.type).toBe('view');
    expect(vnode.props.style.height).toBe('1px');
  });

  it('VAvatar renders initials by default and a Lynx image when src is set', () => {
    const initials = render(VAvatar, { label: 'AL' });
    expect(initials.type).toBe('view');
    expect(initials.children[0].children).toBe('AL');

    const image = render(VAvatar, { label: 'AL', src: 'https://example.com/a.png' });
    expect(image.type).toBe('image');
    expect(image.props.src).toBe('https://example.com/a.png');
  });
});
