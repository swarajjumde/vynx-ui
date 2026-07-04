import { describe, expect, it } from 'vitest';
import { createApp } from 'vue';
import { violetLight } from '@vynx/themes';
import { resolveRadioOptionStyle, VRadioGroup } from '../src/index';

function render(component: any, props: Record<string, unknown>) {
  const emitted: Array<[string, ...unknown[]]> = [];
  const emit = (event: string, ...args: unknown[]) => emitted.push([event, ...args]);
  const app = createApp({});
  const vnode = app.runWithContext(() =>
    component.setup(props, { emit, slots: {}, attrs: {}, expose: () => {} })()
  );
  return { vnode, emitted };
}

const options = [
  { label: 'A', value: 'a' },
  { label: 'B', value: 'b' }
];

describe('VRadioGroup', () => {
  it('resolveRadioOptionStyle maps selection to the primary token', () => {
    const selected = resolveRadioOptionStyle(violetLight, { selected: true });
    expect(selected.control.borderColor).toBe(violetLight.colors.primary);
    expect(selected.indicator.backgroundColor).toBe(violetLight.colors.primary);
    expect(selected.indicator.opacity).toBe(1);

    const unselected = resolveRadioOptionStyle(violetLight, { selected: false });
    expect(unselected.control.borderColor).toBe(violetLight.colors.border);
    expect(unselected.indicator.opacity).toBe(0);
  });

  it('exposes a stable name, props and events', () => {
    expect(VRadioGroup.name).toBe('VRadioGroup');
    expect(VRadioGroup.emits).toContain('update:modelValue');
    expect(VRadioGroup.emits).toContain('change');
    expect((VRadioGroup.props as Record<string, unknown>).options).toBeDefined();
  });

  it('renders one row per option and selects on tap', () => {
    const { vnode, emitted } = render(VRadioGroup, { modelValue: 'a', options });
    expect(vnode.children).toHaveLength(2);

    // Tapping the second (unselected) option emits its value.
    vnode.children[1].props.bindtap();
    expect(emitted).toContainEqual(['update:modelValue', 'b']);
    expect(emitted).toContainEqual(['change', 'b']);
  });

  it('does not re-emit when tapping the already-selected option', () => {
    const { vnode, emitted } = render(VRadioGroup, { modelValue: 'a', options });
    vnode.children[0].props.bindtap();
    expect(emitted).toHaveLength(0);
  });

  it('does not select while disabled', () => {
    const { vnode, emitted } = render(VRadioGroup, { modelValue: 'a', options, disabled: true });
    vnode.children[1].props.bindtap();
    expect(emitted).toHaveLength(0);
  });
});
