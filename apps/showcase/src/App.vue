<script>
// JavaScript-first Vue Lynx SFC demo; no `lang="ts"`, no browser/DOM APIs.
import {
  VBadge,
  VButton,
  VCard,
  VCheckbox,
  VFormField,
  VInputText,
  VSwitch,
  VTextarea,
  provideTheme
} from '@vynx/ui';
import { ref } from 'vue-lynx';
import { violetDark } from '@vynx/themes';

export default {
  name: 'App',
  components: { VBadge, VButton, VCard, VCheckbox, VFormField, VInputText, VSwitch, VTextarea },
  setup() {
    // Apply the original Vynx violet brand theme (dark variant).
    provideTheme(violetDark);

    // Ordinary Vue reactive state, bound with plain v-model from JavaScript.
    const name = ref('');
    const bio = ref('');
    const subscribe = ref(false);
    const notifications = ref(true);

    const onGetStarted = () => {
      console.log('Get started tapped');
    };

    return { name, bio, subscribe, notifications, onGetStarted };
  }
};
</script>

<template>
  <view class="showcase">
    <VCard elevated>
      <VBadge tone="primary" label="New" />
      <text class="showcase__title">Vynx UI</text>

      <VFormField label="Name" help="Your display name">
        <VInputText v-model="name" placeholder="Ada Lovelace" />
      </VFormField>

      <VFormField label="Bio" error="Bio is required" :invalid="bio.length === 0">
        <VTextarea v-model="bio" placeholder="Tell us about yourself" :rows="4" />
      </VFormField>

      <VCheckbox v-model:checked="subscribe" label="Subscribe to updates" />
      <VSwitch v-model:checked="notifications" label="Enable notifications" />

      <VButton label="Get started" tone="primary" @tap="onGetStarted" />
    </VCard>
  </view>
</template>
