<template>
  <UCard
    variant="solid"
    class="rounded-lg relative"
    :ui="{
      header: 'p-2 sm:p-3',
      body: 'p-2 sm:p-3 ',
      footer: 'p-2 sm:p-3',
    }"
    v-bind="options"
  >
    <template #header>
      <div class="flex items-center justify-between gap-2">
        <div class="flex items-center gap-3">
          <slot name="header-right" class="responsive-text" />
        </div>
        <div v-if="dropdownItems" class="flex items-center">
          <slot name="header-left">
            <ui-dropdown-menu :items="dropdownItems" />
          </slot>
        </div>
      </div>
    </template>
    <template #default>
      <slot />
    </template>
  </UCard>
</template>

<script setup lang="ts">
import type { CardProps, DropdownMenuItem } from '@nuxt/ui';
defineProps<{
  dropdownItems?: DropdownMenuItem[];
  options?: CardProps;
}>();
</script>
