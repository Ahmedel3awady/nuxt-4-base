<template>
  <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" v-bind="$attrs">
    <div
      v-for="i in skeletonCount"
      :key="`skeleton-${i}`"
      class="rounded-lg bg-white p-4 space-y-4"
    >
      <div class="flex items-center gap-3">
        <USkeleton class="size-10" :ui="{ rounded: 'rounded-full' }" />
        <USkeleton class="h-4 w-32" />
      </div>
      <div class="space-y-3">
        <div class="rounded-lg bg-gray-50 p-2 space-y-2">
          <USkeleton class="h-3 w-16" />
          <USkeleton class="h-4 w-24" />
        </div>
        <div class="rounded-lg bg-gray-50 p-2 space-y-2">
          <USkeleton class="h-3 w-16" />
          <USkeleton class="h-4 w-24" />
        </div>
      </div>
    </div>
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
