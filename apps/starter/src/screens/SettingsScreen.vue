<script>
// Settings screen — live theme/preset switching plus preferences, built with Vynx UI.
import {
  VStack, VCard, VHeading, VText, VFormField, VSelectButton, VSelect,
  VSwitch, VRadioGroup, VButton, VDivider
} from '@vynx/ui';
import { inject, ref } from 'vue-lynx';

export default {
  name: 'SettingsScreen',
  components: {
    VStack, VCard, VHeading, VText, VFormField, VSelectButton, VSelect,
    VSwitch, VRadioGroup, VButton, VDivider
  },
  setup() {
    const app = inject('vynxApp');

    const schemeOptions = [
      { label: 'Light', value: 'light' },
      { label: 'Dark', value: 'dark' }
    ];
    const presetOptions = [
      { label: 'Violet', value: 'violet' },
      { label: 'Neutral', value: 'neutral' }
    ];
    const densityOptions = [
      { label: 'Comfortable', value: 'comfortable' },
      { label: 'Compact', value: 'compact' }
    ];

    const notifications = ref(true);
    const marketing = ref(false);
    const density = ref('comfortable');

    return {
      scheme: app.scheme,
      preset: app.preset,
      setScheme: app.setScheme,
      setPreset: app.setPreset,
      notify: app.notify,
      schemeOptions, presetOptions, densityOptions,
      notifications, marketing, density
    };
  }
};
</script>

<template>
  <VStack gap="lg">
    <VCard elevated>
      <VStack gap="md">
        <VHeading :level="3" value="Appearance" />
        <VText tone="muted" size="sm" value="Switches the live theme across the whole app." />
        <VFormField label="Color scheme">
          <VSelectButton :model-value="scheme" :options="schemeOptions" @change="setScheme" />
        </VFormField>
        <VFormField label="Brand preset">
          <VSelect :model-value="preset" :options="presetOptions" @change="setPreset" />
        </VFormField>
      </VStack>
    </VCard>

    <VCard elevated>
      <VStack gap="md">
        <VHeading :level="3" value="Preferences" />
        <VSwitch v-model:checked="notifications" label="Push notifications" />
        <VSwitch v-model:checked="marketing" label="Marketing emails" />
        <VDivider />
        <VFormField label="Density">
          <VRadioGroup v-model="density" :options="densityOptions" />
        </VFormField>
      </VStack>
    </VCard>

    <VButton label="Save changes" @tap="notify('Settings saved', 'success')" />
  </VStack>
</template>
