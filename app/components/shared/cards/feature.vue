<template>
  <div
    class="feature-card group relative lg:h-[420px] h-[580px] bg-primary-light rounded-2xl border border-secondary-gray shadow-sm overflow-hidden cursor-pointer z-0 hover:z-20 px-6"
  >
    <div
      class="text-center flex items-center justify-center flex-col gap-6 h-full transition-all duration-0"
    >
      <core-lazy-image :src="item.icon" placeholder-src="/icon.png" class="w-[80px] h-[80px] mx-auto" />
      <h3 class="font-semibold text-base text-secondary">{{ item.title }}</h3>
    </div>

    <div
      class="big-card absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 bg-cover bg-center bg-no-repeat isolate"
      :style="{ backgroundImage: `url(/imgs/features/${item.id}.webp)` }"
    >
      <div class="absolute inset-0 overlay-card isolate-auto z-[-1]" />

      <div class="h-full w-full">
        <div
          class="flex items-start justify-start flex-col gap-6 lg:pb-0 lg:pl-0 lg:pt-10 lg:pr-10 px-8 py-8 text-start"
        >
          <h3 class="text-light font-semibold lg:text-2xl text-xl">
            {{ item.title }}
          </h3>
          <p class="text-light-gray text-base font-normal lg:w-[48%] w-full">
            {{ item.desc }}
          </p>
        </div>
        <div
          class="mockup-card w-full h-full absolute inset-0 z-[-1] bg-left-bottom bg-no-repeat"
          :style="{
            backgroundImage: `url(/imgs/features/mockup-${item.id}.webp)`,
          }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Item {
  id: string | number;
  title: string;
  icon: string;
  image: string;
  desc: string;
}

defineProps<{
  item: Item;
}>();
</script>
<style scoped>
.overlay-card {
  background: linear-gradient(
    190.73deg,
    rgba(0, 0, 0, 0.32) 7.96%,
    rgba(0, 0, 0, 0) 152.27%
  );
}
</style>
