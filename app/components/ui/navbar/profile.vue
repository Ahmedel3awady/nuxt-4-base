<template>
  <UDropdownMenu :items="items" :ui="{ content: 'w-(--reka-dropdown-menu-trigger-width)' }">
    <UButton
      class="min-w-20 lg:min-w-46 rounded-full px-3 flex items-center justify-between"
      color="neutral"
      variant="outline"
      block
    >
      <div class="flex items-center gap-2">
        <core-image src="/imgs/icons/user.svg" class="size-[21px] rounded-full" loading="lazy" />
        <span class="text-dark font-medium text-[14px]">{{ state?.user?.name }}</span>
        <span class="text-gray text-[12px] font-normal">{{ state?.user?.type }}</span>
      </div>
      <template #trailing>
        <UIcon name="i-lucide-chevron-down" class="size-5 text-gray" />
      </template>
    </UButton>
  </UDropdownMenu>
</template>

<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui';
const { t } = useI18n();
const { logout, state } = useAuthStore();
const items: DropdownMenuItem[] = [
  [
    {
      label: t('button.logout'),
      icon: 'i-lucide-log-out',
      class: 'cursor-pointer py-3 font-bold',
      onClick: () => {
        logout();
      },
    },
  ],
];
</script>
