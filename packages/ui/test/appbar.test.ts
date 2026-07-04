import { describe, expect, it } from 'vitest';
import { createApp } from 'vue';
import { violetLight } from '@vynx/themes';
import { resolveAppBarStyle, VAppBar } from '../src/index';

function render(component: any, props: Record<string, unknown>, slots: Record<string, unknown> = {}) {
  const emitted: Array<[string, ...unknown[]]> = [];
  const emit = (event: string, ...args: unknown[]) => emitted.push([event, ...args]);
  const app = createApp({});
  const vnode = app.runWithContext(() =>
    component.setup(props, { emit, slots, attrs: {}, expose: () => {} })()
  );
  return { vnode, emitted };
}

describe('resolveAppBarStyle', () => {
  it('uses surface/border/text tokens', () => {
    const styles = resolveAppBarStyle(violetLight);
    expect(styles.container.backgroundColor).toBe(violetLight.colors.surface);
    expect(styles.container.borderBottomColor).toBe(violetLight.colors.border);
    expect(styles.title.color).toBe(violetLight.colors.text);
    expect(styles.title.fontWeight).toBe(violetLight.typography.fontWeight.semibold);
  });
});

describe('VAppBar', () => {
  it('exposes a stable name and a title prop', () => {
    expect(VAppBar.name).toBe('VAppBar');
    expect((VAppBar.props as Record<string, unknown>).title).toBeDefined();
  });

  it('renders a view with a title text by default', () => {
    const { vnode } = render(VAppBar, { title: 'Inbox' });
    expect(vnode.type).toBe('view');
    expect(vnode.children).toHaveLength(3);
    const center = vnode.children[1];
    expect(center.children[0].type).toBe('text');
    expect(center.children[0].children).toBe('Inbox');
  });

  it('renders leading and trailing slot content', () => {
    const { vnode } = render(
      VAppBar,
      { title: 'Inbox' },
      { leading: () => 'menu', trailing: () => 'actions' }
    );
    const [leading, , trailing] = vnode.children;
    expect(leading.children).toBe('menu');
    expect(trailing.children).toBe('actions');
  });

  it('renders the default slot instead of the title when provided', () => {
    const { vnode } = render(VAppBar, { title: 'Inbox' }, { default: () => 'custom center' });
    const center = vnode.children[1];
    expect(center.children).toBe('custom center');
  });
});
