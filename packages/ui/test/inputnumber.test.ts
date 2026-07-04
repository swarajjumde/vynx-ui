import { describe, expect, it } from 'vitest';
import { createApp } from 'vue';
import { violetLight } from '@vynx/themes';
import { resolveInputNumberStyle, VInputNumber } from '../src/index';

function render(component: any, props: Record<string, unknown>) {
  const emitted: Array<[string, ...unknown[]]> = [];
  const emit = (event: string, ...args: unknown[]) => emitted.push([event, ...args]);
  const app = createApp({});
  const vnode = app.runWithContext(() =>
    component.setup(props, { emit, slots: {}, attrs: {}, expose: () => {} })()
  );
  return { vnode, emitted };
}

describe('VInputNumber', () => {
  it('resolveInputNumberStyle uses the border token, or danger when invalid', () => {
    const base = resolveInputNumberStyle(violetLight);
    expect(base.container.borderColor).toBe(violetLight.colors.border);
    expect(base.container.backgroundColor).toBe(violetLight.colors.surface);
    expect(base.buttonLabel.color).toBe(violetLight.colors.primary);
    expect(base.value.color).toBe(violetLight.colors.text);

    expect(resolveInputNumberStyle(violetLight, { invalid: true }).container.borderColor).toBe(
      violetLight.colors.danger
    );
    expect(resolveInputNumberStyle(violetLight, { disabled: true }).container.opacity).toBe(0.5);
  });

  it('exposes a stable name, props and events', () => {
    expect(VInputNumber.name).toBe('VInputNumber');
    expect(VInputNumber.emits).toContain('update:modelValue');
    expect(VInputNumber.emits).toContain('change');
    expect((VInputNumber.props as Record<string, unknown>).step).toBeDefined();
  });

  it('increments and decrements by step', () => {
    const { vnode, emitted } = render(VInputNumber, {
      modelValue: 5,
      step: 2,
      min: Number.NEGATIVE_INFINITY,
      max: Number.POSITIVE_INFINITY
    });
    const [decrement, , increment] = vnode.children;

    increment.props.bindtap();
    expect(emitted).toContainEqual(['update:modelValue', 7]);
    expect(emitted).toContainEqual(['change', 7]);

    decrement.props.bindtap();
    expect(emitted).toContainEqual(['update:modelValue', 3]);
    expect(emitted).toContainEqual(['change', 3]);
  });

  it('clamps at the max and does not emit past it', () => {
    const { vnode, emitted } = render(VInputNumber, {
      modelValue: 10,
      step: 1,
      min: Number.NEGATIVE_INFINITY,
      max: 10
    });
    const [, , increment] = vnode.children;
    increment.props.bindtap();
    expect(emitted).toHaveLength(0);
  });

  it('clamps at the min and does not emit past it', () => {
    const { vnode, emitted } = render(VInputNumber, {
      modelValue: 0,
      step: 1,
      min: 0,
      max: Number.POSITIVE_INFINITY
    });
    const [decrement] = vnode.children;
    decrement.props.bindtap();
    expect(emitted).toHaveLength(0);
  });

  it('does not step while disabled', () => {
    const { vnode, emitted } = render(VInputNumber, { modelValue: 5, disabled: true });
    const [decrement, , increment] = vnode.children;
    increment.props.bindtap();
    decrement.props.bindtap();
    expect(emitted).toHaveLength(0);
  });
});
