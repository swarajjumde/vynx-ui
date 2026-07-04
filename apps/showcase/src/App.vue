<script>
// JavaScript-first Vue Lynx SFC — the Vynx UI showcase, built with Vynx UI.
// No `lang="ts"`, no browser/DOM APIs. Vue reactivity comes from `vue-lynx`.
import {
  VButton, VBadge, VCard, VFormField, VInputText, VTextarea, VCheckbox, VSwitch,
  VText, VHeading, VDivider, VAvatar, VTag, VProgressBar, VSkeleton, VIcon,
  VList, VListItem, VStack,
  VRadioGroup, VSelectButton, VToggleButton, VInputNumber, VRating, VSearchInput,
  VBottomSheet, VDialog, VActionSheet, VDrawer, VToast, VConfirmDialog,
  provideTheme
} from '@vynx/ui';
import { ref } from 'vue-lynx';
import { violetDark } from '@vynx/themes';

export default {
  name: 'App',
  components: {
    VButton, VBadge, VCard, VFormField, VInputText, VTextarea, VCheckbox, VSwitch,
    VText, VHeading, VDivider, VAvatar, VTag, VProgressBar, VSkeleton, VIcon,
    VList, VListItem, VStack,
    VRadioGroup, VSelectButton, VToggleButton, VInputNumber, VRating, VSearchInput,
    VBottomSheet, VDialog, VActionSheet, VDrawer, VToast, VConfirmDialog
  },
  setup() {
    provideTheme(violetDark);
    const t = violetDark;

    // Page chrome styling, sourced from theme tokens (no hardcoded colours).
    const ui = {
      root: { display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: t.colors.background },
      scroll: { flexGrow: 1 },
      page: { padding: t.spacing.lg },
      row: { display: 'flex', flexDirection: 'row', alignItems: 'center', gap: t.spacing.sm }
    };

    // Interactive state (bound with plain v-model from JavaScript).
    const name = ref('Ada Lovelace');
    const bio = ref('Building UIs for Lynx.');
    const subscribe = ref(true);
    const notifications = ref(false);
    const plan = ref('pro');
    const range = ref('week');
    const bold = ref(true);
    const qty = ref(3);
    const stars = ref(4);
    const query = ref('lynx');

    const planOptions = [
      { label: 'Starter', value: 'starter' },
      { label: 'Pro', value: 'pro' },
      { label: 'Team', value: 'team' }
    ];
    const rangeOptions = [
      { label: 'Day', value: 'day' },
      { label: 'Week', value: 'week' },
      { label: 'Month', value: 'month' }
    ];
    const actions = [
      { label: 'Edit', value: 'edit' },
      { label: 'Duplicate', value: 'duplicate' },
      { label: 'Delete', value: 'delete', tone: 'danger' }
    ];

    // Overlay visibility.
    const sheetOpen = ref(false);
    const dialogOpen = ref(false);
    const actionOpen = ref(false);
    const drawerOpen = ref(false);
    const confirmOpen = ref(false);
    const toastOpen = ref(false);
    const toastMsg = ref('Saved');
    const toastTone = ref('success');

    const showToast = (message, tone) => {
      toastMsg.value = message;
      toastTone.value = tone;
      toastOpen.value = true;
    };
    const onAction = (value) => showToast('Action: ' + value, 'neutral');
    const onConfirm = () => showToast('Deleted', 'danger');

    return {
      ui, name, bio, subscribe, notifications, plan, range, bold, qty, stars, query,
      planOptions, rangeOptions, actions,
      sheetOpen, dialogOpen, actionOpen, drawerOpen, confirmOpen,
      toastOpen, toastMsg, toastTone, showToast, onAction, onConfirm
    };
  }
};
</script>

<template>
  <view :style="ui.root">
    <scroll-view scroll-orientation="vertical" :style="ui.scroll">
      <view :style="ui.page">
        <VStack gap="lg">
          <!-- Header -->
          <VStack gap="sm">
            <VText tone="primary" size="xs" weight="semibold" value="VUE LYNX · MOBILE UI FRAMEWORK" />
            <VHeading :level="1" value="Vynx UI" />
            <VText tone="muted" value="PrimeVue, for Lynx — a token-driven component library." />
            <view :style="ui.row">
              <VBadge tone="primary" label="v0" />
              <VTag tone="success" variant="solid" label="4/6 tiers" />
              <VTag tone="neutral" variant="outline" label="32 components" />
            </view>
          </VStack>

          <!-- Tier 1 — Foundation -->
          <VStack gap="sm">
            <VText tone="primary" size="xs" weight="semibold" value="TIER 01 · FOUNDATION" />
            <VHeading :level="2" value="Foundation" />
          </VStack>
          <VCard elevated>
            <VStack gap="md">
              <view :style="ui.row">
                <VButton tone="primary" label="Primary" />
                <VButton variant="outline" tone="neutral" label="Outline" />
                <VButton tone="danger" label="Danger" />
              </view>
              <VDivider />
              <VFormField label="Name" help="Your display name">
                <VInputText v-model="name" placeholder="Full name" />
              </VFormField>
              <VFormField label="Bio">
                <VTextarea v-model="bio" :rows="3" placeholder="Tell us about yourself" />
              </VFormField>
              <VCheckbox v-model:checked="subscribe" label="Subscribe to updates" />
              <VSwitch v-model:checked="notifications" label="Enable notifications" />
            </VStack>
          </VCard>

          <!-- Tier 2 — Primitives & display -->
          <VStack gap="sm">
            <VText tone="primary" size="xs" weight="semibold" value="TIER 02 · PRIMITIVES & DISPLAY" />
            <VHeading :level="2" value="Primitives & display" />
          </VStack>
          <VCard elevated>
            <VStack gap="md">
              <view :style="ui.row">
                <VAvatar label="AL" size="lg" />
                <VAvatar label="NG" tone="neutral" />
                <VAvatar label="VX" size="sm" />
              </view>
              <view :style="ui.row">
                <VTag tone="primary" variant="solid" label="Solid" />
                <VTag tone="success" variant="outline" label="Outline" />
                <VTag tone="danger" variant="solid" label="Alert" />
              </view>
              <VProgressBar :value="70" tone="primary" />
              <VProgressBar :value="40" tone="success" />
              <VDivider />
              <VList>
                <VListItem>
                  <VText value="Profile" />
                </VListItem>
                <VListItem>
                  <VText value="Billing" />
                </VListItem>
                <VListItem>
                  <VText value="Security" />
                </VListItem>
              </VList>
              <VSkeleton width="60%" height="14px" />
            </VStack>
          </VCard>

          <!-- Tier 3 — Forms -->
          <VStack gap="sm">
            <VText tone="primary" size="xs" weight="semibold" value="TIER 03 · FORMS" />
            <VHeading :level="2" value="Forms" />
          </VStack>
          <VCard elevated>
            <VStack gap="md">
              <VFormField label="Plan">
                <VRadioGroup v-model="plan" :options="planOptions" />
              </VFormField>
              <VFormField label="Range">
                <VSelectButton v-model="range" :options="rangeOptions" />
              </VFormField>
              <view :style="ui.row">
                <VToggleButton v-model="bold" label="Bold" />
                <VText value="Quantity" tone="muted" size="sm" />
                <VInputNumber v-model="qty" :min="0" :max="9" />
              </view>
              <VRating v-model="stars" :max="5" />
              <VSearchInput v-model="query" placeholder="Search" />
            </VStack>
          </VCard>

          <!-- Tier 4 — Overlays & feedback -->
          <VStack gap="sm">
            <VText tone="primary" size="xs" weight="semibold" value="TIER 04 · OVERLAYS & FEEDBACK" />
            <VHeading :level="2" value="Overlays & feedback" />
            <VText tone="muted" size="sm" value="Tap to open — each renders over its scrim." />
          </VStack>
          <VCard elevated>
            <VStack gap="md">
              <VButton label="Bottom sheet" @tap="sheetOpen = true" />
              <VButton variant="outline" tone="neutral" label="Dialog" @tap="dialogOpen = true" />
              <VButton variant="outline" tone="neutral" label="Action sheet" @tap="actionOpen = true" />
              <VButton variant="outline" tone="neutral" label="Drawer" @tap="drawerOpen = true" />
              <VButton tone="danger" label="Confirm delete" @tap="confirmOpen = true" />
              <VButton variant="ghost" tone="primary" label="Show toast" @tap="showToast('Saved', 'success')" />
            </VStack>
          </VCard>

          <VText tone="muted" size="sm" value="Tiers 5–6 (navigation, data) and the starter template are next." />
        </VStack>
      </view>
    </scroll-view>

    <!-- Overlays: position:fixed, rendered above the page -->
    <VBottomSheet v-model:visible="sheetOpen">
      <VStack gap="sm">
        <VHeading :level="3" value="Share to" />
        <VText tone="muted" size="sm" value="Pick a destination." />
        <VButton label="Done" @tap="sheetOpen = false" />
      </VStack>
    </VBottomSheet>

    <VDialog v-model:visible="dialogOpen" title="Enable location?">
      <VStack gap="sm">
        <VText tone="muted" size="sm" value="We use it to find nearby results." />
        <VButton label="Allow" @tap="dialogOpen = false" />
      </VStack>
    </VDialog>

    <VActionSheet v-model:visible="actionOpen" :actions="actions" @select="onAction" />

    <VDrawer v-model:visible="drawerOpen" side="left">
      <VStack gap="sm">
        <VHeading :level="3" value="Menu" />
        <VText tone="muted" size="sm" value="Home · Profile · Settings" />
      </VStack>
    </VDrawer>

    <VConfirmDialog
      v-model:visible="confirmOpen"
      title="Delete file?"
      message="This cannot be undone."
      confirm-label="Delete"
      cancel-label="Cancel"
      tone="danger"
      @confirm="onConfirm"
    />

    <VToast v-model:visible="toastOpen" :message="toastMsg" :tone="toastTone" position="bottom" />
  </view>
</template>
