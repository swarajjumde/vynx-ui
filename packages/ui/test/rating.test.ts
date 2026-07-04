import { describe, expect, it } from 'vitest';
import { createApp } from 'vue';
import { violetLight } from '@vynx/themes';
import { resolveRatingStarStyle, resolveRatingStyle, VRating } from '../src/index';

function render(component: any, props: Record<string, unknown>) {
  const emitted: Array<[string, ...unknown[]]> = [];
  const emit = (event: string, ...args: unknown[]) => emitted.push([event, ...args]);
  const app = createApp({});
  const vnode = app.runWithContext(() =>
    component.setup(props, { emit, slots: {}, attrs: {}, expose: () => {} })()
  );
  return { vnode, emitted };
}

describe('VRating', () => {
  it('resolveRatingStarStyle maps filled state to the warning token', () => {
    const filled = resolveRatingStarStyle(violetLight, { filled: true });
    expect(filled.star.color).toBe(violetLight.colors.warning);

    const unfilled = resolveRatingStarStyle(violetLight, { filled: false });
    expect(unfilled.star.color).toBe(violetLight.colors.textMuted);
  });

  it('resolveRatingStyle dims while disabled', () => {
    expect(resolveRatingStyle(violetLight, { disabled: true }).container.opacity).toBe(0.5);
    expect(resolveRatingStyle(violetLight).container.opacity).toBe(1);
  });

  it('exposes a stable name, props and events', () => {
    expect(VRating.name).toBe('VRating');
    expect(VRating.emits).toContain('update:modelValue');
    expect(VRating.emits).toContain('change');
    expect((VRating.props as Record<string, unknown>).max).toBeDefined();
  });

  it('renders max stars, marking filled ones up to modelValue', () => {
    const { vnode } = render(VRating, { modelValue: 2, max: 5 });
    expect(vnode.children).toHaveLength(5);
    expect(vnode.children[0].children).toBe('★');
    expect(vnode.children[1].children).toBe('★');
    expect(vnode.children[2].children).toBe('☆');
  });

  it('sets the rating to the tapped star index', () => {
    const { vnode, emitted } = render(VRating, { modelValue: 2, max: 5 });
    vnode.children[3].props.bindtap();
    expect(emitted).toContainEqual(['update:modelValue', 4]);
    expect(emitted).toContainEqual(['change', 4]);
  });

  it('does not rate while disabled', () => {
    const { vnode, emitted } = render(VRating, { modelValue: 2, max: 5, disabled: true });
    vnode.children[3].props.bindtap();
    expect(emitted).toHaveLength(0);
  });
});
