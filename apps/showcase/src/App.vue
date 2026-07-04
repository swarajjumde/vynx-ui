<script>
// JavaScript-first Vue Lynx SFC demo; no `lang="ts"`, no browser/DOM APIs.
import { VBadge, VButton, VCard, provideTheme } from '@vynx/ui';
import { violetDark } from '@vynx/themes';

export default {
  name: 'App',
  components: { VBadge, VButton, VCard },
  setup() {
    // Apply the original Vynx violet brand theme (dark variant).
    provideTheme(violetDark);

    const onGetStarted = () => {
      console.log('Get started tapped');
    };

    return { onGetStarted };
  }
};
</script>

<template>
  <view class="showcase">
    <VCard elevated>
      <VBadge tone="primary" label="New" />
      <text class="showcase__title">Vynx UI</text>
      <VButton label="Get started" tone="primary" @tap="onGetStarted" />
      <VButton label="Docs" variant="outline" tone="neutral" />
      <VButton label="Delete" variant="ghost" tone="danger" />
    </VCard>
  </view>
</template>
