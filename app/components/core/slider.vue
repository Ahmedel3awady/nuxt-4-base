<template>
  <div class="custom-swiper">
    <client-only>
      <Swiper
        :modules="[Navigation, Pagination, Autoplay]"
        :slides-per-view="slidesPerView"
        :breakpoints="breakpoints"
        :space-between="spaceBetween"
        dir="rtl"
        :loop="true"
        @swiper="onSwiperInit"
        :autoplay="{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }"
      >
        <SwiperSlide
          v-for="(item, index) in items"
          :key="index"
          :class="{ 'hovered-slide': hoveredIndex === index }"
          @mouseenter="hoveredIndex = index"
          @mouseleave="hoveredIndex = null"
        >
          <slot name="item" :item="item" :index="index" />
        </SwiperSlide>
      </Swiper>
    </client-only>

    <div class="flex justify-center items-center gap-6 mt-6">
      <button
        @click="prevSlide"
        :class="[
          'prev-btn',
          isPrevDisabled
            ? 'disabled opacity-50 cursor-not-allowed'
            : 'hover:bg-black hover:text-white',
        ]"
        :disabled="isPrevDisabled"
      ></button>
      <div class="flex gap-[10px]">
        <button
          v-for="(page, i) in totalPages"
          :key="i"
          @click="goToSlide(i)"
          class="dot-btn w-3 h-3 rounded-full transition-all"
          :class="currentPage === i ? 'btn-active' : ''"
        />
      </div>
      <button
        @click="nextSlide"
        :class="[
          'next-btn',
          isNextDisabled
            ? 'disabled opacity-50 cursor-not-allowed'
            : 'hover:bg-black hover:text-white',
        ]"
        :disabled="isNextDisabled"
      ></button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
const hoveredIndex = ref<number | null>(null);

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const swiperInstance = ref<any>(null);
const currentPage = ref(0);
const totalPages = ref(0);

const isPrevDisabled = ref(true);
const isNextDisabled = ref(false);

const props = defineProps<{
  items: any[];
  slidesPerView: number;
  spaceBetween?: number;
  autoplay?: boolean;
  breakpoints?: any;
}>();

const updatePagination = () => {
  if (!swiperInstance.value) return;
  currentPage.value = swiperInstance.value.activeIndex;
  totalPages.value = Math.ceil(
    swiperInstance.value.slides.length /
      swiperInstance.value.params.slidesPerView
  );

  isPrevDisabled.value = currentPage.value === 0;
  isNextDisabled.value = currentPage.value >= totalPages.value - 1;
};

const prevSlide = () => {
  swiperInstance.value?.slidePrev();
};

const nextSlide = () => {
  swiperInstance.value?.slideNext();
};

const goToSlide = (index: number) => {
  swiperInstance.value?.slideTo(index);
};

const onSwiperInit = (swiper: any) => {
  swiperInstance.value = swiper;
  nextTick(() => {
    updatePagination();
    swiper.on("slideChange", updatePagination);
  });
};
</script>
