<template>
  <UDropdownMenu
    :items="items"
    :ui="{ content: 'w-48 py-1', item: 'cursor-pointer py-2' }"
    v-bind="$attrs"
  >
    <slot>
      <UButton color="neutral" variant="default" icon="i-lucide-more-vertical" />
    </slot>
  </UDropdownMenu>
</template>

<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui';
defineProps<{
  items: DropdownMenuItem[];
}>();
defineOptions({
  inheritAttrs: false,
  name: 'UIDropdownMenu',
});
</script>
