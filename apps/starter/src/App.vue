<script>
// Vynx Admin — an original Vue Lynx admin/dashboard starter, built entirely with
// Vynx UI. JavaScript-first (no `lang="ts"`, no browser/DOM APIs).
import {
  VAppBar, VTabBar, VDrawer, VToast, VButton, VScrollView, VAvatar,
  VList, VListItem, VText, VHeading, VDivider,
  provideTheme
} from '@vynx/ui';
import { ref, computed, provide } from 'vue-lynx';
import { violetLight, violetDark, lightTheme, darkTheme } from '@vynx/themes';
import DashboardScreen from './screens/DashboardScreen.vue';
import ItemsScreen from './screens/ItemsScreen.vue';
import SettingsScreen from './screens/SettingsScreen.vue';

const SCREENS = { dashboard: DashboardScreen, items: ItemsScreen, settings: SettingsScreen };
const TITLES = { dashboard: 'Dashboard', items: 'Team', settings: 'Settings' };

function pickTheme(preset, scheme) {
  if (preset === 'neutral') return scheme === 'dark' ? darkTheme : lightTheme;
  return scheme === 'dark' ? violetDark : violetLight;
}

export default {
  name: 'App',
  components: {
    VAppBar, VTabBar, VDrawer, VToast, VButton, VScrollView, VAvatar,
    VList, VListItem, VText, VHeading, VDivider,
    DashboardScreen, ItemsScreen, SettingsScreen
  },
  setup() {
    const scheme = ref('dark');
    const preset = ref('violet');

    // Reactive theme: mutating scheme/preset re-themes the whole tree.
    const activeTheme = computed(() => pickTheme(preset.value, scheme.value));
    provideTheme(activeTheme);

    const activeTab = ref('dashboard');
    const drawerOpen = ref(false);

    // Toast host, shared with screens through the app context.
    const toastOpen = ref(false);
    const toastMsg = ref('');
    const toastTone = ref('success');
    const notify = (message, tone = 'success') => {
      toastMsg.value = message;
      toastTone.value = tone;
      toastOpen.value = true;
    };

    const setScheme = (value) => { scheme.value = value; };
    const setPreset = (value) => { preset.value = value; };

    provide('vynxApp', { scheme, preset, setScheme, setPreset, notify });

    const goTo = (tab) => { activeTab.value = tab; drawerOpen.value = false; };

    const tabs = [
      { label: 'Dashboard', value: 'dashboard' },
      { label: 'Team', value: 'items' },
      { label: 'Settings', value: 'settings' }
    ];

    const screen = computed(() => SCREENS[activeTab.value]);
    const title = computed(() => TITLES[activeTab.value]);

    const chrome = computed(() => ({
      root: { display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: activeTheme.value.colors.background },
      body: { flexGrow: 1 },
      bodyPad: { padding: activeTheme.value.spacing.lg }
    }));

    return { activeTab, drawerOpen, toastOpen, toastMsg, toastTone, tabs, screen, title, chrome, goTo };
  }
};
</script>

<template>
  <view :style="chrome.root">
    <VAppBar :title="title">
      <template #leading>
        <VButton variant="ghost" tone="neutral" size="sm" label="☰" @tap="drawerOpen = true" />
      </template>
      <template #trailing>
        <VAvatar label="VX" size="sm" />
      </template>
    </VAppBar>

    <VScrollView :style="chrome.body">
      <view :style="chrome.bodyPad">
        <component :is="screen" />
      </view>
    </VScrollView>

    <VTabBar v-model="activeTab" :items="tabs" />

    <VDrawer v-model:visible="drawerOpen" side="left">
      <VHeading :level="3" value="Vynx Admin" />
      <VDivider />
      <VList>
        <VListItem @tap="goTo('dashboard')"><VText value="Dashboard" /></VListItem>
        <VListItem @tap="goTo('items')"><VText value="Team" /></VListItem>
        <VListItem @tap="goTo('settings')"><VText value="Settings" /></VListItem>
      </VList>
    </VDrawer>

    <VToast v-model:visible="toastOpen" :message="toastMsg" :tone="toastTone" position="bottom" />
  </view>
</template>
