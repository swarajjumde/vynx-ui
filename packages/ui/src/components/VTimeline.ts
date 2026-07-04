import { computed, defineComponent, h, type PropType } from 'vue';
import { useTheme } from '../theme.js';
import { resolveTimelineStyle, resolveTimelineItemStyle } from '../styles/timeline.js';

export interface TimelineItem {
  title: string;
  time?: string;
  description?: string;
}

/**
 * VTimeline - a token-driven, Lynx-compatible vertical event timeline.
 *
 * Renders a column `view` (no DOM) of event rows, each a marker `view`
 * (dot + connector line) beside a content `view` with `text` title/time/
 * description. Display-only: emits no events.
 */
export const VTimeline = defineComponent({
  name: 'VTimeline',
  props: {
    items: { type: Array as PropType<TimelineItem[]>, default: () => [] }
  },
  setup(props) {
    const theme = useTheme();
    const containerStyle = computed(() => resolveTimelineStyle(theme.value).container);

    return () =>
      h(
        'view',
        { class: 'v-timeline', style: containerStyle.value },
        props.items.map((item, index) => {
          const last = index === props.items.length - 1;
          const styles = resolveTimelineItemStyle(theme.value, { last });

          const content = [h('text', { class: 'v-timeline__title', style: styles.title }, item.title)];
          if (item.time) {
            content.push(h('text', { class: 'v-timeline__time', style: styles.time }, item.time));
          }
          if (item.description) {
            content.push(h('text', { class: 'v-timeline__description', style: styles.description }, item.description));
          }

          return h('view', { key: index, class: 'v-timeline__row', style: styles.row }, [
            h('view', { class: 'v-timeline__marker', style: styles.marker }, [
              h('view', { class: 'v-timeline__dot', style: styles.dot }),
              h('view', { class: 'v-timeline__line', style: styles.line })
            ]),
            h('view', { class: 'v-timeline__content', style: styles.content }, content)
          ]);
        })
      );
  }
});
