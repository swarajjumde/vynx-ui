import { describe, expect, it } from 'vitest';
import { createApp } from 'vue';
import { violetLight } from '@vynx/themes';
import { resolveSelectButtonOptionStyle, resolveSelectButtonStyle, VSelectButton } from '../src/index';

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
  { label: 'List', value: 'list' },
  { label: 'Grid', value: 'grid' }
];

describe('VSelectButton', () => {
  it('resolveSelectButtonOptionStyle maps selection to the primary token', () => {
    const selected = resolveSelectButtonOptionStyle(violetLight, { selected: true });
    expect(selected.segment.backgroundColor).toBe(violetLight.colors.primary);
    expect(selected.label.color).toBe(violetLight.colors.onPrimary);

    const unselected = resolveSelectButtonOptionStyle(violetLight, { selected: false });
    expect(unselected.segment.backgroundColor).toBe('transparent');
    expect(unselected.label.color).toBe(violetLight.colors.text);
  });

  it('resolveSelectButtonStyle dims while disabled', () => {
    expect(resolveSelectButtonStyle(violetLight, { disabled: true }).container.opacity).toBe(0.5);
    expect(resolveSelectButtonStyle(violetLight).container.opacity).toBe(1);
  });

  it('exposes a stable name, props and events', () => {
    expect(VSelectButton.name).toBe('VSelectButton');
    expect(VSelectButton.emits).toContain('update:modelValue');
    expect(VSelectButton.emits).toContain('change');
    expect((VSelectButton.props as Record<string, unknown>).options).toBeDefined();
  });

  it('renders one segment per option and selects on tap', () => {
    const { vnode, emitted } = render(VSelectButton, { modelValue: 'list', options });
    expect(vnode.children).toHaveLength(2);

    vnode.children[1].props.bindtap();
    expect(emitted).toContainEqual(['update:modelValue', 'grid']);
    expect(emitted).toContainEqual(['change', 'grid']);
  });

  it('does not re-emit when tapping the already-selected segment', () => {
    const { vnode, emitted } = render(VSelectButton, { modelValue: 'list', options });
    vnode.children[0].props.bindtap();
    expect(emitted).toHaveLength(0);
  });

  it('does not select while disabled', () => {
    const { vnode, emitted } = render(VSelectButton, { modelValue: 'list', options, disabled: true });
    vnode.children[1].props.bindtap();
    expect(emitted).toHaveLength(0);
  });
});
