import { describe, expect, it } from 'vitest';
import { createApp } from 'vue';
import { violetLight } from '@vynx/themes';
import { resolveToggleButtonStyle, VToggleButton } from '../src/index';

function render(component: any, props: Record<string, unknown>, slots: Record<string, unknown> = {}) {
  const emitted: Array<[string, ...unknown[]]> = [];
  const emit = (event: string, ...args: unknown[]) => emitted.push([event, ...args]);
  const app = createApp({});
  const vnode = app.runWithContext(() =>
    component.setup(props, { emit, slots, attrs: {}, expose: () => {} })()
  );
  return { vnode, emitted };
}

describe('VToggleButton', () => {
  it('resolveToggleButtonStyle maps pressed state to the primary token', () => {
    const pressed = resolveToggleButtonStyle(violetLight, { pressed: true });
    expect(pressed.container.backgroundColor).toBe(violetLight.colors.primary);
    expect(pressed.container.borderColor).toBe(violetLight.colors.primary);
    expect(pressed.label.color).toBe(violetLight.colors.onPrimary);

    const unpressed = resolveToggleButtonStyle(violetLight, { pressed: false });
    expect(unpressed.container.backgroundColor).toBe('transparent');
    expect(unpressed.container.borderColor).toBe(violetLight.colors.border);
    expect(unpressed.label.color).toBe(violetLight.colors.text);
  });

  it('resolveToggleButtonStyle dims while disabled', () => {
    expect(resolveToggleButtonStyle(violetLight, { disabled: true }).container.opacity).toBe(0.5);
    expect(resolveToggleButtonStyle(violetLight).container.opacity).toBe(1);
  });

  it('exposes a stable name, props and events', () => {
    expect(VToggleButton.name).toBe('VToggleButton');
    expect(VToggleButton.emits).toContain('update:modelValue');
    expect(VToggleButton.emits).toContain('change');
    expect((VToggleButton.props as Record<string, unknown>).modelValue).toBeDefined();
  });

  it('toggles modelValue on tap', () => {
    const { vnode, emitted } = render(VToggleButton, { modelValue: false, label: 'Bold' });
    expect(vnode.props.bindtap).toBe(vnode.props.onTap);
    vnode.props.bindtap();
    expect(emitted).toContainEqual(['update:modelValue', true]);
    expect(emitted).toContainEqual(['change', true]);
  });

  it('does not toggle while disabled', () => {
    const { vnode, emitted } = render(VToggleButton, { modelValue: false, disabled: true });
    vnode.props.bindtap();
    expect(emitted).toHaveLength(0);
  });
});
