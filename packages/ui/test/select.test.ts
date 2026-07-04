import { describe, expect, it } from 'vitest';
import { createApp } from 'vue';
import { violetLight } from '@vynx/themes';
import { resolveSelectOptionStyle, resolveSelectStyle, VSelect } from '../src/index';

function render(component: any, props: Record<string, unknown>) {
  const emitted: Array<[string, ...unknown[]]> = [];
  const emit = (event: string, ...args: unknown[]) => emitted.push([event, ...args]);
  const app = createApp({});
  const vnode = app.runWithContext(() =>
    component.setup(props, { emit, slots: {}, attrs: {}, expose: () => {} })()
  );
  return { vnode, emitted };
}

/** Drives `setup()` once and returns the render function so open/close state
 * transitions triggered by tap handlers can be observed across renders. */
function mount(component: any, props: Record<string, unknown>) {
  const emitted: Array<[string, ...unknown[]]> = [];
  const emit = (event: string, ...args: unknown[]) => emitted.push([event, ...args]);
  const app = createApp({});
  const r = app.runWithContext(() => component.setup(props, { emit, slots: {}, attrs: {}, expose: () => {} }));
  return { render: () => app.runWithContext(r), emitted };
}

const options = [
  { label: 'United States', value: 'us' },
  { label: 'United Kingdom', value: 'uk' }
];

describe('select style helpers', () => {
  it('resolveSelectStyle flags invalid/disabled/placeholder with tokens', () => {
    const base = resolveSelectStyle(violetLight);
    expect(base.trigger.borderColor).toBe(violetLight.colors.border);
    expect(resolveSelectStyle(violetLight, { invalid: true }).trigger.borderColor).toBe(violetLight.colors.danger);
    expect(resolveSelectStyle(violetLight, { disabled: true }).trigger.opacity).toBe(0.5);
    expect(resolveSelectStyle(violetLight, { placeholder: true }).triggerLabel.color).toBe(
      violetLight.colors.textMuted
    );
  });

  it('resolveSelectOptionStyle carries selection on the label and check glyph', () => {
    const selected = resolveSelectOptionStyle(violetLight, { selected: true });
    expect(selected.label.color).toBe(violetLight.colors.primary);
    expect(selected.check.opacity).toBe(1);

    const unselected = resolveSelectOptionStyle(violetLight, { selected: false });
    expect(unselected.label.color).toBe(violetLight.colors.text);
    expect(unselected.check.opacity).toBe(0);
  });
});

describe('VSelect', () => {
  it('exposes a stable name, props and events', () => {
    expect(VSelect.name).toBe('VSelect');
    expect(VSelect.emits).toContain('update:modelValue');
    expect(VSelect.emits).toContain('change');
    expect((VSelect.props as Record<string, unknown>).options).toBeDefined();
  });

  it('shows the placeholder when modelValue is empty', () => {
    const { vnode } = render(VSelect, { modelValue: '', options, placeholder: 'Pick one' });
    const trigger = vnode.children[0];
    expect(trigger.children[0].children).toBe('Pick one');
  });

  it('shows the selected option label', () => {
    const { vnode } = render(VSelect, { modelValue: 'uk', options, placeholder: 'Pick one' });
    const trigger = vnode.children[0];
    expect(trigger.children[0].children).toBe('United Kingdom');
  });

  it('opens the picker overlay on trigger tap and selects an option', () => {
    const { render: r, emitted } = mount(VSelect, { modelValue: '', options, placeholder: 'Pick one' });

    const closed = r();
    expect(closed.children).toHaveLength(1);

    closed.children[0].props.bindtap();
    const opened = r();
    expect(opened.children).toHaveLength(2);
    const backdrop = opened.children[1];
    const panel = backdrop.children[0];
    expect(typeof panel.props.catchtap).toBe('function');
    expect(panel.children).toHaveLength(2);

    panel.children[1].props.bindtap();
    expect(emitted).toContainEqual(['update:modelValue', 'uk']);
    expect(emitted).toContainEqual(['change', 'uk']);

    const afterSelect = r();
    expect(afterSelect.children).toHaveLength(1);
  });

  it('closes without selecting on backdrop tap', () => {
    const { render: r } = mount(VSelect, { modelValue: '', options, placeholder: 'Pick one' });
    r().children[0].props.bindtap();
    const opened = r();
    opened.children[1].props.bindtap();
    expect(r().children).toHaveLength(1);
  });

  it('does not open the picker while disabled', () => {
    const { render: r } = mount(VSelect, { modelValue: '', options, disabled: true });
    r().children[0].props.bindtap();
    expect(r().children).toHaveLength(1);
  });
});
