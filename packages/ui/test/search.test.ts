import { describe, expect, it } from 'vitest';
import { createApp } from 'vue';
import { violetLight } from '@vynx/themes';
import { resolveSearchInputStyle, VSearchInput } from '../src/index';

function render(component: any, props: Record<string, unknown>) {
  const emitted: Array<[string, ...unknown[]]> = [];
  const emit = (event: string, ...args: unknown[]) => emitted.push([event, ...args]);
  const app = createApp({});
  const vnode = app.runWithContext(() =>
    component.setup(props, { emit, slots: {}, attrs: {}, expose: () => {} })()
  );
  return { vnode, emitted };
}

describe('VSearchInput', () => {
  it('resolveSearchInputStyle uses surface/border/text tokens', () => {
    const base = resolveSearchInputStyle(violetLight);
    expect(base.container.backgroundColor).toBe(violetLight.colors.surface);
    expect(base.container.borderColor).toBe(violetLight.colors.border);
    expect(base.input.color).toBe(violetLight.colors.text);
    expect(base.clear.color).toBe(violetLight.colors.textMuted);
    expect(resolveSearchInputStyle(violetLight, { disabled: true }).container.opacity).toBe(0.5);
  });

  it('exposes a stable name, props and events', () => {
    expect(VSearchInput.name).toBe('VSearchInput');
    expect(VSearchInput.emits).toContain('update:modelValue');
    expect(VSearchInput.emits).toContain('input');
    expect(VSearchInput.emits).toContain('clear');
    expect((VSearchInput.props as Record<string, unknown>).modelValue).toBeDefined();
  });

  it('omits the clear control when empty and shows it when there is a value', () => {
    const empty = render(VSearchInput, { modelValue: '' });
    expect(empty.vnode.children).toHaveLength(1);

    const filled = render(VSearchInput, { modelValue: 'abc' });
    expect(filled.vnode.children).toHaveLength(2);
  });

  it('emits value updates from Lynx and Vue-style input events', () => {
    const { vnode, emitted } = render(VSearchInput, { modelValue: '' });
    const input = vnode.children[0];
    expect(input.props.bindinput).toBe(input.props.onInput);
    input.props.onInput({ detail: { value: 'hello' } });
    expect(emitted).toContainEqual(['update:modelValue', 'hello']);
    expect(emitted).toContainEqual(['input', 'hello']);
  });

  it('clears the value on tap', () => {
    const { vnode, emitted } = render(VSearchInput, { modelValue: 'hello' });
    const clear = vnode.children[1];
    expect(clear.props.bindtap).toBe(clear.props.onTap);
    clear.props.bindtap();
    expect(emitted).toContainEqual(['update:modelValue', '']);
    expect(emitted).toContainEqual(['clear']);
  });

  it('does not update or clear while disabled', () => {
    const input = render(VSearchInput, { modelValue: 'hello', disabled: true });
    input.vnode.children[0].props.bindinput({ detail: { value: 'x' } });
    input.vnode.children[1].props.bindtap();
    expect(input.emitted).toHaveLength(0);
  });
});
