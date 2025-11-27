<template>
  <section id="hero-section" class="hero-section-content py-[200px]">
    <UContainer class="grid grid-cols-1 lg:grid-cols-12">
      <div
        class="hero-section-content-inner text-center col-span-12 lg:col-span-8 lg:col-start-3"
      >
        <h1 class="text-light lg:text-7xl text-5xl font-bold mb-6">
          {{ $t("app.title") }}
        </h1>
        <h2 class="text-light lg:text-[56px] text-3xl font-semibold">
          {{ $t("app.sub_title") }}
        </h2>
        <p class="text-light-gray lg:text-2xl text-xl font-normal my-10 leading-[2.4rem]">
          {{ $t("app.description") }}
        </p>
        <p class="text-light-gray text-2xl font-normal">
          {{ $t("app.sub_description") }}
        </p>
      </div>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
interface CategoryItem {
  category: string;
  count: number;
}

const props = withDefaults(
  defineProps<{
    items?: CategoryItem[];
    loading?: boolean;
  }>(),
  {
    items: () => [],
    loading: true,
  }
);

// Index key for the chart

// Transform data for vertical bar chart
const chartData = computed(() =>
  props.items.map((item) => ({
    category: item.category,
    count: item.count,
  }))
);

// Create categories mapping
const categories = computed(() => ({
  count: {
    name: "عدد الطلبات",
    color: "#2583fb",
  },
}));

// Y-axis formatter
const yFormatter = (value: number) => String(value);
</script>

<style scoped>
.hero-section-content {
  background: url("/imgs/hero/hero-image.webp") no-repeat center center / cover;
  border-bottom-right-radius: 32px;
  border-bottom-left-radius: 32px;
  @apply relative;
  isolation: isolate;
  @apply overflow-hidden;
  animation: bg-zoom 20s linear infinite;
}

@keyframes bg-zoom {
  0% {
    background-size: 100% auto;
  }
  50% {
    background-size: 110% auto;
  }
  100% {
    background-size: 100% auto;
  }
}
.hero-section-content-inner::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    178.99deg,
    rgba(0, 0, 0, 0.6) 0.87%,
    rgba(36, 64, 6, 0.6) 166.72%
  );
  z-index: -1;
}
</style>
