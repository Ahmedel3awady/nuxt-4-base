<template>
  <UTable
    :loading="loading"
    loading-color="primary"
    loading-animation="carousel"
    :data="items"
    :columns="columns"
    :style="{ maxHeight: `${tableHeight}px` }"
    class="flex-1 min-h-[350px]"
    sticky
    :ui="{
      thead: 'bg-gray-50',
      tbody: 'bg-white',
      th: 'py-4 font-medium',
    }"
    v-bind="tableProps"
  />
  <core-pagination ref="paginationRef" />
</template>

<script setup lang="ts" generic="T">
import type { TableColumn, TableProps } from '@nuxt/ui';
defineProps<{
  items: T[];
  columns: TableColumn<T>[];
  loading: boolean;
  tableProps?: TableProps<T>;
}>();

const tableHeight = ref(0);
const paginationRef = ref();

const calculateHeight = () => {
  if (!paginationRef.value) return;

  const paginationEl = (paginationRef.value as any).$el || paginationRef.value;
  const paginationHeight = paginationEl?.offsetHeight || 0;
  const offset = paginationHeight + 150; // Add extra offset for padding/margins

  tableHeight.value = window.innerHeight - offset;
};

onMounted(() => {
  nextTick(() => {
    calculateHeight();
  });
  window.addEventListener('resize', calculateHeight);
});

onUnmounted(() => {
  window.removeEventListener('resize', calculateHeight);
});
</script>
