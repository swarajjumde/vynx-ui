import { describe, expect, it } from 'vitest';
import { createApp } from 'vue';
import { violetLight } from '@vynx/themes';
import {
  resolveFormFieldStyle,
  resolveInputStyle,
  resolveToggleStyle,
  VCheckbox,
  VFormField,
  VInputText,
  VSwitch,
  VTextarea
} from '../src/index';

/**
 * Render a component's root vnode by driving its `setup` directly. This keeps
 * the tests DOM-free (matching the node vitest setup) while still exercising the
 * real emitted-event contract through the vnode's Lynx event handlers.
 */
function render(component: any, props: Record<string, unknown>, slots: Record<string, unknown> = {}) {
  const emitted: Array<[string, ...unknown[]]> = [];
  const emit = (event: string, ...args: unknown[]) => emitted.push([event, ...args]);
  // `runWithContext` gives `inject()` (and therefore `useTheme`) a valid app
  // injection context so the default theme resolves without a DOM mount.
  const app = createApp({});
  const vnode = app.runWithContext(() =>
    component.setup(props, { emit, slots, attrs: {}, expose: () => {} })()
  );
  return { vnode, emitted };
}

describe('form style helpers', () => {
  it('resolveFormFieldStyle uses text tokens and flags invalid with the danger token', () => {
    const base = resolveFormFieldStyle(violetLight);
    expect(base.label.color).toBe(violetLight.colors.text);
    expect(base.help.color).toBe(violetLight.colors.textMuted);
    expect(base.error.color).toBe(violetLight.colors.danger);
    expect(base.container.opacity).toBe(1);

    const invalid = resolveFormFieldStyle(violetLight, { invalid: true, disabled: true });
    expect(invalid.label.color).toBe(violetLight.colors.danger);
    expect(invalid.container.opacity).toBe(0.5);
  });

  it('resolveInputStyle uses surface/border tokens and the danger token when invalid', () => {
    const base = resolveInputStyle(violetLight);
    expect(base.container.backgroundColor).toBe(violetLight.colors.surface);
    expect(base.container.borderColor).toBe(violetLight.colors.border);
    expect(base.container.color).toBe(violetLight.colors.text);
    expect(resolveInputStyle(violetLight, { invalid: true }).container.borderColor).toBe(violetLight.colors.danger);
    expect(resolveInputStyle(violetLight, { disabled: true }).container.opacity).toBe(0.5);
  });

  it('resolveToggleStyle maps checked state to the primary token for both variants', () => {
    const checkbox = resolveToggleStyle(violetLight, { variant: 'checkbox', checked: true });
    expect(checkbox.control.backgroundColor).toBe(violetLight.colors.primary);
    expect(checkbox.indicator.opacity).toBe(1);
    expect(resolveToggleStyle(violetLight, { variant: 'checkbox' }).indicator.opacity).toBe(0);

    const on = resolveToggleStyle(violetLight, { variant: 'switch', checked: true });
    expect(on.control.backgroundColor).toBe(violetLight.colors.primary);
    expect(on.control.justifyContent).toBe('flex-end');
    const off = resolveToggleStyle(violetLight, { variant: 'switch', checked: false });
    expect(off.control.backgroundColor).toBe(violetLight.colors.neutral);
    expect(off.control.justifyContent).toBe('flex-start');
  });
});

describe('form component contracts', () => {
  it('exposes stable public names, props and events', () => {
    expect(VFormField.name).toBe('VFormField');
    expect(VInputText.name).toBe('VInputText');
    expect(VTextarea.name).toBe('VTextarea');
    expect(VCheckbox.name).toBe('VCheckbox');
    expect(VSwitch.name).toBe('VSwitch');

    expect(VInputText.emits).toContain('update:modelValue');
    expect(VTextarea.emits).toContain('update:modelValue');
    expect(VCheckbox.emits).toContain('update:checked');
    expect(VSwitch.emits).toContain('update:checked');

    expect((VInputText.props as Record<string, unknown>).modelValue).toBeDefined();
    expect((VCheckbox.props as Record<string, unknown>).checked).toBeDefined();
  });
});

describe('text input update behaviour', () => {
  it('VInputText emits value updates from Lynx and Vue-style input events', () => {
    const { vnode, emitted } = render(VInputText, { modelValue: '' });
    expect(vnode.props.bindinput).toBe(vnode.props.onInput);

    vnode.props.onInput({ detail: { value: 'hello' } });
    expect(emitted).toContainEqual(['update:modelValue', 'hello']);
    expect(emitted).toContainEqual(['input', 'hello']);
  });

  it('VTextarea emits value updates from Lynx and Vue-style textarea events', () => {
    const { vnode, emitted } = render(VTextarea, { modelValue: '', rows: 4 });
    expect(vnode.props.bindinput).toBe(vnode.props.onInput);
    expect(vnode.props.maxlines).toBe(4);
    expect(vnode.props.style.minHeight).toBe('96px');

    vnode.props.onInput({ detail: { value: 'line one' } });
    expect(emitted).toContainEqual(['update:modelValue', 'line one']);
    expect(emitted).toContainEqual(['input', 'line one']);
  });

  it('does not update while disabled', () => {
    const input = render(VInputText, { modelValue: '', disabled: true });
    input.vnode.props.bindinput({ detail: { value: 'x' } });
    expect(input.emitted).toHaveLength(0);

    const textarea = render(VTextarea, { modelValue: '', disabled: true });
    textarea.vnode.props.bindinput({ detail: { value: 'x' } });
    expect(textarea.emitted).toHaveLength(0);
  });
});

describe('boolean control checked behaviour', () => {
  it('VCheckbox toggles checked on tap', () => {
    const { vnode, emitted } = render(VCheckbox, { checked: false });
    vnode.props.bindtap();
    expect(emitted).toContainEqual(['update:checked', true]);
    expect(emitted).toContainEqual(['change', true]);
  });

  it('VSwitch toggles checked on tap', () => {
    const { vnode, emitted } = render(VSwitch, { checked: true });
    vnode.props.bindtap();
    expect(emitted).toContainEqual(['update:checked', false]);
    expect(emitted).toContainEqual(['change', false]);
  });

  it('does not toggle while disabled', () => {
    const checkbox = render(VCheckbox, { checked: false, disabled: true });
    checkbox.vnode.props.bindtap();
    expect(checkbox.emitted).toHaveLength(0);

    const toggle = render(VSwitch, { checked: false, disabled: true });
    toggle.vnode.props.bindtap();
    expect(toggle.emitted).toHaveLength(0);
  });
});
