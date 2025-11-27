<template>
  <div id="features-section" class="features-section-content py-24">
    <UContainer>
      <!-- <UCarousel
        :items="cards"
        :ui="{
          item: 'basis-[16.66666666666667%] hover:basis-[45%] transition-opacity transition-all duration-500',
          controls: 'controls relative inset-0',
          dots: 'dots relative !inset-0',
          dot: 'w-[10px] h-[10px] rounded-full relative !inset-0',
          arrows: 'arrows relative !inset-0',
        }"
        arrows
        dots
        class="select-none"
        class-names
        :active="true"
      >
        <template #default="{ item, index }">
          <shared-cards-feature :item="item" :key="index" :index="index" />
        </template>
      </UCarousel> -->
      <core-slider
        :items="cards"
        :slidesPerView="6"
        :spaceBetween="16"
        :autoplay="true"
        :breakpoints="{
          320: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
          1280: { slidesPerView: 5 },
          1536: { slidesPerView: 6 },
        }"
        class="custom-slider"
      >
        <template #item="{ item, index }">
          <shared-cards-feature :item="item" :key="index" :index="index" />
        </template>
      </core-slider>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
const hoveredIndex = ref<number | null>(null);
const props = defineProps<{
  prevIcon?: string;
  nextIcon?: string;
}>();

const cards = [
  {
    title: "رؤية أسطول واضحة",
    icon: "/imgs/features/1.svg",
    image: "https://picsum.photos/468/468?random=1",
    hoverTitle: "رؤية أسطول واضحة",
    desc: "لوحة تحكم ذكية لمتابعة المركبات",
  },
  {
    title: "فحوصات وإصلاحات موثقة",
    icon: "/imgs/features/2.svg",
    image: "https://picsum.photos/468/468?random=2",
    hoverTitle: "إدارة المسارات",
    desc: "تحسين العمليات اليومية",
  },
  {
    title: "خطوط سير مرتبة",
    icon: "/imgs/features/3.svg",
    image: "https://picsum.photos/468/468?random=3",
    hoverTitle: "تقارير ذكية",
    desc: "مراقبة الأداء بشكل مباشر",
  },
  {
    title: "إدارة موظفين الشركة",
    icon: "/imgs/features/4.svg",
    image: "https://picsum.photos/468/468?random=4",
    hoverTitle: "إدارة المسارات",
    desc: "تحسين العمليات اليومية",
  },
  {
    title: "تكامل وإنسجام",
    icon: "/imgs/features/5.svg",
    image: "https://picsum.photos/468/468?random=5",
    hoverTitle: "تقارير ذكية",
    desc: "مراقبة الأداء بشكل مباشر",
  },
  {
    title: "تطبيق السائق",
    icon: "/imgs/features/6.svg",
    image: "https://picsum.photos/468/468?random=6",
    hoverTitle: "تقارير ذكية",
    desc: "مراقبة الأداء بشكل مباشر",
  },
  {
    title: "تطبيق الموظف",
    icon: "/imgs/features/7.svg",
    image: "https://picsum.photos/468/468?random=7",
    hoverTitle: "تقارير ذكية",
    desc: "مراقبة الأداء بشكل مباشر",
  },
];
</script>
