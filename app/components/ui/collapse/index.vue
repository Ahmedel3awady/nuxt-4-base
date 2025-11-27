<template>
  <UCollapsible
    :ui="{ root: ' bg-white rounded-lg border border-gray-150 p-[2px]' }"
    :unmount-on-hide="false"
    v-bind="{ ...options, ...$attrs }"
  >
    <UButton
      class="group"
      :label="title"
      color="neutral"
      variant="soft"
      size="xl"
      trailing-icon="i-lucide-chevron-down"
      :ui="{
        trailingIcon: 'group-data-[state=open]:rotate-180 transition-transform duration-200',
        base: 'h-[80px] bg-white ',
      }"
      block
    >
      <slot name="label" />
    </UButton>

    <template #content>
      <slot name="content" />
    </template>
  </UCollapsible>
</template>

<script setup lang="ts">
import type { CollapsibleProps } from '@nuxt/ui';
defineOptions({
  inheritAttrs: false,
});
defineProps<{
  title?: string;
  options?: CollapsibleProps;
}>();
</script>
