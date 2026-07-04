<script>
// Dashboard screen — stat cards and a recent-activity timeline, built with Vynx UI.
import { VStack, VCard, VHeading, VText, VProgressBar, VTag, VTimeline, VButton } from '@vynx/ui';
import { inject, computed } from 'vue-lynx';
import { useTheme } from '@vynx/ui';

export default {
  name: 'DashboardScreen',
  components: { VStack, VCard, VHeading, VText, VProgressBar, VTag, VTimeline, VButton },
  setup() {
    const app = inject('vynxApp');
    const theme = useTheme();

    const stats = [
      { label: 'Active users', value: '2,481', progress: 72, tone: 'primary' },
      { label: 'Revenue goal', value: '$18.2k', progress: 54, tone: 'success' },
      { label: 'Open tickets', value: '9', progress: 30, tone: 'warning' }
    ];

    const activity = [
      { title: 'Ada joined the team', time: '2h ago', description: 'Invited as Editor' },
      { title: 'Report exported', time: '5h ago', description: 'Q3 revenue' },
      { title: 'Plan upgraded', time: 'Yesterday', description: 'Team plan' }
    ];

    const statRow = computed(() => ({ marginTop: theme.value.spacing.xs }));

    return { stats, activity, statRow, notify: app.notify };
  }
};
</script>

<template>
  <VStack gap="lg">
    <VStack gap="xs">
      <VText tone="muted" size="sm" value="Overview" />
      <VHeading :level="2" value="Good morning, Vynx" />
    </VStack>

    <VStack gap="md">
      <VCard v-for="stat in stats" :key="stat.label" elevated>
        <VStack gap="sm">
          <VText tone="muted" size="sm" :value="stat.label" />
          <VHeading :level="2" :value="stat.value" />
          <VProgressBar :value="stat.progress" :tone="stat.tone" />
        </VStack>
      </VCard>
    </VStack>

    <VStack gap="sm">
      <VHeading :level="3" value="Recent activity" />
      <VCard>
        <VTimeline :items="activity" />
      </VCard>
    </VStack>

    <VButton label="New report" @tap="notify('Report created', 'success')" />
  </VStack>
</template>
