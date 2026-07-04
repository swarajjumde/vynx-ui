<script>
// Team screen — a searchable list with a detail dialog (list → detail CRUD flow).
import {
  VStack, VSearchInput, VDataView, VListItem, VText, VTag, VAvatar,
  VDialog, VFormField, VInputText, VButton, VPaginator
} from '@vynx/ui';
import { inject, ref, computed } from 'vue-lynx';
import { useTheme } from '@vynx/ui';

const PEOPLE = [
  { id: 1, name: 'Ada Lovelace', role: 'Editor', status: 'active' },
  { id: 2, name: 'Grace Hopper', role: 'Admin', status: 'active' },
  { id: 3, name: 'Alan Turing', role: 'Viewer', status: 'invited' },
  { id: 4, name: 'Katherine Johnson', role: 'Editor', status: 'active' },
  { id: 5, name: 'Linus Torvalds', role: 'Viewer', status: 'suspended' }
];

const STATUS_TONE = { active: 'success', invited: 'warning', suspended: 'danger' };

export default {
  name: 'ItemsScreen',
  components: {
    VStack, VSearchInput, VDataView, VListItem, VText, VTag, VAvatar,
    VDialog, VFormField, VInputText, VButton, VPaginator
  },
  setup() {
    const app = inject('vynxApp');
    const theme = useTheme();

    const query = ref('');
    const page = ref(1);
    const dialogOpen = ref(false);
    const draftName = ref('');
    const draftRole = ref('');
    const editingId = ref(null);

    const filtered = computed(() => {
      const q = query.value.trim().toLowerCase();
      if (!q) return PEOPLE;
      return PEOPLE.filter((p) => p.name.toLowerCase().includes(q) || p.role.toLowerCase().includes(q));
    });

    const openDetail = (person) => {
      editingId.value = person.id;
      draftName.value = person.name;
      draftRole.value = person.role;
      dialogOpen.value = true;
    };

    const save = () => {
      const person = PEOPLE.find((p) => p.id === editingId.value);
      if (person) {
        person.name = draftName.value;
        person.role = draftRole.value;
      }
      dialogOpen.value = false;
      app.notify('Member saved', 'success');
    };

    const toneFor = (status) => STATUS_TONE[status] || 'neutral';
    const row = computed(() => ({
      display: 'flex', flexDirection: 'row', alignItems: 'center',
      gap: theme.value.spacing.sm, flexGrow: 1
    }));
    const spacer = { flexGrow: 1 };

    return { query, page, filtered, dialogOpen, draftName, draftRole, openDetail, save, toneFor, row, spacer };
  }
};
</script>

<template>
  <VStack gap="md">
    <VSearchInput v-model="query" placeholder="Search members" />

    <VDataView :items="filtered">
      <template #item="{ item }">
        <VListItem @tap="openDetail(item)">
          <view :style="row">
            <VAvatar :label="item.name.slice(0, 2)" size="sm" />
            <VStack gap="none">
              <VText :value="item.name" weight="medium" />
              <VText tone="muted" size="sm" :value="item.role" />
            </VStack>
            <view :style="spacer" />
            <VTag :tone="toneFor(item.status)" variant="solid" :label="item.status" />
          </view>
        </VListItem>
      </template>
      <template #empty>
        <VText tone="muted" value="No members match your search." />
      </template>
    </VDataView>

    <VPaginator v-model="page" :total="3" />

    <VDialog v-model:visible="dialogOpen" title="Edit member">
      <VStack gap="md">
        <VFormField label="Name">
          <VInputText v-model="draftName" placeholder="Full name" />
        </VFormField>
        <VFormField label="Role">
          <VInputText v-model="draftRole" placeholder="Role" />
        </VFormField>
        <VButton label="Save" @tap="save" />
      </VStack>
    </VDialog>
  </VStack>
</template>
