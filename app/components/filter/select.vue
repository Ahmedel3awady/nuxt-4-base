<template>
  <UFormField :ui="{ label: 'font-medium text-secondary' }" size="xl" class="w-full" :label="label">
    <USelectMenu
      v-model="selectedValue"
      :ui="{
        content: 'py-2',
        item: 'h-[50px]',
        base: 'h-[50px] cursor-pointer',
        itemLabel: 'font-medium text-secondary',
        value: 'font-medium text-secondary',
      }"
      size="xl"
      class="w-full"
      :items="displayedItems"
      v-bind="selectProps"
      :value-key="valueKey ?? 'label'"
      @update:search-term="searchQuery = $event"
    >
      <template #trailing>
        <UIcon
          v-if="selectedValue"
          name="i-lucide-x"
          color="neutral"
          size="xs"
          class="cursor-pointer hover:text-red-500 transition-colors"
          @click.stop="clearSelection"
          aria-label="Clear selection"
        />
      </template>
    </USelectMenu>
  </UFormField>
</template>

<script setup lang="ts">
import type { SelectMenuProps } from '@nuxt/ui';
import type { MaybeRefOrGetter } from 'vue';

defineOptions({
  inheritAttrs: false,
});
const props = defineProps<{
  label?: string;
  filterName: string;
  items: MaybeRefOrGetter<any[] | undefined>;
  selectProps?: SelectMenuProps;
  valueKey?: string;
  autoApplyFilter?: boolean;
}>();

const queryStore = useQueryStore();

// Unwrap items to handle refs
const unwrappedItems = computed(() => toValue(props.items) ?? []);

// Selected value from query store
const selectedValue = computed({
  get: () =>
    queryStore.state.value.tempQuery[props.filterName] ||
    queryStore.state.value.query[props.filterName],
  set: value => {
    if (value) {
      queryStore.setTempQuery({ [props.filterName]: value });
      if (props.autoApplyFilter) {
        queryStore.setQuery({ [props.filterName]: value });
      }
    } else {
      queryStore.resetTempQuery(props.filterName);
      if (props.autoApplyFilter) {
        queryStore.removeQuery(props.filterName);
      }
    }
  },
});

// Use lazy load composable for virtual scrolling with search
const { displayedItems, setupScrollListener, destroy, searchQuery } = useLazyLoad(
  unwrappedItems,
  15,
  selectedValue,
  props.valueKey ?? 'label'
);

// Setup scroll listener on mount and cleanup
let cleanupScrollListener: (() => void) | null = null;

onMounted(() => {
  nextTick(() => {
    cleanupScrollListener = setupScrollListener();
  });
});

onBeforeUnmount(() => {
  if (cleanupScrollListener) {
    cleanupScrollListener();
  }
  destroy();
});

const clearSelection = () => {
  queryStore.resetTempQuery(props.filterName);
  queryStore.removeQuery(props.filterName);
  if (props.autoApplyFilter) {
    queryStore.removeQuery(props.filterName);
  }
};
</script>
