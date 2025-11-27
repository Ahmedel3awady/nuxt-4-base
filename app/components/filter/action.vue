<template>
  <main>
    <UButton
      @click="open = true"
      class="min-w-[50px]"
      size="xl"
      variant="outline"
      icon="i-lucide-filter"
    />
    <USlideover side="left" v-model:open="open" :ui="{ footer: 'grid grid-cols-2 gap-4' }">
      <template #header>
        <div
          class="h-[52px] flex items-center w-full mx-auto justify-center border border-gray-200 rounded-lg gap-3"
        >
          <h2 class="text-[18px] font-medium">{{ $t('filter_by') }}</h2>
          <UIcon size="20" name="i-lucide-filter" />
        </div>
      </template>
      <template #body>
        <component
          v-if="currentFilterComponent"
          :is="currentFilterComponent"
          :filter-data="filterData"
        />
      </template>
      <template #footer>
        <UButton
          @click="handleApplyFilter"
          size="xl"
          variant="primary"
          :label="$t('apply_filter')"
        />
        <UButton
          @click="handleClearFilter"
          size="xl"
          variant="outline"
          :label="$t('clear_filter')"
        />
      </template>
    </USlideover>
  </main>
</template>

<script setup lang="ts">
import { buildComposableMap, getFilterComponent, getFilterData } from '~/utils/filterLoader';

const route = useRoute();
const open = ref(false);
const { applyTempQuery, resetQuery } = useQueryStore();

// Auto-import all filter components and composables
const filterComponents = import.meta.glob<{ default: any }>('./page/*.vue', { eager: true });
const filterComposables = import.meta.glob<any>('~/composables/use*Filter.ts', { eager: true });

// Build composable map automatically
const composableMap = buildComposableMap(filterComposables);

// Get filter name from route meta
const filterName = computed(() => route.meta.filter as string);

// Cache for composable results to prevent re-calling
const filterDataCache = new Map<string, any>();

// Dynamically resolve component and data
const currentFilterComponent = computed(() =>
  getFilterComponent(filterComponents, filterName.value)
);

const filterData = computed(() => {
  const name = filterName.value;
  if (!name) return null;

  // Return cached result if exists
  if (filterDataCache.has(name)) {
    return filterDataCache.get(name);
  }

  // Call composable once and cache the result
  const data = getFilterData(composableMap, name);
  if (data) {
    filterDataCache.set(name, data);
  }
  return data;
});

const handleApplyFilter = () => {
  applyTempQuery();
  open.value = false;
};

const handleClearFilter = () => resetQuery();

const { setQuery } = useQueryStore();
watch(
  () => route.query.employee,
  newVal => {
    if (newVal) {
      setQuery({ employee: newVal as string });
    }
  },
  { immediate: true }
);
</script>
