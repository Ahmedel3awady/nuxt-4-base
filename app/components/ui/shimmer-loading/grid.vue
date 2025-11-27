<template>
  <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" v-bind="$attrs">
    <ui-shimmer-loading-card v-for="i in skeletonCount" :key="`skeleton-${i}`" />
  </section>
</template>

<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
});
const { skeletonCount = 6 } = defineProps<{
  skeletonCount?: number;
}>();
</script>
