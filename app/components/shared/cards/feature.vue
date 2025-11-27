<template>
  <div
    class="group relative h-[420px] bg-primary-light rounded-2xl border border-secondary-gray shadow-sm overflow-hidden cursor-pointer z-0 hover:z-20 px-6 "
  >
    <!-- text content -->
    <div class="text-center flex items-center justify-center flex-col gap-6 h-full transition-all duration-0">
      <img :src="item.icon" class="w-[80px] h-[80px]  mx-auto" />
      <h3 class="font-semibold text-base text-secondary">{{ item.title }}</h3>
    </div>

    <!-- Hover image -->
    <div
      class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500"
    >
      <img :src="item.image" class="w-full h-full object-cover" />

      <!-- overlay -->
      <div class="absolute inset-0 bg-black/40" />

      <!-- hover text -->
      <div class="absolute bottom-6 left-6 right-6 text-white">
        <h3 class="font-bold text-base">{{ item.hoverTitle }}</h3>
        <p class="text-sm opacity-90">{{ item.desc }}</p>
      </div>
    </div>

    <!-- scale effect -->
    <div
      class="absolute inset-0 rounded-2xl scale-100 group-hover:scale-105 transition-all duration-300"
    />
  </div>
</template>

<script setup lang="ts">
interface Item {
  title: string;
  icon: string;
  image: string;
  hoverTitle: string;
  desc: string;
}

defineProps<{
  item: Item;
}>();
</script>
