<template>
  <div
    class="rounded-lg bg-gray-100 p-[8px] min-h-[60px] flex flex-col gap-2"
    :class="class"
    v-bind="$attrs"
  >
    <h3 class="text-gray-300 text-[12px] responsive-text">
      <slot name="title">
        {{ title }}
      </slot>
    </h3>
    <div
      class="text-secondary font-medium text-[14px] responsive-text truncate"
      :class="valueClass"
    >
      <slot name="value">
        <component v-if="isVNode(value)" :is="value" />
        <template v-else>{{ value }}</template>
      </slot>
    </div>
    <slot />
  </div>
</template>

<script setup lang="ts">
import { isVNode } from 'vue';
import type { IListingItem } from '~/types';
defineProps<IListingItem>();

defineOptions({
  inheritAttrs: false,
});
</script>
