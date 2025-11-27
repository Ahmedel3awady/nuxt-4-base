<template>
  <UDashboardSidebar
    :collapsed-size="2"
    collapsible
    :resizable="true"
    v-model:collapsed="toggleCollapsed"
    class="transition-all duration-300 bg-white relative"
    :ui="{
      header: 'h-[100px]',
    }"
    :menu="{
      side,
    }"
  >
    <template #header>
      <img src="/imgs/big_logo.svg" class="mx-auto" height="180" />
    </template>
    <template #default="{ collapsed }">
      <UButton
        color="neutral"
        icon="i-material-symbols-double-arrow-rounded"
        variant="outline"
        @click="toggleCollapsed = !toggleCollapsed"
        class="cursor-pointer text-gray size-9 absolute left-[-21px] top-[69px] z-9999 items-center justify-center hidden lg:flex"
      />
      <UNavigationMenu
        v-model="active"
        :collapsed="collapsed"
        :items="items"
        orientation="vertical"
        popover
        tooltip
        :ui="{
          item: 'py-3 group',
          childItem: 'my-2',
          link: 'data-active:bg-primary/10 h-[48px] rounded-lg after:size-[10px] after:top-[50%] after:translate-x-[50%] after:translate-y-[-50%]',
          linkTrailingBadge:
            'bg-primary border-none text-white font-semibold px-3 py-1.5 text-sm min-w-[32px] rounded-lg h-[32px] flex items-center justify-center ring-0',
        }"
        type="single"
        variant="link"
        highlight
      >
        <template #item-leading="{ item }">
          <img
            v-if="item.children && item.children.length > 0"
            :src="`/imgs/side_nav/${item.icon}.svg`"
            class="size-5"
          />
        </template>
        <template #item-trailing="{ item }">
          <UIcon
            v-if="item.children && item.children.length > 0"
            :name="
              item.value === active ? 'i-ant-design-minus-outlined' : 'i-ant-design-plus-outlined'
            "
            class="size-5"
          />
        </template>
      </UNavigationMenu>
    </template>
    <template #footer="{ collapsed }">
      <UButton
        v-if="!collapsed"
        :to="state.user?.domain"
        :label="$t('button.go_to_website')"
        variant="primary"
        class="w-full"
      />
      <UButton
        v-else
        :to="state.user?.domain"
        icon="i-lucide-external-link"
        variant="primary"
        class="w-full"
      />
    </template>
  </UDashboardSidebar>
</template>

<script setup lang="ts">
import { useSidebar } from './useSidebar';

const { toggleCollapsed, side, items, active } = useSidebar();
const { state } = useAuthStore();
</script>
