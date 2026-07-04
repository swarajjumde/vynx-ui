import { describe, expect, it } from 'vitest';
import { createApp } from 'vue';
import { violetLight } from '@vynx/themes';
import {
  resolveTimelineItemStyle,
  resolveTableStyle,
  VDataView,
  VTimeline,
  VCarousel,
  VTable
} from '../src/index';

function render(component: any, props: Record<string, unknown>, slots: Record<string, unknown> = {}) {
  const emitted: Array<[string, ...unknown[]]> = [];
  const emit = (event: string, ...args: unknown[]) => emitted.push([event, ...args]);
  const app = createApp({});
  const vnode = app.runWithContext(() =>
    component.setup(props, { emit, slots, attrs: {}, expose: () => {} })()
  );
  return { vnode, emitted };
}

describe('VDataView', () => {
  it('exposes a stable name', () => {
    expect(VDataView.name).toBe('VDataView');
  });

  it('renders one wrapper per item using the scoped item slot', () => {
    const { vnode } = render(
      VDataView,
      { items: ['a', 'b', 'c'] },
      { item: ({ item }: { item: string }) => [item] }
    );
    expect(vnode.type).toBe('view');
    expect(vnode.children).toHaveLength(3);
    expect(vnode.children[0].type).toBe('view');
    expect(vnode.children[0].children).toEqual(['a']);
    expect(vnode.children[1].children).toEqual(['b']);
  });

  it('renders the empty slot when items is empty', () => {
    const { vnode } = render(VDataView, { items: [] }, { empty: () => ['nothing here'] });
    expect(vnode.children).toEqual(['nothing here']);
  });

  it('falls back to a text node per item when no item slot is provided', () => {
    const { vnode } = render(VDataView, { items: [1, 2] });
    expect(vnode.children[0].children[0].type).toBe('text');
    expect(vnode.children[0].children[0].children).toBe('1');
  });
});

describe('VTimeline', () => {
  it('exposes a stable name', () => {
    expect(VTimeline.name).toBe('VTimeline');
  });

  it('resolveTimelineItemStyle uses the primary token for the dot and transparent for the last connector', () => {
    const notLast = resolveTimelineItemStyle(violetLight, { last: false });
    expect(notLast.dot.backgroundColor).toBe(violetLight.colors.primary);
    expect(notLast.line.backgroundColor).toBe(violetLight.colors.border);

    const last = resolveTimelineItemStyle(violetLight, { last: true });
    expect(last.line.backgroundColor).toBe('transparent');
  });

  it('renders one row per item with title, optional time and description', () => {
    const items = [
      { title: 'First', time: '09:00', description: 'Started' },
      { title: 'Second' }
    ];
    const { vnode } = render(VTimeline, { items });
    expect(vnode.children).toHaveLength(2);

    const firstContent = vnode.children[0].children[1];
    expect(firstContent.children).toHaveLength(3);
    expect(firstContent.children[0].children).toBe('First');
    expect(firstContent.children[1].children).toBe('09:00');
    expect(firstContent.children[2].children).toBe('Started');

    const secondContent = vnode.children[1].children[1];
    expect(secondContent.children).toHaveLength(1);
  });
});

describe('VCarousel', () => {
  it('exposes a stable name', () => {
    expect(VCarousel.name).toBe('VCarousel');
  });

  it('renders a horizontal scroll-view root with one slide per item', () => {
    const { vnode } = render(
      VCarousel,
      { items: ['x', 'y'] },
      { slide: ({ item }: { item: string }) => [item] }
    );
    expect(vnode.type).toBe('scroll-view');
    expect(vnode.props['scroll-orientation']).toBe('horizontal');
    expect(vnode.children).toHaveLength(2);
    expect(vnode.children[0].children).toEqual(['x']);
  });
});

describe('VTable', () => {
  it('exposes a stable name', () => {
    expect(VTable.name).toBe('VTable');
  });

  it('resolveTableStyle uses neutral for the header row and text for cells', () => {
    const styles = resolveTableStyle(violetLight);
    expect(styles.headerRow.backgroundColor).toBe(violetLight.colors.neutral);
    expect(styles.cell.color).toBe(violetLight.colors.text);
  });

  it('renders one header cell per column and maps row values into body cells', () => {
    const columns = [
      { key: 'name', label: 'Name' },
      { key: 'role', label: 'Role' }
    ];
    const rows = [{ name: 'Ada', role: 'Engineer' }, { name: 'Grace', role: 'Admiral' }];
    const { vnode } = render(VTable, { columns, rows });

    const [headerRow, ...bodyRows] = vnode.children;
    expect(headerRow.children).toHaveLength(columns.length);
    expect(headerRow.children[0].children).toBe('Name');

    expect(bodyRows).toHaveLength(2);
    expect(bodyRows[0].children[0].children).toBe('Ada');
    expect(bodyRows[1].children[1].children).toBe('Admiral');
  });

  it('shows an empty string for missing values', () => {
    const columns = [{ key: 'missing', label: 'Missing' }];
    const { vnode } = render(VTable, { columns, rows: [{}] });
    expect(vnode.children[1].children[0].children).toBe('');
  });
});
