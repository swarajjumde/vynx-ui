<script>
// JavaScript-first Vue Lynx SFC — the Vynx UI showcase, built with Vynx UI.
// No `lang="ts"`, no browser/DOM APIs. Vue reactivity comes from `vue-lynx`.
import {
  VButton, VBadge, VCard, VFormField, VInputText, VTextarea, VCheckbox, VSwitch,
  VText, VHeading, VDivider, VAvatar, VTag, VProgressBar, VSkeleton, VIcon,
  VList, VListItem, VStack,
  VRadioGroup, VSelectButton, VToggleButton, VInputNumber, VRating, VSearchInput,
  VBottomSheet, VDialog, VActionSheet, VDrawer, VToast, VConfirmDialog,
  VAppBar, VTabs, VAccordion, VSelect, VTabBar,
  VDataView, VTimeline, VCarousel, VTable, VPaginator, VEmptyState,
  provideTheme
} from '@vynx/ui';
import { ref, computed } from 'vue-lynx';
import { violetDark } from '@vynx/themes';

export default {
  name: 'App',
  components: {
    VButton, VBadge, VCard, VFormField, VInputText, VTextarea, VCheckbox, VSwitch,
    VText, VHeading, VDivider, VAvatar, VTag, VProgressBar, VSkeleton, VIcon,
    VList, VListItem, VStack,
    VRadioGroup, VSelectButton, VToggleButton, VInputNumber, VRating, VSearchInput,
    VBottomSheet, VDialog, VActionSheet, VDrawer, VToast, VConfirmDialog,
    VAppBar, VTabs, VAccordion, VSelect, VTabBar,
    VDataView, VTimeline, VCarousel, VTable, VPaginator, VEmptyState
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

    // Tier 5 — navigation state.
    const tab = ref('overview');
    const tabItems = [
      { label: 'Overview', value: 'overview' },
      { label: 'Activity', value: 'activity' },
      { label: 'Members', value: 'members' }
    ];
    const faqOpen = ref(true);
    const sort = ref('recent');
    const sortOptions = [
      { label: 'Most recent', value: 'recent' },
      { label: 'Alphabetical', value: 'alpha' },
      { label: 'Oldest first', value: 'oldest' }
    ];
    const navTab = ref('home');
    const navItems = [
      { label: 'Home', value: 'home' },
      { label: 'Search', value: 'search' },
      { label: 'Profile', value: 'profile' }
    ];

    // Tier 6 — data state.
    const people = [
      { id: 1, name: 'Ada Lovelace', role: 'Editor', status: 'active' },
      { id: 2, name: 'Grace Hopper', role: 'Admin', status: 'active' },
      { id: 3, name: 'Alan Turing', role: 'Viewer', status: 'invited' }
    ];
    const statusTone = { active: 'success', invited: 'warning', suspended: 'danger' };
    const toneFor = (status) => statusTone[status] || 'neutral';
    const activity = [
      { title: 'Ada joined the team', time: '2h ago', description: 'Invited as Editor' },
      { title: 'Report exported', time: '5h ago', description: 'Q3 revenue' },
      { title: 'Plan upgraded', time: 'Yesterday', description: 'Team plan' }
    ];
    const highlights = [
      { title: 'Weekly digest', body: '12 new sign-ups this week.' },
      { title: 'Storage', body: '64% of your quota used.' },
      { title: 'Uptime', body: '99.98% over 30 days.' }
    ];
    const tableColumns = [
      { key: 'name', label: 'Name' },
      { key: 'role', label: 'Role' },
      { key: 'status', label: 'Status' }
    ];
    const page = ref(1);

    const dataRow = computed(() => ({
      display: 'flex', flexDirection: 'row', alignItems: 'center', gap: t.spacing.sm, flexGrow: 1
    }));
    const slideCard = {
      display: 'flex', flexDirection: 'column', gap: t.spacing.xs,
      padding: t.spacing.md, backgroundColor: t.colors.surface,
      borderRadius: t.radius.lg, height: '100%'
    };
    const spacer = { flexGrow: 1 };

    return {
      ui, name, bio, subscribe, notifications, plan, range, bold, qty, stars, query,
      planOptions, rangeOptions, actions,
      sheetOpen, dialogOpen, actionOpen, drawerOpen, confirmOpen,
      toastOpen, toastMsg, toastTone, showToast, onAction, onConfirm,
      tab, tabItems, faqOpen, sort, sortOptions, navTab, navItems,
      people, toneFor, activity, highlights, tableColumns, page,
      dataRow, slideCard, spacer
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
              <VTag tone="success" variant="solid" label="6/6 tiers" />
              <VTag tone="neutral" variant="outline" label="43 components" />
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

          <!-- Tier 5 — Navigation -->
          <VStack gap="sm">
            <VText tone="primary" size="xs" weight="semibold" value="TIER 05 · NAVIGATION" />
            <VHeading :level="2" value="Navigation" />
          </VStack>
          <VCard elevated>
            <VStack gap="md">
              <VAppBar title="Dashboard">
                <template #leading>
                  <VText size="lg" value="☰" />
                </template>
                <template #trailing>
                  <VAvatar label="AL" size="sm" />
                </template>
              </VAppBar>
              <VTabs v-model="tab" :items="tabItems" />
              <VText tone="muted" size="sm" :value="'Active tab: ' + tab" />
              <VDivider />
              <VFormField label="Sort by">
                <VSelect v-model="sort" :options="sortOptions" placeholder="Choose order" />
              </VFormField>
              <VAccordion v-model:open="faqOpen" label="What is Vynx UI?">
                <VText tone="muted" size="sm" value="A token-driven Vue Lynx component framework — PrimeVue, for mobile." />
              </VAccordion>
              <VDivider />
              <VTabBar v-model="navTab" :items="navItems" />
            </VStack>
          </VCard>

          <!-- Tier 6 — Data -->
          <VStack gap="sm">
            <VText tone="primary" size="xs" weight="semibold" value="TIER 06 · DATA" />
            <VHeading :level="2" value="Data" />
          </VStack>
          <VCard elevated>
            <VStack gap="md">
              <VHeading :level="3" value="Members" />
              <VDataView :items="people">
                <template #item="{ item }">
                  <view :style="dataRow">
                    <VAvatar :label="item.name.slice(0, 2)" size="sm" />
                    <VStack gap="none">
                      <VText :value="item.name" weight="medium" />
                      <VText tone="muted" size="sm" :value="item.role" />
                    </VStack>
                    <view :style="spacer" />
                    <VTag :tone="toneFor(item.status)" variant="solid" :label="item.status" />
                  </view>
                </template>
                <template #empty>
                  <VText tone="muted" value="No members yet." />
                </template>
              </VDataView>
              <VPaginator v-model="page" :total="3" />
              <VDivider />
              <VHeading :level="3" value="Roster" />
              <VTable :columns="tableColumns" :rows="people" />
              <VDivider />
              <VHeading :level="3" value="Highlights" />
              <VCarousel :items="highlights" slide-width="240px">
                <template #slide="{ item }">
                  <view :style="slideCard">
                    <VText :value="item.title" weight="semibold" />
                    <VText tone="muted" size="sm" :value="item.body" />
                  </view>
                </template>
              </VCarousel>
              <VDivider />
              <VHeading :level="3" value="Recent activity" />
              <VTimeline :items="activity" />
              <VDivider />
              <VHeading :level="3" value="Empty state" />
              <VEmptyState title="No results" message="Try a different search term.">
                <VButton variant="outline" tone="neutral" label="Clear filters" />
              </VEmptyState>
            </VStack>
          </VCard>

          <VText tone="muted" size="sm" value="All 6 tiers shipped — see apps/starter for the full admin template." />
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
