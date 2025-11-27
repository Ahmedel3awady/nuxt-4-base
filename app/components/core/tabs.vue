<template>
  <div
    ref="scrollContainer"
    class="overflow-x-auto mb-3 min-h-[50px] scroll-smooth scrollbar-custom pb-2"
  >
    <UTabs
      v-model="active"
      :items="items"
      :content="false"
      :ui="{
        root: 'inline-flex min-w-full gap-4 sm:gap-6 px-2',
        list: 'py-3 px-4 sm:py-4 sm:px-6 bg-white rounded-xl',
        trigger:
          'cursor-pointer whitespace-nowrap text-sm sm:text-base px-4 py-2 sm:px-6 sm:py-2.5 rounded-lg transition-all duration-200',
      }"
      v-bind="$attrs"
    />
  </div>
</template>

<script setup lang="ts">
import type { TabsItem } from '@nuxt/ui';
const active = defineModel<string>('active');
const props = defineProps<{
  items: TabsItem[];
}>();
const scrollContainer = useTemplateRef<HTMLDivElement>('scrollContainer');

const scrollToActiveTab = () => {
  setTimeout(() => {
    if (!scrollContainer.value) return;

    const activeButton = scrollContainer.value.querySelector(
      '[role="tab"][data-state="active"]'
    ) as HTMLElement;
    if (!activeButton) return;

    const buttonRect = activeButton.getBoundingClientRect();
    const containerRect = scrollContainer.value.getBoundingClientRect();
    const scrollOffset =
      buttonRect.left -
      containerRect.left +
      scrollContainer.value.scrollLeft -
      scrollContainer.value.clientWidth / 2 +
      buttonRect.width / 2;

    scrollContainer.value.scrollTo({ left: scrollOffset, behavior: 'smooth' });
  }, 200);
};

watch([active, props.items], scrollToActiveTab, { immediate: true });
</script>
<style scoped>
.scrollbar-custom {
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.scrollbar-custom::-webkit-scrollbar {
  display: none;
}
</style>
