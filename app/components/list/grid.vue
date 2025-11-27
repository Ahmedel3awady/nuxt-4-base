<template>
  <ui-shimmer-loading v-if="loading" />
  <ui-empty-state v-else-if="!items.length" />
  <section v-else>
    <div :class="gridClass">
      <template v-for="(item, index) in items" :key="item.id">
        <slot name="item" :item="item" :index="index" />
      </template>
    </div>
    <core-pagination />
  </section>
</template>

<script setup lang="ts" generic="T">
const {
  items = [],
  loading = false,
  gridClass = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4',
} = defineProps<{
  items?: T[];
  loading?: boolean;
  gridClass?: string;
}>();
</script>
