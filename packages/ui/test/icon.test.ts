import { describe, expect, it } from 'vitest';
import { createApp } from 'vue';
import { violetLight } from '@vynx/themes';
import { resolveIconStyle, VIcon } from '../src/index';

function render(component: any, props: Record<string, unknown>) {
  const app = createApp({});
  return app.runWithContext(() => component.setup(props, { emit: () => {}, slots: {}, attrs: {}, expose: () => {} })());
}

describe('VIcon', () => {
  it('resolveIconStyle maps size to fixed square dimensions', () => {
    expect(resolveIconStyle(violetLight).image.width).toBe('20px');
    expect(resolveIconStyle(violetLight, { size: 'sm' }).image.height).toBe('16px');
    expect(resolveIconStyle(violetLight, { size: 'lg' }).image.width).toBe('24px');
  });

  it('exposes a stable name and renders a Lynx image element', () => {
    expect(VIcon.name).toBe('VIcon');
    const vnode = render(VIcon, { src: 'https://example.com/home.png', size: 'lg' });
    expect(vnode.type).toBe('image');
    expect(vnode.props.src).toBe('https://example.com/home.png');
    expect(vnode.props.style.width).toBe('24px');
  });
});
